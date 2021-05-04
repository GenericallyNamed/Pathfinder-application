/**
 * @title ui.js
 * @description The following code was developed for the operation of the 
 * user interface and experience.
 * 
 * @author Alex Shandilis
 * @version 5/3/2021
 * 
 */



const controller = new AbortController();

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




resetBtn.addEventListener("click", function(){
    resetGrid();
});
var gridTable = document.getElementById("navigationGrid");
//gridTable.setAttribute("clicked",false); //@unused
gridTable.clicked = false;
//gridTable.setAttribute("issearching",false);
gridTable.issearching = false;
gridTable.moveelementclasses = "";
var isMovingCell = false;
//document.getElementsByClassName("cell-start")[0].test = true;
window.addEventListener("resize",function(){
    squareTable();
});

setCoordinates();

var maximumHeight = (getComputedStyle(gridTable).height).substring(0, (getComputedStyle(gridTable).height).indexOf("px"));
gridTable.style.maxHeight = maximumHeight+"px";
gridTable.style.maxWidth = maximumHeight+"px";
console.log("LLLLLL");
for(var i = 0; i < totalRows; i++) {
    for(var j = 0; j < totalColumns; j++) {
        console.log("testing123");
        let elem = gridTable.rows[i].cells[j];
        elem.resetclasses = elem.className;
        addCellEventListeners(elem);
    }
}

squareTable();


function cellClicked(x,y) { console.log("<<<< cellClicked() >>>>");
    var selectedCell = gridTable.rows[y].cells[x];
    //var cellType = gridTable.getAttribute("cellToMove");
    cellType = gridTable.cellToMove;
    var isStart = selectedCell.classList.contains(cellType);
    var isFinish = selectedCell.classList.contains("cell-finish"); 
        if(!isStart && !isFinish) {
            toggleWall(selectedCell);
        } else if (isStart || isFinish) {
            //var searchState = gridTable.getAttribute("issearching");
            searchState = gridTable.issearching;
            if(searchState == true) {
                endSearch(x, y);
            } else if (searchState == false) {
                beginSearch(selectedCell, x, y);
            } else {
                console.log("No worky");
            }
        } else {
            console.log("There has been an error. Sorry.");
        }
    for(var i = 0; i < totalRows; i++) {
        for(var j = 0; j < totalColumns; j++) {

        }
    }
}

function endSearch(x, y) { console.log("<<<< endSearch() >>>>");
    //gridTable.setAttribute("issearching",false);
    gridTable.rows[gridTable.originY].cells[gridTable.originX].isorigin = false;
    gridTable.issearching = false;
    //var cellType = gridTable.getAttribute("cellToMove");
    var cellType = gridTable.cellToMove;
    var originElement;
    var selectedCell = gridTable.rows[y].cells[x];
    if((gridTable.querySelectorAll(".none")).length != 0) {
        originElement = (gridTable.querySelectorAll(".none"))[0];
        originElement.className = "cell-unvisited";
    } else {
        originElement = (gridTable.querySelectorAll("." + cellType))[0];
        //originElement.className = gridTable.getAttribute("moveelementclasses");
        originElement.className = gridTable.moveelementclasses;
    }
    for(var i = 0; i < totalRows; i++ ) {
        for(var j = 0; j < totalColumns; j++) {
            if(!(j == x && i == y)) {
                gridTable.rows[i].cells[j].classList.remove("dim");
            }  
        }
    }
    //originElement.removeAttribute("isorigin");
    originElement.isorigin = false;
    if(gridTable.originX != x && gridTable.originY != y) {
        originElement.className = "cell-unvisited"
        //selectedCell.removeAttribute('originalclasses');
        if(selectedCell.isWall == true) {
            selectedCell.originalclasses = "cell-wall cell-unvisited";
        } else {
            selectedCell.originalclasses = "cell-unvisited";
        }
    }
    

}

function beginSearch(cell, x, y) { console.log("<<<< beginSearch() >>>>");
    //gridTable.setAttribute("moveelementclases",cell.className);
    gridTable.moveelementclasses = cell.classname;
    gridTable.originX = cell.x;
    gridTable.originY = cell.y;
    //gridTable.setAttribute("issearching",true);
    gridTable.issearching = true;
    //var cellType = gridTable.getAttribute("cellToMove");
    var cellType = gridTable.cellToMove;
    //cell.setAttribute("isorigin",true);
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

var gridHeight;
var gridWidth;
var colMarginGaps;
var rowMarginGaps;

function squareTable() {
    var individualCellWidth = parseLength(getComputedStyle(gridTable.rows[0].cells[0]).width);
    var individualCellHeight = parseLength(getComputedStyle(gridTable.rows[0].cells[0]).height);
    var gridParentDimensions = parseLength(getComputedStyle(gridTable.parentNode).width) < parseLength(getComputedStyle(gridTable).width) + individualCellWidth;
    
    document.getElementById("interface").style.width = window.innerWidth+"px";
    console.log("squareTable() run");
    //var interface = document.getElementById("interface");
    //var interfaceWidth = parseInt((getComputedStyle(interface).width).substring(0,((getComputedStyle(interface).width).indexOf("px"))));
    height = parseInt((getComputedStyle(gridTable).height).substring(0,((getComputedStyle(gridTable).height).indexOf("px"))));
    width = parseInt((getComputedStyle(gridTable).width).substring(0,((getComputedStyle(gridTable).width).indexOf("px"))));
    colMarginGaps = totalColumns+1;
    rowMarginGaps = totalRows+1;
    var cellWidth = (width-colMarginGaps)/totalColumns;
    var cellHeight = (height-rowMarginGaps)/totalRows;
    console.log("gridParentDimensions = " + gridParentDimensions);
    if(gridParentDimensions == false) {
        if(totalColumns < totalRows) {
            var newCellWidth = cellHeight;
            var newWidth = newCellWidth * totalColumns + colMarginGaps;
            gridTable.style.maxWidth = newWidth+"px";
        } else if (totalColumns > totalRows) {
            var newCellWidth = cellHeight;
            var newWidth = newCellWidth * totalColumns + colMarginGaps;
            gridTable.style.maxWidth = newWidth+"px";
        } else if (totalColumns == totalRows) {
            //var 
        }
        gridTable.style.maxHeight = "100%";
    } else if(gridParentDimensions == true) {
        if(individualCellWidth > individualCellHeight) {
            var newCellWidth = individualCellHeight;
            var newWidth = newCellWidth * totalColumns + colMarginGaps;
            gridTable.style.maxWidth = newWidth + "px";
        }
        //if(cellWidth != cellHeight && (cellHeight * totalColumns + colMarginGaps) >= interfaceWidth) {
            var newCellHeight = cellWidth;
            var newHeight = newCellHeight * totalRows + rowMarginGaps;
            gridTable.style.maxHeight = newHeight+"px";
            console.log("settingNewHeight = " + newHeight);
        
    }
    //gridTable.style.maxHeight = height+"px";
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
            //gridTable.rows[i].cells[j].setAttribute("x",j);
            gridTable.rows[i].cells[j].x = j;
            //gridTable.rows[i].cells[j].setAttribute("y",i);
            gridTable.rows[i].cells[j].y = i
        }
    }
    squareTable();
}

function removeRow() {
    var table = gridTable.getElementsByTagName("tbody")[0];
    var containsRequiredCell = false;
    if(totalRows > 5) {
        for(var i = 0; i < totalColumns; i++) {
            if(table.rows[totalRows-1].cells[i].classList.contains("cell-start") || table.rows[totalRows-1].cells[i].classList.contains("cell-finish")) {
                containsRequiredCell = true;
            }
        }
        if(containsRequiredCell == false) {
            table.rows[totalRows-1].remove();
            totalRows--;
        } else {
            var finishCell = (gridTable.querySelectorAll(".cell-finish"))[0];
            var startCell = (gridTable.querySelectorAll(".cell-finish"))[0];
            //if(parseInt(finishCell.getAttribute("y")) == totalRows-1) {
            if(finishCell.y == totalRows-1) {
                table.rows[totalRows-2].cells[finishCell.x].className = table.rows[totalRows-1].cells[finishCell.x].className;
                //table.rows[totalRows-2].cells[parseInt(finishCell.getAttribute("x"))].className = table.rows[totalRows-1].cells[parseInt(finishCell.getAttribute("x"))].className;
            }
            if(startCell.y == totalRows -1) {
            //if(parseInt(startCell.getAttribute("y")) == totalRows-1) {
                table.rows[totalRows-2].cells[startCell.x].className = table.rows[totalRows-1].cells[startCell.x].className;
                //table.rows[totalRows-2].cells[parseInt(startCell.getAttribute("x"))].className = table.rows[totalRows-1].cells[parseInt(startCell.getAttribute("x"))].className;
            }
            table.rows[totalRows-1].remove();
            totalRows--;
        }
    } else {
        pushError("Sorry, there must be at least 5 rows.");
    }
    squareTable();
}

function removeColumn() {
    if(totalColumns > 5) {
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
    //var i = parseInt(e.getAttribute("y"));
    i = e.y;
    //var j = parseInt(e.getAttribute("x"));
    j = e.x;
    //var table = gridTable.getElementsByTagName("tbody");
    gridTable.rows[i].cells[j].addEventListener("mouseup",function(){
        /*for(var i = 0; i < totalRows; i++) {
            for(var j = 0; j < totalColumns; j++) {
                gridTable.rows[i].cells[j].getElementsByClassName("cell")[0].innerHTML = "originalclasses = " + gridTable.rows[i].cells[j].originalclasses + " -> isorigin = " + gridTable.rows[i].cells[j].isorigin;
            }
        }*/
        setOriginalClasses(this);
        if(this.classList.contains("cell-start")) {
            //gridTable.setAttribute("cellToMove","cell-start");
            gridTable.cellToMove = "cell-start";
        } else {
            //gridTable.setAttribute("cellToMove","cell-finish");
            gridTable.cellToMove = "cell-finish"
        }
        //var cellType = gridTable.getAttribute("cellToMove");
        var cellType = gridTable.cellToMove;
        //var x = parseInt(this.getAttribute("x"));
        var x = this.x;
        //var y = parseInt(this.getAttribute("y"));
        var y = this.y;
        console.log("TEST LOL");
        if(this.classList.contains(cellType) && gridTable.issearching == false) { 
        //if(this.classList.contains(cellType) && gridTable.getAttribute("issearching")=="false") {
            console.log("1234 TEST 1234");
            //gridTable.setAttribute("moveelementclasses",this.className);
            gridTable.moveelementclasses = this.className;
            gridTable.setAttribute("moveelementclasses", gridTable.moveelementclasses);
            this.isorigin = true;
        }
        cellClicked(x, y);
        
    });
    gridTable.rows[i].cells[j].addEventListener("mouseenter",function(){
        /*for(var i = 0; i < totalRows; i++) {
            for(var j = 0; j < totalColumns; j++) {
                gridTable.rows[i].cells[j].getElementsByClassName("cell")[0].innerHTML = "originalclasses = " + gridTable.rows[i].cells[j].originalclasses + " -> isorigin = " + gridTable.rows[i].cells[j].isorigin;
            }
        }*/
        //this.setAttribute("originalClasses",this.className);
        this.originalclasses = this.className;
        //var x = parseInt(this.getAttribute("x"));
        var x = this.x;
        //var y = parseInt(this.getAttribute("y"));
        var y = this.y;
        //gridTable.rows[y].cells[x].setAttribute("hovered",true);
        gridTable.rows[y].cells[x].hovered = true;
        if(gridTable.issearching == true) {
            gridTable.originalclasses = this.className;
            gridTable.moveelementclasses = gridTable.getAttribute("moveelementclasses");
            //if(gridTable.getAttribute("isSearching")=='true') {  
            console.log("original classlist = " + this.className);
            if((gridTable.cellToMove == "cell-start" && this.classList.contains("cell-finish")) || (gridTable.cellToMove == "cell-finish" && this.classList.contains("cell-start"))) {
            //if((gridTable.getAttribute("moveElementClasses").indexOf("cell-start") != 0 && this.classList.contains("cell-start")) || (gridTable.getAttribute("moveElementClasses").indexOf("cell-finish") != 0 && this.classList.contains("cell-finish"))) {
                this.className = "error";
            } else {
                this.className = gridTable.moveelementclasses;
                //this.className = gridTable.getAttribute("moveElementClasses");
            }
        }
        
    });
    gridTable.rows[i].cells[j].addEventListener("mouseleave",function(){
        //var x = parseInt(this.getAttribute("x"));
        var x = this.x;
        //var y = parseInt(this.getAttribute("y"));
        var y = this.y;
        //gridTable.rows[y].cells[x].setAttribute("hovered",false);
        gridTable.rows[y].cells[x].hovered = false;
        console.log("left cell.....");
        if(gridTable.issearching == true) {
            if(this.isorigin == true) {
                for(var i = 0; i < totalRows; i++) {
                    for(var j = 0; j < totalColumns; j++) {
                        if(gridTable.rows[i].cells[j].isorigin == true) {
                            gridTable.rows[i].cells[j].className = "none";
                        }
                    }
                }
                //if(this.getAttribute("isorigin")=="true" && gridTable.getAttribute("issearching") == "true") {
                if(this.originalclasses.indexOf(gridTable.originElement) != -1) {
                    this.className = "none";
                } else {
                    this.isorigin = false;
                }
            } else {
                this.className = this.originalclasses;
                //this.originalclasses = this.className;
            }/* 
            else if(this.originalclasses.indexOf("cell-start") == -1) {
                //} else if(!(this.classList.contains("cell-start")) && gridTable.getAttribute("issearching")=="true"){
                this.className = this.originalclasses;
                //this.className = this.getAttribute("originalclasses");
                //this.removeAttribute("originalclasses");
                this.originalclasses = "cell-unvisited";
            }*/
            var containsOriginalClasses = gridTable.querySelectorAll("[originalclasses]");
            for(var i = 0; i < containsOriginalClasses.length; i++) {
                //console.log("isorigin = " + containsOriginalClasses[i].getAttribute("isorigin"));
                console.log("isorigin = " + containsOriginalClasses[i].isOrigin);
                if(containsOriginalClasses[i].isorigin != true && gridTable.issearching == true) {
                    //if(containsOriginalClasses[i].getAttribute("isorigin")!="true" && gridTable.getAttribute("issearching")=="true") {
                    containsOriginalClasses[i].className = containsOriginalClasses[i].originalclasses;
                    delete containsOriginalClasses[i].originalclasses;
                    //containsOriginalClasses[i].className = containsOriginalClasses[i].getAttribute("originalclasses");
                    //containsOriginalClasses[i].removeAttribute("originalclasses");
                } else {
                    delete containsOriginalClasses[i].originalclasses;
                    //containsOriginalClasses[i].removeAttribute("originalclasses");
                }
            }
        } else if(gridTable.issearching == false) {
            //if(gridTable.getAttribute("issearching")=="false"){
            var containsOriginalClasses = gridTable.querySelectorAll("[originalclasses]");
            for(var i = 0; i < containsOriginalClasses.length; i++) {
                delete containsOriginalClasses[i].originalclasses
                //containsOriginalClasses[i].removeAttribute("originalclasses");
            }    
        }
        
        if(gridTable.issearching == true) {
        //if(gridTable.getAttribute("issearching")=="true"){
            
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

colCounter.innerText = totalColumns + " columns";
rowCounter.innerText = totalRows + " rows";


function pushError(errStr) {
    alert(errStr);
}

addColBtn.addEventListener("click",function(){
    console.log("add columns");
    addColumn();
    colCounter.innerText = totalColumns + " columns";
});
addRowBtn.addEventListener("click",function(){
    console.log("add rows");
    addRow();
    rowCounter.innerText = totalRows + " rows";
});
decreaseColBtn.addEventListener("click",function(){
    console.log("<<<<<<<<<<<<<<decrease columns>>>>>>>>>>>>>");
    removeColumn();
    colCounter.innerText = totalColumns + " columns";
});
decreaseRowBtn.addEventListener("click",function(){
    console.log("<<<<<<<<<<<<<<decrease rows>>>>>>>>>>>>>");
    removeRow();
    rowCounter.innerText = totalRows + " rows";
});