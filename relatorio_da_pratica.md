# Relatório da Prática — Encontros 1 e 2
## Sistema de Reservas de Laboratórios

# Disciplina: Engenharia de Software

## 1. Objetivo da prática

O objetivo da prática foi executar o Sistema de Reservas de Laboratórios e entender como o frontend se comunica com o backend. No segundo encontro, também foi necessário adicionar o campo de quantidade de alunos, fazer a validação dos valores e verificar se as informações estavam sendo salvas corretamente no banco de dados.

## 2. Arquivos do projeto e suas funções

| Arquivo | Função |
|---|---|
| `backend/main.py` | Cria a API e define as rotas do sistema. |
| `backend/requirements.txt` | Contém as bibliotecas necessárias para executar o backend. |
| `frontend/index.html` | Cria a estrutura da página e do formulário. |
| `frontend/styles.css` | Define a aparência da página. |
| `frontend/app.js` | Envia os dados para a API e mostra as reservas na tela. |
| `backend/database.py` | Faz a conexão com o banco de dados SQLite e cria a tabela de reservas. |
| `backend/models.py` | Define os dados necessários para uma reserva e suas validações. |
| `backend/services.py` | Contém as funções para cadastrar, consultar, editar e excluir reservas. |
| `tests/test_api.py` | Arquivo destinado aos testes automatizados da API. |

## 3. Evidências da prática

### Evidências do Encontro 1

**Evidência A — Estrutura do projeto**

![Evidência A — Estrutura do projeto](evidencias/evidenciaA.png)

Mostra as pastas e os arquivos do projeto no VS Code.

**Evidência B — Inicialização do backend**

![Evidência B — Inicialização do backend](evidencias/evidenciaB.png)

Mostra o servidor Uvicorn funcionando.

**Evidência C — Interface do sistema**

![Evidência C — Interface do sistema](evidencias/evidenciaC.png)

Mostra a página do sistema aberta no navegador.

**Evidência D — Requisições da API**

![Evidência D — Network](evidencias/evidenciaD.png)

Mostra as requisições feitas pelo navegador na aba Network.

**Evidência E — Resposta da API**

![Evidência E — Swagger](evidencias/evidenciaE.png)

Mostra a rota `/api/status` retornando o status online.

**Evidência F1 — API parada**

![Evidência F1 — API parada](evidencias/evidenciaF1.png)

Mostra o que acontece quando o servidor da API é desligado.

**Evidência F2 — URL incorreta**

![Evidência F2 — URL incorreta](evidencias/evidenciaF2.png)

Mostra o erro 404 ao acessar uma rota escrita incorretamente.

**Evidência F3 — Abertura direta do HTML**

![Evidência F3 — Abertura direta](evidencias/evidenciaF3.png)

Mostra a abertura do arquivo HTML diretamente pelo navegador.

### Evidências do Encontro 2

**EvidênciaB_frontaberto — Formulário atualizado**

Mostra o campo de quantidade de alunos no formulário e a coluna correspondente na tabela de reservas.

**EvidenciaC_25_201 — Cadastro realizado com sucesso**

Mostra a criação de uma reserva pela API, com resposta `201 Created` e o campo `quantidade_alunos` no resultado.

**EvidênciaC_41  — Teste com 41 alunos**

Mostra que a API rejeitou o valor 41 e retornou `422 Unprocessable Entity`, pois o limite máximo permitido é 40 alunos.

**EvidênciaC_Campoausente — Campo obrigatório ausente**

Mostra que a API retornou `422 Unprocessable Entity` quando o campo `quantidade_alunos` não foi enviado.

## 4. Como os dados funcionam no sistema

1. O navegador abre a página do sistema.
2. O JavaScript coleta os dados preenchidos no formulário.
3. Os dados são enviados em formato JSON para a API.
4. O backend verifica se os dados estão corretos.
5. Se estiver tudo certo, os dados são salvos no banco SQLite.
6. A API retorna uma resposta ao frontend.
7. O JavaScript atualiza a tabela para mostrar as reservas cadastradas.

No segundo encontro, esse processo passou a incluir também a quantidade de alunos da reserva.

## 5. Perguntas de verificação

### Questões do Encontro 1

**17. `app = FastAPI()` inicia o servidor?**

Não. Essa linha cria a aplicação. O Uvicorn é responsável por iniciar o servidor e receber as requisições.

**18. Qual processo atende à porta 8000?**

O Uvicorn, que executa o backend.

**19. Qual processo atende à porta 5500?**

O servidor HTTP iniciado com o comando `py -m http.server 5500`, que disponibiliza os arquivos do frontend.

**20. Onde a rota `/api/status` é definida?**

No arquivo `backend/main.py`.

**21. Como comprovar que a requisição chegou ao backend?**

Podemos verificar a requisição na aba Network do navegador e também observar os registros no terminal do Uvicorn.

**22. Por que abrir a pasta raiz no VS Code ajuda?**

Porque permite visualizar todos os arquivos e entender melhor como o frontend e o backend se relacionam.

**23. Qual é a diferença entre Console, Network e terminal da API?**

- **Console:** mostra mensagens e erros do JavaScript.
- **Network:** mostra as requisições e respostas HTTP.
- **Terminal da API:** mostra os registros e erros do backend.

### Questões do Encontro 2

**5. Por que a validação HTML não substitui a validação Pydantic?**

Porque a validação HTML funciona no navegador e pode ser contornada. O Pydantic valida os dados recebidos pelo backend, mesmo quando a requisição é feita diretamente à API.

**6. Por que utilizar `JSON.stringify()`?**

Porque essa função transforma o objeto JavaScript em uma string JSON que pode ser enviada na requisição HTTP.

**7. Onde o código 201 é definido?**

No arquivo `backend/main.py`, na rota `POST /api/reservas`, por meio de `status_code=201`. Ele indica que a reserva foi criada com sucesso.

**8. O que aconteceria se o JavaScript enviasse `quantidadeAlunos` em vez de `quantidade_alunos`?**

A API não reconheceria esse nome como o campo esperado. Como `quantidade_alunos` é obrigatório, a requisição retornaria erro 422.

**9. Como comprovar que a requisição chegou ao servidor?**

Podemos verificar a requisição na aba Network e observar o registro correspondente no terminal do Uvicorn.

## 6. Integrantes do grupo e responsabilidades

| Integrante | Responsabilidade |
|---|---|
| **Andrew Lippy de Mattos Pereira** | Desenvolvimento do backend e das rotas da API. |
| **Cauã Pereira Menezes** | Desenvolvimento da página, do HTML e do CSS. |
| **Marcus Vinicius Alves de Oliveira** | Integração entre frontend e backend e verificação das requisições. |
| **Matheus Prates Gaspar Silva** | Testes do sistema e verificação das respostas da API. |
| **Nathan de Faria Alves Alvarenga** | Documentação do projeto e organização do README. |
| **Roberto Kleber da Fonseca Ponce Junior** | Organização das evidências e apoio à revisão do relatório. |

### Trabalho em grupo

O projeto foi desenvolvido com a participação dos integrantes, dividindo as tarefas para facilitar a programação, os testes e a documentação.

## 7. Melhorias futuras

Como melhorias, o sistema pode receber novos testes automatizados, mensagens de erro mais claras, filtros melhores e outras funcionalidades para facilitar o uso e evitar conflitos de horários.

## 8. Conclusão

Durante os dois encontros, foi possível entender melhor como o frontend se comunica com o backend e como os dados são enviados, validados e salvos no banco de dados.

No segundo encontro, foi adicionado o campo de quantidade de alunos, permitindo cadastrar reservas com valores entre 1 e 40. Os testes mostraram que a API aceita dados válidos e rejeita valores fora do limite ou quando o campo obrigatório não é enviado.

A prática também ajudou a entender a importância de manter o frontend, o backend e o banco de dados funcionando em conjunto para que o sistema execute suas funções corretamente.