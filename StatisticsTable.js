
// 定义统计表类
class StatisticsTable {
    constructor(elName) {
        this.oCanvas = document.querySelector(elName);
        this.oCtx = this.oCanvas.getContext("2d");
        // 绘制坐标末端的三角形
        this.triangle = function (x,y,col) {
            let oCtx = this.oCtx;
            if (col){
                oCtx.beginPath();
                oCtx.moveTo(x,y);
                oCtx.lineTo(x,y-3);
                oCtx.lineTo(x+15,y);
                oCtx.lineTo(x,y+3);
                oCtx.lineTo(x,y);
                oCtx.fill();
                oCtx.closePath();
            }else {
                oCtx.beginPath();
                oCtx.moveTo(x,y);
                oCtx.lineTo(x-3,y);
                oCtx.lineTo(x,y-15);
                oCtx.lineTo(x+3,y);
                oCtx.lineTo(x,y);
                oCtx.fill();
                oCtx.closePath();
            }
        }
    }

    // 绘制网格
    table(obj){
        let oCanvas = this.oCanvas;
        let oCtx = this.oCtx;
        obj.width = Math.abs(obj.width);
        obj.height = Math.abs(obj.height);
        obj.baseWidth = Math.abs(obj.baseWidth);
        obj.baseHeight = Math.abs(obj.baseHeight)
        this.baseWidth = obj.baseWidth;
        this.baseHeight = obj.baseHeight;
        oCanvas.setAttribute("width",obj.width)
        oCanvas.setAttribute("height",obj.height)
        oCanvas.style.backgroundColor = obj.backgroundColor
        let col = Math.floor(obj.height / obj.baseHeight) + 1;
        let row = Math.floor(obj.width / obj.baseWidth) + 1;
        for (let i = 0; i < row ; i++ ){
            oCtx.beginPath();
            oCtx.strokeStyle = obj.rowLineColor;
            oCtx.moveTo(obj.baseWidth * i + 0.5, 0);
            oCtx.lineTo(obj.baseWidth * i + 0.5,obj.height);
            oCtx.stroke();
        }
        for (let i = 0; i < col ; i++ ){
            oCtx.beginPath();
            oCtx.strokeStyle = obj.colLineColor;
            oCtx.moveTo(0,obj.baseHeight * i- 0.5);
            oCtx.lineTo(obj.width,obj.baseHeight * i-0.5);
            oCtx.stroke();
        }
    }

    // 绘制x,y轴
    axis(obj){
        let oCtx = this.oCtx;
        //绘制坐标文字
        oCtx.textBaseline = "top"
        oCtx.textAlign = "center"
        oCtx.font = `${obj.fontSize}px 微软雅黑`
        // 绘制原点坐标文字
        oCtx.fillText("0",obj.x - 4,obj.y + 2);
        // 绘制x轴坐标文字
        oCtx.fillText(obj.xName,obj.x + this.baseWidth * obj.xLength,obj.y + 5);
        // 绘制y轴坐标文字(实现竖行绘制)
        let startX = obj.x - obj.fontSize*0.7;
        let startY = obj.y - this.baseHeight*obj.yLength - 25;
        for (let key of obj.yName){
            startY += obj.fontSize*1.1;
            oCtx.fillText(key,startX,startY);
        }

        // 绘制x轴
        oCtx.beginPath();
        oCtx.moveTo(obj.x,obj.y);
        oCtx.lineWidth = 2
        oCtx.lineTo(obj.x + this.baseWidth * obj.xLength,obj.y);
        oCtx.stroke();
        oCtx.closePath();
        this.triangle(obj.x + this.baseWidth * obj.xLength,obj.y,true);

        // 绘制y轴
        oCtx.beginPath();
        oCtx.moveTo(obj.x,obj.y);
        oCtx.lineWidth = 2
        oCtx.lineTo(obj.x,obj.y - this.baseHeight*obj.yLength);
        oCtx.stroke();
        oCtx.closePath();
        this.triangle(obj.x,obj.y - this.baseHeight*obj.yLength,false);
    }

    // 绘制条形图

}

