DO $$ BEGIN
    ALTER TABLE "media" ALTER COLUMN "post_id" DROP NOT NULL;
EXCEPTION
    WHEN undefined_column THEN NULL;
END $$;
--> statement-breakpoint

DO $$ BEGIN
    ALTER TABLE "media" ADD COLUMN "url" text NOT NULL;
EXCEPTION
    WHEN duplicate_column THEN NULL;
END $$;
--> statement-breakpoint
