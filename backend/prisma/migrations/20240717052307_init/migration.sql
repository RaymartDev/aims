/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employee` ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Employee_username_key` ON `Employee`(`username`);
