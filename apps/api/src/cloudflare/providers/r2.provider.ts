import { EnvService } from "@/env/env.service";
import { S3Client } from "@aws-sdk/client-s3";
import { Provider } from "@nestjs/common";

import { R2_PROVIDER } from "../constants";

export const r2Provider = {
  provide: R2_PROVIDER,
  useFactory: (envService: EnvService) => {
    const r2 = new S3Client({
      endpoint: envService.get("R2_ENDPOINT"),
      credentials: {
        accessKeyId: envService.get("R2_ACCESS_KEY_ID"),
        secretAccessKey: envService.get("R2_SECRET_ACCESS_KEY"),
      },
      region: "auto",
    });

    return r2;
  },
  inject: [EnvService],
} satisfies Provider;
