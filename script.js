let boxes = document.querySelectorAll('.box');
let reset_btn = document.querySelector('#reset-btn')
let new_game_btn = document.querySelector('#new-btn')
let msg = document.querySelector('#msg')
let msgContainer = document.querySelector(".msg-container");


let turn_X = true
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const reset_game = () => {
    turn_X = true;
    count = 0
    enable_boxes();
    msgContainer.classList.add('hide')
}

const disable_boxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    })
}
const enable_boxes = () => {
    boxes.forEach((box) => {
        box.disabled = false
        box.innerText = '';
    })
}

const Drawn = () => {
    msg.innerText = "Game Drawn!"
    msgContainer.classList.remove("hide");
    disable_boxes()
}

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turn_X) {
            box.innerHTML = 'X';
            turn_X = false;
        } else {
            box.innerHTML = 'O';
            turn_X = true;
        }
        box.disabled = true;
        count++;
        let winner = isWinner();
        if (count == 9 && !winner) {
            Drawn();
        }
    });
});

const isWinner = () => {
    for (let pattern of winPatterns) {
        let p1 = boxes[pattern[0]].innerHTML;
        let p2 = boxes[pattern[1]].innerHTML;
        let p3 = boxes[pattern[2]].innerHTML;

        if (p1 == p2 && p2 == p3) {
            if (p1 != '' && p2 != '' && p3 != '') {
                show_winner(p2);
                return true
            }
        }
    }
}
const show_winner = (winner) => {
    msg.innerHTML = `Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disable_boxes();
}
new_game_btn.addEventListener('click', reset_game);
reset_btn.addEventListener('click', reset_game);