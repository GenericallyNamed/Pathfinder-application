/**
 * @title help.js
 * @description This code runs the information pane in the interface
 * 
 * @author Alex Shandilis
 * @version 5/6/2021
 * 
 */

var helpBtn = document.getElementById("helpBtn"); //stores the help button element
var helpCloseBtn = document.getElementById("helpCloseBtn"); //stores element of the button that closes the info panel
helpInterface.isActive = true; //stores the state of the interface as true (it is open by default)

helpBtn.addEventListener("click",function(){ //adds event listener to help button for user click
    if(helpInterface.isActive == false && gridTable.issearching != true && gridTable.isRunning != true && gridTable.finishFound != true) {
        helpContainer.style.visibility = "unset";
        helpInterface.isActive = true;
        helpContainer.classList.remove("hide");
        helpContainer.classList.add("unhide");
    }
    
});

helpCloseBtn.addEventListener("click",function(){ //adds event listener to the button that closes the info panel
    if(helpInterface.isActive == true) {
        helpInterface.isActive = false;
        helpContainer.classList.add("hide");
        helpContainer.classList.remove("unhide");
        setTimeout(function(){
            helpContainer.style.visibility = "hidden";
        }, 600);   
    }
});