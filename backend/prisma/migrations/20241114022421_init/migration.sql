-- AlterTable
ALTER TABLE `return` ADD COLUMN `modified_by_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Return` ADD CONSTRAINT `Return_modified_by_id_fkey` FOREIGN KEY (`modified_by_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
