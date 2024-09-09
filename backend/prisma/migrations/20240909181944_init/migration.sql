/*
  Warnings:

  - You are about to drop the column `item_specification` on the `material` table. All the data in the column will be lost.
  - Added the required column `category` to the `Material` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `material` DROP COLUMN `item_specification`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Material_Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `effective_from` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `effective_to` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00',
    `modified_on` DATETIME(3) NOT NULL,
    `modified_by_id` INTEGER NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Material_Type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `effective_from` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `effective_to` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00',
    `modified_on` DATETIME(3) NOT NULL,
    `modified_by_id` INTEGER NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Material_Category` ADD CONSTRAINT `Material_Category_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Material_Type` ADD CONSTRAINT `Material_Type_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
