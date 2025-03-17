let num1, num2, solution, rows, currentIndex = 0;
let inputCells = [];

function generateProblem() {
    num1 = Math.floor(Math.random() * 90 + 10);
    num2 = Math.floor(Math.random() * 90 + 10);
    solution = (num1 * num2).toString();
    currentIndex = 0;
    inputCells = [];
    displayGrid(num1, num2);
}

function displayGrid(n1, n2) {
    let container = document.getElementById("multiplication-area");
    container.innerHTML = "";
    let digits1 = n1.toString().split("");
    let digits2 = n2.toString().split("");
    let maxCols = 5;
    rows = digits2.length + 2;
    container.style.gridTemplateColumns = `repeat(${maxCols}, 40px)`;
    container.style.gridTemplateRows = `repeat(${rows}, 40px)`;

    digits1.forEach(d => container.innerHTML += `<div class='cell'>${d}</div>`);
    container.innerHTML += `<div class='cell'>×</div>`;
    digits2.forEach(d => container.innerHTML += `<div class='cell'>${d}</div>`);

    for (let i = 0; i < digits2.length; i++) {
        let factor = parseInt(digits2[digits2.length - 1 - i]);
        let productStr = (factor * num1).toString();
        let startIdx = maxCols - productStr.length - i;

        for (let j = 0; j < startIdx; j++) {
            container.innerHTML += `<div class='cell'></div>`;
        }
        for (let j = 0; j < productStr.length; j++) {
            let id = `input-${inputCells.length}`;
            container.innerHTML += `<div id='${id}' class='cell input-cell'></div>`;
            inputCells.push(id);
        }
        for (let j = 0; j < i; j++) {
            container.innerHTML += `<div class='cell'></div>`;
        }
    }

    for (let i = 0; i < maxCols - solution.length; i++) {
        container.innerHTML += `<div class='cell border-top'></div>`;
    }
    for (let i = 0; i < solution.length; i++) {
        let id = `input-${inputCells.length}`;
        container.innerHTML += `<div id='${id}' class='cell border-top input-cell'></div>`;
        inputCells.push(id);
    }

    document.addEventListener("keydown", handleInput);
}

function handleInput(event) {
    if (event.key >= "0" && event.key <= "9" && currentIndex < inputCells.length) {
        let input = document.getElementById(inputCells[currentIndex]);
        if (input) {
            input.textContent = event.key;
            currentIndex++;
        }
    }
}

generateProblem();
