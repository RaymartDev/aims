/*
  Warnings:

  - You are about to drop the column `category` on the `material` table. All the data in the column will be lost.
  - You are about to drop the column `material_type` on the `material` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `Material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_id` to the `Material` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `material` DROP COLUMN `category`,
    DROP COLUMN `material_type`,
    ADD COLUMN `category_id` INTEGER NOT NULL,
    ADD COLUMN `type_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Material` ADD CONSTRAINT `Material_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `Material_Type`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Material` ADD CONSTRAINT `Material_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Material_Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
