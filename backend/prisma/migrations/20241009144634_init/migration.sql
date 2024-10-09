/*
  Warnings:

  - You are about to alter the column `release_number` on the `release` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `release` MODIFY `release_number` INTEGER NOT NULL;
