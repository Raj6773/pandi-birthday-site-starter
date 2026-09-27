/* ================================
   PANDI BIRTHDAY SITE - EASY SETUP
   Change ONLY these values first.
================================= */

const CONFIG = {
  // Put her birthday here as YYYY-MM-DD.
  // Example: "2001-08-31"
  correctBirthday: "2004-10-23",

  // Optional display name.
  name: "Pandi"
};

/* ---------- reaction GIF choices ----------
   Change the filenames here whenever you want.
   All files should be inside assets/gifs/
--------------------------------------------- */
const REACTION_GIFS = {
  wrongBirthday: [
    "WrongDOB/OMG.gif",
    "WrongDOB/ohh.gif",
    "WrongDOB/angry.gif",
    "WrongDOB/Angry_girl.gif",
    "WrongDOB/cryyy.gif"
  ],

  no: ["kingpig.gif"],

  sorry: ["laughpig.gif"]
};

/* ---------- page navigation ---------- */
const screens = [...document.querySelectorAll(".screen")];
function show(id){
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  window.scrollTo({top:0, behavior:"smooth"});
}
function toast(msg){
  const el=document.getElementById("toast");
  el.textContent=msg; el.classList.add("show");
  setTimeout(()=>el.classList.remove("show"),1800);
}

/* ---------- reusable reaction popup ---------- */
const reactionOverlay = document.getElementById("reactionOverlay");
const reactionGif = document.getElementById("reactionGif");
const reactionEmoji = document.getElementById("reactionEmoji");
const reactionTitle = document.getElementById("reactionTitle");
const reactionMessage = document.getElementById("reactionMessage");
const reactionAction = document.getElementById("reactionAction");
const reactionClose = document.getElementById("reactionClose");

let reactionTimer = null;

function randomGif(list){
  return list[Math.floor(Math.random() * list.length)];
}

function openReaction({gif, emoji, title, message, buttonText, action}){
  clearTimeout(reactionTimer);

  reactionGif.src = `assets/gifs/${gif}`;
  reactionEmoji.textContent = emoji || "";
  reactionTitle.textContent = title;
  reactionMessage.textContent = message;
  reactionAction.textContent = buttonText || "Okay";
  reactionAction.onclick = action || closeReaction;

  reactionOverlay.classList.remove("hidden");
  reactionOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeReaction(){
  clearTimeout(reactionTimer);
  reactionOverlay.classList.add("hidden");
  reactionOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

reactionClose.onclick = closeReaction;
reactionOverlay.addEventListener("click", (e)=>{
  if(e.target === reactionOverlay) closeReaction();
});

/* ---------- birthday check ---------- */
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

document.getElementById("birthdayBtn").onclick = () => {
  const enteredBirthday =
    `${year.value}-${month.value.padStart(2, "0")}-${day.value.padStart(2, "0")}`;

  if (enteredBirthday === CONFIG.correctBirthday) {
    show("readyScreen");
  } else {
    openReaction({
      gif: "scarepig.gif",
      emoji: "",
      title: "WRONGGG!",
      message: "This is only for Pandi Pakodi... you can't fool the pig 🐷",
      buttonText: "Try Again 🥺",
      action: () => {
        closeReaction();
        day.value = "";
        month.value = "";
        year.value = "";
        day.focus();
      }
    });
    toast("Wrong birthday 😤");
  }
};

/* ---------- ready page ---------- */

document.getElementById("yesBtn").onclick = () => {
  show("celebrateScreen");
};

document.getElementById("noBtn").onclick = () => {
  openReaction({
    gif: randomGif(REACTION_GIFS.no),
    emoji: "😡💢",
    title: "NO?! 😤",
    message: "Excuse me madam... WHO SAID NO? 🐷💢",
    buttonText: "Sorry 🥺",
    action: () => {
      reactionGif.src = `assets/gifs/${randomGif(REACTION_GIFS.sorry)}`;
      reactionEmoji.textContent = "🥺😭";
      reactionTitle.textContent = "Hmmmm... 🥺";
      reactionMessage.textContent = "Okay okayyy... forgiveness this time 😭🩷";
      reactionAction.textContent = "Okayyy 🐷";
      reactionAction.onclick = () => {
        closeReaction();
        show("readyScreen");
      };

      /* Let the crying/sorry GIF and silly message stay visible for a moment. */
      reactionTimer = setTimeout(() => {
        closeReaction();
        show("readyScreen");
      }, 2800);
    }
  });
};

/* ---------- birthday celebration ---------- */
const celebrateBtn = document.getElementById("celebrateBtn");
const afterCelebrate = document.getElementById("afterCelebrate");
let celebrationStarted = false;

function startCelebration(){
  const fx = document.getElementById("celebrationFx");
  fx.innerHTML = "";
  fx.classList.add("show");

  /* Balloons */
  ["🎈","🎈","🎈","🎈","🎈","🎈","🎈","🎈"].forEach((emoji, i) => {
    const balloon = document.createElement("span");
    balloon.className = "fx-balloon";
    balloon.textContent = emoji;
    balloon.style.left = `${5 + Math.random() * 90}%`;
    balloon.style.animationDelay = `${Math.random() * 1.2}s`;
    balloon.style.animationDuration = `${3.2 + Math.random() * 2}s`;
    fx.appendChild(balloon);
  });

  /* Confetti / party popups */
  const pieces = ["🎉","✨","🥳","💖","🎊","🐷","🎀","⭐"];
  for(let i = 0; i < 30; i++){
    const piece = document.createElement("span");
    piece.className = "fx-confetti";
    piece.textContent = pieces[i % pieces.length];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.top = `${5 + Math.random() * 25}%`;
    piece.style.animationDelay = `${Math.random() * .9}s`;
    piece.style.animationDuration = `${1.8 + Math.random() * 1.8}s`;
    fx.appendChild(piece);
  }

  setTimeout(() => {
    fx.classList.remove("show");
    fx.innerHTML = "";
  }, 6000);
}

celebrateBtn.onclick = () => {
  if(!celebrationStarted){
    celebrationStarted = true;
    afterCelebrate.classList.remove("hidden");
  }
  startCelebration();
  toast("PARTYYYY! 🎉🐷🎈");
};

document.getElementById("giftBtn").onclick = () => {
  initPuzzle();
  show("puzzleScreen");
};

/* ---------- 9-piece drag & place puzzle ---------- */

const puzzleBoard = document.getElementById("puzzleBoard");
const puzzlePieces = document.getElementById("puzzlePieces");
const puzzleMessage = document.getElementById("puzzleMessage");
const puzzleSolved = document.getElementById("puzzleSolved");

let placedPieces = 0;
let draggedPiece = null;


/* ---------- create puzzle board ---------- */

function createPuzzleBoard(){

  puzzleBoard.innerHTML = "";

  for(let i = 0; i < 9; i++){

    const slot = document.createElement("div");

    slot.className = "puzzle-slot";
    slot.dataset.position = i;

    puzzleBoard.appendChild(slot);


    /* Desktop drag */

    slot.addEventListener("dragover", (e)=>{
      e.preventDefault();

      if(!slot.classList.contains("correct")){
        slot.classList.add("drag-over");
      }
    });

    slot.addEventListener("dragleave", ()=>{
      slot.classList.remove("drag-over");
    });

    slot.addEventListener("drop", (e)=>{
      e.preventDefault();

      slot.classList.remove("drag-over");

      placePiece(slot);
    });


    /* Phone touch */

    slot.addEventListener("pointerup", ()=>{
      placePiece(slot);
    });

  }

}


/* ---------- create puzzle pieces ---------- */

function createPuzzlePieces(){

  puzzlePieces.innerHTML = "";

  placedPieces = 0;

  puzzleMessage.textContent =
    "Start with any piece 🐷";


  /*
    Numbers 0-8 represent the
    correct positions.
  */

  const pieces = [...Array(9).keys()];


  /* Shuffle pieces */

  pieces.sort(() => Math.random() - 0.5);


  pieces.forEach(pieceNumber => {

    const piece = document.createElement("div");

    piece.className = "puzzle-piece";

    piece.dataset.piece = pieceNumber;

    piece.draggable = true;


    /*
      Show the correct part
      of the photo.
    */

    const column = pieceNumber % 3;
    const row = Math.floor(pieceNumber / 3);

    piece.style.backgroundPosition =
      `${column * 50}% ${row * 50}%`;


    /* Desktop drag */

    piece.addEventListener("dragstart", ()=>{

      draggedPiece = piece;

      piece.classList.add("dragging");

    });


    piece.addEventListener("dragend", ()=>{

      piece.classList.remove("dragging");

    });


    /* Touch */

    piece.addEventListener("pointerdown", ()=>{

      draggedPiece = piece;

      piece.classList.add("dragging");

    });


    puzzlePieces.appendChild(piece);

  });

}


/* ---------- place piece ---------- */

function placePiece(slot){

  if(!draggedPiece) return;

  if(slot.classList.contains("correct")){

    puzzleMessage.textContent =
      "That place is already taken 😌🐷";

    return;
  }


  const pieceNumber =
    Number(draggedPiece.dataset.piece);

  const targetPosition =
    Number(slot.dataset.position);


  /* Correct position */

  if(pieceNumber === targetPosition){

    slot.appendChild(draggedPiece);

    slot.classList.add("correct");

    draggedPiece.classList.remove("dragging");

    draggedPiece.draggable = false;

    draggedPiece.style.pointerEvents = "none";

    placedPieces++;

    puzzleMessage.textContent =
      `Niceee! ${placedPieces}/9 pieces placed 🐷✨`;


    draggedPiece = null;


    /* Finished */

    if(placedPieces === 9){

      puzzleMessage.textContent =
        "YOU DID IT!! 🎉🐷";


      setTimeout(()=>{

        puzzleSolved.classList.remove("hidden");

        toast("Puzzle solved! 🎁🩷");

      },500);


    }

  }


  /* Wrong position */

  else{

    draggedPiece.classList.remove("dragging");

    puzzleMessage.textContent =
      "Nopeee 😂 Try another place! 🐷";

    draggedPiece = null;

  }

}


/* ---------- final surprise ---------- */
const openVideoBtn = document.getElementById("openVideoBtn");
const replaySurpriseBtn = document.getElementById("replaySurpriseBtn");
const surpriseVideo = document.getElementById("surpriseVideo");
const surpriseText = document.getElementById("surpriseText");

/*
  The old six PNG/CSS animation has been removed.
  The new surprise uses the supplied video, converted to 1080x1920 (9:16).
  muted + playsinline makes autoplay/replay much more reliable on iPhone/iPad.
*/
let surpriseStarted = false;

function resetSurpriseUI(){
  replaySurpriseBtn.classList.add("hidden");
  openVideoBtn.classList.add("hidden");
  surpriseText.textContent = "Waittt... 🐽";
}

function playSurpriseAnimation(){
  if(!surpriseVideo) return;

  surpriseStarted = true;
  resetSurpriseUI();

  surpriseVideo.pause();
  surpriseVideo.currentTime = 0;

  const playPromise = surpriseVideo.play();
  if(playPromise && typeof playPromise.catch === "function"){
    playPromise.catch(() => {
      // Some browsers may require one extra user tap before playback.
      surpriseText.textContent = "Tap to play the surprise 🐽";
    });
  }
}

if(surpriseVideo){
  surpriseVideo.addEventListener("timeupdate", () => {
    const t = surpriseVideo.currentTime;

    if(t < 1.3){
      surpriseText.textContent = "Waittt... 🐽";
    }else if(t < 2.4){
      surpriseText.textContent = "POP! 💥";
    }else if(t < 4.2){
      surpriseText.textContent = "Wait... 👀";
    }else if(t < 7.0){
      surpriseText.textContent = "Something is changing... ✨";
    }else{
      surpriseText.textContent = "❤️";
    }
  });

  surpriseVideo.addEventListener("ended", () => {
    surpriseText.textContent = "A little surprise, just for you ❤️";
    replaySurpriseBtn.classList.remove("hidden");
    openVideoBtn.classList.remove("hidden");
  });

  surpriseVideo.addEventListener("error", () => {
    surpriseText.textContent = "The surprise animation could not be loaded 😭";
  });
}

surpriseBtn.onclick = () => {
  show("surpriseScreen");
  playSurpriseAnimation();
};

replaySurpriseBtn.onclick = () => {
  playSurpriseAnimation();
};

openVideoBtn.onclick = () => {
  if(surpriseVideo) surpriseVideo.pause();
  show("videoScreen");
  const video = document.getElementById("birthdayVideo");
  video.play().catch(() => {});
};

/* ---------- start puzzle ---------- */

function initPuzzle(){

  puzzleSolved.classList.add("hidden");

  createPuzzleBoard();

  createPuzzlePieces();

}



/* Start once */

initPuzzle();