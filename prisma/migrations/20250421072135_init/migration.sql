-- CreateTable
CREATE TABLE `NewsFeed` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `summary` VARCHAR(191) NULL,
    `status` ENUM('published', 'draft') NOT NULL,
    `images` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NULL,
    `start_date` DATETIME(3) NULL,
    `end_date` DATETIME(3) NULL,
    `budget` DECIMAL(65, 30) NULL,
    `status` ENUM('Planning', 'inprogress', 'completed', 'on_hold') NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectImages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `projectId` INTEGER NOT NULL,
    `image_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobOpportunities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `job_title` VARCHAR(191) NOT NULL,
    `employment_type` ENUM('FULLTIME', 'PARTTIME', 'CONTRACT', 'INTERNSHIP') NOT NULL,
    `department` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `application_deadline` DATETIME(3) NULL,
    `status` ENUM('DRAFT', 'ACTIVE', 'CLOSED') NOT NULL,
    `job_description` VARCHAR(191) NULL,
    `requirements` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobApplications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NULL,
    `experience` VARCHAR(191) NULL,
    `expected_salary` DECIMAL(65, 30) NULL,
    `cv_name` VARCHAR(191) NULL,
    `cover_letter` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobApplicationSkills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `applicationId` INTEGER NOT NULL,
    `skill` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `event_type` ENUM('conference', 'workshop') NULL,
    `date` DATETIME(3) NULL,
    `start_time` DATETIME(3) NULL,
    `end_time` DATETIME(3) NULL,
    `location` VARCHAR(191) NULL,
    `capacity` INTEGER NULL,
    `status` ENUM('upcoming', 'active', 'completed') NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventImages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eventId` INTEGER NOT NULL,
    `image_name` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProjectImages` ADD CONSTRAINT `ProjectImages_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobApplicationSkills` ADD CONSTRAINT `JobApplicationSkills_applicationId_fkey` FOREIGN KEY (`applicationId`) REFERENCES `JobApplications`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventImages` ADD CONSTRAINT `EventImages_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
