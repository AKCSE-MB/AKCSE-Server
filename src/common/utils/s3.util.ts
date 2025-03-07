import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3: S3Client;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY') || '',
        secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY') || '',
      },
    });
    this.bucketName = this.configService.get<string>('AWS_BUCKET_NAME') || '';
  }

  async uploadImageToS3(file: Express.Multer.File): Promise<string> {
    if (!this.bucketName) {
      throw new Error('AWS_BUCKET_NAME is not defined');
    }

    const params = {
      Bucket: this.bucketName,
      Key: `events/${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read' as ObjectCannedACL,
    };

    const command = new PutObjectCommand(params);
    await this.s3.send(command);

    return `https://${this.bucketName}.s3.${this.configService.get<string>(
      'AWS_REGION',
    )}.amazonaws.com/${params.Key}`;
  }
}
