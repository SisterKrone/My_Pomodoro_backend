# Pomodoro API – Backend em Node.js com Express & Prisma

Bem-vindo(a) à **Pomodoro API**, um projeto backend simples e funcional que implementa um **gerenciador de sessões Pomodoro** – uma técnica de produtividade usada por milhões de pessoas para melhorar
foco e gestão de tempo.  

Com esta API, você pode:
- Iniciar sessões Pomodoro personalizadas 
- Acompanhar o progresso em tempo real   
- Interromper sessões em andamento  
- Consultar o histórico completo de sessões anteriores 

---

## Tecnologias Utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias:

- **Node.js** – Ambiente de execução JavaScript  
- **Express** – Framework web rápido e minimalista  
- **Prisma ORM** – Mapeamento de banco de dados intuitivo  
- **SQLite** – Banco de dados leve e fácil de configurar  
- **Nodemon** – Para desenvolvimento com recarga automática  

---



---

## Como Rodar o Projeto Localmente

Siga os passos abaixo para clonar e rodar a API na sua máquina 

### 1. Clonar o Repositório


git clone https://github.com/seu-usuario/pomodoro-backend.git
cd pomodoro-backend

npm install

Este projeto usa SQLite, então não precisa de nenhuma configuração externa.
Basta rodar o comando para criar o banco e aplicar o schema:

npx prisma migrate dev --name init

Para rodar, use:

node server.js




## Iniciar uma Sessão Pomodoro

POST /pomodoro/start

Inicia uma nova sessão de estudo.

Body (JSON):
{
  "studyTime": 25,
  "breakTime": 5,
  "cycles": 4
}


studyTime – Tempo de estudo em minutos

breakTime – Tempo de pausa em minutos

cycles – Número total de ciclos Pomodoro

Resposta (200):
{
  "id": 1,
  "studyTime": 25,
  "breakTime": 5,
  "cycles": 4,
  "currentCycle": 1,
  "status": "studying",
  "periodEndsAt": "2025-09-24T12:34:56.000Z",
  "isCompleted": false
}

## Verificar Status da Sessão Atual

GET /pomodoro/status

Retorna informações sobre a sessão em andamento.

Resposta:
{
  "id": 1,
  "studyTime": 25,
  "breakTime": 5,
  "cycles": 4,
  "currentCycle": 2,
  "status": "break",
  "periodEndsAt": "2025-09-24T12:50:00.000Z",
  "isCompleted": false
}


Se não houver sessão ativa:

{
  "running": false
}

## Parar a Sessão

POST /pomodoro/stop

Interrompe a sessão atual imediatamente.

Resposta:
{
  "message": "Pomodoro parado com sucesso!"
}

## Histórico de Sessões

GET /pomodoro/history

Retorna todas as sessões realizadas (ordenadas da mais recente para a mais antiga).

Resposta:
{
    "id": 3,
    "studyTime": 30,
    "breakTime": 10,
    "cycles": 3,
    "currentCycle": 3,
    "status": "finished",
    "periodEndsAt": null,
    "isCompleted": true,
    "createdAt": "2025-09-23T18:00:00.000Z",
    "updatedAt": "2025-09-23T19:30:00.000Z"
  }

## Dicas de Uso

Você pode testar todos os endpoints facilmente com ferramentas como Insomnia, Postman ou Thunder Client.

Caso queira integrar a API em um frontend, basta fazer requisições HTTP para http://localhost:3000/pomodoro/....

A lógica de ciclos e mudança de status é automática – você só precisa iniciar a sessão e acompanhar o progresso.
