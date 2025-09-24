const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const timer = require("../utils/timer");

let activeSession = null;

function minutesFromNowToDate(minutes) {
  return new Date(Date.now() + minutes * 60 * 1000);
}

exports.start = async (studyTime, breakTime, cycles) => {
  if (activeSession) throw new Error("Já existe uma sessão em andamento");

  const session = await prisma.pomodoroSession.create({
    data: {
      studyTime,
      breakTime,
      cycles,
      status: "studying",
      currentCycle: 1,
      periodEndsAt: minutesFromNowToDate(studyTime),
      isCompleted: false,
    },
  });

  activeSession = session;

  timer.start(session, async (updatedSession, isFinished = false) => {
    await prisma.pomodoroSession.update({
      where: { id: updatedSession.id },
      data: {
        currentCycle: updatedSession.currentCycle,
        status: updatedSession.status,
        periodEndsAt: updatedSession.periodEndsAt
          ? new Date(updatedSession.periodEndsAt)
          : null,
        isCompleted: updatedSession.isCompleted || false,
      },
    });

    if (isFinished) {
      activeSession = null;
    }
  });

  return session;
};

exports.getStatus = async () => {
  if (!activeSession) return { running: false };

  const session = await prisma.pomodoroSession.findUnique({
    where: { id: activeSession.id },
  });

  return session;
};

exports.stop = async () => {
  if (!activeSession) return;
  timer.stop();

  await prisma.pomodoroSession.update({
    where: { id: activeSession.id },
    data: { status: "stopped", periodEndsAt: null, isCompleted: false },
  });

  activeSession = null;
};

exports.getHistory = async () => {
  return prisma.pomodoroSession.findMany({
    orderBy: { createdAt: "desc" },
  });
};
