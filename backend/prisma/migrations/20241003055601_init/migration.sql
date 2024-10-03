/*
  Warnings:

  - You are about to drop the column `requestor_user_id` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `supplier_user_id` on the `delivery` table. All the data in the column will be lost.
  - Added the required column `supplier_id` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Made the column `asset_number` on table `material` required. This step will fail if there are existing NULL values in that column.
  - Made the column `serial_number` on table `material` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `delivery` DROP FOREIGN KEY `Delivery_requestor_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `delivery` DROP FOREIGN KEY `Delivery_supplier_user_id_fkey`;

-- AlterTable
ALTER TABLE `delivery` DROP COLUMN `requestor_user_id`,
    DROP COLUMN `supplier_user_id`,
    ADD COLUMN `supplier_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `material` MODIFY `asset_number` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `serial_number` VARCHAR(191) NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE `Delivery` ADD CONSTRAINT `Delivery_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `Supplier`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
