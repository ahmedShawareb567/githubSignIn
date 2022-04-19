import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
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

  @IsNotEmpty()
  @Field(() => String)
  password: string;
}
