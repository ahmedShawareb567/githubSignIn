import { file } from './models/upload.model';
import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { UploadService } from './upload.service';

@Resolver((of) => file)
export class UploadResolver {
  constructor(private uploadService: UploadService) {}

  @Mutation(() => file)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
    @Args('model', { nullable: true })
    model?: string,
  ) {
    return await this.uploadService.uploadFile(file, model);
  }
}
