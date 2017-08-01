/*
 Navicat Premium Data Transfer

 Source Server         : bear
 Source Server Type    : MySQL
 Source Server Version : 50626
 Source Host           : localhost
 Source Database       : bear

 Target Server Type    : MySQL
 Target Server Version : 50626
 File Encoding         : utf-8

 Date: 08/01/2017 14:38:05 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` char(36) COLLATE utf8_bin NOT NULL,
  `title` varchar(140) COLLATE utf8_bin NOT NULL,
  `slug` varchar(140) COLLATE utf8_bin NOT NULL,
  `content` text COLLATE utf8_bin NOT NULL,
  `excerpt` text COLLATE utf8_bin NOT NULL,
  `userId` char(36) COLLATE utf8_bin NOT NULL,
  `published` tinyint(1) DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `article_title_unique` (`title`),
  UNIQUE KEY `article_slug_unique` (`slug`),
  KEY `article_userid_foreign` (`userId`),
  KEY `article_slug_index` (`slug`),
  KEY `article_published_index` (`published`),
  KEY `article_createdat_index` (`createdAt`),
  CONSTRAINT `article_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Records of `article`
-- ----------------------------
BEGIN;
INSERT INTO `article` VALUES ('5c9ed236-79f0-4ff7-93bd-2815f06c74b4', 'Just Another Post', 'just-another-post', '<h1>Lorem ipsum dolor sit amet.</h1>\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis sapien in est aliquam lacinia. Donec fringilla odio nulla, sagittis egestas dolor bibendum ut. Proin eget massa mattis, dictum enim vitae, facilisis eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum imperdiet varius ante. Maecenas sit amet luctus sapien, quis aliquet purus. Cras malesuada quam a dui pretium fermentum. Quisque tempor interdum quam, eu lacinia turpis interdum id. Curabitur non mauris lobortis, mattis nulla id, viverra nisi. Phasellus eget porttitor lorem. Quisque facilisis nec arcu eu fringilla. Vivamus elit ipsum, viverra eu maximus a, venenatis nec nibh.Suspendisse iaculis auctor fermentum. Sed suscipit ante nisl, nec iaculis magna consequat vel. Quisque viverra est a justo egestas, euismod egestas metus hendrerit.</p>\n<p><br></p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '1b062e26-df71-48ce-b363-4ae9b966e7a0', '0', '2017-07-28 11:43:11', '2017-07-28 11:44:06', null);
COMMIT;

-- ----------------------------
--  Table structure for `article_tag`
-- ----------------------------
DROP TABLE IF EXISTS `article_tag`;
CREATE TABLE `article_tag` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `articleId` char(36) COLLATE utf8_bin NOT NULL,
  `tagId` int(10) unsigned NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `article_tag_articleid_tagid_unique` (`articleId`,`tagId`),
  KEY `article_tag_tagid_foreign` (`tagId`),
  CONSTRAINT `article_tag_articleid_foreign` FOREIGN KEY (`articleId`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `article_tag_tagid_foreign` FOREIGN KEY (`tagId`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Records of `article_tag`
-- ----------------------------
BEGIN;
INSERT INTO `article_tag` VALUES ('1', '5c9ed236-79f0-4ff7-93bd-2815f06c74b4', '1', '2017-07-28 11:48:38', null);
COMMIT;

-- ----------------------------
--  Table structure for `role`
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8_bin NOT NULL,
  `name` varchar(64) COLLATE utf8_bin NOT NULL,
  `image` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `description` text COLLATE utf8_bin,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_name_unique` (`name`),
  KEY `role_name_index` (`name`),
  KEY `role_uuid_index` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Records of `role`
-- ----------------------------
BEGIN;
INSERT INTO `role` VALUES ('1', '8cd3e8c9-2592-42ba-b8d5-2b3b96e53e68', 'Admin', null, 'Complete control over the CMS', '2017-07-28 11:44:32', null);
COMMIT;

-- ----------------------------
--  Table structure for `setting`
-- ----------------------------
DROP TABLE IF EXISTS `setting`;
CREATE TABLE `setting` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(100) COLLATE utf8_bin NOT NULL,
  `label` varchar(100) COLLATE utf8_bin NOT NULL,
  `value` varchar(255) COLLATE utf8_bin NOT NULL,
  `description` varchar(255) COLLATE utf8_bin NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `setting_key_index` (`key`),
  KEY `setting_value_index` (`value`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Records of `setting`
-- ----------------------------
BEGIN;
INSERT INTO `setting` VALUES ('1', 'siteName', 'Site Name', 'Bear', 'The website name.', '2017-07-28 11:45:18', null);
COMMIT;

-- ----------------------------
--  Table structure for `tag`
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8_bin NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `description` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tag_name_unique` (`name`),
  KEY `tag_name_index` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Records of `tag`
-- ----------------------------
BEGIN;
INSERT INTO `tag` VALUES ('1', '7b7cf186-30bf-4607-9a85-752ee174d69d', 'javascript', 'Something something JS', '2017-07-28 11:46:02', '2017-07-28 11:54:15', null);
COMMIT;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` char(36) COLLATE utf8_bin NOT NULL,
  `email` varchar(100) COLLATE utf8_bin NOT NULL,
  `password` varchar(64) COLLATE utf8_bin NOT NULL,
  `username` varchar(115) COLLATE utf8_bin NOT NULL,
  `avatarUrl` varchar(255) COLLATE utf8_bin DEFAULT 'https://avatars0.githubusercontent.com/u/1026216?v=4&s=460',
  `website` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `verified` tinyint(1) DEFAULT '0',
  `address` text COLLATE utf8_bin,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_email_unique` (`email`),
  UNIQUE KEY `user_username_unique` (`username`),
  KEY `user_username_index` (`username`),
  KEY `user_verified_index` (`verified`),
  KEY `user_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('1b062e26-df71-48ce-b363-4ae9b966e7a0', 'admin@gmail.com', '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka', 'moocss', 'https://avatars0.githubusercontent.com/u/1026216?v=4&s=460', null, '0', null, '2017-07-28 11:40:39', null, null);
COMMIT;

-- ----------------------------
--  Table structure for `user_role`
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` char(36) COLLATE utf8_bin NOT NULL,
  `roleId` int(10) unsigned NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_role_userid_roleid_unique` (`userId`,`roleId`),
  KEY `user_role_roleid_foreign` (`roleId`),
  CONSTRAINT `user_role_roleid_foreign` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_role_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Records of `user_role`
-- ----------------------------
BEGIN;
INSERT INTO `user_role` VALUES ('1', '1b062e26-df71-48ce-b363-4ae9b966e7a0', '1', '2017-07-28 11:42:49', null);
COMMIT;

-- ----------------------------
--  Table structure for `user_social_media`
-- ----------------------------
DROP TABLE IF EXISTS `user_social_media`;
CREATE TABLE `user_social_media` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` char(36) COLLATE utf8_bin NOT NULL,
  `googleUrl` varchar(255) COLLATE utf8_bin NOT NULL,
  `githubUrl` varchar(255) COLLATE utf8_bin NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Records of `user_social_media`
-- ----------------------------
BEGIN;
INSERT INTO `user_social_media` VALUES ('1', '1b062e26-df71-48ce-b363-4ae9b966e7a0', 'https://google.com', 'https://github.com', '2017-07-28 11:47:11', null);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
