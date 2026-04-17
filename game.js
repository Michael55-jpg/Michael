const state = {
  player: { name: "Hikari", hp: 100, guard: false },
  enemy: { name: "Kuro", hp: 100, guard: false },
  over: false,
};

const refs = {
  playerHp: document.getElementById("player-hp"),
  enemyHp: document.getElementById("enemy-hp"),
  playerBar: document.getElementById("player-bar"),
  enemyBar: document.getElementById("enemy-bar"),
  log: document.getElementById("log"),
  buttons: Array.from(document.querySelectorAll("button[data-action]")),
  restart: document.getElementById("restart"),
};

const clamp = (n, min = 0, max = 100) => Math.max(min, Math.min(max, n));
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function writeLog(text) {
  const p = document.createElement("p");
  p.textContent = text;
  refs.log.prepend(p);
}

function updateUi() {
  refs.playerHp.textContent = state.player.hp;
  refs.enemyHp.textContent = state.enemy.hp;
  refs.playerBar.style.width = `${state.player.hp}%`;
  refs.enemyBar.style.width = `${state.enemy.hp}%`;

  const disabled = state.over;
  refs.buttons.forEach((btn) => {
    btn.disabled = disabled;
  });
}

function dealDamage(target, amount) {
  const reduced = target.guard ? Math.ceil(amount * 0.45) : amount;
  target.hp = clamp(target.hp - reduced);
  target.guard = false;
  return reduced;
}

function enemyTurn() {
  if (state.over) return;

  const choices = ["slash", "ki", "guard"];
  const action = choices[rand(0, choices.length - 1)];

  if (action === "guard") {
    state.enemy.guard = true;
    writeLog(`🛡️ ${state.enemy.name} se protège.`);
    return;
  }

  const damage = action === "slash" ? rand(9, 14) : rand(14, 22);
  const done = dealDamage(state.player, damage);
  writeLog(`💥 ${state.enemy.name} inflige ${done} dégâts.`);

  if (state.player.hp <= 0) {
    state.over = true;
    writeLog("☠️ Défaite... Kuro remporte le duel.");
  }
}

function playerTurn(action) {
  if (state.over) return;

  if (action === "guard") {
    state.player.guard = true;
    writeLog(`🛡️ ${state.player.name} prépare une garde parfaite.`);
  } else {
    const damage = action === "slash" ? rand(11, 16) : rand(17, 25);
    const done = dealDamage(state.enemy, damage);
    writeLog(`⚔️ ${state.player.name} inflige ${done} dégâts.`);

    if (state.enemy.hp <= 0) {
      state.over = true;
      writeLog("🏆 Victoire ! Tu deviens le champion ANIMAX CLASH.");
    }
  }

  if (!state.over) {
    enemyTurn();
  }

  updateUi();
}

function resetGame() {
  state.player.hp = 100;
  state.enemy.hp = 100;
  state.player.guard = false;
  state.enemy.guard = false;
  state.over = false;
  refs.log.innerHTML = "";
  writeLog("🔥 Nouveau duel: Hikari vs Kuro !");
  updateUi();
}

refs.buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    playerTurn(btn.dataset.action);
  });
});

refs.restart.addEventListener("click", resetGame);

resetGame();
