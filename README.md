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

Container são instancias de imagens. Ex: Um banco de dados Postgresql

Docker Registry(onde ficam armazenadas as imagens)

DockerFile "receita para montar uma imagem"

