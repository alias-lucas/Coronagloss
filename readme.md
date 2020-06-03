## Olá, este é um projeto da coda+ 😁

Nos trexos de código e explicação a seguir irei dar uma breve explicação 
do que o sistema faz, como ele está dividido e um pouco de como 
o sequelize funciona. Para isso iremos divir em **3** tópicos
sendo eles: **instalção**, **sequelize** e **organização das pastas**.
Vamos lá !!


## 🚀 Instalação e Execução

1. Faça um clone desse repositório.
2. Entre na pasta cd **projeto_coronavirus**.
3. Rode ***npm install*** para instalar as dependências.
4. Altere as credencias de *username* e *password* dentro de /src/config/database.js.
5. Rode ***npx* sequelize db:create** para criar o banco de dados.
6. Rode ***npx* sequelize db:migrate** para executar as migrations.
7. Rode *npm run dev* para iniciar o servidor.
8. E pronto, o projeto já está configurado e pronto pra uso 😃.


## 🎲 Sequelize

* O sequelize é uma ORM *(Object-relational mapping)* ou Mapeamento objeto-relacional em PT-BR.
* Ele serve básciamente p/ que possamos interagir com o banco de dados utilizando o JavaScript.
* Como o sequelize funciona, pastas e arquivos necessários p/ que ele rode bem confira a lista a baixo.


1. **Configuração:** na pasta  *src\config* você irá encontrar um arquivo chamado *database.js* que vai fazer toda a parte de "credenciamento", pegando infos como linguagem SQL utilizada ( no nosso caso postgres ), host, usuário e senha.

2. **.sequelizerc:** neste arquivo locálizado nas pasta *src* fara a ponte para que o banco de dados  entenda que estamos utilizando JavaScript, passando nele aonde estão localizadas as pastas das nossas configurações e aonde estãos as queries ( ou consultas ) que faremos ao banco.

3. **Consultas:** Por fim, mas não menos importante, na pasta *src\database* temos duas coisas: **1°** o arquivo *index.js*, ele que irá fazer toda a parte de conexão, inicialização e relacionamento entre tabélas dentro do JS. **2°** temos a pasta *migrations* lá aonde fica o registro de todas as consultas que fizemos no banco de dados.


## 📂 Organização de pastas

Essa parte é um pouco máis simples do que as demais então será um pouco mais breve.
Neste ponto irei esplicar as pastas *controllers*, *models* e o arquivo *routes.js* e como eles trabalhão juntos.
(apenas um parenteses aqui, estamos seguindo a estrutura de arquivos ***MVC***, logo model e controller tem suas funções padrões)


1. **models:** logo após de você criar uma tabela *"exemplo"*, você irá até a pasta *src\models*, criar um arquivo *"Exemplo.js"* e dentro dele uma classe com o nome da tabela *"Exemplo"*, que criou e exportar essa classe p/ que o resto da aplicação possa usar. Lembrando que, toda vez que tu criar uma classe deve dar o **init** nela dentro de *src\database\index.js* e caso essa tabela tenha um relacionamento com outra também de o **associate** para que o banco consiga fazer as relações.

2. **controlers:** Após ter criado o modelo da tábela, você irá importar a classe que criou para um arquivo ( por convenção se seu modelo se chama Exemplo.js, o controlador dele será ExemploController.js ) que irá funcionar como seu controlador, lá você irá fazer todo o crud e regras de negócios necessárias e exportar esses métodos criados.

3. **routes.js:** Dentro da pasta *src\routes.* iremos encontrar toda a parte de rotas do nosso projeto, para que isso possa ser feito, será necessário que você importe os métodos que criou na pasta *controller* e referencie eles em cada uma das rotas.



Bom, por ultimo gostária de deixar aqui um [vídeo](https://www.youtube.com/watch?v=Fbu7z5dXcRs) tutorial muito bom que explica bem sobre sequelize.
