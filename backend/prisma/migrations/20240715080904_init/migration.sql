/*
  Warnings:

  - You are about to drop the column `companyId` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `costCode` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `dateHired` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `departmentId` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `employeeNum` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `employee` table. All the data in the column will be lost.
  - Added the required column `company_id` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cost_code` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_hired` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department_id` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employee_no` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `Employee_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `Employee_departmentId_fkey`;

-- AlterTable
ALTER TABLE `employee` DROP COLUMN `companyId`,
    DROP COLUMN `costCode`,
    DROP COLUMN `dateHired`,
    DROP COLUMN `departmentId`,
    DROP COLUMN `employeeNum`,
    DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    ADD COLUMN `company_id` INTEGER NOT NULL,
    ADD COLUMN `cost_code` VARCHAR(191) NOT NULL,
    ADD COLUMN `date_hired` DATETIME(3) NOT NULL,
    ADD COLUMN `department_id` INTEGER NOT NULL,
    ADD COLUMN `employee_no` VARCHAR(191) NOT NULL,
    ADD COLUMN `first_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Department`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
