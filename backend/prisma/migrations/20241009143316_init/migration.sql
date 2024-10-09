/*
  Warnings:

  - You are about to drop the column `received_by_id` on the `release` table. All the data in the column will be lost.
  - You are about to drop the column `received_date` on the `release` table. All the data in the column will be lost.
  - You are about to drop the column `shipped_by_id` on the `release` table. All the data in the column will be lost.
  - The primary key for the `release_detail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `release_number` on the `release_detail` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - Added the required column `requestor_id` to the `Release` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `release` DROP FOREIGN KEY `Release_received_by_id_fkey`;

-- DropForeignKey
ALTER TABLE `release` DROP FOREIGN KEY `Release_shipped_by_id_fkey`;

-- DropForeignKey
ALTER TABLE `release_detail` DROP FOREIGN KEY `Release_Detail_release_number_fkey`;

-- DropIndex
DROP INDEX `Release_release_number_key` ON `release`;

-- AlterTable
ALTER TABLE `release` DROP COLUMN `received_by_id`,
    DROP COLUMN `received_date`,
    DROP COLUMN `shipped_by_id`,
    ADD COLUMN `release_receiver_id` INTEGER NULL,
    ADD COLUMN `release_supplier_id` INTEGER NULL,
    ADD COLUMN `requestor_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `release_detail` DROP PRIMARY KEY,
    MODIFY `release_number` INTEGER NOT NULL,
    ADD PRIMARY KEY (`release_number`, `material_id`);

-- CreateTable
CREATE TABLE `Release_Supplier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_no` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cost_center_code` VARCHAR(191) NOT NULL,
    `department_id` INTEGER NOT NULL,
    `company_id` INTEGER NOT NULL,
    `supplied_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Release_Receiver` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_no` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cost_center_code` VARCHAR(191) NOT NULL,
    `department_id` INTEGER NOT NULL,
    `company_id` INTEGER NOT NULL,
    `receive_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Release_Detail` ADD CONSTRAINT `Release_Detail_release_number_fkey` FOREIGN KEY (`release_number`) REFERENCES `Release`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Release_Supplier` ADD CONSTRAINT `Release_Supplier_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Release_Supplier` ADD CONSTRAINT `Release_Supplier_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Release_Receiver` ADD CONSTRAINT `Release_Receiver_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Release_Receiver` ADD CONSTRAINT `Release_Receiver_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Release` ADD CONSTRAINT `Release_release_supplier_id_fkey` FOREIGN KEY (`release_supplier_id`) REFERENCES `Release_Supplier`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Release` ADD CONSTRAINT `Release_release_receiver_id_fkey` FOREIGN KEY (`release_receiver_id`) REFERENCES `Release_Receiver`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Release` ADD CONSTRAINT `Release_requestor_id_fkey` FOREIGN KEY (`requestor_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
