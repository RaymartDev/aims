/*
  Warnings:

  - Added the required column `end_warranty` to the `Material` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `material` ADD COLUMN `end_warranty` DATETIME(3) NOT NULL;
