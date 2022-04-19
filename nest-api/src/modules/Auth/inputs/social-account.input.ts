import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { SocialProvidersEnum } from '../enums/user.enum';

@InputType()
export class SocialAccountInput {
  @IsNotEmpty()
  @Field(() => String)
  providerId: string;

  @IsNotEmpty()
  @Field(() => SocialProvidersEnum)
  provider: SocialProvidersEnum;

  @IsOptional()
  @Field(() => String, { nullable: true })
  profilePicture?: string;

  @IsNotEmpty()
  @Field(() => String)
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email: string;
}
