function initDiskGame() {
    const recordContainer = document.querySelector('.record-modal-container');
    const record = document.getElementById('record');
    const controlButtons = document.querySelector('.control-buttons');
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const resultText = document.getElementById('result-text');
    const resultIcon = document.getElementById('result-icon');
    const ms1Counter = document.getElementById('ms1-counter');
    const ms2Counter = document.getElementById('ms2-counter');

    const randomValues = [5, 20, 50, 100, 200];
    const startCost = 1000;

    const costDisplay = document.createElement('div');
    costDisplay.classList.add('cost-display');
    costDisplay.innerHTML = `<img src="img/n5.png" class="coin-icon" alt="coin"> ${startCost}`;

    recordContainer.insertBefore(costDisplay, controlButtons);

    startBtn.addEventListener('click', () => {
        let ms1Value = parseInt(ms1Counter.textContent);
        if (ms1Value >= startCost) {
            ms1Value -= startCost;
            ms1Counter.textContent = ms1Value;
            record.classList.add('spinning');
            resultText.style.display = 'none';
            resultIcon.style.display = 'block';
        } else {
            alert('Insufficient funds to launch');
        }
        saveCurrencyProgress();
    });

    stopBtn.addEventListener('click', () => {
        if (record.classList.contains('spinning')) {
            record.classList.remove('spinning');
            const randomIndex = Math.floor(Math.random() * randomValues.length);
            const result = randomValues[randomIndex];
            let ms2Value = parseInt(ms2Counter.textContent);
            ms2Value += result;
            ms2Counter.textContent = ms2Value;
            resultText.textContent = result;
            resultText.style.display = 'block';
            resultIcon.style.display = 'none';
            saveCurrencyProgress();
        }
    });
}

function saveCurrencyProgress() {
    const currencyProgress = {
        ms1Counter: document.getElementById('ms1-counter').textContent || "0",
        ms2Counter: document.getElementById('ms2-counter').textContent || "0"
    };
    localStorage.setItem('gameProgress', JSON.stringify(currencyProgress));
}

function loadCurrencyProgress() {
    const savedProgress = localStorage.getItem('gameProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        document.getElementById('ms1-counter').textContent = progress.ms1Counter || "0";
        document.getElementById('ms2-counter').textContent = progress.ms2Counter || "0";
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadCurrencyProgress();

    if (document.querySelector('.record-modal-container')) {
        initDiskGame();
    }
    if (document.querySelector('.memory-game')) {
        initFlipGame();
    }
});

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        saveCurrencyProgress();
    }
});

window.addEventListener('pagehide', function() {
    saveCurrencyProgress();
});

window.addEventListener('beforeunload', function() {
    saveCurrencyProgress();
});

function initFlipGame() {
    const cardsArray = [
        { name: 'n5', img: 'img/n5.png' },
        { name: 'n1', img: 'img/n1.png' }
    ];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function generateGameGrid() {
        const doubleCardsArray = cardsArray.concat(cardsArray);
        return shuffle(doubleCardsArray);
    }

    let gameGrid = generateGameGrid();
    let firstGuess = '';
    let secondGuess = '';
    let count = 0;
    let previousTarget = null;
    let delay = 1200;

    const game = document.querySelector('.memory-game');
    const ms1Counter = document.getElementById('ms1-counter');
    const ms2Counter = document.getElementById('ms2-counter');
    const winContainer = document.getElementById('flip-win');
    const ms1WinAmountElement = document.getElementById('ms1-win-amount');
    const ms2WinAmountElement = document.getElementById('ms2-win-amount');
    const ms1WinIcon = document.getElementById('ms1-win-icon'); 
    const ms2WinIcon = document.getElementById('ms2-win-icon'); 

    function createBoard() {
        game.innerHTML = '';
        gameGrid.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.name = item.name;

            const front = document.createElement('div');
            front.classList.add('front-face');
            front.textContent = '';

            const back = document.createElement('div');
            back.classList.add('back-face');
            back.style.backgroundImage = `url(${item.img})`;

            game.appendChild(card);
            card.appendChild(front);
            card.appendChild(back);
        });
    }

    function matchCards() {
        const selected = document.querySelectorAll('.selected');
        selected.forEach(card => {
            card.classList.add('match');
        });

        let ms1WinAmount = 0;
        let ms2WinAmount = 0;

        if (firstGuess === 'n5') {
            let ms1Value = parseInt(ms1Counter.textContent);
            ms1WinAmount = 2000;
            ms1Value += ms1WinAmount;
            ms1Counter.textContent = ms1Value;
            ms1WinIcon.style.display = 'inline';
            ms1WinAmountElement.style.display = 'inline';
            ms1WinAmountElement.textContent = ms1WinAmount;
        } else if (firstGuess === 'n1') {
            let ms2Value = parseInt(ms2Counter.textContent);
            ms2WinAmount = 100;
            ms2Value += ms2WinAmount;
            ms2Counter.textContent = ms2Value;
            ms2WinIcon.style.display = 'inline';
            ms2WinAmountElement.style.display = 'inline';
            ms2WinAmountElement.textContent = ms2WinAmount;
        }

        winContainer.style.display = 'flex';
        setTimeout(() => {
            winContainer.style.display = 'none';
            ms1WinIcon.style.display = 'none';
            ms1WinAmountElement.style.display = 'none';
            ms2WinIcon.style.display = 'none';
            ms2WinAmountElement.style.display = 'none';
        }, 1000);

        saveCurrencyProgress();
    }

    function resetGuesses() {
        firstGuess = '';
        secondGuess = '';
        count = 0;
        previousTarget = null;

        const selected = document.querySelectorAll('.selected');
        selected.forEach(card => {
            card.classList.remove('selected');
            card.classList.remove('flip');
        });

        gameGrid = generateGameGrid();
        createBoard();
    }

    game.addEventListener('click', event => {
        const clicked = event.target;

        if (
            clicked.nodeName === 'SECTION' ||
            clicked === previousTarget ||
            clicked.parentNode.classList.contains('selected') ||
            clicked.parentNode.classList.contains('match')
        ) {
            return;
        }

        let ms1Value = parseInt(ms1Counter.textContent);
        if (ms1Value >= 500) {
            ms1Value -= 500;
            ms1Counter.textContent = ms1Value;

            if (count === 0) {
                firstGuess = clicked.parentNode.dataset.name;
                clicked.parentNode.classList.add('selected');
                clicked.parentNode.classList.add('flip');
                count++;
            } else if (count === 1) {
                secondGuess = clicked.parentNode.dataset.name;
                clicked.parentNode.classList.add('selected');
                clicked.parentNode.classList.add('flip');
                count++;

                if (firstGuess && secondGuess) {
                    if (firstGuess === secondGuess) {
                        setTimeout(matchCards, delay);
                    }
                    setTimeout(resetGuesses, delay);
                }
            }

            previousTarget = clicked;
            saveCurrencyProgress();
        } else {
            alert('Insufficient funds to open a card');
        }
    });

    createBoard();

    setInterval(() => {
        gameGrid = generateGameGrid();
        createBoard();
    }, 30000);
}

function saveCurrencyProgress() {
    const currencyProgress = {
        ms1Counter: document.getElementById('ms1-counter').textContent || "0",
        ms2Counter: document.getElementById('ms2-counter').textContent || "0"
    };
    localStorage.setItem('gameProgress', JSON.stringify(currencyProgress));
}

function loadCurrencyProgress() {
    const savedProgress = localStorage.getItem('gameProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        document.getElementById('ms1-counter').textContent = progress.ms1Counter || "0";
        document.getElementById('ms2-counter').textContent = progress.ms2Counter || "0";
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadCurrencyProgress();
    
    if (document.querySelector('.record-container')) {
        initDiskGame();
    }
    if (document.querySelector('.memory-game')) {
        initFlipGame();
    }
});

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        saveCurrencyProgress();
    }
});

window.addEventListener('pagehide', function() {
    saveCurrencyProgress();
});

window.addEventListener('beforeunload', function() {
    saveCurrencyProgress();
});