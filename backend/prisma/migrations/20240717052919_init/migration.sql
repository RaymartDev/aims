/*
  Warnings:

  - Added the required column `role_id` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employee` ADD COLUMN `role_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `UserRole` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `effective_on` DATETIME(3) NOT NULL DEFAULT '2099-12-01T00:00:00+00:00',
    `modified_on` DATETIME(3) NOT NULL,
    `modified_by_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `UserRole`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
