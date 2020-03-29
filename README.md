# BootCamp-Rockeseat-Semana1-Modulo3
# Sobre o que se trata o módulo
Nessa parte foi iniciado o desenvolvimento do back-end do GoBarber.

Foram visto conceitos como padronização de código,Docker,ORM,MVC, autenticação jwt etc.

# Sucrase
Foi usada essa dependência para que seja ultilizada funcionalidades mais recentes do javascript no node.

Comando para instalação: yarn add sucrase -D

Comando para execução: yarn sucrase-node nomearquivo.js

Para executar junto com o nodemon,primeiro foi criado um script "dev":"nodemon src/server.js" em package.json. Depois foi criado um arquivo chamado nodemon.json com 
```
{
    "execMap":{
        "js":"node -r sucrase/register"
    }
}
```
Ele diz que para todo arquivo com extensão "js" que que o node executar, será executado antes outro em sucrase/register(em node modules).

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
docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
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
```
const {resolve}=require('path');

module.exports={
    config:resolve(__dirname,'src','config','database.js'),
    'models-path':resolve(__dirname,'src','app','models'),
    'migrations-path':resolve(__dirname,'src','database','migrations'),
    'seeders-path':resolve(__dirname,'src','database','seeds'),
};
```

# Configurando o arquivo database.js(dentro de config)
Como estou usando postgres nas configurações, é preciso instalar dependências pelo comando: 
```
yarn add pg pg-hstore
```
Mais informações em https://sequelize.org/v5/manual/dialects.html#postgresql
```
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
```

Em define apenas configurações de padronização de nomes de tabelas e colunas

Obs lembrando que como é pelo toolbox é host:'192.168.99.100'

# Criando a primeira migration da tabela de usuários
yarn sequelize migration:create --name=create-users

Foi criado o arquivo 20200323191428-create-users na pasta database/migrations

Foi tirado os comentário de up e down e deixado só os returns. Depois foi colocado os atributos da tabela.
# Criar as tabelas com as migrates
yarn sequelize db:migrate

# Desfazer a migration
yarn sequelize db:migrate:undo
# Desfazer todas as migrations
yarn sequelize db:migrate:undo:all

# Instalando bcrypt
Dependência de encriptação

yarn add bcryptjs

# Autenticação JWT
É uma forma de autenticação para aplicações RESTfull

JWT: json web token

Basicamente,primeiro é enviado no corpo de uma requisição POST qualquer um json:
```
{
    "email":"UrarakaÉdoMidorya@gmail.com",
    "password":"quemshippacombakugouédoente"
}
```
Depois disso é verificado no banco de dados.

E por fim é gerado um token com 3 partes:
- Headers(Tipo do token,algorítimo)
- Payload(Dados adicionais)
- Assinatura(Verificar se algo foi alterado)



No meus testes, eu enviei POST na rota /session com o corpo :

```
{
    "email":"piromati@gmail.com",
	"password":"1234"
}
```
E o resultado foi
```
  "user": {
    "id": 12,
    "name": "Pedro Neto",
    "email": "piromati@gmail.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTU4NTI2ODM1MywiZXhwIjoxNTg1ODczMTUzfQ.vO_t4mIk965CD2ZISRGGiyMnRlPe52pqUv1lSWV4NKo"
}
```

- Headers(eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9)
- Payload(eyJpZCI6MTIsImlhdCI6MTU4NTI2ODM1MywiZXhwIjoxNTg1ODczMTUzfQ)
- Assinatura(vO_t4mIk965CD2ZISRGGiyMnRlPe52pqUv1lSWV4NKo)

Esse token será usado no envio de requisições. Sendo dever do backend autorizar ou recusar o acesso do usuário a algo analizando o token.

Mais informações em:https://jwt.io/introduction/

# Instalando a dependência que irá gerar o token
yarn add jsonwebtoken

# Gerando o token
Para gerar o token, é preciso que o programador informe um código que tente ser único no mundo.
No arquivo de configuração(config/auth.js) isso usei o site https://www.md5online.org/ .Utilizei gobarberrockeseatnode2 que gerou e500968f839e14edc5e5c6c4851ff4b1.
```
export default{
    secret:'e500968f839e14edc5e5c6c4851ff4b1',
    expiresIn:'7d',
}
```
A partir desse "secret", a aplicação irá gerar o token. Assim quando o usuário desejar acessar uma determinada área, irá ser enviado o token no header da requisição e então uma função da biblioteca 'jsonwebtoken' irá verificar se o token foi gerado pelo secret e se ele já foi expirado.
# Como passar o token nas requisições no Header(ultilizando insomina)
No Content-Type:Authorization e no application/json:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlhdCI6MTU4NTI5ODM3NywiZXhwIjoxNTg1OTAzMTc3fQ.p8Jra_aR5wE5lV467t261JaHjcPOtk6sr26Z6NU4UHw

Ou na parte de Auth e coloca o token
# Yup
Biblioteca de Schema Validation.

Forma de definir os campos da requisição e os tipos.

O yup é importado como:import * as Yup from 'yup'

# Yup instalação 
yarn add yup

# Sequência de criação

- Migration de usuário

- Model de usuário

- Criando loader de models

- Cadastro de usuários

- Gerando hash da senha

- Conceitos de JWT

- Autenticação JWT

- Middleware de autenticação

- Update do usuário

- Validando dados de entrada

# Minha visão geral do que foi gerado nesse módulo

O sistema tem basicamente 2 requisições post, uma put e um middleware de autenticação(em src/routes.js):
```
routes.post('/users',UserController.store);
routes.post('/sessions',SessionController.store);
routes.use(authMiddleware);
routes.put('/users',UserController.update);
```
Em "routes.post('/users',UserController.store);" é a rota que recebe por exemplo:
````
{
	"name":"Pedro Neto",
	"email":"piromaticos@gmail.com",
	"password":"1234"
	
}
````
e cadastra esse usuário no banco de dados.

Em "routes.post('/sessions',SessionController.store);" é a rota que recebe por exemplo:
````
{
	"email":"piromaticos@gmail.com",
	"password":"1234"
	
}
````
e vai enviar um token com base no id do usuário no banco de dados:
````
{
  "user": {
    "id": 1,
    "name": "Pedro Neto",
    "email": "piromaticos@gmail.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg1NDQzMzIxLCJleHAiOjE1ODYwNDgxMjF9.FO_LEAEg0jyQ5Jbzms7L4HhQdGyO5sc0pDj7XsGuinM"
}
````

Em "routes.use(authMiddleware);" é um middleware que vai receber o token no header da requisição e verifica se esse token é verdadeiro e se ele ja expirou. Caso não seja verdadeiro o programa retorna:
````
{
  "error":"Token invalid"
}
````
Caso as condições sejam atendidas, o programa irá executar as funções abaixo dele.

Em "routes.put('/users',UserController.update);" ele irá alterar alguma coisa no banco de dados.

# Extrutura MVC e configurações
Essa parte de inicio foi um pouco difícil de assimilar, mas depois ficou bem simples.

Dentro da pasta src/database possui a pasta migrations e o arquivo index.js. As migrations são basicamente(nesse projeto) para criar a extrutura da tabela(semelhantes aos comando de ddl). O index.js serviu para ligar os models(no caso só teve um) no banco de dados, sendo mais técnico ele irá passar uma variável de conexão para o model. Esse index referencia um arquivo de configuração(src/config/database.js).

Dentro da pasta src/config possui o arquivo auth.js e o arquivo database.js. auth.js contém configurações para geração do token. database.js contém informações do banco de dados como porta,nome,senha etc.
 
A pasta app contém os models,controllers e middlewares. Eu de forma indireta ja falei deles nos tópicos acima, mas resumindo os models irão tem contato diretamente com o banco de dados, eles que possuem funções de busca, inserção, deletar dados etc. Já os controller vão ter acesso aos models e vão dizer aos models que ações eles devem fazer dependendo das requisições. Exemplo a função store do controller UserController é chamada "routes.post('/users',UserController.store);" para cadastrar um usuário no banco de dado, sendo que antes se o corpo da requisição está em um formato correto e se ja existe algum usuário cadastrado. Caso esteja tudo bem o controlador UserController chama a função User.create(req.body); do model user.








