/*
  Warnings:

  - You are about to alter the column `passageiro_id` on the `cartao` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `passageiro` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `passageiro` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `cartao` DROP FOREIGN KEY `fk_cartao_passageiro1`;

-- AlterTable
ALTER TABLE `cartao` MODIFY `passageiro_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `passageiro` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `cartao` ADD CONSTRAINT `fk_cartao_passageiro1` FOREIGN KEY (`passageiro_id`) REFERENCES `passageiro`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;
