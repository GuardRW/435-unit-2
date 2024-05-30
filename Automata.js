class Automata {

    constructor(theLength, theWidth) {
        this.grid = this.buildGrid(theLength, theWidth);
        this.draw(this.grid, ctx)
        this.numPlants = 0;
        this.numAnimats = 0;
        gameEngine.addEntity(this);

    };

    buildGrid(COLS, ROWS) {
        let grid = new Array(COLS).fill(null)
        .map(() => new Array(ROWS).fill(null)
        .map(() => 0))
        for (let col = 0; col < grid.length; col++) {
            for (let row = 0; row < grid[col].length; row++) {
                grid[col][row] = new plant(0, 0, false)
            }
        }
        return grid
    }

    draw(grid, ctx) {
        for (let col = 0; col < grid.length; col++) {
            for (let row = 0; row < grid[col].length; row++) {
                const cell = grid[col][row];
                ctx.beginPath();
                if (cell.isAlive === 1 && cell.isAnimat == false) { 
                    ctx.rect(col * resolution, row * resolution, resolution, resolution);
                    ctx.fillStyle = hsl(cell.hue, 40, 50);
                } else if (cell.isAlive === 1 && cell.isAnimat == true) {
                    ctx.arc(col * resolution + resolution / 2, row * resolution + resolution / 2, resolution / 2, 0, 2 * Math.PI);
                    ctx.fillStyle = hsl(cell.hue, 40, 50);
                } else { 
                    ctx.rect(col * resolution, row * resolution, resolution, resolution);
                    ctx.fillStyle = 'white';
                }
                ctx.fill();
            }
        }
    }

    update(grid) {
        for (let col = 0; col < grid.length; col++) {
            for (let row = 0; row < grid[col].length; row++) {
                const cell = grid[col][row];
                cell.update()
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {

                        let x_cell = col + i;
                        let y_cell = row + j;
                        

                        if (x_cell < 0) {
                            x_cell += grid.length;
                        }
                        if (x_cell >= grid.length) {
                            x_cell -= grid.length;
                        }
                        if (y_cell < 0) {
                            y_cell += grid[0].length;
                        }
                        if (y_cell >= grid[0].length) {
                            y_cell -= grid[0].length;
                        }

                        let currentNeighbour = grid[x_cell][y_cell];
                        if (currentNeighbour.isAlive && !currentNeighbour.isAnimat && cell.isAnimat && Math.abs(cell.hue - currentNeighbour.hue) <= 200) {
                            cell.eat(currentNeighbour);
                            grid[x_cell][y_cell] = cell;
                            grid[col][row].isAlive = 0;
                        }
                        else if (!currentNeighbour.isAlive && cell.isAnimat && cell.energy > 31) {
                            cell.energy -= 15;
                            currentNeighbour.mutate(cell);
                        }
                        else if (!currentNeighbour.isAlive && !cell.isAnimat && cell.maturity > 5) {
                            currentNeighbour.mutate(cell);
                        }

                        }
                    }
                    if (Math.floor(Math.random()*100) === 1) {
                        grid[col][row].isAlive = 0;
                        grid[col][row].isAnimat = false;
                    }
                    
            }
        }
        return grid;
        }
        
    addPlant(num) {
        for (let i = 0; i < num; i++) {
            this.numPlants++;
            const randomX = Math.floor(Math.random() * this.grid.length)
            const randomY = Math.floor(Math.random() * this.grid[0].length)
    
            this.grid[randomX][randomY].isAlive = 1;
            this.grid[randomX][randomY].isAnimat = false;
            this.grid[randomX][randomY].hue = randomInt(360)

        }
    }

    addAnimat(num) {
        for (let i = 0; i < num; i++) {
            this.numAnimats++;
            const randomX = Math.floor(Math.random() * this.grid.length)
            const randomY = Math.floor(Math.random() * this.grid[0].length)
        
            this.grid[randomX][randomY].isAlive = 1;
            this.grid[randomX][randomY].isAnimat = true;
            this.grid[randomX][randomY].hue = randomInt(360)
            this.grid[randomX][randomY].energy = 30;
        }
    }

}