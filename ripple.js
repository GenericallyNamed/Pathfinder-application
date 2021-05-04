function setRippleDimension(elem) {
    var dimensionToUse;
    var parentWidth = elem.width();
    var parentHeight = elem.width();
    if(parentWidth > parentHeight){
        dimensionToUse = parentWidth;
    }
    else {
        dimensionToUse = parentHeight;
    }
    return dimensionToUse
}


function ripple(id, rgb) {    
    var elem = document.getElementById(id);
    elem.style.overflow = "hidden";
    var e = window.event;
    var mouseX = e.clientX;
    var mouseY = e.clientY;
    
    var parentWidth = parseInt((getComputedStyle(elem).width).substring(0,(getComputedStyle(elem).width).length-2));
    var parentHeight = parseInt((getComputedStyle(elem).height).substring(0,(getComputedStyle(elem).height).length-2));
    var rippleSize;
    rippleSize = Math.sqrt(Math.pow(parentWidth,2) + Math.pow(parentHeight,2));
    var rippleContainer = document.createElement("div");
    rippleContainer.style.position = "relative";
    elem.appendChild(rippleContainer);
    var rippleObject = document.createElement("div");
    rippleContainer.appendChild(rippleObject);
    rippleObject.style.position = "relative";
    var elemHeight = parseLength(getComputedStyle(elem).height);
    var elemWidth = parseLength(getComputedStyle(elem).width);
    var parentObject = rippleObject.parentElement;
    var x = e.clientX - parentObject.getBoundingClientRect().left;
    var y = e.clientY - parentObject.getBoundingClientRect().top;
    rippleObject.style.width = (rippleSize*2) + "px";
    rippleObject.style.height = (rippleSize*2) + "px";
    var styleLeft = (x - ((rippleSize*2)/2));
    var styleTop = (y - ((rippleSize*2)/2));
    rippleObject.style.position = "relative";
    rippleObject.style.left = styleLeft+"px";
    rippleObject.style.top = styleTop+"px";
    rippleObject.style.backgroundColor = rgb;
    rippleObject.style.zIndex = 1;
    rippleObject.classList.add("rippleEffect");
    let object = rippleObject;
    var rippleToHide = document.getElementsByClassName('rippleEffect');
    rippleObject.rippleStatus = "active"
    rippleObject.addEventListener("mouseup", function() {
        if(rippleObject.rippleStatus == "active") {
            rippleObject.rippleStatus = "remove";
            object.classList.add('rippleEnd');
                setTimeout(function() {
            object.remove();
        }, 2000);
        }
    });
    rippleObject.addEventListener("mouseout", function() {
        if(rippleObject.rippleStatus == "active") {
            rippleObject.rippleStatus = "remove";
            object.classList.add('rippleEnd');
            setTimeout(function() {
                object.parentNode.remove();
                object.remove();
            }, 2000);
        }
    });
    return;
}


var rippleBtns = document.getElementsByClassName("addRippleBtn");

for (var i = 0; i < rippleBtns.length; i++) {
    var currentElement = rippleBtns[i];
    let btnNameID = currentElement.getAttribute('id');
    let rippleColor =  currentElement.getAttribute('rippleColor');
    currentElement.addEventListener('mousedown', function() {
        var color = this.getAttribute("rippleColor");
        var nameID = this.getAttribute("id");
        ripple(nameID, color);
    })
}