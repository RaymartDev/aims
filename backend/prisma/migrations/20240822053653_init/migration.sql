/*
  Warnings:

  - You are about to drop the column `effective_on` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `effective_on` on the `department` table. All the data in the column will be lost.
  - You are about to drop the column `effective_on` on the `supplier` table. All the data in the column will be lost.
  - You are about to drop the column `effective_on` on the `supplier_contact_details` table. All the data in the column will be lost.
  - You are about to drop the column `effective_on` on the `supplier_status` table. All the data in the column will be lost.
  - You are about to drop the column `effective_on` on the `userrole` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `company` DROP COLUMN `effective_on`,
    ADD COLUMN `effective_from` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `effective_to` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00';

-- AlterTable
ALTER TABLE `department` DROP COLUMN `effective_on`,
    ADD COLUMN `effective_from` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `effective_to` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00';

-- AlterTable
ALTER TABLE `supplier` DROP COLUMN `effective_on`,
    ADD COLUMN `effective_from` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `effective_to` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00';

-- AlterTable
ALTER TABLE `supplier_contact_details` DROP COLUMN `effective_on`,
    ADD COLUMN `effective_from` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `effective_to` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00';

-- AlterTable
ALTER TABLE `supplier_status` DROP COLUMN `effective_on`,
    ADD COLUMN `effective_from` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `effective_to` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00';

-- AlterTable
ALTER TABLE `userrole` DROP COLUMN `effective_on`,
    ADD COLUMN `effective_from` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `effective_to` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00';
