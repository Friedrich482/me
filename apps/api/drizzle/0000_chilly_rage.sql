DO $$ BEGIN
    CREATE TYPE "public"."role" AS ENUM('admin', 'user');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;
--> statement-breakpoint

DO $$ BEGIN
	CREATE TYPE "public"."status" AS ENUM('draft', 'published');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" "role",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "posts" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"content" text NOT NULL,
	"status" "status",
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"author_id" varchar(26) NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "media" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"filename" text NOT NULL,
	"path" text NOT NULL,
	"size" integer NOT NULL,
	"mime_type" varchar(100) NOT NULL,
	"uploaded_at" timestamp DEFAULT now(),
	"post_id" varchar(26) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS  "post_tags" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"post_id" varchar(26) NOT NULL,
	"tag_id" varchar(26) NOT NULL
);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "tags" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tags_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint

DO $$ BEGIN
	ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk"
	FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;
--> statement-breakpoint

DO $$ BEGIN
	ALTER TABLE "media" ADD CONSTRAINT "media_post_id_posts_id_fk"
	FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;
--> statement-breakpoint

DO $$ BEGIN
	ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_post_id_users_id_fk" 
	FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;
--> statement-breakpoint

DO $$ BEGIN
	ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_tag_id_users_id_fk"
	FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;
--> statement-breakpoint
