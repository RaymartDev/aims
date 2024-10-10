-- DropForeignKey
ALTER TABLE `release` DROP FOREIGN KEY `Release_requestor_id_fkey`;

-- DropForeignKey
ALTER TABLE `release_detail` DROP FOREIGN KEY `Release_Detail_release_number_fkey`;

-- DropForeignKey
ALTER TABLE `release_receiver` DROP FOREIGN KEY `Release_Receiver_company_id_fkey`;

-- DropForeignKey
ALTER TABLE `release_receiver` DROP FOREIGN KEY `Release_Receiver_department_id_fkey`;

-- DropForeignKey
ALTER TABLE `release_shipped` DROP FOREIGN KEY `Release_Shipped_company_id_fkey`;

-- DropForeignKey
ALTER TABLE `release_shipped` DROP FOREIGN KEY `Release_Shipped_department_id_fkey`;

-- CreateTable
CREATE TABLE `Return` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `release_number` INTEGER NOT NULL,
    `return_number` INTEGER NOT NULL,
    `tag` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Return_Detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `return_number` INTEGER NOT NULL,
    `material_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `remarks` VARCHAR(191) NOT NULL,

    INDEX `Return_Detail_return_number_idx`(`return_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Return` ADD CONSTRAINT `Return_release_number_fkey` FOREIGN KEY (`release_number`) REFERENCES `Release`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Return_Detail` ADD CONSTRAINT `Return_Detail_material_id_fkey` FOREIGN KEY (`material_id`) REFERENCES `Material`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Return_Detail` ADD CONSTRAINT `Return_Detail_return_number_fkey` FOREIGN KEY (`return_number`) REFERENCES `Return`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Release_Shipped` ADD CONSTRAINT `Release_Shipped_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Department`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Release_Shipped` ADD CONSTRAINT `Release_Shipped_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Release_Receiver` ADD CONSTRAINT `Release_Receiver_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Department`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Release_Receiver` ADD CONSTRAINT `Release_Receiver_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Release_Detail` ADD CONSTRAINT `Release_Detail_release_number_fkey` FOREIGN KEY (`release_number`) REFERENCES `Release`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Release` ADD CONSTRAINT `Release_requestor_id_fkey` FOREIGN KEY (`requestor_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
