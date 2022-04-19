import { RegisterInput } from '../inputs/register.input';
import { Request } from 'express';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User } from '../model/user.model';
import { LoginInput } from '../inputs/login.input';
import { SocialAccountInput } from '../inputs/social-account.input';
import { Sequelize, Transaction } from 'sequelize';
import { SocialAccount } from '../model/social-account.model';

@Injectable({})
export class AuthService {
  constructor(
    private configService: ConfigService,
    @Inject('USER_REPOSITORY') private userRepo: typeof User,
    @Inject('SOCIAL_REPOSITORY')
    private socialAccountRepo: typeof SocialAccount,
    @Inject('SEQUELIZE') private readonly sequelize: Sequelize,
  ) {}

  async register(input: RegisterInput) {
    const hashedPassword = await bcrypt.hash(input.password, 10);

    const user = await this.userRepo.create({
      ...input,
      password: hashedPassword,
    });

    const token = this.generateToken(user.id);

    return Object.assign(user, { token });
  }

  async login(input: LoginInput) {
    const user = await this.getUserOrError({ email: input.email });

    const token = this.generateToken(user.id);

    const passwordCheck = await bcrypt.compare(input.password, user.password);

    if (!passwordCheck)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    return Object.assign(user, { token });
  }

  async getUserFromReqHeaders(req: Request): Promise<User> {
    let token = this.getAuthToken(req);
    if (!token) return null;

    const userId = this.verifyToken(token);
    const user = await this.userRepo.findOne({ where: { id: userId } });
    return user ? (user.toJSON() as User) : null;
  }

  getAuthToken(req: Request): string {
    if (
      req &&
      req.headers &&
      (req.headers.authorization || req.headers.Authorization)
    ) {
      let auth: string;
      if (req.headers.authorization) auth = req.headers.authorization;
      if (req.headers.Authorization) auth = <string>req.headers.Authorization;
      return auth.split(' ')[1];
    }
    return null;
  }

  generateToken(userId: string) {
    return jwt.sign({ userId }, this.configService.get<string>('JWTKEY'));
  }

  verifyToken(token: string) {
    const { userId } = jwt.verify(
      token,
      this.configService.get<string>('JWTKEY'),
    );
    return userId;
  }

  async socialLoginOrRegister(input: SocialAccountInput) {
    let currentUser, user;

    const userSocialAccount = await this.socialAccountRepo.findOne({
      where: { providerId: input.providerId },
    });

    if (userSocialAccount) {
      user = await this.userRepo.findOne({
        where: { id: userSocialAccount.userId },
      });
    } else {
      user = await this.userRepo.findOne({
        where: { email: input.email },
      });
    }

    if (!userSocialAccount && !user) {
      currentUser = await this.registerSocial(input);
    }

    if (user && userSocialAccount) {
      currentUser = await this.loginSocial(user, input);
    }

    if (user && !userSocialAccount) {
      currentUser = await this.mergeAccount(user, input);
    }

    return currentUser;
  }

  private async mergeAccount(user: User, input: SocialAccountInput) {
    const currentUser = user;

    return this.sequelize.transaction(async (transaction) => {
      await this.socialAccountRepo.create(
        {
          userId: currentUser.id,
          provider: input.provider,
          providerId: input.providerId,
        },
        { transaction },
      );

      const updateCurrentUser = await this.userRepo.findOne({
        where: { id: currentUser.id },
      });
      updateCurrentUser.update({ ...input });
      updateCurrentUser.save;

      const token = this.generateToken(updateCurrentUser.id);
      return Object.assign(updateCurrentUser, { token });
    });
  }

  private async loginSocial(
    user: User,
    input: SocialAccountInput,
    transaction?: Transaction,
  ) {
    const currentUser = await this.userRepo.findOne({ where: { id: user.id } });
    currentUser.update({ ...input });
    currentUser.save;

    const token = this.generateToken(user.id);

    return Object.assign(currentUser, {
      token,
    });
  }

  async registerSocial(input: SocialAccountInput) {
    return this.sequelize.transaction(async (transaction) => {
      const user = await this.createUserAndSocialAccount(input, transaction);
      const token = this.generateToken(user.id);
      return Object.assign(user, { token });
    });
  }

  private async createUserAndSocialAccount(
    input: SocialAccountInput,
    transaction: Transaction,
  ) {
    const user = await this.userRepo.create({ ...input }, { transaction });
    await this.socialAccountRepo.create(
      {
        providerId: input.providerId,
        provider: input.provider,
        userId: user.id,
      },
      { transaction },
    );
    return user;
  }

  async getUserOrError(input: any) {
    const user = await this.userRepo.findOne({ where: input });

    if (!user) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return user;
  }
}
