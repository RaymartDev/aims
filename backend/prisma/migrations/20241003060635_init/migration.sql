/*
  Warnings:

  - Added the required column `requestor_id` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_type_id` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `delivery` ADD COLUMN `requestor_id` INTEGER NOT NULL,
    ADD COLUMN `user_type_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `UserType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `effective_from` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `effective_to` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00',
    `modified_on` DATETIME(3) NOT NULL,
    `modified_by_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserType` ADD CONSTRAINT `UserType_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Delivery` ADD CONSTRAINT `Delivery_user_type_id_fkey` FOREIGN KEY (`user_type_id`) REFERENCES `UserType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
