import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth-user.decorator';
import { AuthGuard } from '../auth.guard';
import { LoginInput } from '../inputs/login.input';
import { RegisterInput } from '../inputs/register.input';
import { SocialAccountInput } from '../inputs/social-account.input';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Query((returns) => User)
  async me(@CurrentUser() user: User) {
    return user;
  }

  @Mutation(() => User)
  register(@Args('input') input: RegisterInput) {
    return this.authService.register(input);
  }

  @Mutation(() => User)
  login(@Args('input') input: LoginInput) {
    return this.authService.login(input);
  }

  @Mutation(() => User)
  socialLoginOrRegister(@Args('input') input: SocialAccountInput) {
    return this.authService.socialLoginOrRegister(input);
  }
}
