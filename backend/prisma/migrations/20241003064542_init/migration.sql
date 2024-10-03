/*
  Warnings:

  - You are about to drop the column `date_entry` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `end_warranty` on the `delivery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `delivery` DROP COLUMN `date_entry`,
    DROP COLUMN `end_warranty`;
