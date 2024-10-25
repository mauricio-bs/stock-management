#!/bin/sh

# Diretório de trabalho
cd /usr/app

# Instalação de dependências
yarn

# Geração de artefatos Prisma
yarn prisma generate

# Aplicação de migrações do banco de dados com Prisma
yarn prisma migrate deploy

# Construção do projeto
yarn build

# Iniciar a aplicação
# yarn start
yarn start:debug
