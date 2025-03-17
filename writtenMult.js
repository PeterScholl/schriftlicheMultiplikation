let num1, num1Length = 3, num2, solution, rows, currentIndex = 0;
let inputCells = [];

function generateProblem() {
    num1 = Math.floor(Math.random() * (10 ** num1Length - 10 ** (num1Length - 1)) + 10 ** (num1Length - 1));
    num2 = Math.floor(Math.random() * 90 + 10);
    solution = (num1 * num2).toString();
    currentIndex = 0;
    inputCells = [];
    solutions = [];

    displayGrid(num1, num2);
    highlightCurrentCell();
}

function displayGrid(n1, n2) {
    let container = document.getElementById("multiplication-area");
    container.innerHTML = "";
    let digits1 = n1.toString().split("");
    let digits2 = n2.toString().split("");
    let maxCols = digits1.length + 1 + digits2.length;
    rows = digits2.length + 2;
    container.style.gridTemplateColumns = `repeat(${maxCols}, 40px)`;
    container.style.gridTemplateRows = `repeat(${rows}, 40px)`;

    digits1.forEach(d => container.innerHTML += `<div class='cell'>${d}</div>`);
    container.innerHTML += `<div class='cell'>×</div>`;
    digits2.forEach(d => container.innerHTML += `<div class='cell'>${d}</div>`);

    for (let i = digits2.length - 1; i >= 0; i--) {
        let factor = parseInt(digits2[digits2.length - 1 - i]);
        let productStr = (factor * num1).toString();
        let startIdx = maxCols - productStr.length - i;

        for (let j = 0; j < startIdx; j++) {
            container.innerHTML += `<div class='cell'></div>`;
        }
        let rowInputs = [];
        let rowSoluts = [];
        for (let j = 0; j < productStr.length; j++) {
            let id = `input-${inputCells.length + rowInputs.length}`;
            rowInputs.unshift(id); // Fügt ID an den Anfang der aktuellen Zeilenliste
            rowSoluts.unshift(productStr[j]);
            container.innerHTML += `<div id='${id}' class='cell input-cell'></div>`;
        }
        inputCells.push(...rowInputs); // Nach der Schleife alle IDs zur Gesamtliste hinzufügen
        solutions.push(...rowSoluts);
        for (let j = 0; j < i; j++) {
            container.innerHTML += `<div class='cell'></div>`;
        }
    }

    for (let i = 0; i < maxCols - solution.length; i++) {
        container.innerHTML += `<div class='cell border-top'></div>`;
    }
    let rowInputs = [];
    let rowSoluts = [];
    for (let i = 0; i < solution.length; i++) {
        let id = `input-${inputCells.length + rowInputs.length}`;
        rowInputs.unshift(id); // Fügt ID an den Anfang der aktuellen Zeilenliste
        rowSoluts.unshift(solution[i]);
        container.innerHTML += `<div id='${id}' class='cell input-cell'></div>`;
    }
    inputCells.push(...rowInputs); // Nach der Schleife alle IDs zur Gesamtliste hinzufügen
    solutions.push(...rowSoluts);
    document.addEventListener("keydown", handleInput);
}

function highlightCurrentCell() {
    document.querySelectorAll(".input-cell").forEach(cell => cell.classList.remove("highlight"));
    if (currentIndex < inputCells.length) {
        let input = document.getElementById(inputCells[currentIndex]);
        if (input) {
            input.classList.add("highlight");
        }
    }
}

function handleInput(event) {
    if (event.key >= "0" && event.key <= "9" && currentIndex < inputCells.length) {
        let input = document.getElementById(inputCells[currentIndex]);
        if (input) {
            if (event.key === solutions[currentIndex]) {
                input.textContent = event.key;
                input.style.color = "black";
                currentIndex++;
                highlightCurrentCell();
                if (currentIndex === inputCells.length) {
                    showModal("Geschafft!", () => generateProblem());
                }
            } else {
                input.textContent = event.key;
                input.style.color = "red";
            }
        }
    }
    else if (event.key === "+" && num1Length < 15) {
        num1Length++;
        generateProblem();
    } else if (event.key === "-" && num1Length > 2) {
        num1Length--;
        generateProblem();
    }
}

// Funktion zum Anzeigen des Modal-Fensters
function showModal(message, callback) {
    let modal = document.createElement("div");
    modal.textContent = message;
    modal.className = "success-modal";

    document.body.appendChild(modal);

    setTimeout(() => {
        document.body.removeChild(modal);
        callback();
    }, 1000);
}

generateProblem();
