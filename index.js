let startgame = document.querySelector(".cover span");
let helloName = document.querySelector(".hello span");
let myBoxs = Array.from(document.querySelectorAll(".box"));
let wrongsTries = document.querySelector(".wrong-tries span");
let fullResult = 0;
let theName;
let nameLeader = document.querySelector(".name");
let timeLeader = document.querySelector(".leadership .time");

//Start the game ...
startgame.onclick = () => {
  theName = prompt("What Is Your name?");
  if (theName === "" || theName === null) {
    helloName.innerHTML = "Unknown";
  } else {
    helloName.innerHTML = theName;
  }
  startgame.parentElement.style.display = "none";
  onStart();
  setTimeout(() => {
    startTime();
  }, 5000);
};

function onStart() {
  myBoxs.forEach((box) => {
    box.classList.add("rotated");
  });
  setTimeout(() => {
    myBoxs.forEach((box) => {
      box.classList.remove("rotated");
    });
  }, 5000);
}

// set time ..
let levels = document.querySelector(".levels select");
let timing = document.querySelector(".timing");
let min = document.querySelector(".time .min");
let sec = document.querySelector(".time .sec");
let time = document.querySelector(".levels");
let timeOut = document.querySelector(".time-out");

levels.addEventListener("click", () => {
  switch (levels.value) {
    case "easy":
      min.innerHTML = "01:";
      sec.innerHTML = 30;
      break;
    case "normal":
      min.innerHTML = "00:";
      sec.innerHTML = 60;
      break;
    case "hard":
      min.innerHTML = "00:";
      sec.innerHTML = 40;
  }
});

function startTime() {
  timing.style.display = "flex";
  time.style.display = "none";
  timing.innerHTML = `${min.innerHTML}${sec.innerHTML}`;
  let degSec = setInterval(() => {
    if (fullResult === 10) {
      clearInterval(degSec);
    }
    sec.innerHTML--;
    timing.innerHTML = `${min.innerHTML}${
      sec.innerHTML < 10 ? `0${sec.innerHTML}` : sec.innerHTML
    }`;
    if (sec.innerHTML < 10 && min.innerHTML === "00:") {
      timing.style.color = "red";
    } else {
      timing.style.color = "#00bcd4";
    }
    if (sec.innerHTML === "0") {
      if (min.innerHTML !== "00:") {
        sec.innerHTML = 60;
        min.innerHTML = "00:";
      } else {
        clearInterval(degSec);
        timeOut.style.display = "flex";
      }
    }
  }, 1000);
}
document.querySelector(".time-out .play-again").onclick = () => {
  myBoxs.forEach((box) => {
    box.classList.remove("rotated");
  });
  wrongsTries.innerHTML = 0;
  timeOut.style.display = "none";
  startgame.parentElement.style.display = "flex";
  levels.click();
  shuffel();
  timing.style.display = "none";
  time.style.display = "flex";
  startgame.onclick = () => {
    startgame.parentElement.style.display = "none";
    onStart();
    setTimeout(() => {
      startTime();
    }, 5000);
  };
};
//Shuffel the images ...

function shuffel() {
  let myArr = [...myBoxs.keys()];
  let myShuffelArr = [];
  for (let i = 0; i < myBoxs.length; i++) {
    let theNum = myArr[Math.floor(Math.random() * myArr.length)];
    myShuffelArr.push(theNum);
    myArr.splice(myArr.indexOf(theNum), 1);
  }
  myBoxs.forEach((box, i) => {
    box.style.order = myShuffelArr[i];
  });
}
shuffel();

//main function ..
let boxsCount = [];
myBoxs.forEach((box) => {
  box.onclick = (e) => {
    handelRotate(e.currentTarget);
    handelAnswers();
    theResult();
  };
});

// manage rotation ..

function handelRotate(b) {
  if (boxsCount.length < 2) {
    b.classList.add("rotated");
    boxsCount.push(b);
  } else if (boxsCount.length === 2) {
    return false;
  }
}

//manage answers ..
function handelAnswers() {
  if (boxsCount.length === 2) {
    myBoxs.forEach((box) => {
      box.classList.add("block");
    });
    if (boxsCount[0].dataset.image === boxsCount[1].dataset.image) {
      fullResult++;
      boxsCount = [];
      myBoxs.forEach((box) => {
        box.classList.remove("block");
      });
    } else {
      wrongsTries.innerHTML++;
      setTimeout(() => {
        boxsCount.forEach((box) => {
          box.classList.remove("rotated");
          boxsCount = [];
        });
        myBoxs.forEach((box) => {
          box.classList.remove("block");
        });
      }, 1000);
    }
  }
}

//manage result ..
let result = document.querySelector(".result");
let ro = document.querySelector(".result .sco");

function theResult() {
  let truessss = 0;
  myBoxs.forEach((box) => {
    if (box.classList.contains("rotated")) {
      truessss++;
    }
  });
  if (truessss === myBoxs.length) {
    result.style.display = "flex";
    ro.innerHTML = `your wrong tries are ${wrongsTries.innerHTML}`;
    document.querySelector(".play-again").onclick = () => {
      playAgain();
    };
  }
}

function playAgain() {
  fullResult = 0;
  myBoxs.forEach((box) => {
    box.classList.remove("rotated");
  });
  result.style.display = "none";
  wrongsTries.innerHTML = 0;
  timeOut.style.display = "none";
  startgame.parentElement.style.display = "flex";
  levels.click();
  shuffel();
  timing.style.display = "none";
  time.style.display = "flex";
  startgame.onclick = () => {
    startgame.parentElement.style.display = "none";
    onStart();
    setTimeout(() => {
      startTime();
    }, 5000);
  };
}
