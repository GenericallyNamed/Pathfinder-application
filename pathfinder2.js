/**
 * @title pathfinder2.js
 * @description The following code contains the method for running the path generation process. It
 * is the second algorithm I have written, hence the name.
 * 
 * @author Alex Shandilis
 * @version 5/6/2021
 * 
 */

var gridTable = document.getElementById("navigationGrid"); //stores the grid table element
var start = (gridTable.querySelector(".cell-start"))[0];
var startBtn = document.getElementById("startBtn");
var finish;
var currentX;
var currentY;
gridTable.isRunning = false;

startBtn.addEventListener("click",function(){
    var isRunning = gridTable.isRunning;
    if(!isRunning) {
        gridTable.isRunning = true;
        setResetClasses();
        gridTable.setAttribute("isrunning","false");
        gridTable.isrunning = true;
        initPath();
    }
});

/**
 * 
 * @param {Object array} p 
 * @returns 
 */
function makePath(p) {
    if(!(p[p.length-1].classList.contains("cell-start"))) {
        newX = p[p.length-1].prevX;
        newY = p[p.length-1].prevY;
        var newCell = gridTable.rows[newY].cells[newX];
        p[p.length] = newCell;
        p = makePath(p);
    }
    return p;
}


/**
 * @name drawPath
 * @param {Array} p     array of objects on the path
 * @param {Number} i    Iteration number
 * @purpose Draws the path that has been generated
 */
function drawPath(p, i) {
    i -= 1;
    p[i].classList.add("cell-path");
    if(i > 0) {
        setTimeout(function(){
            drawPath(p, i);
        }, 300);
    }
}


/**
 * @name initPath
 * @params n/a
 * @description This function is triggered when the user clicks the start button on the interface.
 * It initializes the actual path() method by passing in an array that contains the starting cell.
 * 
 */
 function initPath() {
    //This is the first instance of the "newCells" array. First, it contains only the start cell.
    var newCells = gridTable.querySelectorAll(".cell-start"); 
    //First retrieves the start cell, assigns it to the array "newCells"
    proxy(newCells);
    //Note that the "path" method is not called directly, but instead calls the proxy method. 
    if(gridTable.nextCellFound == true) {
        var path = [gridTable.querySelector(".cell-finish")];   
        path = makePath(path);
        drawPath(path, path.length);
    }
}

/**
 * @name proxy
 * @param {NodeList} cells 
 * @purpose Acts as a proxy method for calling the path method.
 */
function proxy(cells) {
    path(cells);
}

/**
 * @name path
 * @param {NodeList} newCells (contains all cell candidates to process)
 * @purpose Search the grid to develop a route.
 * @description The path method takes a list of cell candidates and for each given candidate
 * calculates a list of neighbors for each, and marks each valid neighbor as a new cell to
 * search in the next iteration of the program. When it is searching neighbors of the cell
 * candidates, it appends two new properties for each neighbor: "prevX" and "prevY". This is used
 * later by the drawPath method to draw a path. If it does not find a finish cell, it will generate
 * a new list of cell candidates, and recursively calls itself passing in that new list. It will do
 * this repeatedly until it either runs out of candidates (meaning no valid route) or the finish
 * cell has been found.
 * 
 */
function path(newCells) {
    start = gridTable.querySelectorAll(".cell-start");    
    finish = gridTable.querySelectorAll(".cell-finish");
    gridTable.nextCellFound = false; 
    //The nextCellFound property indicates whether the algorithm found new neighbors from the given
    //newCells list
    for(var i = 0; i < newCells.length; i++) {
        currentX = newCells[i].x; //The x value of the current cell being assessed
        currentY = newCells[i].y; //The y value of the current cell being assessed
        currentCell = gridTable.rows[currentY].cells[currentX];
        var neighborCells = getNeighbor(currentX, currentY);
        for(var j = 0; j < neighborCells.length; j++) { //Traverses the list of neighbor cells
            if(neighborCells[j] != null) { //Only execute the following code if the cell is valid (not null)
                gridTable.nextCellFound = true; //This sets "nextCellFound" to true. This helps the
                                                //program determine whether it has hit a dead end,
                                                //and only runs if the program can find new cells
                                                //to search.
                neighborCells[j].prevX = currentX; //Adds property prevX to neighbor cell (= currentX)
                neighborCells[j].prevY = currentY; //Adds property prevY to neighbor cell (= currentY)
                if((neighborCells[j].classList.contains("cell-finish"))) {
                    gridTable.finishFound = true;
                } else {
                    neighborCells[j].classList.add("cell-new");
                    neighborCells[j].classList.remove("cell-unvisited"); 
                }
            }
        }
        if(!(currentCell.classList.contains("cell-start"))) { 
            currentCell.classList.add("cell-visited"); //Adds all visited cells to class "cell-visited"
            currentCell.classList.remove("cell-new");  //Removes the visited cell from class "cell-visited"
        }
    }
    if(gridTable.nextCellFound == true) {
        if(gridTable.finishFound == true) {
            return; //Ends pathing if it finds the finish cell or cannot find a path
        } else {
            //The newCells array is updated to contain all newly identified cells labeled "cell-new"
            newCells = gridTable.querySelectorAll(".cell-new");
            //The method querySelectorAll returns an array of all cells in the class "cell-new"
            path(newCells); //Uses recursion by calling itself until the exit condition (find finish or find no route) is met
        }
    } else {
        alert("Could not find a path.");
        resetGrid();
    }
    return;
}


/**
 * @name getNeighbor
 * @param {Number} x   x-value of a cell 
 * @param {Number} y   y-value of a cell
 * @returns {Object array}      A JSON object containing both a list of cell objects and a corresponding
 *                      list of coordinates. Cells that are invalid return as null values.
 * @description This method is used to get a list of neighbors. 
 */
function getNeighbor(x, y) {
    var neighbors = {
        coords: [ {"x":(x-1),"y":(y)}, {"x":(x+1),"y":(y)}, {"x":(x),"y":(y+1)}, {"x":(x),"y":(y-1)} ],
        objects: []
    };
    for (var i = 0; i < 4; i++) {
        if(neighbors.coords[i].y < 0 || neighbors.coords[i].x < 0 || neighbors.coords[i].y > totalRows-1 || neighbors.coords[i].x > totalColumns-1 ) {
            neighbors.objects[i] = null;
        } else {
            neighbors.objects[i] = gridTable.rows[neighbors.coords[i].y].cells[neighbors.coords[i].x];
        }
    }
    for(var i = 0; i < neighbors.coords.length; i++) {
        if(neighbors.coords[i].x < 0 || neighbors.coords[i].x > totalColumns-1) {
            delete neighbors.coords[i];         //The "delete" operator is used to remove elements from the array. This sets them to null.
            delete neighbors.objects[i];
        } else if(neighbors.coords[i].y < 0 || neighbors.coords[i].y > totalRows-1) {
            delete neighbors.coords[i];
            delete neighbors.objects[i];
        } else if(neighbors.objects[i].classList.contains("cell-new") || neighbors.objects[i].classList.contains("cell-visited") || neighbors.objects[i].classList.contains("cell-wall") || neighbors.objects[i].classList.contains("cell-start")) {
            delete neighbors.coords[i];
            delete neighbors.objects[i];
        }
    }
    neighbors = neighbors.objects;
    return neighbors;
}