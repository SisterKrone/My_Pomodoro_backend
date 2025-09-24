const pomodoroService = require("../services/pomodoroService");

exports.startPomodoro = async (req, res) => {
  const { studyTime, breakTime, cycles } = req.body;

  try {
    const session = await pomodoroService.start(Number(studyTime), Number(breakTime), Number(cycles));
    res.status(200).json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getStatus = async (req, res) => {
  try {
    const status = await pomodoroService.getStatus();
    res.status(200).json(status);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.stopPomodoro = async (req, res) => {
  try {
    await pomodoroService.stop();
    res.status(200).json({ message: "Pomodoro parado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await pomodoroService.getHistory();
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
