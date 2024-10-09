/*
  Warnings:

  - You are about to drop the column `release_supplier_id` on the `release` table. All the data in the column will be lost.
  - You are about to drop the `release_supplier` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `release` DROP FOREIGN KEY `Release_release_supplier_id_fkey`;

-- DropForeignKey
ALTER TABLE `release_supplier` DROP FOREIGN KEY `Release_Supplier_company_id_fkey`;

-- DropForeignKey
ALTER TABLE `release_supplier` DROP FOREIGN KEY `Release_Supplier_department_id_fkey`;

-- AlterTable
ALTER TABLE `release` DROP COLUMN `release_supplier_id`,
    ADD COLUMN `release_shipped_id` INTEGER NULL;

-- DropTable
DROP TABLE `release_supplier`;

-- CreateTable
CREATE TABLE `Release_Shipped` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_no` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cost_center_code` VARCHAR(191) NOT NULL,
    `department_id` INTEGER NOT NULL,
    `company_id` INTEGER NOT NULL,
    `supplied_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Release_Shipped` ADD CONSTRAINT `Release_Shipped_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Release_Shipped` ADD CONSTRAINT `Release_Shipped_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Release` ADD CONSTRAINT `Release_release_shipped_id_fkey` FOREIGN KEY (`release_shipped_id`) REFERENCES `Release_Shipped`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
