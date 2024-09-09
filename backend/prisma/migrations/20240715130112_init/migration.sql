/*
  Warnings:

  - You are about to drop the `suppliercontactdetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `supplierstatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `supplier` DROP FOREIGN KEY `Supplier_contact_details_id_fkey`;

-- DropForeignKey
ALTER TABLE `supplier` DROP FOREIGN KEY `Supplier_status_id_fkey`;

-- DropTable
DROP TABLE `suppliercontactdetails`;

-- DropTable
DROP TABLE `supplierstatus`;

-- CreateTable
CREATE TABLE `Supplier_Contact_Details` (
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
CREATE TABLE `Supplier_Status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Supplier` ADD CONSTRAINT `Supplier_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `Supplier_Status`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supplier` ADD CONSTRAINT `Supplier_contact_details_id_fkey` FOREIGN KEY (`contact_details_id`) REFERENCES `Supplier_Contact_Details`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
