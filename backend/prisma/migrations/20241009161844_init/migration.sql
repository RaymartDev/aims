/*
  Warnings:

  - The primary key for the `release_detail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Release_Detail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `release_detail` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
