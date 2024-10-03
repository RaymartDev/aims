/*
  Warnings:

  - Added the required column `capex_number` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery_receipt_number` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_order_number` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchase_request_number` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `delivery` ADD COLUMN `capex_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `delivery_receipt_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `product_order_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `purchase_request_number` VARCHAR(191) NOT NULL;
