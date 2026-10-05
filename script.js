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
    "scarepig.gif"
  ],

  no: [
    "NoReady/furious_pig.gif"
  ],

  sorry: [
    "Sorry/weeping_pig.gif"
  ]
};


/* ---------- page navigation ---------- */

const screens = [...document.querySelectorAll(".screen")];

function show(id){
  screens.forEach(s =>
    s.classList.toggle("active", s.id === id)
  );

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


function toast(msg){
  const el = document.getElementById("toast");

  el.textContent = msg;
  el.classList.add("show");

  setTimeout(() => {
    el.classList.remove("show");
  }, 1800);
}


/* ---------- reusable reaction popup ---------- */

const reactionOverlay = document.getElementById("reactionOverlay");
const reactionGif = document.getElementById("reactionGif");
const reactionEmoji = document.getElementById("reactionEmoji");
const reactionTitle = document.getElementById("reactionTitle");
const reactionMessage = document.getElementById("reactionMessage");
const reactionAction = document.getElementById("reactionAction");
const reactionClose = document.getElementById("reactionClose");

const wrongDobGifs = document.getElementById("wrongDobGifs");
const noReadyGifs = document.getElementById("noReadyGifs");
const sorryGifs = document.getElementById("sorryGifs");

let reactionTimer = null;


/* ---------- smooth main GIF transition ---------- */

function setReactionGif(src){

  if(!reactionGif) return;

  const nextSrc = `assets/gifs/${src}`;

  reactionGif.classList.add("gif-changing");

  /*
    If the same GIF is already loaded,
    just play the fade transition.
  */

  if(reactionGif.src.endsWith(nextSrc)){

    requestAnimationFrame(() => {
      reactionGif.classList.remove("gif-changing");
    });

    return;
  }


  /*
    Preload the new GIF first.
    This prevents the image area from
    flashing while the GIF loads.
  */

  const preloader = new Image();


  const showNext = () => {

    reactionGif.src = nextSrc;

    requestAnimationFrame(() => {

      requestAnimationFrame(() => {

        reactionGif.classList.remove("gif-changing");

      });

    });

  };


  preloader.onload = showNext;

  preloader.onerror = showNext;

  preloader.src = nextSrc;
}


/* ---------- decorative GIF transition ---------- */

function shuffleDecorativeGifs(container, files){

  if(!container) return;

  const imgs = [
    ...container.querySelectorAll("img")
  ];


  /*
    Shuffle the decorative GIFs
    so they can change on every click.
  */

  const shuffled = [...files].sort(
    () => Math.random() - 0.5
  );


  imgs.forEach((img, index) => {

    const next =
      shuffled[index % shuffled.length];

    const nextSrc =
      `assets/gifs/${next}`;


    img.classList.add("gif-changing");


    const preloader = new Image();


    const showNext = () => {

      img.src = nextSrc;

      requestAnimationFrame(() => {

        requestAnimationFrame(() => {

          img.classList.remove(
            "gif-changing"
          );

        });

      });

    };


    preloader.onload = showNext;

    preloader.onerror = () => {
      img.classList.remove("gif-changing");
    };


    preloader.src = nextSrc;

  });

}


/* ---------- NO world GIFs ---------- */

const NO_DECOR_GIFS = [

  "NoReady/angry.gif",

  "NoReady/Crying_girl.gif",

  "NoReady/ohh.gif",

  "NoReady/OMG.gif",

  "NoReady/what.gif",

  "NoReady/cryyy.gif"

];


/* ---------- SORRY world GIFs ---------- */

const SORRY_DECOR_GIFS = [

  "Sorry/crying.gif",

  "Sorry/crying-saree.gif",

  "Sorry/Crying_girl.gif",

  "Sorry/what.gif",

  "Sorry/cryyy.gif"

];


/* ---------- random GIF ---------- */

function randomGif(list){

  return list[
    Math.floor(
      Math.random() * list.length
    )
  ];

}


/* ---------- open reaction ---------- */

function openReaction({
  gif,
  emoji,
  title,
  message,
  buttonText,
  action
}){

  clearTimeout(reactionTimer);


  /*
    Change the center GIF
    with smooth transition.
  */

  setReactionGif(gif);


  reactionEmoji.textContent =
    emoji || "";

  reactionTitle.textContent =
    title;

  reactionMessage.textContent =
    message;

  reactionAction.textContent =
    buttonText || "Okay";

  reactionAction.onclick =
    action || closeReaction;


  /*
    WRONG DOB WORLD
  */

  if(gif === "scarepig.gif"){

    wrongDobGifs.classList.remove(
      "hidden"
    );

    noReadyGifs.classList.add(
      "hidden"
    );

    sorryGifs.classList.add(
      "hidden"
    );

  }


  /*
    NO WORLD
  */

  else if(
    gif === "NoReady/furious_pig.gif"
  ){

    wrongDobGifs.classList.add(
      "hidden"
    );

    sorryGifs.classList.add(
      "hidden"
    );

    noReadyGifs.classList.remove(
      "hidden"
    );


    /*
      Refresh NO decorative GIFs
      every time NO is clicked.
    */

    shuffleDecorativeGifs(
      noReadyGifs,
      NO_DECOR_GIFS
    );

  }


  /*
    SORRY WORLD
  */

  else if(
    gif === "Sorry/weeping_pig.gif"
  ){

    wrongDobGifs.classList.add(
      "hidden"
    );

    noReadyGifs.classList.add(
      "hidden"
    );

    sorryGifs.classList.remove(
      "hidden"
    );


    /*
      Refresh SORRY decorative GIFs
      every time Sorry is clicked.
    */

    shuffleDecorativeGifs(
      sorryGifs,
      SORRY_DECOR_GIFS
    );

  }


  /*
    Anything else:
    hide decorative GIFs.
  */

  else{

    wrongDobGifs.classList.add(
      "hidden"
    );

    noReadyGifs.classList.add(
      "hidden"
    );

    sorryGifs.classList.add(
      "hidden"
    );

  }


  reactionOverlay.classList.remove(
    "hidden"
  );

  reactionOverlay.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "modal-open"
  );

}


/* ---------- close reaction ---------- */

function closeReaction(){

  clearTimeout(reactionTimer);


  wrongDobGifs.classList.add(
    "hidden"
  );

  noReadyGifs.classList.add(
    "hidden"
  );

  sorryGifs.classList.add(
    "hidden"
  );


  reactionOverlay.classList.add(
    "hidden"
  );

  reactionOverlay.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "modal-open"
  );

}


/* ---------- reaction close buttons ---------- */

reactionClose.onclick =
  closeReaction;


reactionOverlay.addEventListener(
  "click",
  (e) => {

    if(e.target === reactionOverlay){

      closeReaction();

    }

  }
);


/* ---------- birthday check ---------- */

const day =
  document.getElementById("day");

const month =
  document.getElementById("month");

const year =
  document.getElementById("year");


document.getElementById(
  "birthdayBtn"
).onclick = () => {


  const enteredBirthday =
    `${year.value}-${month.value.padStart(2, "0")}-${day.value.padStart(2, "0")}`;


  /*
    Correct birthday
  */

  if(
    enteredBirthday ===
    CONFIG.correctBirthday
  ){

    show("readyScreen");

  }


  /*
    Wrong birthday
  */

  else{

    openReaction({

      gif:
        randomGif(
          REACTION_GIFS.wrongBirthday
        ),

      emoji:
        "😤🐷",

      title:
        "WRONGGG! 😤",

      message:
        "This is only for Pandi Pakodi... you can't fool the pig 🐷",

      buttonText:
        "Try Again 🥺",

      action: () => {

        closeReaction();

        day.value = "";

        month.value = "";

        year.value = "";

        day.focus();

      }

    });


    toast(
      "Wrong birthday 😤"
    );

  }

};


/* ---------- READY PAGE ---------- */


/*
  YES button
*/

document.getElementById(
  "yesBtn"
).onclick = () => {

  show("celebrateScreen");

};


/*
  NO button
*/

document.getElementById(
  "noBtn"
).onclick = () => {


  openReaction({

    gif:
      randomGif(
        REACTION_GIFS.no
      ),

    emoji:
      "😡💢",

    title:
      "NO?! 😤",

    message:
      "Excuse me madam... WHO SAID NO? 🐷💢",

    buttonText:
      "Sorry 🥺",


    /*
      When she clicks Sorry:
      completely switch from NO world
      to the separate SORRY world.
    */

    action: () => {


      /*
        Change center pig
        from furious pig
        to weeping pig.
      */

      setReactionGif(
        randomGif(
          REACTION_GIFS.sorry
        )
      );


      /*
        Hide NO decorative GIFs.
      */

      noReadyGifs.classList.add(
        "hidden"
      );


      /*
        Show SORRY decorative GIFs.
      */

      sorryGifs.classList.remove(
        "hidden"
      );


      /*
        Randomize SORRY GIFs
        with smooth transition.
      */

      shuffleDecorativeGifs(
        sorryGifs,
        SORRY_DECOR_GIFS
      );


      /*
        Change text.
      */

      reactionEmoji.textContent =
        "🥺😭";

      reactionTitle.textContent =
        "Hmmmm... 🥺";

      reactionMessage.textContent =
        "Okay okayyy... forgiveness this time 😭🩷";

      reactionAction.textContent =
        "Okayyy 🐷";


      /*
        Okayyy button
      */

      reactionAction.onclick =
        () => {

          closeReaction();

          show("readyScreen");

        };

    }

}      

  );

};


/* ---------- birthday celebration ---------- */

const celebrateBtn =
  document.getElementById(
    "celebrateBtn"
  );

const afterCelebrate =
  document.getElementById(
    "afterCelebrate"
  );

let celebrationStarted =
  false;


function startCelebration(){

  const fx =
    document.getElementById(
      "celebrationFx"
    );


  fx.innerHTML = "";

  fx.classList.add(
    "show"
  );


  /*
    Balloons
  */

  [
    "🎈",
    "🎈",
    "🎈",
    "🎈",
    "🎈",
    "🎈",
    "🎈",
    "🎈"
  ].forEach(
    (emoji, i) => {


      const balloon =
        document.createElement(
          "span"
        );


      balloon.className =
        "fx-balloon";


      balloon.textContent =
        emoji;


      balloon.style.left =
        `${5 + Math.random() * 90}%`;


      balloon.style.animationDelay =
        `${Math.random() * 1.2}s`;


      balloon.style.animationDuration =
        `${3.2 + Math.random() * 2}s`;


      fx.appendChild(
        balloon
      );

    }
  );


  /*
    Confetti / party popups
  */

  const pieces = [
    "🎉",
    "✨",
    "🥳",
    "💖",
    "🎊",
    "🐷",
    "🎀",
    "⭐"
  ];


  for(let i = 0; i < 30; i++){

    const piece =
      document.createElement(
        "span"
      );


    piece.className =
      "fx-confetti";


    piece.textContent =
      pieces[
        i % pieces.length
      ];


    piece.style.left =
      `${Math.random() * 100}%`;


    piece.style.top =
      `${5 + Math.random() * 25}%`;


    piece.style.animationDelay =
      `${Math.random() * .9}s`;


    piece.style.animationDuration =
      `${1.8 + Math.random() * 1.8}s`;


    fx.appendChild(
      piece
    );

  }


  setTimeout(() => {

    fx.classList.remove(
      "show"
    );

    fx.innerHTML = "";

  }, 6000);

}


celebrateBtn.onclick = () => {


  if(!celebrationStarted){

    celebrationStarted = true;

    afterCelebrate.classList.remove(
      "hidden"
    );

  }


  startCelebration();


  /* Smoothly bring the newly revealed next step into view.
     The celebration section is taller on phones, so without
     this the Continue to Gift button can remain below the fold. */
  setTimeout(() => {

    afterCelebrate.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }, 180);


  toast(
    "PARTYYYY! 🎉🐷🎈"
  );

};


document.getElementById(
  "giftBtn"
).onclick = () => {

  initPuzzle();

  show("puzzleScreen");

};


/* ---------- 9-piece drag & place puzzle ---------- */

const puzzleBoard =
  document.getElementById(
    "puzzleBoard"
  );

const puzzlePieces =
  document.getElementById(
    "puzzlePieces"
  );

const puzzleMessage =
  document.getElementById(
    "puzzleMessage"
  );

const puzzleSolved =
  document.getElementById(
    "puzzleSolved"
  );


let placedPieces = 0;

let draggedPiece = null;


/* ---------- create puzzle board ---------- */

function createPuzzleBoard(){

  puzzleBoard.innerHTML = "";


  for(let i = 0; i < 9; i++){

    const slot =
      document.createElement(
        "div"
      );


    slot.className =
      "puzzle-slot";


    slot.dataset.position =
      i;


    puzzleBoard.appendChild(
      slot
    );


    /*
      Desktop drag
    */

    slot.addEventListener(
      "dragover",
      (e) => {

        e.preventDefault();


        if(
          !slot.classList.contains(
            "correct"
          )
        ){

          slot.classList.add(
            "drag-over"
          );

        }

      }
    );


    slot.addEventListener(
      "dragleave",
      () => {

        slot.classList.remove(
          "drag-over"
        );

      }
    );


    slot.addEventListener(
      "drop",
      (e) => {

        e.preventDefault();

        slot.classList.remove(
          "drag-over"
        );

        placePiece(slot);

      }
    );


    /*
      Phone touch
    */

    slot.addEventListener(
      "pointerup",
      () => {

        placePiece(slot);

      }
    );

  }

}


/* ---------- create puzzle pieces ---------- */

function createPuzzlePieces(){

  puzzlePieces.innerHTML = "";

  placedPieces = 0;


  puzzleMessage.textContent =
    "Start with any piece 🐷";


  /*
    Numbers 0-8 represent
    the correct positions.
  */

  const pieces =
    [...Array(9).keys()];


  /*
    Shuffle pieces.
  */

  pieces.sort(
    () => Math.random() - 0.5
  );


  pieces.forEach(
    pieceNumber => {


      const piece =
        document.createElement(
          "div"
        );


      piece.className =
        "puzzle-piece";


      piece.dataset.piece =
        pieceNumber;


      piece.draggable =
        true;


      /*
        Show the correct part
        of the photo.
      */

      const column =
        pieceNumber % 3;


      const row =
        Math.floor(
          pieceNumber / 3
        );


      piece.style.backgroundPosition =
        `${column * 50}% ${row * 50}%`;


      /*
        Desktop drag
      */

      piece.addEventListener(
        "dragstart",
        () => {

          draggedPiece =
            piece;

          piece.classList.add(
            "dragging"
          );

        }
      );


      piece.addEventListener(
        "dragend",
        () => {

          piece.classList.remove(
            "dragging"
          );

        }
      );


      /*
        Touch
      */

      piece.addEventListener(
        "pointerdown",
        () => {

          draggedPiece =
            piece;

          piece.classList.add(
            "dragging"
          );

        }
      );


      puzzlePieces.appendChild(
        piece
      );

    }
  );

}


/* ---------- place piece ---------- */

function placePiece(slot){

  if(!draggedPiece)
    return;


  if(
    slot.classList.contains(
      "correct"
    )
  ){

    puzzleMessage.textContent =
      "That place is already taken 😌🐷";

    return;

  }


  const pieceNumber =
    Number(
      draggedPiece.dataset.piece
    );


  const targetPosition =
    Number(
      slot.dataset.position
    );


  /*
    Correct position
  */

  if(
    pieceNumber === targetPosition
  ){

    slot.appendChild(
      draggedPiece
    );


    slot.classList.add(
      "correct"
    );


    draggedPiece.classList.remove(
      "dragging"
    );


    draggedPiece.draggable =
      false;


    draggedPiece.style.pointerEvents =
      "none";


    placedPieces++;


    puzzleMessage.textContent =
      `Niceee! ${placedPieces}/9 pieces placed 🐷✨`;


    draggedPiece =
      null;


    /*
      Finished
    */

    if(
      placedPieces === 9
    ){

      puzzleMessage.textContent =
        "YOU DID IT!! 🎉🐷";


      setTimeout(
        () => {

          puzzleSolved.classList.remove(
            "hidden"
          );


          toast(
            "Puzzle solved! 🎁🩷"
          );

        },
        500
      );

    }

  }


  /*
    Wrong position
  */

  else{

    draggedPiece.classList.remove(
      "dragging"
    );


    puzzleMessage.textContent =
      "Nopeee 😂 Try another place! 🐷";


    draggedPiece =
      null;

  }

}


/* ---------- final surprise ---------- */

const openVideoBtn =
  document.getElementById(
    "openVideoBtn"
  );

const replaySurpriseBtn =
  document.getElementById(
    "replaySurpriseBtn"
  );

const surpriseVideo =
  document.getElementById(
    "surpriseVideo"
  );

const surpriseText =
  document.getElementById(
    "surpriseText"
  );


/*
  The old six PNG/CSS animation
  has been removed.

  The new surprise uses the supplied
  video, converted to 1080x1920 (9:16).

  muted + playsinline makes autoplay/replay
  much more reliable on iPhone/iPad.
*/

let surpriseStarted =
  false;


function resetSurpriseUI(){

  replaySurpriseBtn.classList.add(
    "hidden"
  );

  openVideoBtn.classList.add(
    "hidden"
  );

  surpriseText.textContent =
    "Waittt... 🐽";

}


function playSurpriseAnimation(){

  if(!surpriseVideo)
    return;


  surpriseStarted =
    true;


  resetSurpriseUI();


  surpriseVideo.pause();

  surpriseVideo.currentTime =
    0;


  const playPromise =
    surpriseVideo.play();


  if(
    playPromise &&
    typeof playPromise.catch ===
      "function"
  ){

    playPromise.catch(() => {

      /*
        Some browsers may require
        one extra user tap before playback.
      */

      surpriseText.textContent =
        "Tap to play the surprise 🐽";

    });

  }

}


if(surpriseVideo){

  surpriseVideo.addEventListener(
    "timeupdate",
    () => {

      const t =
        surpriseVideo.currentTime;


      if(t < 1.3){

        surpriseText.textContent =
          "Waittt... 🐽";

      }

      else if(t < 2.4){

        surpriseText.textContent =
          "POP! 💥";

      }

      else if(t < 4.2){

        surpriseText.textContent =
          "Wait... 👀";

      }

      else if(t < 7.0){

        surpriseText.textContent =
          "Something is changing... ✨";

      }

      else{

        surpriseText.textContent =
          "";

      }

    }
  );


  surpriseVideo.addEventListener(
    "ended",
    () => {

      /*
        Intentionally blank.
        The old:
        "A little surprise, just for you ❤️"
        has been removed.
      */

      surpriseText.textContent =
        "";


      replaySurpriseBtn.classList.remove(
        "hidden"
      );


      openVideoBtn.classList.remove(
        "hidden"
      );

    }
  );


  surpriseVideo.addEventListener(
    "error",
    () => {

      surpriseText.textContent =
        "The surprise animation could not be loaded 😭";

    }
  );

}


/* ---------- surprise button ---------- */

const surpriseBtn =
  document.getElementById("surpriseBtn");

surpriseBtn.onclick = () => {

  show("surpriseScreen");

  playSurpriseAnimation();

};


/* ---------- replay surprise ---------- */

replaySurpriseBtn.onclick = () => {

  playSurpriseAnimation();

};


/* ---------- open final birthday video ---------- */

openVideoBtn.onclick = () => {

  if(surpriseVideo)
    surpriseVideo.pause();


  show("videoScreen");


  const video =
    document.getElementById(
      "birthdayVideo"
    );


  video.play().catch(
    () => {}
  );

};


/* ---------- start puzzle ---------- */

function initPuzzle(){

  puzzleSolved.classList.add(
    "hidden"
  );


  createPuzzleBoard();

  createPuzzlePieces();

}


/* ---------- start once ---------- */

initPuzzle();