# FinanceApp

Este é um projeto de gerenciamento financeiro que permite ao usuário cadastrar seus gastos e visualizar de forma clara e intuitiva, através de gráficos, em quais categorias seus gastos estão concentrados ao longo do mês.

O sistema oferece funcionalidades para adicionar, editar e excluir registros de despesas, categorizando cada gasto por tipo (como alimentação, saúde, transporte, etc.) e banco utilizado. Com isso, o usuário pode acompanhar seus gastos de maneira detalhada, facilitando o controle financeiro pessoal.

Além disso, o projeto gera gráficos dinâmicos e interativos que ajudam o usuário a entender melhor sua situação financeira, visualizando a distribuição dos gastos tanto por categoria quanto por banco.

## 💻 Tecnologias utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:
- **Frontend: React, Vite**
- **Backend: PHP, MySQL**
- **Banco de Dados: MySQL**

## 🚀 Como rodar o projeto

Siga os passos abaixo para rodar o projeto em sua máquina local.

#### 1. Clonar o repositório.
#### 2. Instalar as dependências do projeto.
#### 3. Usar o "npm run dev" ou "yarn dev" para rodar o projeto.

### Configurar o Backend (PHP e MySQL)

#### 4. Instalar o MySQL
Certifique-se de ter o MySQL instalado e ativado com um usuário e senha configurados. Caso ainda não tenha o MySQL instalado, execute o comando abaixo:
sudo apt install mysql-server

#### 5. Instalar o PHP e suas dependências
Instale o PHP e as dependências necessárias:

sudo apt install php
sudo apt install php-curl
sudo apt install php-pdo
sudo apt install php-xml

#### 6. Rodar o Backend
Navegue até o diretório do backend:

cd backend

Instale as dependências do projeto utilizando o Composer:

composer update
composer install

Configure o arquivo .env com as credenciais do seu banco de dados (MySQL). No arquivo .env, ajuste os seguintes parâmetros:

- **DB_CONNECTION=mysql**
- **DB_HOST=127.0.0.1**
- **DB_PORT=3306**
- **DB_DATABASE=financeapp**
- **DB_USERNAME=<SEU_USUARIO>**
- **DB_PASSWORD=<SUA_SENHA>**

Rode as migrações para configurar a estrutura do banco de dados:

php artisan migrate

(Opcional) Para inserir alguns dados fictícios iniciais de testes (como um usuário 'admin' e senha 'password'), use o comando:

php artisan db:seed

Agora, o seu backend estará pronto para ser utilizado, e o banco de dados estará configurado com os dados iniciais.
## 📜 Licença

Este projeto é licenciado sob a Licença MIT com a seguinte condição adicional:

- O uso, modificação ou distribuição do código deve manter o devido crédito aos autores originais.

### Licença MIT

A Licença MIT permite que você use, modifique, copie e distribua o código deste projeto, desde que o aviso de direitos autorais e a permissão da licença sejam incluídos nas cópias ou partes substanciais do código. A licença é fornecida "como está", sem garantias de qualquer tipo.

## 📬 Contato

Se você tiver dúvidas, sugestões ou feedback, sinta-se à vontade para entrar em contato com os desenvolvedores do projeto:
<ul>
<li> <b> Juan Pablo </b> <br></li>
📧 jphferreira@outlook.com

<li><b> Marcelo Melo </b> </li>
📧 marcelomelo.tech@gmail.com

<li><b> Maria Cecília </b> </li>
📧 ceciliamedeirs@gmail.com
</ul>
