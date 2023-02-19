var score = 0;
var clickingPower = 1;

var workerCost = 5;
var workers = 0;    
var robotCost = 50;
var robots = 0;
var alienCost = 500;
var aliens = 0;

function buyWorker(){
    if (score >= workerCost) {
        score = score - workerCost;
        workers = workers + 1;
        workerCost = Math.round(workerCost * 1.10);

        document.getElementById("score").innerHTML = score;
        document.getElementById("workercost").innerHTML = workerCost;
        document.getElementById("workers").innerHTML = workers  ;
        updateScorePerSecond();
    }
}

function buyRobot(){
    if (score >= robotCost) {
        score = score - robotCost;
        robots = robots + 1;
        robotCost = Math.round(robotCost * 1.30);

        document.getElementById("score").innerHTML = score;
        document.getElementById("robotcost").innerHTML = robotCost;
        document.getElementById("robots").innerHTML = robots;
        updateScorePerSecond();
    }
}

function buyAlien(){
    if (score >= alienCost) {
        score = score - alienCost;
        aliens = aliens + 1;
        alienCost = Math.round(alienCost * 1.50);

        document.getElementById("score").innerHTML = score;
        document.getElementById("aliencost").innerHTML = alienCost;
        document.getElementById("aliens").innerHTML = aliens;
        updateScorePerSecond();
    }
}

function addToScore(amount) {
    score = score + amount;
    document.getElementById("score").innerHTML = score;

}


function updateScorePerSecond() {
    scorePerSecond = workers + (robots * 10) + (aliens * 50);
    document.getElementById("scorepersecond").innerHTML = scorePerSecond;
}


function loadGame() {
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if (typeof savedGame.score !== "undefined") score = savedGame.score;
    if (typeof savedGame.clickingPower !== "undefined") clickingPower = savedGame.clickingPower;
    if (typeof savedGame.workerCost !== "undefined") workerCost = savedGame.workerCost;
    if (typeof savedGame.workers !== "undefined") workers = savedGame.workers;
    if (typeof savedGame.robotCost !== "undefined") robotCost = savedGame.robotCost;
    if (typeof savedGame.robots !== "undefined") robots = savedGame.robots;
    if (typeof savedGame.alienCost !== "undefined") alienCost = savedGame.alienCost;
    if (typeof savedGame.aliens !== "undefined") aliens = savedGame.aliens;
}

window.onload = function() {
    loadGame();
    updateScorePerSecond();
    document.getElementById("score").innerHTML = score;
    document.getElementById("workercost").innerHTML = workerCost;
    document.getElementById("workers").innerHTML = workers;
    document.getElementById("robotcost").innerHTML = robotCost;
    document.getElementById("robots").innerHTML = robots;
    document.getElementById("aliencost").innerHTML = alienCost;
    document.getElementById("aliens").innerHTML = aliens;
};


//

function saveGame() {
    var gameSave = {
        score: score,
        clickingPower: clickingPower,
        workerCost: workerCost,
        workers: workers,
        robotCost: robotCost,
        robots: robots,
        alienCost: alienCost,
        aliens: aliens
    };
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}


function resetGame() {
        var gameSave = {};
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
        location.reload();
}

// INTERVALS 

setInterval(function() {
    score = score + workers;
    score = score + (robots * 10);
    score = score + (aliens * 50);
    document.getElementById("score").innerHTML = score;
}, 1000); 


setInterval(function() {
    saveGame();  
}, 30000);




    // CUSTOM POP-UP



  const Confirm = {
    open (options) {
        options = Object.assign({}, {
            title: 'Reset Game Data',
            message: 'Are you sure you want to reset your progress?',
            okText: 'RESET',
            cancelText: 'No',
            onok: function () {
                resetGame();
            },
            oncancel: function () {}
        }, options);
        
        const html = `
            <div class="confirmus">
                <div class="confirmus__window">
                    <div class="confirmus__titlebar">
                        <span class="confirmus__title">${options.title}</span>
                        <button class="confirmus__close">&times;</button>
                    </div>
                    <div class="confirmus__content">${options.message}</div>
                    <div class="confirmus__buttons">
                        <button class="confirmus__button confirmus__button--ok confirmus__button--fill">${options.okText}</button>
                        <button class="confirmus__button confirmus__button--cancel">${options.cancelText}</button>
                    </div>
                </div>
            </div>
        `;

        const template = document.createElement('template');
        template.innerHTML = html;

        // Elements
        const confirmusEl = template.content.querySelector('.confirmus');
        const btnClose = template.content.querySelector('.confirmus__close');
        const btnOk = template.content.querySelector('.confirmus__button--ok');
        const btnCancel = template.content.querySelector('.confirmus__button--cancel');

        confirmusEl.addEventListener('click', e => {
            if (e.target === confirmusEl) {
                options.oncancel();
                this._close(confirmusEl);
            }
        });

        btnOk.addEventListener('click', () => {
            options.onok();
            this._close(confirmusEl);
        });

        [btnCancel, btnClose].forEach(el => {
            el.addEventListener('click', () => {
                options.oncancel();
                this._close(confirmusEl);
            });
        });

        document.body.appendChild(template.content);
    },

    _close (confirmusEl) {
        confirmusEl.classList.add('confirmus--close');

        confirmusEl.addEventListener('animationend', () => {
            document.body.removeChild(confirmusEl);
        });
    }
};



const Info = {
    open (options) {
        options = Object.assign({}, {
            title: 'How to Play',
            message: 'By clicking on the chest you gather gems. <br> <br>Use those gems to purchase workers which will gather gems for you.<br> <br> More gems = More upgrades = Even more gems <3 <br> <br> Have fun!',
            okText: 'Understood',
            cancelText: 'Whatever',
            onok: function () {},
            oncancel: function () {}
        }, options);
        
        const html = `
            <div class="confirm">
                <div class="confirm__window">
                    <div class="confirm__titlebar">
                        <span class="confirm__title">${options.title}</span>
                        <button class="confirm__close">&times;</button>
                    </div>
                    <div class="confirm__content">${options.message}</div>
                    <div class="confirm__buttons">
                        <button class="confirm__button confirm__button--ok confirm__button--fill">${options.okText}</button>
                        
                    </div>
                </div>
            </div>
        `;

        const template = document.createElement('template');
        template.innerHTML = html;

        // Elements
        const confirmEl = template.content.querySelector('.confirm');
        const btnClose = template.content.querySelector('.confirm__close');
        const btnOk = template.content.querySelector('.confirm__button--ok');
       

        confirmEl.addEventListener('click', e => {
            if (e.target === confirmEl) {
                options.oncancel();
                this._close(confirmEl);
            }
        });

        btnOk.addEventListener('click', () => {
            options.onok();
            this._close(confirmEl);
        });

        [btnClose].forEach(el => {
            el.addEventListener('click', () => {
                options.oncancel();
                this._close(confirmEl);
            });
        });

        document.body.appendChild(template.content);
    },

    _close (confirmEl) {
        confirmEl.classList.add('confirm--close');

        confirmEl.addEventListener('animationend', () => {
            document.body.removeChild(confirmEl);
        });
    }
};


const Save = {
    open (options) {
        options = Object.assign({}, {
            title: 'Save Game Data',
            message: 'Are you sure you want to save your progress?',
            okText: 'SAVE',
            cancelText: 'No',
            onok: function () {
                saveGame();
            },
            oncancel: function () {}
        }, options);
        
        const html = `
            <div class="confirm">
                <div class="confirm__window">
                    <div class="confirm__titlebar">
                        <span class="confirm__title">${options.title}</span>
                        <button class="confirm__close">&times;</button>
                    </div>
                    <div class="confirm__content">${options.message}</div>
                    <div class="confirm__buttons">
                        <button class="confirm__button confirm__button--ok confirm__button--fill">${options.okText}</button>
                        <button class="confirm__button confirm__button--cancel">${options.cancelText}</button>
                    </div>
                </div>
            </div>
        `;

        const template = document.createElement('template');
        template.innerHTML = html;

        // Elements
        const confirmEl = template.content.querySelector('.confirm');
        const btnClose = template.content.querySelector('.confirm__close');
        const btnOk = template.content.querySelector('.confirm__button--ok');
        const btnCancel = template.content.querySelector('.confirm__button--cancel');

        confirmEl.addEventListener('click', e => {
            if (e.target === confirmEl) {
                options.oncancel();
                this._close(confirmEl);
            }
        });

        btnOk.addEventListener('click', () => {
            options.onok();
            this._close(confirmEl);
        });

        [btnCancel, btnClose].forEach(el => {
            el.addEventListener('click', () => {
                options.oncancel();
                this._close(confirmEl);
            });
        });

        document.body.appendChild(template.content);
    },

    _close (confirmEl) {
        confirmEl.classList.add('confirm--close');

        confirmEl.addEventListener('animationend', () => {
            document.body.removeChild(confirmEl);
        });
    }
};

