# conceitos-nodejs
## First challenge in GoStack from rocketseat

Essa foi uma tarefa passada pela Rocketseat para rever alguns conceitos sobre as rotas e funcionalidades de um backend, o projeto estava com as rotas prontas, mas cada resposta http tinha que ser escrita pelos alunos.

O projeto seria uma API pra portifolio, onde você registra os projetos com titulo, tecnologias e link do github, ainda sem usar um banco de dados, só com um vetor de objetos.

```javascript
app.get("/repositories", (request, response) => {}
app.post("/repositories", (request, response) => {}
app.put("/repositories/:id", (request, response) => {}
app.delete("/repositories/:id", (request, response) => {}
app.post("/repositories/:id/like", (request, response) => {}
```

Eu acabei não tendo muita dificuldade para desenvolver as repostas, mas na hora de rodar os testes, quase nada funcionava hahah, acontece. Então pausa a música e vamos ver o que está acontecendo.

Tudo parecia normal, então tive que tomar bastante cuidado, depois de tentar muitas coisas, descobri que o filtro que eu fazia no vetor de repositórios sempre estava errado:

```javascript
// O que eu estava fazendo
const repository = repositories.findIndex(project=>project.id =id)
// O que eu deveria ter feito
const repository = repositories.findIndex(project=>project.id ===id)
```

Da forma errada, eu estava trocando o id dos projetos, e da forma certa, eu estava verificando de o id passado na url tinha na minha lista.
