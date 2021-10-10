class ticTacToe {
    constructor() {
        this.circle = '<img src="circle.png" class="circle">';
        this.cross = '<img src="cross.png" class="cross">';
        this.HTMLFields = document.querySelectorAll('.field');
        this.fields = ['', '', '', '', '', '', '', '', ''];
        this.gameEnded = false;
        this.title = document.querySelector('.title');
    }
    restartGame() {
        for (let i of this.HTMLFields) {
            i.innerHTML = '';
        }
        this.fields = ['', '', '', '', '', '', '', '', ''];
        this.setTitleText('Game started!');
        this.gameEnded = false;
    }
    getRandomField() {
        return Math.floor(Math.random() * 9 + 1);
    }
    setTitleText(text) {
        this.title.innerHTML = text;
        this.gameEnded = true;
    }
    winnerChecker(symbol) {
        let winningPositions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [0, 4, 8],
        ];
        for (let i of winningPositions) {
            if (this.fields[i[0]] == symbol && 
                this.fields[i[1]] == symbol &&
                this.fields[i[2]] == symbol) {
                return true;
            }
        }
    }
    someOneWillWin(symbol) {
        let winningPositions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [0, 4, 8],
        ];
        for (let i of winningPositions) {
            if (this.fields[i[0]] == symbol && 
                this.fields[i[1]] == symbol &&
                this.fields[i[2]] == '') {
                return i[2]+1;
            } else if (this.fields[i[0]] == symbol && 
                       this.fields[i[2]] == symbol &&
                       this.fields[i[1]] == '') {
                return i[1]+1;
            } else if (this.fields[i[1]] == symbol && 
                       this.fields[i[2]] == symbol &&
                       this.fields[i[0]] == '') {
                return i[0]+1;
            }
        }
    }
    click(el) {
        if (el.getAttribute('class') == 'restart-btn') {
            this.restartGame();
        }
        else if (!el.innerHTML && this.fields.includes('') && !this.gameEnded) {
            let fieldNum = el.getAttribute('field-num');
            this.fields[fieldNum-1] = 'x';
            el.innerHTML = this.cross;
            if (this.winnerChecker('x')) {
                this.setTitleText('You win!');
            } else {
                if (this.fields.includes('')) {
                    this.AI();
                } else {
                    this.setTitleText('It\'s draw.');
                }
                if (this.winnerChecker('0')) {
                    this.setTitleText('You lose.');
                }
            }
        }
    }
    AI() {
        if (this.someOneWillWin('0')) {
            let s = this.someOneWillWin('0');
            let field = document.querySelector(`.f${s}`);
            if (!field.innerHTML) {
                field.innerHTML = this.circle;
                this.fields[s-1] = '0';
                console.log(this.fields);
            }
        } else if (this.someOneWillWin('x')) {
            let s = this.someOneWillWin('x');
            let field = document.querySelector(`.f${s}`);
            if (!field.innerHTML) {
                field.innerHTML = this.circle;
                this.fields[s-1] = '0';
                console.log(this.fields);
            }
        } else {
            while (true) {
                let fieldNum = this.getRandomField();
                let field = document.querySelector(`.f${fieldNum}`);
                if (!field.innerHTML) {
                    field.innerHTML = this.circle;
                    this.fields[fieldNum-1] = '0';
                    console.log(this.fields);
                    break;
                }
            }
        }
    }
}


function main() {
    tTT.click(this);
}

let fields = document.querySelectorAll('.field');
let tTT = new ticTacToe;
let restartButton = document.querySelector('.restart-btn');
restartButton.onclick = main;
for (let i of fields) {
    i.onclick = main;
}
