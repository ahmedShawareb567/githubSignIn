import { Module } from '@nestjs/common';
import { uploadProvider } from './upload.providers';
import { UploadResolver } from './upload.resolver';
import { UploadService } from './upload.service';

@Module({
  imports: [],
  providers: [UploadService, UploadResolver, ...uploadProvider],
})
export class UploadModule {}
