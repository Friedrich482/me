DO $$ BEGIN
    ALTER TABLE "media" ADD COLUMN "original_filename" text;
EXCEPTION
    WHEN duplicate_column THEN NULL;
END $$;
--> statement-breakpoint
