/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `passageiro` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `passageiro_cpf_key` ON `passageiro`(`cpf`);
