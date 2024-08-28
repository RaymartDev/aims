/*
  Warnings:

  - You are about to drop the column `effective_to` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `effective_to` on the `department` table. All the data in the column will be lost.
  - You are about to drop the column `effective_to` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `contact_details_id` on the `supplier` table. All the data in the column will be lost.
  - Added the required column `contact_id` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modified_on` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modified_on` to the `Supplier_Contact_Details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modified_on` to the `Supplier_Status` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `supplier` DROP FOREIGN KEY `Supplier_contact_details_id_fkey`;

-- AlterTable
ALTER TABLE `company` DROP COLUMN `effective_to`,
    ADD COLUMN `effective_on` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00';

-- AlterTable
ALTER TABLE `department` DROP COLUMN `effective_to`,
    ADD COLUMN `effective_on` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00';

-- AlterTable
ALTER TABLE `employee` DROP COLUMN `effective_to`,
    ADD COLUMN `effective_on` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00';

-- AlterTable
ALTER TABLE `supplier` DROP COLUMN `contact_details_id`,
    ADD COLUMN `contact_id` INTEGER NOT NULL,
    ADD COLUMN `effective_on` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00',
    ADD COLUMN `modified_by_id` INTEGER NULL,
    ADD COLUMN `modified_on` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `supplier_contact_details` ADD COLUMN `effective_on` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00',
    ADD COLUMN `modified_by_id` INTEGER NULL,
    ADD COLUMN `modified_on` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `supplier_status` ADD COLUMN `effective_on` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00',
    ADD COLUMN `modified_by_id` INTEGER NULL,
    ADD COLUMN `modified_on` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `Supplier` ADD CONSTRAINT `Supplier_contact_id_fkey` FOREIGN KEY (`contact_id`) REFERENCES `Supplier_Contact_Details`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supplier` ADD CONSTRAINT `Supplier_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supplier_Contact_Details` ADD CONSTRAINT `Supplier_Contact_Details_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supplier_Status` ADD CONSTRAINT `Supplier_Status_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
