/*
  Warnings:

  - You are about to drop the column `supplied_date` on the `release_shipped` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `release_shipped` DROP COLUMN `supplied_date`,
    ADD COLUMN `shipped_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
