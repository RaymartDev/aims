/*
  Warnings:

  - You are about to drop the column `maximum_stock` on the `material` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `material` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `material` DROP COLUMN `maximum_stock`,
    DROP COLUMN `unit`;

-- CreateIndex
CREATE INDEX `Material_Category_description_idx` ON `Material_Category`(`description`);

-- CreateIndex
CREATE INDEX `Material_Type_description_idx` ON `Material_Type`(`description`);
