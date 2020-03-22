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
Usado na criação de ambientes isolados(containers), como por exemplo um serviço de banco de dados.

Containers expões portas para comunicação.

Imagens são ferramentas/tecnologias/serviços. Ex:Postgresql

Docker Registry(onde ficam armazenadas as imagens)

DockerFile "receita para montar uma imagem"

# Instalação do Docker
Devido a minha versão do windows, tive que ultilizar Docker Toolbox

https://docs.docker.com/toolbox/toolbox_install_windows/

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

# MVC
Model, View, Controller

# Migrations 
Controle de versão para base de dados.








