import { S3 } from 'aws-sdk';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

export async function uploadImageToS3(
  file: Express.Multer.File,
): Promise<string> {
  if (!process.env.AWS_BUCKET_NAME) {
    throw new Error('AWS_BUCKET_NAME is not defined');
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `events/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  const result = await s3.upload(params).promise();
  return result.Location; // Returns the S3 URL
}
