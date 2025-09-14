import sharp from "sharp";
import { EnvService } from "src/env/env.service";

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";

import {
  DeleteFileFromBucketDtoType,
  GetUploadUrlDtoType,
} from "./cloudflare.dto";

@Injectable()
export class CloudflareService {
  private readonly r2: S3Client;
  private readonly bucketName = this.envService.get("R2_BUCKET_NAME");

  constructor(private readonly envService: EnvService) {
    this.r2 = new S3Client({
      endpoint: this.envService.get("R2_ENDPOINT"),
      credentials: {
        accessKeyId: this.envService.get("R2_ACCESS_KEY_ID"),
        secretAccessKey: this.envService.get("R2_SECRET_ACCESS_KEY"),
      },
      region: "auto",
    });
  }

  async getUploadUrl(getUploadUrlDto: GetUploadUrlDtoType) {
    const file = getUploadUrlDto.file;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const optimized = await sharp(buffer).webp({ quality: 90 }).toBuffer();

    const fileName = `images/${Date.now()}-${file.name}.webp`;

    await this.r2.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        Body: optimized,
        ContentType: "image/webp",
      }),
    );

    const imageUrl = `${this.envService.get("R2_PUBLIC_DOMAIN")}/${fileName}`;

    return imageUrl;
  }

  async deleteFileFromBucket(
    deleteFileFromBucketDto: DeleteFileFromBucketDtoType,
  ) {
    const { fileName } = deleteFileFromBucketDto;

    await this.r2.send(
      new DeleteObjectCommand({
        Bucket: this.envService.get("R2_BUCKET_NAME"),
        Key: fileName,
      }),
    );
  }
}
