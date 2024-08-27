/*
  Warnings:

  - You are about to drop the column `effective_on` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `effective_on` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `effective_on` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `employee` DROP COLUMN `effective_on`,
    ADD COLUMN `effective_from` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `effective_to` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00';

-- AlterTable
ALTER TABLE `store` DROP COLUMN `effective_on`,
    ADD COLUMN `effective_from` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `effective_to` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00';

-- AlterTable
ALTER TABLE `user` DROP COLUMN `effective_on`,
    ADD COLUMN `effective_from` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `effective_to` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00';
