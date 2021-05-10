/**
 * @title ui.js
 * @description The following code was developed for the operation of the 
 * user interface and experience.
 * 
 * @author Alex Shandilis
 * @version 5/6/2021
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
squareTable(); //Updates the table dimensions to fit within the constraints of the size of the screen.

resetBtn.addEventListener("click", function(){ 
    resetGrid();
});
var gridTable = document.getElementById("navigationGrid"); //the table that contains all the cells of the grid is defined as "gridTable"
gridTable.clicked = false; //all of these properties are added to the "gridTable"
gridTable.issearching = false;
gridTable.moveelementclasses = "";
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
        elem.resetClasses = elem.className;
        addCellEventListeners(elem);
    }
}

/**
 * @name cellClicked
 * @param {Number} x    x coordinate of clicked cell
 * @param {Number} y    y coordinate of clicked cell 
 * @purpose Runs if the user clicks a cell on the grid
 */
function cellClicked(x,y) { 
    var selectedCell = gridTable.rows[y].cells[x];
    var isStart = selectedCell.classList.contains(gridTable.cellToMove);
    var isFinish = selectedCell.classList.contains("cell-finish"); 
    if(gridTable.issearching == false) {
        if(!isStart && !isFinish) {
            toggleWall(selectedCell);
        } else {
            beginSearch(selectedCell, x, y);
        }
    } else if(gridTable.issearching == true && !selectedCell.classList.contains("error")) {
        endSearch(x, y);
    } else {
        console.log("Couldn't complete requested action.");
    }
}

/**
 * @name endSearch
 * @param {Number} x    New x coordinate
 * @param {Number} y    New y coordinate 
 * @purpose End the search procedure when the user clicks on a destination cell
 */
function endSearch(x, y) { 
    gridTable.rows[gridTable.originY].cells[gridTable.originX].isorigin = false;
    gridTable.issearching = false;
    var originElement = gridTable.rows[gridTable.originY].cells[gridTable.originX];
    var selectedCell = gridTable.rows[y].cells[x];
    originElement.className = "cell-unvisited dim";
    selectedCell.className = gridTable.moveelementclasses;
    originElement.isorigin == false;
    for(var i = 0; i < totalRows; i++ ) {
        for(var j = 0; j < totalColumns; j++) {
            if(!(j == x && i == y)) {
                gridTable.rows[i].cells[j].classList.remove("dim");
            }  
        }
    }

}

/**
 * @name beginSearch
 * @param {Object} cell The cell object being moved
 * @purpose Initiate searching procedure for new location of cell.
 */
function beginSearch(cell) {
    gridTable.originX = cell.x; 
    gridTable.originY = cell.y;
    gridTable.issearching = true;
    cell.isorigin = true;
    gridTable.originElementClasses = cell.className;
    if(cell.classList.contains("cell-start")) {
        gridTable.originElement = "cell-start";
    } else if(cell.classList.contains("cell-finish")) {
        gridTable.originElement = "cell-finish";
    }
    for(var i = 0; i < totalRows; i++ ) {
        for(var j = 0; j < totalColumns; j++) {
            if(!(j == cell.x && i == cell.y)) {
                gridTable.rows[i].cells[j].classList.add("dim");
            }  
        }
    }
}

/**
 * @name toggleWall
 * @param {Object} cell 
 * @purpose Toggle cell walls on or off
 */
function toggleWall(cell) {
    cell.classList.toggle("cell-wall"); //toggles the cell-wall class (to update the look of the cell)
    cell.isWall = !(cell.isWall); //this very simple expression toggles the state of the "isWall" property
    cell.originalClasses = cell.className;
    cell.resetClasses = cell.className;
}

/**
 * @name parseLength
 * @param {String} l 
 * @returns {Number} length value without added "px"
 * @purpose to take a length string (i.e. '100 px') and return simply 100 as a number
 */
function parseLength(l) {
    return parseInt((l).substring(0,l.indexOf("px")));
}


/**
 * @name squareTable
 * @purpose Updates the dimensions of the table to be sure that it fits on the user's screen. Runs
 * when the window/viewport changes shape as well as when the user modifies the dimensions of the
 * grid.
 */
function squareTable() {
    var gridTable = document.getElementById("navigationGrid"); //First initializes all relevant variables
    var totalRows = gridTable.getElementsByTagName("tr").length;
    var totalColumns = gridTable.rows[0].getElementsByTagName("td").length;
    var individualCellWidth = parseLength(getComputedStyle(gridTable.rows[0].cells[0]).width);
    var individualCellHeight = parseLength(getComputedStyle(gridTable.rows[0].cells[0]).height);
    var gridParentDimensions = parseLength(getComputedStyle(gridTable.parentNode).width) < parseLength(getComputedStyle(gridTable).width) + individualCellWidth;
    //gridParentDimensions is true if the addition of a new column would make the width of the table greater than the width of the viewport (screen).
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

/**
 * @name addRow
 * @purpose add row to grid
 */
function addRow() {
    let newRow = document.createElement('tr'); //first creates tr element to create row
    gridTable.getElementsByTagName("tbody")[0].appendChild(newRow); //the new row is appended to the gridTable element (the table containing the grid)
    totalRows++;
    for(var i = 0; i < totalColumns; i++) { //for-loop adds new row of cells
        x = i;
        let newCell = document.createElement('td'); //'td' elements are the individual cells
        newCell.innerHTML = "<div class='cell'></div>"; //we set the "innerHTML" property to a div with the class "cell"
        newCell.classList.add("cell-unvisited"); //the 'td' element is added to the class "cell-unvisited"
        newCell.resetClasses = newCell.className; //we also set the resetClasses property of the new cell
        let row = gridTable.getElementsByTagName("tbody")[0].rows[totalRows-1]; //
        row.appendChild(newCell); //appends new cells to row
    }
    setCoordinates(); //sets the coordinates for the new cells
    for(var a = 0; a < totalColumns; a++) { //adds event listeners to cells
        let currentCell = gridTable.rows[totalRows-1].cells[a];
        addCellEventListeners(currentCell); //runs the method to add event listeners to the new cells
    }
    squareTable(); //squares the table dimensions
}

/**
 * @name addColumn
 * @purpose add column to grid
 */
function addColumn() {
    totalColumns++; //increments totalColumns
    for(var i = 0; i < totalRows; i++ ) { //adds single cell to every row to make a column
        let newCell = document.createElement("td");
        newCell.innerHTML = "<div class='cell'></div>";
        newCell.classList.add("cell-unvisited");
        newCell.resetClasses = newCell.className;
        gridTable.getElementsByTagName("tbody")[0].rows[i].appendChild(newCell);
    }
    setCoordinates(); //updates coordinates
    for(var i = 0; i < totalRows; i++ ) { //updates event listeners
        let cell = gridTable.rows[i].cells[totalColumns-1];
        addCellEventListeners(cell);
    }
    squareTable(); //squares the table
}

/**
 * @name setCoordinates
 * @purpose Sets the coordinates for every cell in the grid. Called when the table is created and
 * when the user updates the dimensions of the grid.
 */
function setCoordinates() {
    for(i = 0; i < totalRows; i++) {
        for(j = 0; j < totalColumns; j++) {
            gridTable.rows[i].cells[j].x = j;
            gridTable.rows[i].cells[j].y = i
        }
    }
}

/**
 * @name removeRow
 * @purpose Remove row from grid
 */
function removeRow() {
    let startCell = gridTable.querySelectorAll(".cell-start")[0];
    let finishCell = gridTable.querySelectorAll(".cell-finish")[0];
    var table = gridTable.getElementsByTagName("tbody")[0];
    if(totalRows > 5) {
        //if the finish or start cell are in the row to be moved, they will be shifted over (see below if-statements)
        if(startCell.y == (totalRows - 1)) table.rows[totalRows-2].cells[startCell.x].className = startCell.className; 
        if(finishCell.y == (totalRows - 1)) table.rows[totalRows-2].cells[finishCell.x].className = finishCell.className; //if-statement written in single-line for compact-ness
        table.rows[totalRows-1].remove();
        totalRows--;
        squareTable();   
    } else {
        alert("Sorry, there must be at least 5 rows.");
    }
}

/**
 * @name removeColumn
 * @purpose remove column from grid (at end)
 */
function removeColumn() {
    if(totalColumns > 5) { //As there must be five rows minimum, this will only remove a row if there is MORE than 5.
        var startCell = document.querySelectorAll(".cell-start")[0];
        var finishCell = document.querySelectorAll(".cell-finish")[0];
        var newX = startCell.x - 1;
        if(startCell.x == totalColumns - 1) gridTable.rows[startCell.y].cells[newX].className = startCell.className;
        if(finishCell.x == totalColumns - 1) gridTable.rows[finishCell.y].cells[newX].className = finishCell.className;
        for(var i = 0; i < totalRows; i++) {
            gridTable.rows[i].cells[totalColumns-1].remove();
        }
        totalColumns--;
        squareTable(); //runs the squareTable method to adjust the size proportions of the table.
    } else {
        alert("Table requires at least 5 columns"); //If there are five columns, it alert the user that the table cannot be smaller than 5x5.
    }
}

/**
 * @name setOriginalClasses
 * @param {Object} elem 
 * @purpose takes a given element from the DOM and based on certain conditions sets its 
 * originalClasses property based on what type of cell it is. This property is used so that the
 * program knows what type of cell it is during the search process (when the user is moving the 
 * start or finish cell).
 */
function setOriginalClasses(elem) {
    if (gridTable.issearching == true && gridTable.originElement == "cell-start" && elem.classList.contains("cell-finish") == true) { //checks if it is a finish cell
        elem.originalClasses = "cell-finish"; 
    } else if(gridTable.issearching == true && gridTable.originElement == "cell-finish" && elem.classList.contains("cell-start") == true) { //checks if it is a start cell
        elem.originalClasses = "cell-start"; 
    } else if(elem.isWall == true) { //checks if it is a wall
        elem.originalClasses = "cell-wall cell-unvisited";
    } else if(elem.isWall == false) { //checks if it is not a wall
        elem.originalClasses = "cell-unvisited";
    } 
}

/**
 * @name addCellEventListeners
 * @param {object} elem 
 * @purpose When the grid is first created, or new cells are added to the grid, this function is
 * used to add the appropriate event listeners to those cells.
 */
function addCellEventListeners(elem) {
    gridTable.rows[elem.y].cells[elem.x].addEventListener("mouseup",function(){ //note that the "this" keyword refers to the element that the event listener is added to
        if(!(this.classList.contains("error"))) {
            setOriginalClasses(this);
        }
        if(gridTable.issearching == false && this.classList.contains("cell-start")) {
            gridTable.cellToMove = "cell-start"
        }
        if(gridTable.issearching == false && this.classList.contains("cell-finish")) {
            gridTable.cellToMove = "cell-finish"
        }
            
        var cellType = gridTable.cellToMove;
        if(this.classList.contains(cellType) && gridTable.issearching == false) { 
            gridTable.moveelementclasses = this.className;
            this.isorigin = true;//when moving the start or finish cell, this is used to indicated the location of the original cell
        }
        cellClicked(this.x, this.y); //pass the x and y property values of the element to the "cellClicked" method        
    });
    gridTable.rows[elem.y].cells[elem.x].addEventListener("mouseenter",function(){
        this.originalClasses = this.className;
        gridTable.rows[this.y].cells[this.x].hovered = true;
        if(gridTable.issearching == true) {
            gridTable.originalClasses = this.className;
            if((gridTable.cellToMove == "cell-start" && this.classList.contains("cell-finish")) || (gridTable.cellToMove == "cell-finish" && this.classList.contains("cell-start"))) {
                this.className = "error";
            } else {
                this.className = gridTable.moveelementclasses;
            }
        }
        
    });
    gridTable.rows[elem.y].cells[elem.x].addEventListener("mouseleave",function(){
        gridTable.rows[this.y].cells[this.x].hovered = false;
        if(gridTable.issearching == true) {
            if(this.isorigin == true) {
                this.className = "none";
            } else {
                this.className = this.originalClasses;
            }
            var containsOriginalClasses = gridTable.querySelectorAll("[originalClasses]");
            for(var i = 0; i < containsOriginalClasses.length; i++) {
                if(containsOriginalClasses[i].isorigin != true && gridTable.issearching == true) {
                    containsOriginalClasses[i].className = containsOriginalClasses[i].originalClasses;
                    delete containsOriginalClasses[i].originalClasses; //delete operator used to remove the value of the originalClasses property
                } else {
                    delete containsOriginalClasses[i].originalClasses; //delete operator used to remove the value of the originalClasses property
                }
            }
        } else if(gridTable.issearching == false) {
            var containsOriginalClasses = gridTable.querySelectorAll("[originalClasses]");
            for(var i = 0; i < containsOriginalClasses.length; i++) {
                delete containsOriginalClasses[i].originalClasses; //delete operator used to remove the value of the originalClasses property
            }    
        }
        
    });
}

/**
 * @name setResetClasses
 * @purpose This method is used to set the property resetClasses for every element based on the
 * value of the element's className. The value of the resetClasses property is used for when the
 * user resets the grid or the program calls the resetGrid method.
 */
function setResetClasses() {
    for(var i = 0; i < totalRows; i++ ) {
        for(var j = 0; j < totalColumns; j++ ) {
            let elem = gridTable.rows[i].cells[j];
            elem.resetClasses = elem.className; //element.className is the class list in string form, and can be used to update the classlist of the element
        }
    }
}

/**
 * @name resetGrid
 * @purpose add row to grid
 */

function resetGrid() {
    for(var i = 0; i < totalRows; i++) {
        for(var j = 0; j < totalColumns; j++) {
            let elem = gridTable.rows[i].cells[j];
            elem.className = elem.resetClasses;
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