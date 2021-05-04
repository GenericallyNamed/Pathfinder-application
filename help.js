var helpBtn = document.getElementById("helpBtn");
var helpCloseBtn = document.getElementById("helpCloseBtn");
helpInterface.isActive = true;

helpBtn.addEventListener("click",function(){
    if(helpInterface.isActive == false) {
        if(gridTable.issearching != true && gridTable.isRunning != true && gridTable.finishFound != true) {
            helpContainer.style.visibility = "unset";
            helpInterface.isActive = true;
            helpContainer.classList.remove("hide");
            helpContainer.classList.add("unhide");
        }
    } else if(helpInterface.isActive == true) {

    }
});

helpCloseBtn.addEventListener("click",function(){
    console.log("test");
    if(helpInterface.isActive == true) {
        helpInterface.isActive = false;
        helpContainer.classList.add("hide");
        helpContainer.classList.remove("unhide");
        setTimeout(function(){
            helpContainer.style.visibility = "hidden";
        }, 1000);
        
        
    }
});