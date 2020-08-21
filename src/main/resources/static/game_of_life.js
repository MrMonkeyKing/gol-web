// variables
const canvas = document.getElementById("gridCanvas")
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;
canvas.background = '#129DC5';

const slider = document.getElementById("resolutionSlider")
const resOut = document.getElementById("resOut");
const rowOut = document.getElementById("rowOut");
const colOut = document.getElementById("colOut");

let resolution = 10;
let cols = canvas.width / resolution;
let rows = canvas.height / resolution;

resOut.innerHTML = resolution;
colOut.innerHTML = cols;
rowOut.innerHTML = rows;

let stopped = true;

//script
let grid = buildGrid();
render(grid);

//functions
function buildGrid() {
    return new Array(cols).fill(null)
        .map(() => new Array(rows).fill(null)
            .map(() => Math.floor(Math.random() * 2)));
}

function nextGen(grid) {
    const nextGen = grid.map(arr => [...arr])
    for(let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];
            let numNeighbours = 0;

            for (i = -1; i < 2; i++) {
                for (j = -1; j < 2; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    const x_cell = col + i;
                    const y_cell = row + j;

                    if (x_cell >= 0 && y_cell >= 0 && x_cell < cols && y_cell < rows) {
                        const currentNeighbour = grid[x_cell][y_cell];
                        numNeighbours += currentNeighbour;
                    }
                }
            }

            if (cell === 0 && numNeighbours === 3) {
                nextGen[col][row] = 1;
            } else if(cell === 1 && numNeighbours <= 3 && numNeighbours >= 2) {
                nextGen[col][row] = 1;
            } else {
                nextGen[col][row] = 0;
            }
        }
    }
    return nextGen;
}

function render(grid) {
    for(let col = 0; col < grid.length; col++) {
        for(let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];

            ctx.beginPath();
            ctx.rect(row * resolution, col * resolution, resolution, resolution);
            ctx.fillStyle = cell ? 'black' : canvas.background;
            ctx.fill();
            ctx.stroke();
        }
    }
}

function update() {
    grid = nextGen(grid);
    render(grid);
    if(!stopped) {
        requestAnimationFrame(update);
    }
}

function startStop() {
    if(!stopped) {
        stopped = true;
    } else {
        stopped = false;
        requestAnimationFrame(update);
    }
}

function reset() {
    grid = buildGrid();
    render(grid);
}

slider.oninput = function () {
    resolution = this.value;
    cols = canvas.width / resolution;
    rows = canvas.height / resolution;

    grid = buildGrid();
    render(grid);

    resOut.innerHTML = resolution;
    colOut.innerHTML = cols;
    rowOut.innerHTML = rows;
}