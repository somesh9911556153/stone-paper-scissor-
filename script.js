// ---------- CONFIG & STATE ----------
// const choices = ["stone","paper","scissor"];
// let mode = null, roomId = "", playerRole = "";
// let wins = 0, losses = 0, draws = 0;

// let gameover = new Audio("gameover.mp3"),
//     winSound = new Audio("victory.mp3"),
//     drawSound = new Audio("draw.mp3");

// const winBanter = ["You're on fire! 🔥","Keep going, champion!","Nice move!","Epic battle!","Unstoppable!"],
//       loseBanter = ["Better luck next time!","Try again!","Close one!","Oops!"],
//       drawBanter = ["Try again!","Even match!","So close!","Neck and neck!"];

// let achievements = {
//   firstWin: false,
//   fiveWins: false,
//   firstDraw: false,
//   threeLosses: false
// };

// // ---------- MODE SELECTION ----------
// function selectMode(selectedMode) {
//   mode = selectedMode;

//   // hide mode selection
//   document.getElementById("mode-selection").style.display = "none";
//   // show toggle-button now
//   document.getElementById("toggle-leaderboard-btn").style.display = "block";

//   if (mode === "bot") {
//     document.getElementById("mode-status").innerText = "Playing vs Computer 🤖";
//     document.getElementById("room-controls").style.display = "none";
//     document.getElementById("game-ui").style.display = "block";
//   } else {
//     document.getElementById("mode-status").innerText = "Online Multiplayer Mode 🌐";
//     document.getElementById("room-controls").style.display = "block";
//     document.getElementById("game-ui").style.display = "none";
//   }
// }

// // ---------- BUTTON HANDLER ----------
// function handleChoice(choice) {
//   if (mode === "bot") playWithBot(choice);
//   else submitChoice(choice);
// }

// // ---------- BOT MODE ----------
// function playWithBot(userChoice) {
//   const comp = choices[Math.floor(Math.random() * choices.length)];
//   const res = getResult(userChoice, comp);
//   showResult(userChoice, comp, res);
// }

// // ---------- ONLINE MODE ----------
// function createRoom() {
//   roomId = document.getElementById("room-id").value.trim();
//   if (!roomId) return alert("Enter room code");
//   db.ref("rooms/" + roomId).set({ player1: null, player2: null });
//   playerRole = "player1"; launchMultiplayer();
// }
// function joinRoom() {
//   roomId = document.getElementById("room-id").value.trim();
//   if (!roomId) return alert("Enter room code");
//   db.ref("rooms/" + roomId).once("value", snap => {
//     if (snap.exists()) { playerRole = "player2"; launchMultiplayer(); }
//     else alert("Room not found");
//   });
// }
// function launchMultiplayer() {
//   document.getElementById("room-controls").style.display = "none";
//   document.getElementById("game-ui").style.display = "block";
//   document.getElementById("player-role-label").style.display = "block";
//   document.getElementById("player-role").innerText = playerRole;
//   document.getElementById("current-room").innerText = roomId;
//   db.ref("rooms/" + roomId).on("value", snap => {
//     const d = snap.val();
//     if (!d) return;
//     const opp = playerRole === "player1" ? "player2" : "player1";
//     if (d[playerRole] && d[opp]) {
//       const res = getResult(d[playerRole], d[opp]);
//       showResult(d[playerRole], d[opp], res);
//       db.ref("rooms/" + roomId).update({ player1: null, player2: null });
//     }
//   });
// }
// function submitChoice(choice) {
//   if (!roomId || !playerRole) return alert("Join or create room");
//   db.ref("rooms/" + roomId + "/" + playerRole).set(choice);
// }

// // ---------- SHARED LOGIC ----------
// function getResult(u, o) {
//   if (u === o) return "It's a draw!";
//   if ((u === "stone" && o === "scissor") ||
//       (u === "paper" && o === "stone") ||
//       (u === "scissor" && o === "paper")) return "You win!";
//   return "You lose!";
// }

// function showResult(u, o, res) {
//   const rd = document.getElementById("result"),
//         bd = document.getElementById("banter");
//   let html = `You chose: ${u}<br>Opponent chose: ${o}<br>${res}`;
//   if (res === "You win!") {
//     wins++; winSound.play();
//     html += `<br><img src="excited.gif" style="width:100px;">`;
//   } else if (res === "You lose!") {
//     losses++; gameover.pause(); gameover.currentTime = 0; gameover.play();
//     html += `<br><img src="you lose.png" style="width:80px;">`;
//   } else {
//     draws++; drawSound.play();
//     html += `<br><img src="image.png" style="width:80px;">`;
//   }
//   rd.innerHTML = html;
//   bd.innerText = (res === "You win!" ? winBanter : res === "You lose!" ? loseBanter : drawBanter)
//                   [Math.floor(Math.random() * 4)];
//   updateLeaderboard(); checkAchievements();
// }

// function resetGame() {
//   ["result","banter","achievement"].forEach(id => document.getElementById(id).innerText = "");
//   wins = losses = draws = 0;
//   achievements = { firstWin:false, fiveWins:false, firstDraw:false, threeLosses:false };
//   updateLeaderboard();
// }

// function updateLeaderboard() {
//   document.getElementById("wins").innerText = wins;
//   document.getElementById("losses").innerText = losses;
//   document.getElementById("draws").innerText = draws;
// }

// function checkAchievements() {
//   const a = document.getElementById("achievement"), msgs = [];
//   if (!achievements.firstWin && wins >= 1) { achievements.firstWin = true; msgs.push("🏆 First Win!"); }
//   if (!achievements.fiveWins && wins >= 5) { achievements.fiveWins = true; msgs.push("🏆 5 Wins!"); }
//   if (!achievements.firstDraw && draws >= 1) { achievements.firstDraw = true; msgs.push("🤝 First Draw!"); }
//   if (!achievements.threeLosses && losses >= 3) { achievements.threeLosses = true; msgs.push("😅 3 Losses!"); }
//   if (msgs.length) {
//     a.innerHTML = msgs.join("<br>");
//     setTimeout(() => a.innerHTML = "", 3000);
//   }
// }

// // ---------- TOGGLE INLINE LEADERBOARD ----------
// const lbBtn = document.getElementById("toggle-leaderboard-btn"),
//       lbDiv = document.querySelector(".leaderboard-inline");

// lbBtn.addEventListener("click", () => {
//   const hidden = getComputedStyle(lbDiv).display === "none";
//   lbDiv.style.display = hidden ? "block" : "none";
//   lbBtn.textContent = hidden ? "Hide Leaderboard" : "Show Leaderboard";
// });


// ---------- CONFIG & STATE ----------
const choices = ["stone", "paper", "scissor"];
let mode = null,
    roomId = "",
    playerRole = "";
let wins = 0, losses = 0, draws = 0;

const gameover = new Audio("gameover.mp3"),
      winSound = new Audio("victory.mp3"),
      drawSound = new Audio("draw.mp3");

const winBanter  = ["You're on fire! 🔥","Keep going, champion!","Nice move!","Epic battle!","Unstoppable!"],
      loseBanter = ["Better luck next time!","Try again!","Close one!","Oops!"],
      drawBanter = ["Try again!","Even match!","So close!","Neck and neck!"];

let achievements = {
  firstWin:    false,
  fiveWins:    false,
  firstDraw:   false,
  threeLosses: false
};

// ---------- MODE SELECTION ----------
function selectMode(selectedMode) {
  mode = selectedMode;

  // hide home‐screen buttons
  document.getElementById("mode-selection").style.display = "none";
  // reveal the toggle-button (inside game-ui)
  document.getElementById("toggle-leaderboard-btn").style.display = "inline-block";

  if (mode === "bot") {
    document.getElementById("mode-status").innerText = "Playing vs Computer 🤖";
    document.getElementById("room-controls").style.display = "none";
    document.getElementById("game-ui").style.display = "block";
  } else {
    document.getElementById("mode-status").innerText = "Online Multiplayer Mode 🌐";
    document.getElementById("room-controls").style.display = "block";
    document.getElementById("game-ui").style.display = "none";
  }
}

// ---------- BUTTON HANDLER ----------
function handleChoice(choice) {
  if (mode === "bot") playWithBot(choice);
  else                  submitChoice(choice);
}

// ---------- BOT MODE ----------
function playWithBot(userChoice) {
  const comp = choices[Math.floor(Math.random() * choices.length)];
  const res  = getResult(userChoice, comp);
  showResult(userChoice, comp, res);
}

// ---------- ONLINE MODE ----------
function createRoom() {
  roomId = document.getElementById("room-id").value.trim();
  if (!roomId) return alert("Enter room code to create");
  db.ref("rooms/" + roomId).set({ player1: null, player2: null });
  playerRole = "player1";
  launchMultiplayer();
}

function joinRoom() {
  roomId = document.getElementById("room-id").value.trim();
  if (!roomId) return alert("Enter room code to join");
  db.ref("rooms/" + roomId).once("value", snap => {
    if (snap.exists()) {
      playerRole = "player2";
      launchMultiplayer();
    } else {
      alert("Room not found");
    }
  });
}

function launchMultiplayer() {
  document.getElementById("room-controls").style.display = "none";
  document.getElementById("game-ui").style.display = "block";
  document.getElementById("player-role-label").style.display = "block";
  document.getElementById("player-role").innerText = playerRole;
  document.getElementById("current-room").innerText = roomId;

  db.ref("rooms/" + roomId).on("value", snap => {
    const data = snap.val();
    if (!data) return;

    const opponent = playerRole === "player1" ? "player2" : "player1";
    if (data[playerRole] && data[opponent]) {
      const res = getResult(data[playerRole], data[opponent]);
      showResult(data[playerRole], data[opponent], res);
      // reset for next round
      db.ref("rooms/" + roomId).update({ player1: null, player2: null });
    }
  });
}

function submitChoice(choice) {
  if (!roomId || !playerRole) return alert("Create or join a room first");
  db.ref("rooms/" + roomId + "/" + playerRole).set(choice);
}

// ---------- SHARED LOGIC ----------
function getResult(u, o) {
  if (u === o) return "It's a draw!";
  if ((u === "stone"   && o === "scissor") ||
      (u === "paper"   && o === "stone")   ||
      (u === "scissor" && o === "paper")) {
    return "You win!";
  }
  return "You lose!";
}

function showResult(u, o, res) {
  const rd = document.getElementById("result"),
        bd = document.getElementById("banter");

  let html = `You chose: ${u}<br>Opponent chose: ${o}<br>${res}`;
  if (res === "You win!") {
    wins++;
    winSound.play();
    html += `<br><img src="excited.gif" style="width:100px;">`;
  } else if (res === "You lose!") {
    losses++;
    gameover.pause(); gameover.currentTime = 0; gameover.play();
    html += `<br><img src="you lose.png" style="width:80px;">`;
  } else {
    draws++;
    drawSound.play();
    html += `<br><img src="image.png" style="width:80px;">`;
  }

  rd.innerHTML = html;
  const banterArr = res === "You win!"
                    ? winBanter
                    : res === "You lose!"
                      ? loseBanter
                      : drawBanter;
  bd.innerText = banterArr[Math.floor(Math.random() * banterArr.length)];

  updateLeaderboard();
  checkAchievements();
}

function resetGame() {
  ["result", "banter", "achievement"].forEach(id => {
    document.getElementById(id).innerText = "";
  });
  wins = losses = draws = 0;
  achievements = {
    firstWin: false, fiveWins: false,
    firstDraw: false, threeLosses: false
  };
  updateLeaderboard();
}

function updateLeaderboard() {
  document.getElementById("wins").innerText   = wins;
  document.getElementById("losses").innerText = losses;
  document.getElementById("draws").innerText  = draws;
}

function checkAchievements() {
  const aDiv = document.getElementById("achievement"),
        msgs = [];
  if (!achievements.firstWin    && wins   >= 1) { achievements.firstWin    = true; msgs.push("🏆 First Win!"); }
  if (!achievements.fiveWins    && wins   >= 5) { achievements.fiveWins    = true; msgs.push("🏆 5 Wins!"); }
  if (!achievements.firstDraw   && draws  >= 1) { achievements.firstDraw   = true; msgs.push("🤝 First Draw!"); }
  if (!achievements.threeLosses && losses >= 3) { achievements.threeLosses = true; msgs.push("😅 3 Losses!"); }

  if (msgs.length) {
    aDiv.innerHTML = msgs.join("<br>");
    setTimeout(() => { aDiv.innerHTML = ""; }, 3000);
  }
}

// ---------- TOGGLE INLINE LEADERBOARD ----------
const lbBtn = document.getElementById("toggle-leaderboard-btn"),
      lbDiv = document.querySelector(".leaderboard-inline");

lbBtn.addEventListener("click", () => {
  const hidden = getComputedStyle(lbDiv).display === "none";
  lbDiv.style.display    = hidden ? "block" : "none";
  lbBtn.textContent      = hidden ? "Hide Leaderboard" : "Show Leaderboard";
});



