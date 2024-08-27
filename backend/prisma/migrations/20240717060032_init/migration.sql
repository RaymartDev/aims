-- AlterTable
ALTER TABLE `company` MODIFY `modified_by_id` INTEGER NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `department` MODIFY `modified_by_id` INTEGER NULL DEFAULT 1;
