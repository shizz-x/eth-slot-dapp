


module.exports = class Dragger{

    constructor(draggableObjID, draggedByID, initialW, initialH){
        let draggable = document.getElementById(draggableObjID);

        var width =  initialW;
        var height = initialH;
        let header = document.getElementById(draggedByID);

        header.style.width = width-70 + "px";
        var posX = 0,
        posY = 0,
        mouseX = 0,
        mouseY = 0;

        function mouseDown(e) {
        e.preventDefault();
        posX = e.clientX - draggable.offsetLeft;
        posY = e.clientY - draggable.offsetTop;
        window.addEventListener("mousemove", moveElement, false);
        }

        function mouseUp() {
        window.removeEventListener("mousemove", moveElement, false);
        }

        function moveElement(e) {
        mouseX = e.clientX - posX < 0 ? 0 : e.clientX - posX;
        mouseY = e.clientY - posY < 0 ? 0 : e.clientY - posY;

        draggable.style.left =
            mouseX + width < window.innerWidth
            ? mouseX + "px"
            : window.innerWidth - width + "px";
        draggable.style.top =
            mouseY + height < window.innerHeight
            ? mouseY + "px"
            : window.innerHeight - height + "px";
        }
        const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
            const target = entry.target;

            if (target.clientWidth < window.innerWidth) {
            width = target.clientWidth;
            header.style.width = width-25 + "px";
            }
            if (target.clientHeight < window.innerHeight) {
            height = target.clientHeight;
            }
        }
        });
        resizeObserver.observe(draggable);

        header
        .addEventListener("mousedown", mouseDown, false);

        window.addEventListener("mouseup", mouseUp, false);
    }

}


