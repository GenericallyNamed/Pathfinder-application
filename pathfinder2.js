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

function makePath(p) {
    if(!(p[p.length-1].classList.contains("cell-start"))) {
        //var newX = parseInt(p[p.length-1].getAttribute("prevX"));
        newX = p[p.length-1].prevX;
        //var newY = parseInt(p[p.length-1].getAttribute("prevY"));
        newY = p[p.length-1].prevY;
        var newCell = gridTable.rows[newY].cells[newX];
        p[p.length] = newCell;
        p = makePath(p);
    }
    return p;
}

function drawPath(p, i) {
    i -= 1;
    p[i].classList.add("cell-path");
    if(i > 0) {
        setTimeout(function(){
            drawPath(p, i);
        }, 300);
    }
}




function proxy(cells) {
    path(cells);
}

function initPath() {
    var cellNew_array = gridTable.querySelectorAll(".cell-start");
    proxy(cellNew_array);
    //path(cellNew_array);
    var path = [gridTable.querySelector(".cell-finish")];   
    path = makePath(path);
    drawPath(path, path.length);
    console.log("path generated");
}

function path(cells) {
    console.log("path()");
    start = gridTable.querySelectorAll(".cell-start");    
    finish = gridTable.querySelectorAll(".cell-finish");
    gridTable.nextCellFound = false;
    for(var i = 0; i < cells.length; i++) {
        //currentX = parseInt(cells[i].getAttribute("x"));
        currentX = cells[i].x;
        //currentY = parseInt(cells[i].getAttribute("y"));
        currentY = cells[i].y;
        currentCell = gridTable.rows[currentY].cells[currentX];
        var newCells = getNeighbor(currentX, currentY);
        for(var j = 0; j < newCells.coords.length; j++) {
            if(newCells.objects[j] != null) { //CHECK IF THIS DOESN'T WORK
                gridTable.nextCellFound = true;
                //newCells.objects[j].classList.add("cell-new");
                newCells.objects[j].setAttribute("prevX",currentX);
                newCells.objects[j].prevX = currentX;
                newCells.objects[j].setAttribute("prevY",currentY);
                newCells.objects[j].prevY = currentY;
                if((newCells.objects[j].classList.contains("cell-finish"))) {
                    gridTable.setAttribute("finishFound","true");
                    gridTable.finishFound = true;
                } else {
                    newCells.objects[j].classList.add("cell-new");
                    currentCell.classList.remove("cell-new");
                    newCells.objects[j].classList.remove("cell-unvisited");
                }
                currentCell.classList.remove("cell-new");
                

            }
        }
        if(!(currentCell.classList.contains("cell-start"))) { 
            currentCell.classList.add("cell-visited"); 
            currentCell.classList.add("cell-closed"); 
            currentCell.classList.remove("cell-new");
        }
    }
    if(gridTable.nextCellFound == true) {
        //if(gridTable.getAttribute("finishFound") == "true" || gridTable.getAttribute("noPath") == "true") {
        if(gridTable.finishFound == true || gridTable.noPath == true) {
            return;
        } else {
            cells = gridTable.querySelectorAll(".cell-new");
            if(cells.length == 0) {
                gridTable.setAttribute("noPath","true");
                gridTable.noPathFound = true;
                return;
            } else {
                //setTimeout(function(){
                    path(cells);
                //}, 500);
            }
        }
    } else {
        alert("Could not find a path.");
        resetGrid();
    }
    return;
}


function delay() {
    var loop = true;
    setTimeout(function(){
        loop = false;
    }, 500);
    while(loop == true) {
    }
}