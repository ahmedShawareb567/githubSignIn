import { Stream } from 'stream';

export interface UploadInterface {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}
