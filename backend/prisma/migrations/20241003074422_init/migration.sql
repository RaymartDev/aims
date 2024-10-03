/*
  Warnings:

  - A unique constraint covering the columns `[material_id]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Inventory_material_id_key` ON `Inventory`(`material_id`);
