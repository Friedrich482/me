import sharp from "sharp";
import { ulid } from "ulid";
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

  async uploadFileInBucket(getUploadUrlDto: GetUploadUrlDtoType) {
    const file = getUploadUrlDto.file;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const optimized = await sharp(buffer).webp({ quality: 90 }).toBuffer();

    const now = Date.now();
    const uploadedAt = new Date(now);

    const filename = `images/${ulid().toLowerCase()}.webp`;
    const mimeType = "image/webp";

    await this.r2.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: filename,
        Body: optimized,
        ContentType: mimeType,
        Metadata: {
          "original-name": encodeURIComponent(file.name),
        },
      }),
    );

    const mediaUrl = `${this.envService.get("R2_BUCKET_PUBLIC_DOMAIN")}/${filename}`;

    return { filename, mediaUrl, uploadedAt, mimeType };
  }

  async deleteFileFromBucket(
    deleteFileFromBucketDto: DeleteFileFromBucketDtoType,
  ) {
    const { filename } = deleteFileFromBucketDto;

    await this.r2.send(
      new DeleteObjectCommand({
        Bucket: this.envService.get("R2_BUCKET_NAME"),
        Key: filename,
      }),
    );
  }
}
