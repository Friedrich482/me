DO $$ BEGIN
    ALTER TABLE "posts" ALTER COLUMN "status" SET NOT NULL;
EXCEPTION
    WHEN undefined_column THEN NULL;
END $$;
--> statement-breakpoint
