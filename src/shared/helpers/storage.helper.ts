import { S3 } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

class StorageHelper {
  private extractKeyFromUrl(url: string) {
    const key = url.split('/');
    return key[key.length - 1];
  }

  public async deleteFile(url: string) {
    const key = this.extractKeyFromUrl(url);
    if (process.env.STORAGE_TYPE === 's3') {
      const s3 = new S3({
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
        },
        region: process.env.AWS_REGION as string,
      });

      return await s3.deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key: key,
      });

    } else {
      return await promisify(fs.unlink)(
        path.resolve(process.env.STORAGE_LOCAL as string, key),
      );

    }
  }
}

export default new StorageHelper();
