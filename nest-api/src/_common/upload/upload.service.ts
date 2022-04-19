import { file } from './models/upload.model';
import { Inject, Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { createWriteStream, existsSync, mkdirSync, promises } from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class UploadService {
  constructor(
    @Inject('UPLOAD_REPOSITORY') private uploadRepo: typeof file,
    private configService: ConfigService,
  ) {}

  async uploadFile(file: FileUpload, model: string = 'default'): Promise<file> {
    const { createReadStream, filename, mimetype } = file;

    return new Promise((resolve, reject) => {
      const absoluteDestination = `${process.cwd()}/uploads/${model}`;

      if (!existsSync(absoluteDestination))
        mkdirSync(absoluteDestination, { recursive: true });

      createReadStream()
        .pipe(createWriteStream(`${absoluteDestination}/${filename}`))
        .on('finish', async () => {
          const fileState = await promises.stat(
            `${absoluteDestination}/${filename}`,
          );

          const path = `${this.configService.get<string>(
            'API_BASE',
          )}/uploads/${model}/${filename}`;

          const fileUploaded = await this.uploadRepo.create({
            name: filename,
            path,
            size: fileState.size,
            mimeType: mimetype,
          });
          resolve(fileUploaded);
        })
        .on('error', () => reject(false));
    });
  }
}
