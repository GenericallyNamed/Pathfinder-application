/**
 * @title ui.js
 * @description The following code was developed for the operation of the 
 * user interface and experience.
 * 
 * @author Alex Shandilis
 * @version 5/3/2021
 * 
 */

var startBtn = document.getElementById("startBtn");
var resetBtn = document.getElementById("resetBtn");
var editBtn = document.getElementById("editBtn");
var editPanel = document.getElementById("editPanel");
var interface = document.getElementById("interface");
var destinationElement;
var addColBtn = document.getElementById("addColBtn");
var addRowBtn = document.getElementById("addRowBtn");
var decreateColBtn = document.getElementById("decreaseColBtn");
var decreaseRowBtn = document.getElementById("decreaseRowBtn");
var colCounter = document.getElementById("colCount");
var rowCounter = document.getElementById("rowCount");
var destination_classes;
var originElement;
var origin_classes;
var totalRows = gridTable.getElementsByTagName("tr").length;
var totalColumns = gridTable.rows[0].getElementsByTagName("td").length;
colCounter.innerText = totalColumns + " columns";
rowCounter.innerText = totalRows + " rows";
squareTable();

resetBtn.addEventListener("click", function(){
    resetGrid();
});
var gridTable = document.getElementById("navigationGrid");
gridTable.clicked = false;
gridTable.issearching = false;
gridTable.moveelementclasses = "";
var isMovingCell = false;
window.addEventListener("resize",function(){
    squareTable();
});

setCoordinates();

var maximumHeight = (getComputedStyle(gridTable).height).substring(0, (getComputedStyle(gridTable).height).indexOf("px"));
gridTable.style.maxHeight = maximumHeight+"px";
gridTable.style.maxWidth = maximumHeight+"px";
for(var i = 0; i < totalRows; i++) {
    for(var j = 0; j < totalColumns; j++) {
        let elem = gridTable.rows[i].cells[j];
        elem.resetclasses = elem.className;
        addCellEventListeners(elem);
    }
}

function cellClicked(x,y) { 
    var selectedCell = gridTable.rows[y].cells[x];
    cellType = gridTable.cellToMove;
    var isStart = selectedCell.classList.contains(cellType);
    var isFinish = selectedCell.classList.contains("cell-finish"); 
        if(!isStart && !isFinish) {
            toggleWall(selectedCell);
        } else if (isStart || isFinish) {
            searchState = gridTable.issearching;
            if(searchState == true) {
                endSearch(x, y);
            } else if (searchState == false) {
                beginSearch(selectedCell, x, y);
            } else {
                console.log("Error");
            }
        } else {
            console.log("Error");
        }
    for(var i = 0; i < totalRows; i++) {
        for(var j = 0; j < totalColumns; j++) {

        }
    }
}

function endSearch(x, y) { 
    gridTable.rows[gridTable.originY].cells[gridTable.originX].isorigin = false;
    gridTable.issearching = false;
    var cellType = gridTable.cellToMove;
    var originElement;
    var selectedCell = gridTable.rows[y].cells[x];
    if((gridTable.querySelectorAll(".none")).length != 0) {
        originElement = (gridTable.querySelectorAll(".none"))[0];
        originElement.className = "cell-unvisited";
    } else {
        originElement = (gridTable.querySelectorAll("." + cellType))[0];
        originElement.className = gridTable.moveelementclasses;
    }
    for(var i = 0; i < totalRows; i++ ) {
        for(var j = 0; j < totalColumns; j++) {
            if(!(j == x && i == y)) {
                gridTable.rows[i].cells[j].classList.remove("dim");
            }  
        }
    }
    originElement.isorigin = false;
    if(gridTable.originX != x && gridTable.originY != y) {
        originElement.className = "cell-unvisited";
        if(selectedCell.isWall == true) {
            selectedCell.originalclasses = "cell-wall cell-unvisited";
        } else {
            selectedCell.originalclasses = "cell-unvisited";
        }
    }
    

}

function beginSearch(cell, x, y) { 
    gridTable.moveelementclasses = cell.classname;
    gridTable.originX = cell.x;
    gridTable.originY = cell.y;
    gridTable.issearching = true;
    var cellType = gridTable.cellToMove;
    cell.isorigin = true;
    gridTable.originElementClasses = cell.className;
    if(cell.classList.contains("cell-start")) {
        gridTable.originElement = "cell-start";
    } else if(cell.classList.contains("cell-finish")) {
        gridTable.originElement = "cell-finish";
    }
    for(var i = 0; i < totalRows; i++ ) {
        for(var j = 0; j < totalColumns; j++) {
            if(!(j == x && i == y)) {
                gridTable.rows[i].cells[j].classList.add("dim");
            }  
        }
    }
}

function toggleWall(cell) {
    if(cell.classList.contains("cell-wall")) {
        cell.classList.remove('cell-wall');
        cell.isWall = false;
    } else {
        cell.classList.add('cell-wall');
        cell.isWall = true;
    }
    cell.originalclasses = cell.className;
    cell.resetclasses = cell.className;
}

function parseLength(l) {
    return parseInt((l).substring(0,l.indexOf("px")));
}

function squareTable() {
    var gridTable = document.getElementById("navigationGrid");
    var totalRows = gridTable.getElementsByTagName("tr").length;
    var totalColumns = gridTable.rows[0].getElementsByTagName("td").length;
    var individualCellWidth = parseLength(getComputedStyle(gridTable.rows[0].cells[0]).width);
    var individualCellHeight = parseLength(getComputedStyle(gridTable.rows[0].cells[0]).height);
    var gridParentDimensions = parseLength(getComputedStyle(gridTable.parentNode).width) < parseLength(getComputedStyle(gridTable).width) + individualCellWidth;
    
    document.getElementById("interface").style.width = window.innerWidth+"px";
    height = parseInt((getComputedStyle(gridTable).height).substring(0,((getComputedStyle(gridTable).height).indexOf("px"))));
    width = parseInt((getComputedStyle(gridTable).width).substring(0,((getComputedStyle(gridTable).width).indexOf("px"))));
    var colMarginGaps = totalColumns+1;
    var rowMarginGaps = totalRows+1;
    var cellWidth = (width-colMarginGaps)/totalColumns;
    var cellHeight = (height-rowMarginGaps)/totalRows;
    if(gridParentDimensions == false) {
        if(totalColumns < totalRows) {
            var newCellWidth = cellHeight;
            var newWidth = newCellWidth * totalColumns + colMarginGaps;
            gridTable.style.maxWidth = newWidth+"px";
        } else if (totalColumns > totalRows) {
            var newCellWidth = cellHeight;
            var newWidth = newCellWidth * totalColumns + colMarginGaps;
            gridTable.style.maxWidth = newWidth+"px";
        }
        gridTable.style.maxHeight = "100%";
    } else if(gridParentDimensions == true) {
        if(individualCellWidth > individualCellHeight) {
            var newCellWidth = individualCellHeight;
            var newWidth = newCellWidth * totalColumns + colMarginGaps;
            gridTable.style.maxWidth = newWidth + "px";
        }
    
        var newCellHeight = cellWidth;
        var newHeight = newCellHeight * totalRows + rowMarginGaps;
        gridTable.style.maxHeight = newHeight+"px";
        
    }
}

function addRow() {
    let newRow = document.createElement('tr');
    gridTable.getElementsByTagName("tbody")[0].appendChild(newRow);
    totalRows++;
    var y = totalRows - 1;
    var x;
    for(var i = 0; i < totalColumns; i++) {
        x = i;
        let newCell = document.createElement('td');
        newCell.innerHTML = "<div class='cell'></div>";
        newCell.classList.add("cell-unvisited");
        newCell.resetclasses = newCell.className;
        let row = gridTable.getElementsByTagName("tbody")[0].rows[totalRows-1];
        row.appendChild(newCell);
    }
    setCoordinates();
    for(var a = 0; a < totalColumns; a++) {
        let currentCell = gridTable.rows[totalRows-1].cells[a];
        addCellEventListeners(currentCell);
    }
}

function addColumn() {
    totalColumns++;
    for(var i = 0; i < totalRows; i++ ) {
        let newCell = document.createElement("td");
        newCell.innerHTML = "<div class='cell'></div>";
        newCell.classList.add("cell-unvisited");
        newCell.resetclasses = newCell.className;
        gridTable.getElementsByTagName("tbody")[0].rows[i].appendChild(newCell);
    }
    setCoordinates();
    for(var i = 0; i < totalRows; i++ ) {
        let cell = gridTable.rows[i].cells[totalColumns-1];
        addCellEventListeners(cell);
    }
    squareTable();
}

function setCoordinates() {
    for(i = 0; i < totalRows; i++) {
        for(j = 0; j < totalColumns; j++) {
            gridTable.rows[i].cells[j].x = j;
            gridTable.rows[i].cells[j].y = i
        }
    }
    squareTable();
}

function removeRow() {
    var table = gridTable.getElementsByTagName("tbody")[0];
    var containsStartCell = false;
    var containsFinishCell = false;
    if(totalRows > 5) {
        for(var i = 0; i < totalColumns; i++) {
            if(table.rows[totalRows-1].cells[i].classList.contains("cell-start")) {
                 containsStartCell = true;
            }
            if(table.rows[totalRows-1].cells[i].classList.contains("cell-finish")) {
                containsFinishCell = true;
            }
        }
        if(containsStartCell == false && containsFinishCell == false) {
            table.rows[totalRows-1].remove();
            totalRows--;
        } else {
            if(containsStartCell) {
                var startCell = (gridTable.querySelectorAll(".cell-finish"))[0];
                table.rows[totalRows-2].cells[startCell.x].className = table.rows[totalRows-1].cells[startCell.x].className;
            }
            if(containsFinishCell) {
                var finishCell = (gridTable.querySelectorAll(".cell-finish"))[0];    
                table.rows[totalRows-2].cells[finishCell.x].className = table.rows[totalRows-1].cells[finishCell.x].className;
            }
            table.rows[totalRows-1].remove();
            totalRows--;
        }
    } else {
        alert("Sorry, there must be at least 5 rows.");
    }
    squareTable();
}

function removeColumn() {
    if(totalColumns > 5) {
        var startCell = document.querySelectorAll(".cell-start")[0];
        var finishCell = document.querySelectorAll(".cell-finish")[0];
        var containsStartCell = false;
        if(startCell.x == totalColumns-1) {
            containsStartCell = true;
        }
        var containsFinishCell = false;
        if(finishCell.x == totalColumns-1) {
            containsFinishCell = true;
        }
        if(containsStartCell == true) {
            var newX = startCell.x - 1;
            gridTable.rows[startCell.y].cells[newX].className = startCell.className;
        }
        if(containsFinishCell == true) {
            var newX = finishCell.x - 1;
            gridTable.rows[finishCell.y].cells[newX].className = finishCell.className;
        }
        for(var i = 0; i < totalRows; i++) {
            gridTable.rows[i].cells[totalColumns-1].remove();
        }
        totalColumns--;
        squareTable();
    } else {
        alert("Table requires more than 5 columns");
    }
}

function setOriginalClasses(elem) {
    if (gridTable.issearching == true && gridTable.originElement == "cell-start" && elem.classList.contains("cell-finish") == true) {
        elem.originalclasses = "cell-finish"; 
    } else if(gridTable.issearching == true && gridTable.originElement == "cell-finish" && elem.classList.contains("cell-start") == true) {
        elem.originalclasses = "cell-start"; 
    } else if(elem.isWall == true) {
        elem.originalclasses = "cell-wall cell-unvisited";
    } else if(elem.isWall == false) {
        elem.originalclasses = "cell-unvisited";
    } 
}

function addCellEventListeners(e) {
    i = e.y;
    j = e.x;
    gridTable.rows[i].cells[j].addEventListener("mouseup",function(){
        setOriginalClasses(this);
        if(this.classList.contains("cell-start")) {
            gridTable.cellToMove = "cell-start";
        } else {
            gridTable.cellToMove = "cell-finish"
        }
        var cellType = gridTable.cellToMove;
        var x = this.x;
        var y = this.y;
        if(this.classList.contains(cellType) && gridTable.issearching == false) { 
            gridTable.moveelementclasses = this.className;
            gridTable.setAttribute("moveelementclasses", gridTable.moveelementclasses);
            this.isorigin = true;
        }
        cellClicked(x, y);
        
    });
    gridTable.rows[i].cells[j].addEventListener("mouseenter",function(){
        this.originalclasses = this.className;
        var x = this.x;
        var y = this.y;
        gridTable.rows[y].cells[x].hovered = true;
        if(gridTable.issearching == true) {
            gridTable.originalclasses = this.className;
            gridTable.moveelementclasses = gridTable.getAttribute("moveelementclasses");
            if((gridTable.cellToMove == "cell-start" && this.classList.contains("cell-finish")) || (gridTable.cellToMove == "cell-finish" && this.classList.contains("cell-start"))) {
                this.className = "error";
            } else {
                this.className = gridTable.moveelementclasses;
            }
        }
        
    });
    gridTable.rows[i].cells[j].addEventListener("mouseleave",function(){
        var x = this.x;
        var y = this.y;
        gridTable.rows[y].cells[x].hovered = false;
        if(gridTable.issearching == true) {
            if(this.isorigin == true) {
                for(var i = 0; i < totalRows; i++) {
                    for(var j = 0; j < totalColumns; j++) {
                        if(gridTable.rows[i].cells[j].isorigin == true) {
                            gridTable.rows[i].cells[j].className = "none";
                        }
                    }
                }
                if(this.originalclasses.indexOf(gridTable.originElement) != -1) {
                    this.className = "none";
                } else {
                    this.isorigin = false;
                }
            } else {
                this.className = this.originalclasses;
            }
            var containsOriginalClasses = gridTable.querySelectorAll("[originalclasses]");
            for(var i = 0; i < containsOriginalClasses.length; i++) {
                if(containsOriginalClasses[i].isorigin != true && gridTable.issearching == true) {
                    containsOriginalClasses[i].className = containsOriginalClasses[i].originalclasses;
                    delete containsOriginalClasses[i].originalclasses;
                } else {
                    delete containsOriginalClasses[i].originalclasses;
                }
            }
        } else if(gridTable.issearching == false) {
            var containsOriginalClasses = gridTable.querySelectorAll("[originalclasses]");
            for(var i = 0; i < containsOriginalClasses.length; i++) {
                delete containsOriginalClasses[i].originalclasses;
            }    
        }
        
    });
}

function setResetClasses() {
    for(var i = 0; i < totalRows; i++ ) {
        for(var j = 0; j < totalColumns; j++ ) {
            let elem = gridTable.rows[i].cells[j];
            elem.resetclasses = elem.className;
        }
    }
}

function resetGrid() {
    for(var i = 0; i < totalRows; i++) {
        for(var j = 0; j < totalColumns; j++) {
            let elem = gridTable.rows[i].cells[j];
            elem.className = elem.resetclasses;
            elem.researchclasses = elem.className;
            delete elem.prevX;
            delete elem.prevY;
            
        }
    }
    gridTable.finishFound = false;
    gridTable.isrunning = false;
    setResetClasses();
    gridTable.isRunning = false;
}

addColBtn.addEventListener("click",function(){
    addColumn();
    var totalColumns = gridTable.rows[0].getElementsByTagName("td").length;
    colCounter.innerText = totalColumns + " columns";
});
addRowBtn.addEventListener("click",function(){
    addRow();
    var totalRows = gridTable.getElementsByTagName("tr").length;
    rowCounter.innerText = totalRows + " rows";
});
decreaseColBtn.addEventListener("click",function(){
    removeColumn();
    var totalColumns = gridTable.rows[0].getElementsByTagName("td").length;
    colCounter.innerText = totalColumns + " columns";
});
decreaseRowBtn.addEventListener("click",function(){
    removeRow();
    var totalRows = gridTable.getElementsByTagName("tr").length;
    rowCounter.innerText = totalRows + " rows";
});