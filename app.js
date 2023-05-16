const screenWidth = document.body.clientWidth;
const screenHeight = document.body.clientHeight;
const wrapper = document.querySelector('#wrapper');
const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#8b88ef', '#e988ef', '#efe888', '#deb45a', '#de5a5a', '#5a8dde', '#bfe369', '#e36969']
let time = 0;
let score = 0;

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

function createBgCircle(number) {
    for (let index = 0; index < number; index++) {
        let size = getRandomNumber(350, 600);

        if (screenWidth < 600) {
            size = getRandomNumber(250, 450);
        }

        const positionTop = getRandomNumber(0, (screenHeight - size));
        const positionLeft = getRandomNumber(0, (screenWidth - size));
        const color = getRandomColor();

        const bgCircle = document.createElement('div');
        bgCircle.classList.add('bg-circle');
        bgCircle.style.width = `${size}px`;
        bgCircle.style.height = `${size}px`;
        bgCircle.style.top = `${positionTop}px`;
        bgCircle.style.left = `${positionLeft}px`;
        bgCircle.style.background = `${color}`;

        wrapper.prepend(bgCircle)
    }
}
createBgCircle(3);

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens.forEach(screen => {
        screen.classList.remove('active')
    })
    screens[1].classList.add('active')
});

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens.forEach(screen => {
            screen.classList.remove('active')
        })
        screens[2].classList.add('active');
        startGame()
    }
});

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTme, 1000)
    createRandomCircle()
    setTime(time)
}

// Счет времени
function decreaseTme() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `
    <div class="finish-block">
        <p>Score: ${score}</p>
        <a href='#' class="button" onclick="location.reload()">Play again</a>
    </div>
    `;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(15, 60);
    const { width, height } = board.getBoundingClientRect()
    const x = getRandomNumber(0, (width - 20) - size)
    const y = getRandomNumber(0, (height - 20) - size)
    const color = getRandomColor();

    circle.classList.add('circle');
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = color
    board.append(circle);
}
