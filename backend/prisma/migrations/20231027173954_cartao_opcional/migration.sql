-- CreateTable
CREATE TABLE `cartao` (
    `idcartao` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(50) NOT NULL,
    `saldo` DECIMAL(6, 2) NOT NULL,
    `viagem_id` INTEGER NULL,
    `passageiro_id` BIGINT NULL,

    UNIQUE INDEX `cartao_passageiro_id_key`(`passageiro_id`),
    INDEX `fk_cartao_viagem1_idx`(`viagem_id`),
    INDEX `fk_cartao_passageiro1_idx`(`passageiro_id`),
    PRIMARY KEY (`idcartao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `linha` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `localsaida` VARCHAR(255) NOT NULL,
    `localdestino` VARCHAR(255) NOT NULL,
    `horariosaida` DATETIME(0) NOT NULL,
    `horariochegada` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `motorista` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `nascimento` DATE NOT NULL,
    `sexo` CHAR(1) NULL,
    `foto` VARCHAR(250) NOT NULL,
    `admissao` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `onibus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `placa` VARCHAR(8) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `passageiro` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `cpf` CHAR(11) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `nascimento` DATE NOT NULL,
    `sexo` CHAR(1) NULL,
    `email` VARCHAR(250) NOT NULL,
    `telefone` VARCHAR(20) NOT NULL,
    `endereco` VARCHAR(45) NULL,
    `cidade` VARCHAR(45) NOT NULL,
    `estado` CHAR(2) NOT NULL,

    INDEX `fk_passageiro_user1_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recarga` (
    `idrecarga` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` DECIMAL(6, 2) NOT NULL,
    `data` DATETIME(0) NOT NULL,
    `cartao` INTEGER NULL,

    INDEX `fk_recarga_cartao1_idx`(`cartao`),
    PRIMARY KEY (`idrecarga`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(250) NOT NULL,
    `telefone` VARCHAR(11) NULL,
    `senha` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `viagem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `datahora` DATETIME(0) NOT NULL,
    `linha_id` INTEGER NULL,
    `motorista_id` INTEGER NULL,
    `onibus_id` INTEGER NULL,

    INDEX `fk_viagem_linha1_idx`(`linha_id`),
    INDEX `fk_viagem_motorista1_idx`(`motorista_id`),
    INDEX `fk_viagem_onibus1_idx`(`onibus_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cartao` ADD CONSTRAINT `fk_cartao_passageiro1` FOREIGN KEY (`passageiro_id`) REFERENCES `passageiro`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `cartao` ADD CONSTRAINT `fk_cartao_viagem1` FOREIGN KEY (`viagem_id`) REFERENCES `viagem`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `passageiro` ADD CONSTRAINT `fk_passageiro_user1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `recarga` ADD CONSTRAINT `fk_recarga_cartao1` FOREIGN KEY (`cartao`) REFERENCES `cartao`(`idcartao`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `viagem` ADD CONSTRAINT `fk_viagem_linha1` FOREIGN KEY (`linha_id`) REFERENCES `linha`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `viagem` ADD CONSTRAINT `fk_viagem_motorista1` FOREIGN KEY (`motorista_id`) REFERENCES `motorista`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `viagem` ADD CONSTRAINT `fk_viagem_onibus1` FOREIGN KEY (`onibus_id`) REFERENCES `onibus`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;
