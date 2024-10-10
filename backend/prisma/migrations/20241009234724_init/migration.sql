/*
  Warnings:

  - Added the required column `requestor_id` to the `Return` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `return` ADD COLUMN `requestor_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Return` ADD CONSTRAINT `Return_requestor_id_fkey` FOREIGN KEY (`requestor_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
