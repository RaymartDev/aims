/*
  Warnings:

  - You are about to drop the column `status_id` on the `supplier` table. All the data in the column will be lost.
  - You are about to drop the `supplier_status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `supplier` DROP FOREIGN KEY `Supplier_status_id_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_status` DROP FOREIGN KEY `Supplier_Status_modified_by_id_fkey`;

-- AlterTable
ALTER TABLE `supplier` DROP COLUMN `status_id`;

-- DropTable
DROP TABLE `supplier_status`;

-- CreateTable
CREATE TABLE `Material` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `material_code` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `item_code` VARCHAR(191) NOT NULL,
    `unit` VARCHAR(191) NOT NULL,
    `brand_model` VARCHAR(191) NOT NULL,
    `material_required_yn` CHAR(1) NOT NULL,
    `material_type` VARCHAR(191) NOT NULL,
    `cost` INTEGER NOT NULL,
    `maximum_stock` INTEGER NOT NULL,
    `unit_of_measure` VARCHAR(191) NOT NULL,
    `item_specification` VARCHAR(191) NOT NULL,
    `serial_number` VARCHAR(191) NOT NULL,
    `date_entry` DATETIME(3) NOT NULL,
    `effective_from` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `effective_to` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00',
    `modified_on` DATETIME(3) NOT NULL,
    `modified_by_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inventory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `material_id` INTEGER NOT NULL,
    `total_balance` INTEGER NOT NULL,
    `remaining_balance` INTEGER NOT NULL,
    `quantity_out` INTEGER NOT NULL,
    `available` INTEGER NOT NULL,
    `return` INTEGER NOT NULL,
    `effective_from` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `effective_to` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00',
    `modified_on` DATETIME(3) NOT NULL,
    `modified_by_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Delivery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `supplier_user_id` INTEGER NOT NULL,
    `material_id` INTEGER NOT NULL,
    `remarks` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `requestor_user_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `date_entry` DATETIME(3) NOT NULL,
    `end_warranty` DATETIME(3) NOT NULL,
    `effective_from` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `effective_to` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00',
    `modified_on` DATETIME(3) NOT NULL,
    `modified_by_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Release_Detail` (
    `release_number` INTEGER NOT NULL,
    `material_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `remarks` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`release_number`, `material_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Release` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `release_number` INTEGER NOT NULL,
    `shipped_by_id` INTEGER NOT NULL,
    `received_by_id` INTEGER NOT NULL,
    `received_date` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `remarks` VARCHAR(191) NOT NULL,
    `effective_from` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `effective_to` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00',
    `modified_on` DATETIME(3) NOT NULL,
    `modified_by_id` INTEGER NULL,

    UNIQUE INDEX `Release_release_number_key`(`release_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Material` ADD CONSTRAINT `Material_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_material_id_fkey` FOREIGN KEY (`material_id`) REFERENCES `Material`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Delivery` ADD CONSTRAINT `Delivery_supplier_user_id_fkey` FOREIGN KEY (`supplier_user_id`) REFERENCES `Supplier`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Delivery` ADD CONSTRAINT `Delivery_material_id_fkey` FOREIGN KEY (`material_id`) REFERENCES `Material`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Delivery` ADD CONSTRAINT `Delivery_requestor_user_id_fkey` FOREIGN KEY (`requestor_user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Delivery` ADD CONSTRAINT `Delivery_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Delivery` ADD CONSTRAINT `Delivery_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Release_Detail` ADD CONSTRAINT `Release_Detail_material_id_fkey` FOREIGN KEY (`material_id`) REFERENCES `Material`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Release_Detail` ADD CONSTRAINT `Release_Detail_release_number_fkey` FOREIGN KEY (`release_number`) REFERENCES `Release`(`release_number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Release` ADD CONSTRAINT `Release_shipped_by_id_fkey` FOREIGN KEY (`shipped_by_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Release` ADD CONSTRAINT `Release_received_by_id_fkey` FOREIGN KEY (`received_by_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Release` ADD CONSTRAINT `Release_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
