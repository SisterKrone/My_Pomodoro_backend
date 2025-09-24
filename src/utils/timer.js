let timeoutId = null;

function toDateAfterMinutes(minutes) {
  return new Date(Date.now() + minutes * 60 * 1000);
}

function start(session, onUpdate) {
  console.log(`Sessão iniciada: ${session.studyTime} minutos de estudo.`);

  let s = {
    id: session.id,
    studyTime: session.studyTime,
    breakTime: session.breakTime,
    cycles: session.cycles,
    currentCycle: session.currentCycle || 1,
    status: session.status || "studying",
    periodEndsAt: session.periodEndsAt
      ? new Date(session.periodEndsAt)
      : toDateAfterMinutes(session.studyTime),
    isCompleted: false,
  };

  const scheduleNext = async () => {
    if (s.status === "studying") {
      s.status = "break";
      s.periodEndsAt = toDateAfterMinutes(s.breakTime);
      if (onUpdate) await onUpdate(s);
      timeoutId = setTimeout(scheduleNext, s.breakTime * 60 * 1000);
    } else if (s.status === "break") {
      s.currentCycle = (s.currentCycle || 1) + 1;
      if (s.currentCycle > s.cycles) {
        s.status = "finished";
        s.periodEndsAt = null;
        s.isCompleted = true;
        if (onUpdate) await onUpdate(s, true); 
        timeoutId = null;
        console.log("Sessão completa!");
        return;
      } else {
        s.status = "studying";
        s.periodEndsAt = toDateAfterMinutes(s.studyTime);
        if (onUpdate) await onUpdate(s);
        timeoutId = setTimeout(scheduleNext, s.studyTime * 60 * 1000);
      }
    }
  };

  const now = Date.now();
  const msUntil = s.periodEndsAt
    ? Math.max(0, s.periodEndsAt.getTime() - now)
    : 0;

  timeoutId = setTimeout(scheduleNext, msUntil);
}

function stop() {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
  console.log("Sessão interrompida.");
}

module.exports = { start, stop };
