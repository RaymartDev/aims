-- AlterTable
ALTER TABLE `release` ADD COLUMN `date_out` DATETIME(3) NULL,
    ADD COLUMN `relead_to` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `release_receiver` ALTER COLUMN `receive_date` DROP DEFAULT;

-- AlterTable
ALTER TABLE `release_shipped` ALTER COLUMN `shipped_date` DROP DEFAULT;
