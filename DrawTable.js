function drawTable(obj) {
    let oCanvas = document.querySelector(obj.elName);
    oCanvas.setAttribute("width",obj.width)
    oCanvas.setAttribute("height",obj.height)
    oCanvas.style.backgroundColor = obj.backgroundColor
    let oCtx = oCanvas.getContext("2d");
    let col = Math.floor(obj.height / obj.baseHeight) + 1;
    let row = Math.floor(obj.width / obj.baseWidth) + 1;
    for (let i = 0; i < row ; i++ ){
        oCtx.beginPath();
        oCtx.strokeStyle = obj.rowLineColor;
        oCtx.moveTo(obj.baseWidth * i -0.5, 0);
        oCtx.lineTo(obj.baseWidth * i -0.5,obj.height);
        oCtx.stroke();
    }
    for (let i = 0; i < col ; i++ ){
        oCtx.beginPath();
        oCtx.strokeStyle = obj.colLineColor;
        oCtx.moveTo(0,obj.baseHeight * i -0.5);
        oCtx.lineTo(obj.width,obj.baseHeight * i -0.5);
        oCtx.stroke();
    }
}