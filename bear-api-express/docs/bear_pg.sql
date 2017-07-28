/*
 Navicat Premium Data Transfer

 Source Server         : bear
 Source Server Type    : PostgreSQL
 Source Server Version : 90603
 Source Host           : localhost
 Source Database       : bear
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 90603
 File Encoding         : utf-8

 Date: 07/28/2017 11:35:27 AM
*/

-- ----------------------------
--  Sequence structure for article_tag_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."article_tag_id_seq";
CREATE SEQUENCE "public"."article_tag_id_seq" INCREMENT 1 START 1 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "public"."article_tag_id_seq" OWNER TO "postgres";

-- ----------------------------
--  Sequence structure for role_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."role_id_seq";
CREATE SEQUENCE "public"."role_id_seq" INCREMENT 1 START 8 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "public"."role_id_seq" OWNER TO "postgres";

-- ----------------------------
--  Sequence structure for setting_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."setting_id_seq";
CREATE SEQUENCE "public"."setting_id_seq" INCREMENT 1 START 1 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "public"."setting_id_seq" OWNER TO "postgres";

-- ----------------------------
--  Sequence structure for tag_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tag_id_seq";
CREATE SEQUENCE "public"."tag_id_seq" INCREMENT 1 START 1 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "public"."tag_id_seq" OWNER TO "postgres";

-- ----------------------------
--  Sequence structure for user_role_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."user_role_id_seq";
CREATE SEQUENCE "public"."user_role_id_seq" INCREMENT 1 START 1 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "public"."user_role_id_seq" OWNER TO "postgres";

-- ----------------------------
--  Sequence structure for user_social_media_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."user_social_media_id_seq";
CREATE SEQUENCE "public"."user_social_media_id_seq" INCREMENT 1 START 1 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "public"."user_social_media_id_seq" OWNER TO "postgres";

-- ----------------------------
--  Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS "public"."article";
CREATE TABLE "public"."article" (
	"id" uuid NOT NULL,
	"title" varchar(140) NOT NULL COLLATE "default",
	"slug" varchar(140) NOT NULL COLLATE "default",
	"content" text NOT NULL COLLATE "default",
	"excerpt" text NOT NULL COLLATE "default",
	"userId" uuid NOT NULL,
	"published" bool DEFAULT false,
	"createdAt" timestamp(6) WITH TIME ZONE NOT NULL DEFAULT now(),
	"updatedAt" timestamp(6) WITH TIME ZONE,
	"deletedAt" timestamp(6) WITH TIME ZONE
)
WITH (OIDS=FALSE);
ALTER TABLE "public"."article" OWNER TO "postgres";

-- ----------------------------
--  Records of article
-- ----------------------------
BEGIN;
INSERT INTO "public"."article" VALUES ('5c9ed236-79f0-4ff7-93bd-2815f06c74b4', 'Just Another Post', 'just-another-post', '<h1>Lorem ipsum dolor sit amet.</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis sapien in est aliquam lacinia. Donec fringilla odio nulla, sagittis egestas dolor bibendum ut. Proin eget massa mattis, dictum enim vitae, facilisis eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum imperdiet varius ante. Maecenas sit amet luctus sapien, quis aliquet purus. Cras malesuada quam a dui pretium fermentum. Quisque tempor interdum quam, eu lacinia turpis interdum id. Curabitur non mauris lobortis, mattis nulla id, viverra nisi. Phasellus eget porttitor lorem. Quisque facilisis nec arcu eu fringilla. Vivamus elit ipsum, viverra eu maximus a, venenatis nec nibh.Suspendisse iaculis auctor fermentum. Sed suscipit ante nisl, nec iaculis magna consequat vel. Quisque viverra est a justo egestas, euismod egestas metus hendrerit.</p>
<p><br></p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '1b062e26-df71-48ce-b363-4ae9b966e7a0', 'f', '2017-07-28 11:09:52+08', '2017-07-28 11:09:54+08', null);
COMMIT;

-- ----------------------------
--  Table structure for article_tag
-- ----------------------------
DROP TABLE IF EXISTS "public"."article_tag";
CREATE TABLE "public"."article_tag" (
	"id" int4 NOT NULL DEFAULT nextval('article_tag_id_seq'::regclass),
	"articleId" uuid NOT NULL,
	"tagId" int4 NOT NULL,
	"createdAt" timestamp(6) WITH TIME ZONE NOT NULL DEFAULT now(),
	"updatedAt" timestamp(6) WITH TIME ZONE
)
WITH (OIDS=FALSE);
ALTER TABLE "public"."article_tag" OWNER TO "postgres";

-- ----------------------------
--  Records of article_tag
-- ----------------------------
BEGIN;
INSERT INTO "public"."article_tag" VALUES ('1', '5c9ed236-79f0-4ff7-93bd-2815f06c74b4', '1', '2017-07-28 11:10:39+08', null);
COMMIT;

-- ----------------------------
--  Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS "public"."user";
CREATE TABLE "public"."user" (
	"id" uuid NOT NULL,
	"email" varchar(100) NOT NULL COLLATE "default",
	"password" varchar(64) NOT NULL COLLATE "default",
	"username" varchar(115) NOT NULL COLLATE "default",
	"avatarUrl" varchar(255) DEFAULT 'https://avatars0.githubusercontent.com/u/1026216$1v=4&s=460'::character varying COLLATE "default",
	"website" varchar(100) COLLATE "default",
	"verified" bool DEFAULT false,
	"createdAt" timestamp(6) WITH TIME ZONE NOT NULL DEFAULT now(),
	"updatedAt" timestamp(6) WITH TIME ZONE,
	"deletedAt" timestamp(6) WITH TIME ZONE
)
WITH (OIDS=FALSE);
ALTER TABLE "public"."user" OWNER TO "postgres";

-- ----------------------------
--  Records of user
-- ----------------------------
BEGIN;
INSERT INTO "public"."user" VALUES ('1b062e26-df71-48ce-b363-4ae9b966e7a0', 'admin@gmail.com', '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka', 'moocss', 'https://avatars0.githubusercontent.com/u/1026216$1v=4&s=460', null, 'f', '2017-07-28 11:04:59.040887+08', null, null);
COMMIT;

-- ----------------------------
--  Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS "public"."role";
CREATE TABLE "public"."role" (
	"id" int4 NOT NULL DEFAULT nextval('role_id_seq'::regclass),
	"uuid" uuid NOT NULL,
	"name" varchar(64) NOT NULL COLLATE "default",
	"image" varchar(200) COLLATE "default",
	"description" text COLLATE "default",
	"createdAt" timestamp(6) WITH TIME ZONE NOT NULL DEFAULT now(),
	"updatedAt" timestamp(6) WITH TIME ZONE
)
WITH (OIDS=FALSE);
ALTER TABLE "public"."role" OWNER TO "postgres";

-- ----------------------------
--  Records of role
-- ----------------------------
BEGIN;
INSERT INTO "public"."role" VALUES ('1', '8cd3e8c9-2592-42ba-b8d5-2b3b96e53e68', 'Admin', null, 'Complete control over the CMS', '2017-05-27 13:25:46.636308+08', null);
COMMIT;

-- ----------------------------
--  Table structure for user_social_media
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_social_media";
CREATE TABLE "public"."user_social_media" (
	"id" int4 NOT NULL DEFAULT nextval('user_social_media_id_seq'::regclass),
	"userId" uuid NOT NULL,
	"googleUrl" varchar(255) NOT NULL COLLATE "default",
	"githubUrl" varchar(255) NOT NULL COLLATE "default",
	"createdAt" timestamp(6) WITH TIME ZONE NOT NULL DEFAULT now(),
	"updatedAt" timestamp(6) WITH TIME ZONE
)
WITH (OIDS=FALSE);
ALTER TABLE "public"."user_social_media" OWNER TO "postgres";

-- ----------------------------
--  Records of user_social_media
-- ----------------------------
BEGIN;
INSERT INTO "public"."user_social_media" VALUES ('1', '1b062e26-df71-48ce-b363-4ae9b966e7a0', 'https://github.com', 'https://google.com', '2017-05-27 13:25:46.673239+08', null);
COMMIT;

-- ----------------------------
--  Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS "public"."tag";
CREATE TABLE "public"."tag" (
	"id" int4 NOT NULL DEFAULT nextval('tag_id_seq'::regclass),
	"uuid" uuid NOT NULL,
	"name" varchar(255) NOT NULL COLLATE "default",
	"description" varchar(255) COLLATE "default",
	"createdAt" timestamp(6) WITH TIME ZONE NOT NULL DEFAULT now(),
	"updatedAt" timestamp(6) WITH TIME ZONE,
	"deletedAt" timestamp(6) WITH TIME ZONE
)
WITH (OIDS=FALSE);
ALTER TABLE "public"."tag" OWNER TO "postgres";

-- ----------------------------
--  Records of tag
-- ----------------------------
BEGIN;
INSERT INTO "public"."tag" VALUES ('1', '7b7cf186-30bf-4607-9a85-752ee174d69d', 'javascript', 'Something something JS', '2017-05-27 13:25:46.691008+08', null, null);
COMMIT;

-- ----------------------------
--  Table structure for setting
-- ----------------------------
DROP TABLE IF EXISTS "public"."setting";
CREATE TABLE "public"."setting" (
	"id" int4 NOT NULL DEFAULT nextval('setting_id_seq'::regclass),
	"key" varchar(100) NOT NULL COLLATE "default",
	"label" varchar(100) NOT NULL COLLATE "default",
	"value" varchar(255) NOT NULL COLLATE "default",
	"description" varchar(255) NOT NULL COLLATE "default",
	"createdAt" timestamp(6) WITH TIME ZONE NOT NULL DEFAULT now(),
	"updatedAt" timestamp(6) WITH TIME ZONE
)
WITH (OIDS=FALSE);
ALTER TABLE "public"."setting" OWNER TO "postgres";

-- ----------------------------
--  Records of setting
-- ----------------------------
BEGIN;
INSERT INTO "public"."setting" VALUES ('1', 'siteName', 'Site Name', 'Bear', 'The website name.', '2017-05-27 13:25:46.832685+08', null);
COMMIT;

-- ----------------------------
--  Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_role";
CREATE TABLE "public"."user_role" (
	"id" int4 NOT NULL DEFAULT nextval('user_role_id_seq'::regclass),
	"userId" uuid NOT NULL,
	"roleId" int4 NOT NULL,
	"createdAt" timestamp(6) WITH TIME ZONE NOT NULL DEFAULT now(),
	"updatedAt" timestamp(6) WITH TIME ZONE
)
WITH (OIDS=FALSE);
ALTER TABLE "public"."user_role" OWNER TO "postgres";

-- ----------------------------
--  Records of user_role
-- ----------------------------
BEGIN;
INSERT INTO "public"."user_role" VALUES ('1', '1b062e26-df71-48ce-b363-4ae9b966e7a0', '1', '2017-05-27 13:25:46.789048+08', null);
COMMIT;


-- ----------------------------
--  Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."article_tag_id_seq" RESTART 2 OWNED BY "article_tag"."id";
ALTER SEQUENCE "public"."role_id_seq" RESTART 9 OWNED BY "role"."id";
ALTER SEQUENCE "public"."setting_id_seq" RESTART 2 OWNED BY "setting"."id";
ALTER SEQUENCE "public"."tag_id_seq" RESTART 2 OWNED BY "tag"."id";
ALTER SEQUENCE "public"."user_role_id_seq" RESTART 2 OWNED BY "user_role"."id";
ALTER SEQUENCE "public"."user_social_media_id_seq" RESTART 2 OWNED BY "user_social_media"."id";
-- ----------------------------
--  Primary key structure for table article
-- ----------------------------
ALTER TABLE "public"."article" ADD PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Uniques structure for table article
-- ----------------------------
ALTER TABLE "public"."article" ADD CONSTRAINT "article_title_unique" UNIQUE ("title") NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "public"."article" ADD CONSTRAINT "article_slug_unique" UNIQUE ("slug") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Indexes structure for table article
-- ----------------------------
CREATE INDEX  "article_createdat_index" ON "public"."article" USING btree("createdAt" "pg_catalog"."timestamptz_ops" ASC NULLS LAST);
CREATE INDEX  "article_published_index" ON "public"."article" USING btree(published "pg_catalog"."bool_ops" ASC NULLS LAST);
CREATE INDEX  "article_slug_index" ON "public"."article" USING btree(slug COLLATE "default" "pg_catalog"."text_ops" ASC NULLS LAST);

-- ----------------------------
--  Primary key structure for table article_tag
-- ----------------------------
ALTER TABLE "public"."article_tag" ADD PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Uniques structure for table article_tag
-- ----------------------------
ALTER TABLE "public"."article_tag" ADD CONSTRAINT "article_tag_articleid_tagid_unique" UNIQUE ("articleId","tagId") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table user
-- ----------------------------
ALTER TABLE "public"."user" ADD PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Uniques structure for table user
-- ----------------------------
ALTER TABLE "public"."user" ADD CONSTRAINT "user_email_unique" UNIQUE ("email") NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "public"."user" ADD CONSTRAINT "user_username_unique" UNIQUE ("username") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Indexes structure for table user
-- ----------------------------
CREATE INDEX  "user_email_index" ON "public"."user" USING btree(email COLLATE "default" "pg_catalog"."text_ops" ASC NULLS LAST);
CREATE INDEX  "user_username_index" ON "public"."user" USING btree(username COLLATE "default" "pg_catalog"."text_ops" ASC NULLS LAST);
CREATE INDEX  "user_verified_index" ON "public"."user" USING btree(verified "pg_catalog"."bool_ops" ASC NULLS LAST);

-- ----------------------------
--  Primary key structure for table role
-- ----------------------------
ALTER TABLE "public"."role" ADD PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Uniques structure for table role
-- ----------------------------
ALTER TABLE "public"."role" ADD CONSTRAINT "role_name_unique" UNIQUE ("name") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Indexes structure for table role
-- ----------------------------
CREATE INDEX  "role_name_index" ON "public"."role" USING btree("name" COLLATE "default" "pg_catalog"."text_ops" ASC NULLS LAST);
CREATE INDEX  "role_uuid_index" ON "public"."role" USING btree(uuid "pg_catalog"."uuid_ops" ASC NULLS LAST);

-- ----------------------------
--  Primary key structure for table user_social_media
-- ----------------------------
ALTER TABLE "public"."user_social_media" ADD PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table tag
-- ----------------------------
ALTER TABLE "public"."tag" ADD PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Uniques structure for table tag
-- ----------------------------
ALTER TABLE "public"."tag" ADD CONSTRAINT "tag_name_unique" UNIQUE ("name") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Indexes structure for table tag
-- ----------------------------
CREATE INDEX  "tag_name_index" ON "public"."tag" USING btree("name" COLLATE "default" "pg_catalog"."text_ops" ASC NULLS LAST);

-- ----------------------------
--  Primary key structure for table setting
-- ----------------------------
ALTER TABLE "public"."setting" ADD PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Indexes structure for table setting
-- ----------------------------
CREATE INDEX  "setting_key_index" ON "public"."setting" USING btree("key" COLLATE "default" "pg_catalog"."text_ops" ASC NULLS LAST);
CREATE INDEX  "setting_value_index" ON "public"."setting" USING btree("value" COLLATE "default" "pg_catalog"."text_ops" ASC NULLS LAST);

-- ----------------------------
--  Primary key structure for table user_role
-- ----------------------------
ALTER TABLE "public"."user_role" ADD PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Uniques structure for table user_role
-- ----------------------------
ALTER TABLE "public"."user_role" ADD CONSTRAINT "user_role_userid_roleid_unique" UNIQUE ("userId","roleId") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table article
-- ----------------------------
ALTER TABLE "public"."article" ADD CONSTRAINT "article_userid_foreign" FOREIGN KEY ("userId") REFERENCES "public"."user" ("id") ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table article_tag
-- ----------------------------
ALTER TABLE "public"."article_tag" ADD CONSTRAINT "article_tag_articleid_foreign" FOREIGN KEY ("articleId") REFERENCES "public"."article" ("id") ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "public"."article_tag" ADD CONSTRAINT "article_tag_tagid_foreign" FOREIGN KEY ("tagId") REFERENCES "public"."tag" ("id") ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table user_role
-- ----------------------------
ALTER TABLE "public"."user_role" ADD CONSTRAINT "user_role_userid_foreign" FOREIGN KEY ("userId") REFERENCES "public"."user" ("id") ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "public"."user_role" ADD CONSTRAINT "user_role_roleid_foreign" FOREIGN KEY ("roleId") REFERENCES "public"."role" ("id") ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE;
