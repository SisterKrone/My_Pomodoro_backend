const cors = require("cors");
const express = require("express");
const app = express();
const pomodoroRoutes = require("./src/routes/pomodoroRoutes");

app.use(cors());
app.use(express.json());

app.use("/pomodoro", pomodoroRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
