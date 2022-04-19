import { Field, InputType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@InputType()
export class UploadInputFile {
  @IsNotEmpty()
  @Exclude()
  @Field(() => GraphQLUpload)
  file: FileUpload;

  @IsOptional()
  @Field(() => String)
  destination: string;
}
