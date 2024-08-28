/*
  Warnings:

  - You are about to drop the column `cost_code` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `role_id` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `employee` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `company` DROP FOREIGN KEY `Company_modified_by_id_fkey`;

-- DropForeignKey
ALTER TABLE `department` DROP FOREIGN KEY `Department_modified_by_id_fkey`;

-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `Employee_modified_by_id_fkey`;

-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `Employee_role_id_fkey`;

-- DropForeignKey
ALTER TABLE `supplier` DROP FOREIGN KEY `Supplier_modified_by_id_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_contact_details` DROP FOREIGN KEY `Supplier_Contact_Details_modified_by_id_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_status` DROP FOREIGN KEY `Supplier_Status_modified_by_id_fkey`;

-- DropForeignKey
ALTER TABLE `userrole` DROP FOREIGN KEY `UserRole_modified_by_id_fkey`;

-- DropIndex
DROP INDEX `Employee_username_key` ON `employee`;

-- AlterTable
ALTER TABLE `employee` DROP COLUMN `cost_code`,
    DROP COLUMN `password`,
    DROP COLUMN `role_id`,
    DROP COLUMN `username`,
    ADD COLUMN `cost_center_code` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `date_entry` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `division` VARCHAR(191) NOT NULL DEFAULT '',
    ALTER COLUMN `modified_by_id` DROP DEFAULT;

-- CreateTable
CREATE TABLE `Store` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company_id` INTEGER NOT NULL DEFAULT 1,
    `name` VARCHAR(191) NOT NULL,
    `cost_center_code` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `effective_on` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00',
    `modified_on` DATETIME(3) NOT NULL,
    `modified_by_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` INTEGER NULL,
    `store_id` INTEGER NULL,
    `role_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `department_id` INTEGER NOT NULL DEFAULT 1,
    `cost_center_code` VARCHAR(191) NOT NULL,
    `employee_no` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `effective_on` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00',
    `modified_on` DATETIME(3) NOT NULL,
    `modified_by_id` INTEGER NULL DEFAULT 1,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `Store`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `UserRole`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Department`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Department` ADD CONSTRAINT `Department_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supplier` ADD CONSTRAINT `Supplier_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supplier_Contact_Details` ADD CONSTRAINT `Supplier_Contact_Details_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supplier_Status` ADD CONSTRAINT `Supplier_Status_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
