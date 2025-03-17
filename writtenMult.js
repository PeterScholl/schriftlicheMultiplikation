let num1, num2, solution, rows;
        
function generateProblem() {
    num1 = Math.floor(Math.random() * 90 + 10); // Zweistellige Zahl
    num2 = Math.floor(Math.random() * 90 + 10); // Zweistellige Zahl
    solution = (num1 * num2).toString();
    displayGrid(num1, num2);
}

function displayGrid(n1, n2) {
    let container = document.getElementById("multiplication-area");
    container.innerHTML = "";
    let digits1 = n1.toString().split("");
    let digits2 = n2.toString().split("");
    let maxCols = 5; // Math.max(digits1.length + digits2.length - 1, solution.length);
    rows = digits2.length + 2; // Zeilen für Multiplikation + Summenzeile
    container.style.gridTemplateColumns = `repeat(${maxCols}, 40px)`;
    container.style.gridTemplateRows = `repeat(${rows}, 40px)`;
    
    // Erste Zahl platzieren
    digits1.forEach(d => container.innerHTML += `<div class='cell'>${d}</div>`);
    
    // Zweite Zahl dahinter
    container.innerHTML += `<div class='cell'>×</div>`;
    digits2.forEach(d => container.innerHTML += `<div class='cell'>${d}</div>`);
    
    // Multiplikationszeilen erstellen
    for (let i = 0; i < digits2.length; i++) {
        let factor = parseInt(digits2[digits2.length - 1 - i]);
        let productStr = (factor * num1).toString();
        let startIdx = maxCols - productStr.length - i;
        
        for (let j = 0; j < startIdx; j++) {
            container.innerHTML += `<div class='cell'></div>`;
        }
        for (let j = 0; j < productStr.length; j++) {
            container.innerHTML += `<div class='cell input-cell'></div>`;
        }
        for (let j = 0; j < i; j++) {
            container.innerHTML += `<div class='cell'></div>`;
        }
    }
    
    // Trennlinie
    //container.innerHTML += `<div class='line'></div>`;
    
    // Summenzeile
    for (let i = 0; i < maxCols - solution.length; i++) {
        container.innerHTML += `<div class='cell border-top'></div>`;
    }
    for (let i = 0; i < solution.length; i++) {
        container.innerHTML += `<div class='cell border-top input-cell'></div>`;
    }
}