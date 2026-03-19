DO $$ BEGIN
    ALTER TABLE "post_tags" DROP CONSTRAINT "post_tags_post_id_users_id_fk";
EXCEPTION
    WHEN undefined_object THEN NULL;
END $$;
--> statement-breakpoint

DO $$ BEGIN
    ALTER TABLE "post_tags" DROP CONSTRAINT "post_tags_tag_id_users_id_fk";
EXCEPTION
    WHEN undefined_object THEN NULL;
END $$;
--> statement-breakpoint

DO $$ BEGIN
    ALTER TABLE "tags" ALTER COLUMN "name" SET DATA TYPE varchar(200);
EXCEPTION
    WHEN undefined_column THEN NULL;
END $$;
--> statement-breakpoint

DO $$ BEGIN
    ALTER TABLE "tags" ALTER COLUMN "slug" SET DATA TYPE varchar(200);
EXCEPTION
    WHEN undefined_column THEN NULL;
END $$;
--> statement-breakpoint

DO $$ BEGIN
    ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_post_id_posts_id_fk"
    FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;
--> statement-breakpoint

DO $$ BEGIN
    ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_tag_id_tags_id_fk"
    FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;
--> statement-breakpoint
