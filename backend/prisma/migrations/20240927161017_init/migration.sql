/*
  Warnings:

  - You are about to alter the column `status` on the `release` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `release_detail` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `release_detail` DROP FOREIGN KEY `Release_Detail_release_number_fkey`;

-- AlterTable
ALTER TABLE `release` MODIFY `release_number` BIGINT NOT NULL,
    MODIFY `status` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `release_detail` DROP PRIMARY KEY,
    MODIFY `release_number` BIGINT NOT NULL,
    ADD PRIMARY KEY (`release_number`, `material_id`);

-- CreateIndex
CREATE INDEX `Employee_first_name_last_name_employee_no_idx` ON `Employee`(`first_name`, `last_name`, `employee_no`);

-- CreateIndex
CREATE INDEX `Material_item_code_description_material_code_idx` ON `Material`(`item_code`, `description`, `material_code`);

-- CreateIndex
CREATE INDEX `Release_release_number_idx` ON `Release`(`release_number`);

-- CreateIndex
CREATE INDEX `Release_Detail_release_number_idx` ON `Release_Detail`(`release_number`);

-- CreateIndex
CREATE INDEX `Store_name_cost_center_code_idx` ON `Store`(`name`, `cost_center_code`);

-- CreateIndex
CREATE INDEX `Supplier_supplier_code_idx` ON `Supplier`(`supplier_code`);

-- AddForeignKey
ALTER TABLE `Release_Detail` ADD CONSTRAINT `Release_Detail_release_number_fkey` FOREIGN KEY (`release_number`) REFERENCES `Release`(`release_number`) ON DELETE RESTRICT ON UPDATE CASCADE;
