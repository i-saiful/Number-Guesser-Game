// Define UI Element
const playBoard = document.querySelector('#play-board');
const chances = document.querySelector('#chances');
const hints = document.getElementById('hints');
const guessNumber = document.getElementById('guess-number')

// Add EvenetListener
playBoard.addEventListener('click', getNumber);

function getNumber(e) {
    const {nodeName, textContent} = e.target
    if(nodeName === 'SPAN') {
        count++
        palyGame(+textContent);
    }
    if(nodeName === 'BUTTON') {
        playBoard.innerHTML = `
            <span class="py-2 px-3 bg-light display-3 rounded m-2 d-inline-block" style="cursor: pointer">1</span>
            <span class="py-2 px-3 bg-light display-3 rounded m-2 d-inline-block" style="cursor: pointer">2</span>
            <span class="py-2 px-3 bg-light display-3 rounded m-2 d-inline-block" style="cursor: pointer">3</span>
            <span class="py-2 px-3 bg-light display-3 rounded m-2 d-inline-block" style="cursor: pointer">4</span>
            <span class="py-2 px-3 bg-light display-3 rounded m-2 d-inline-block" style="cursor: pointer">5</span>
            <span class="py-2 px-3 bg-light display-3 rounded m-2 d-inline-block" style="cursor: pointer">6</span>
            <span class="py-2 px-3 bg-light display-3 rounded m-2 d-inline-block" style="cursor: pointer">7</span>
            <span class="py-2 px-3 bg-light display-3 rounded m-2 d-inline-block" style="cursor: pointer">8</span>
            <span class="py-2 px-3 bg-light display-3 rounded m-2 d-inline-block" style="cursor: pointer">9</span>
            <span class="py-2 px-3 bg-light display-3 rounded m-2 d-inline-block" style="cursor: pointer">10</span>
        `
        
        chances.innerHTML = `
            <p class="py-4 px-5 bg-light display-3 mx-3 d-inline-block rounded">-</p>
            <p class="py-4 px-5 bg-light display-3 mx-3 d-inline-block rounded">-</p>
            <p class="py-4 px-5 bg-light display-3 mx-3 d-inline-block rounded">-</p>
        `

        guessNumber.textContent = '?'
    }
}

function palyGame(checkNumber) {
    if(checkNumber === randomNumber) {
        count = 0
        guessNumber.textContent = randomNumber;
        playBoard.innerHTML = `
        <p class="alert-success mx-auto py-2 px-3 rounded" style="font-size: 2rem; width: max-content;"><i class="bi bi-trophy-fill"></i> You Win</p>
        <button class="btn btn-primary" style="font-size: 2rem;">Game Start</button>
        `
        chances.innerHTML = ``;
        hints.innerHTML =  ``;
        randomNumber = Math.floor(Math.random() * high) + 1;
    } else if(checkNumber > randomNumber) {
        hints.innerHTML = `
            <div class="alert alert-warning alert-dismissible fade show mx-auto" role="alert" style="width: max-content;">
                Correct answer is <strong>smaller</strong>!
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `
    } else {
        hints.innerHTML = `
            <div class="alert alert-warning alert-dismissible fade show mx-auto" role="alert" style="width: max-content;">
                Correct answer is <strong>greater</strong>!
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `
    }

    if(count === 3) {
        count = 0
        guessNumber.textContent = randomNumber;
        playBoard.innerHTML = `
        <p class="alert-danger mx-auto py-2 px-3 rounded" style="font-size: 2rem; width: max-content;">You lose!</p>
        <button class="btn btn-primary" style="font-size: 2rem;">Game Start</button>
        `
        chances.innerHTML = ``
        hints.innerHTML =  ``
        randomNumber = Math.floor(Math.random() * high) + 1;
    } else if(count === 1) {
        chances.firstElementChild.textContent = checkNumber;
        chances.firstElementChild.classList.remove('bg-light');
        chances.firstElementChild.classList.add('alert-danger');
    } else if(count === 2) {
        chances.firstElementChild.nextElementSibling.textContent = checkNumber;
        chances.firstElementChild.nextElementSibling.classList.remove('bg-light');
        chances.firstElementChild.nextElementSibling.classList.add('alert-danger');
    } else {
        console.log('reset game');
    }
}

const low = 1;
const high = 10;
let randomNumber = Math.floor(Math.random() * high) + 1
let count = 0