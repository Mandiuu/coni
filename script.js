const crosswordData = {
    grid: [
        ["", "R", "A", "N", "C", "A", "G", "U", "A"], // Row 0
        ["", "", "", "", "", "A", "C", "O", "", "P"], // Row 1
        ["", "", "", "", "", "S", "U", "D", "", "O"], // Row 2
        ["", "", "", "", "", "T", "A", "I", "", "L"], // Row 3
        ["", "", "", "", "", "E", "R", "", "", "O"], // Row 4
        ["", "", "", "C", "", "L", "I", "", "", ""], // Row 5
        ["", "C", "H", "O", "C", "L", "O", "", "", ""], // Row 6
        ["", "", "", "C", "", "I", "", "", "", ""], // Row 7
        ["", "", "", "A", "", "", "", "", "", ""], // Row 8
    ],
    clues: {
        across: [
            { number: 1, clue: "Ciudad donde fue concebida la Mila", row: 0, col: 1 },
            { number: 2, clue: "Comida favorita de la Coni; pastel de ...", row: 6, col: 1 },
        ],
        down: [
            { number: 3, clue: "Nombre de la perrita de Paolo y la Coni", row: 5, col: 3 },
            { number: 4, clue: "Apellido de Mila", row: 0, col: 4 },
            { number: 5, clue: "Signo de la Coni", row: 0, col: 5 },
            { number: 6, clue: "Sobrenombre de la Coni a Paolo", row: 0, col: 6 },
            { number: 7, clue: "Nombre que quería Paolo para la guagua / Dios griego", row: 0, col: 8 },
        ],
    },
};

const crosswordGrid = document.getElementById("crossword-grid");
const acrossCluesElement = document.getElementById("across-clues");
const downCluesElement = document.getElementById("down-clues");
const resultElement = document.getElementById("result");
const checkButton = document.getElementById("check-btn");

function createGrid() {
    crosswordData.grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const div = document.createElement("div");
            div.classList.add("grid-cell");

            if (cell === "") {
                div.classList.add("empty-cell"); // Assign baby-blue color for empty boxes
            } else {
                const input = document.createElement("input");
                input.maxLength = 1;
                input.dataset.row = rowIndex;
                input.dataset.col = colIndex;
                div.appendChild(input);

                crosswordData.clues.across.concat(crosswordData.clues.down).forEach((clue) => {
                    if (clue.row === rowIndex && clue.col === colIndex) {
                        div.setAttribute("data-number", clue.number);
                    }
                });
            }
            crosswordGrid.appendChild(div);
        });
    });
}

function createClues() {
    crosswordData.clues.across.forEach((clue) => {
        const li = document.createElement("li");
        li.textContent = `${clue.number}. ${clue.clue}`;
        acrossCluesElement.appendChild(li);
    });

    crosswordData.clues.down.forEach((clue) => {
        const li = document.createElement("li");
        li.textContent = `${clue.number}. ${clue.clue}`;
        downCluesElement.appendChild(li);
    });
}

function checkAnswers() {
    const inputs = crosswordGrid.querySelectorAll("input");
    let correct = true;

    inputs.forEach((input) => {
        const row = input.dataset.row;
        const col = input.dataset.col;

        if (input.value.toUpperCase() !== crosswordData.grid[row][col]) {
            correct = false;
            input.style.color = "red";
        } else {
            input.style.color = "green";
        }
    });

    resultElement.textContent = correct
        ? "¡Felicidades! Lo lograste."
        : "Algunas respuestas están incorrectas. ¡No pares, sigue sigue!";
}

createGrid();
createClues();
checkButton.addEventListener("click", checkAnswers);
