/*
  Warnings:

  - You are about to drop the `jobapplicationskills` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `jobOpportunityId` to the `JobApplications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skills` to the `JobApplications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `jobapplicationskills` DROP FOREIGN KEY `JobApplicationSkills_applicationId_fkey`;

-- AlterTable
ALTER TABLE `jobapplications` ADD COLUMN `jobOpportunityId` INTEGER NOT NULL,
    ADD COLUMN `skills` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `category` ENUM('PROCUREMENT_AND_CONTRACTS', 'HIGHWAYS_AND_TRANSPORTATION_ENGINEERING', 'WATER_RESOURCES_ENGINEERING', 'ENVIRONMENTAL_AND_CLIMATE_RESILIENCE_ENGINEERING', 'URBAN_RURAL_AND_REGIONAL_DEVELOPMENT', 'COMMERCIAL_AND_HOUSING_DEVELOPMENT') NOT NULL;

-- DropTable
DROP TABLE `jobapplicationskills`;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_userName_key`(`userName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `JobApplications` ADD CONSTRAINT `JobApplications_jobOpportunityId_fkey` FOREIGN KEY (`jobOpportunityId`) REFERENCES `JobOpportunities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
