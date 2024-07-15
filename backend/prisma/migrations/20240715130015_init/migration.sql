/*
  Warnings:

  - Added the required column `modified_on` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modified_on` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modified_on` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `company` ADD COLUMN `effective_to` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00',
    ADD COLUMN `modified_by_id` INTEGER NULL,
    ADD COLUMN `modified_on` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `department` ADD COLUMN `effective_to` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00',
    ADD COLUMN `modified_by_id` INTEGER NULL,
    ADD COLUMN `modified_on` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `employee` ADD COLUMN `effective_to` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00',
    ADD COLUMN `modified_by_id` INTEGER NULL,
    ADD COLUMN `modified_on` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Supplier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `supplier_code` VARCHAR(191) NOT NULL,
    `company_id` INTEGER NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `contract_term` VARCHAR(191) NOT NULL,
    `tin_number` VARCHAR(191) NOT NULL,
    `status_id` INTEGER NOT NULL,
    `contact_details_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SupplierContactDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contact_person` VARCHAR(191) NOT NULL,
    `business_tel` VARCHAR(191) NOT NULL,
    `email_address` VARCHAR(191) NOT NULL,
    `telefax_number` VARCHAR(191) NOT NULL,
    `zip_code` VARCHAR(191) NOT NULL,
    `mobile_number` VARCHAR(191) NOT NULL,
    `city_town` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `remarks` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SupplierStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Department` ADD CONSTRAINT `Department_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supplier` ADD CONSTRAINT `Supplier_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supplier` ADD CONSTRAINT `Supplier_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `SupplierStatus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supplier` ADD CONSTRAINT `Supplier_contact_details_id_fkey` FOREIGN KEY (`contact_details_id`) REFERENCES `SupplierContactDetails`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
