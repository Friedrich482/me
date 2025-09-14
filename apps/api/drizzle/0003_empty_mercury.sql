ALTER TABLE "media" ALTER COLUMN "post_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "media" ADD COLUMN "url" text NOT NULL;