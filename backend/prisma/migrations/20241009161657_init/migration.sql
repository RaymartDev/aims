/*
  Warnings:

  - The primary key for the `release_detail` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `release_detail` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`release_number`);
