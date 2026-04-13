let boxes = document.querySelectorAll(".newbox");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let msgturnO = document.querySelector("#turnO");
let containerO = document.querySelector(".containerO");
let containerX = document.querySelector(".containerX");
let msgturnX = document.querySelector("#turnX");

let turnO = true;
let count = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    containerO.style.visibility = "visible";
    containerX.style.visibility = "hidden";

};

boxes.forEach((box) =>{
    box.addEventListener("click", () =>{
        console.log("button was prassed");
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#ff005f";
            turnO = false;
        }else{
            box.innerText = "X";
            box.style.color = "#00ffe5";
            turnO = true;
        }
        box.disabled = true;
        count++;
        console.log(count);
        checkTurn();
        checkWinner();

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Deaw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        
        

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val ) {
                showWinner(pos1val);
                return true;
            }
        }
    }
    return false;
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

const checkTurn = () => {
    if (count % 2 === 0 ) {
        containerO.style.visibility = "visible";
        containerX.style.visibility = "hidden";
    }else{
        containerX.style.visibility = "visible";
        containerO.style.visibility = "hidden";
    }
}