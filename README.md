# BootCamp-Rockeseat-Semana1-Modulo3
# Sobre o que se trata o módulo
Nessa parte foi iniciado o desenvolvimento do back-end do GoBarber.

Foram visto conceitos como padronização de código,Docker,ORM,MVC, autenticação jwt etc.

# Sucrase
Foi usada essa dependência para que seja ultilizada funcionalidades mais recentes do javascript no node.

Comando para instalação: yarn add sucrase -D

Comando para execução: yarn sucrase-node nomearquivo.js

Para executar junto com o nodemon,primeiro foi criado um script "dev":"nodemon src/server.js" em package.json. Depois foi criado um arquivo chamado nodemon.json com {
    "execMap":{
        "js":"node -r sucrase/register"
    }
} dentro dele. Ele diz que para todo arquivo com extensão "js" que que o node executar, será executado antes outro em sucrase/register(em node modules).

# Docker
Usado na criação de ambientes isolados(containers), como por exemplo um serviço de banco de dados. Semelhante a uma máquina virtual(Exemplo da jvm) onde não a preocupação se a tecnologia se adapta ao seu computador/sistema operacional.

Containers expões portas para comunicação.

Imagens são ferramentas/tecnologias/serviços. Ex:Postgresql

Docker Registry(onde ficam armazenadas as imagens)

DockerFile "receita para montar uma imagem"

# Instalação do Docker
Devido a minha versão do windows, tive que ultilizar Docker Toolbox

https://docs.docker.com/toolbox/toolbox_install_windows/

# Observação sobre o Docker
Os comandos apresentados a seguir só funcionam após eu executar o Docker Quickstart Terminal
# Comando para criação de uma imagem
run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
# Comando para ver quais containers estão executando
docker ps
# Comando para ver todos containers parados ou em execução
docker ps -a
# Parar a execução do container criado
docker stop database
# Voltar a executar o container criado anteriormente
docker start database

Em vez do nome do container criado(database) poderia ser o id do container(docker start database fecd16d63d3e )

# Visualizar com interface gráfica
https://www.electronjs.org/apps/postbird

# Para conectar tendo como base o último comando:
Host: 192.168.99.100(Caso não seja pelo Toolbox vai "localhost"  mesmo)

Port:5432

Username: postgres

Password: docker

Save and connect

# Criando um Banco de Dados:
A esquerda do postbird:Select Database,Create Database

Nome definido:gobarber

# Sequelize 
ORM para Node.js

# Migrations 
Controle de versão para base de dados.

É possível desfazer uma migração se errarmos algo enquanto estivermos desenvolvendo a feature.

Depois que a migration foi enviada para outros devs ou para o ambiente de produção, ela jamais pode ser alterada, sendo necessário a criação de uma nova.

Cada migration deve realizar alterações em apenas uma tabela

# Seeds
População da base de dados

Muito utilizados para testes

# Arquitetura MVC
Model: Armazenar a abstração do Banco

Controller: Ponto de entrada das requisições. Sempre retorna json. Não chama outro controller.

View: O retorno ao cliente. Pode ser json ou um htm.

# Métodos do controller
index() //listagem de usuários

show() //Exibir um único usuário

store() //cadastrar um usuário

update() //alterar usuário

delete()//remover usuário

# Configurando extrutura de pastas
Dentro da pasta src foram criadas 3 pastas:App, Config e database.

Na pasta App ficarão as partes de regras de negócio. Dentro dele tem as pastas:Models e Controllers.

Na pasta config ficarão as configurações da aplicação. Nela foi criada um arquivo database.js para configurações do banco de dados.

Na pasta database ficará tudo relativo ao banco de dados.Dentro dela foi criada a pasta migrations.

# Instalando o sequelize
yarn add sequelize

# Instalando uma interface de linhas de comando do sequelize
yarn add sequelize-cli -d

# Arquivo .sequelizerc
Ultilizado para exportar os arquivos criados nas já criadas pastas.

Localizado na raíz do projeto

Por questões estéticas e de edição, foi clicado no canto inferior direito em "plain text" para editar como se fosse um arquivo js.

const {resolve}=require('path');

module.exports={
    config:resolve(__dirname,'src','config','database.js'),
    'models-path':resolve(__dirname,'src','app','models'),
    'migrations-path':resolve(__dirname,'src','database','migrations'),
    'seeders-path':resolve(__dirname,'src','database','seeds'),
};

# Configurando o arquivo database.js(dentro de config)
Como estou usando postgres nas configurações, é preciso instalar dependências pelo comando: yarn add pg pg-hstore

Mais informações em https://sequelize.org/v5/manual/dialects.html#postgresql

module.exports={
    dialect:'postgres',
    host:'192.168.99.100',
    username:'postgres',
    passworld:'docker',
    database:'gobarber',
    define:{
        timestamps:true,
        underscored:true,
        underscoredAll:true,
    },
};

Em define apenas configurações de padronização de nomes de tabelas e colunas

Obs lembrando que como é pelo toolbox é host:'192.168.99.100'

# Criando a primeira migration da tabela de usuários
yarn add sequelize migration:create --name=create-users

Foi criado o arquivo 20200323191428-create-users na pasta database/migrations

Foi tirado os comentário de up e down e deixado só os returns. Depois foi colocado os atributos da tabela.
# Criar as tabelas com as migrates
yarn sequelize db:migrate

# Desfazer a migration
yarn sequelize db:migrate:undo
# Desfazer todas as migrations
yarn sequelize db:migrate:undo:all



