
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
        // 暴露原点坐标
        this.baseSideX = obj.x;
        this.baseSideY = obj.y;
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

        // 暴露x轴和y轴长度 以便绘制条形统计图
        this.xLength = obj.xLength;
        this.yLength = obj.yLength;
    }

    // 绘制条形图
    bar(obj){
     // 获取x轴数据
        let barWidth = (this.baseWidth * this.xLength / obj.xData.length) - 15;
        let barHeight = this.baseHeight * this.yLength * 2;
        let baseX = this.baseSideX;
        let oCtx = this.oCtx;
        let dataList =obj.xData.map((key,value)=>[key,obj.yData[value]]);
        let currentBarColor = obj.barColor?obj.barColor:"#333";
        oCtx.textAlign = "center"
        oCtx.textBaseline = "middle"
        oCtx.fillText(obj.title?obj.title:"",obj.titleX?obj.titleX:this.oCanvas.width / 2,obj.titleY?obj.titleY:this.baseHeight*1.5);
        for (let key of dataList){
            let linearGradient1 = oCtx.createLinearGradient(baseX + 10,this.baseSideY - (parseFloat(key[1])/100*barHeight),baseX + 10 + barWidth,this.baseSideY - (parseFloat(key[1])/100*barHeight))
            oCtx.fillStyle = obj.barColor?obj.barColor:"#333";
            linearGradient1.addColorStop(0,currentBarColor);
            linearGradient1.addColorStop(.5,"#fff");
            linearGradient1.addColorStop(1,currentBarColor);
            obj.linearColor?oCtx.fillStyle = linearGradient1:oCtx.fillStyle = currentBarColor;
            oCtx.fillRect(baseX + 10,this.baseSideY - (parseFloat(key[1])/100*barHeight) ,barWidth,parseFloat(key[1])/100*barHeight);
            oCtx.textBaseline = "top"
            oCtx.font = obj.fontSize?`${obj.fontSize}px 微软雅黑`:"12px 微软雅黑"
            oCtx.fillStyle = obj.xNameColor?obj.xNameColor:"#000"
            oCtx.fillText(key[0],baseX + barWidth / 2 + 10,this.baseSideY + 5)
            oCtx.fillStyle = obj.yNameColor?obj.yNameColor:"#000"
            oCtx.fillText(key[1],baseX + barWidth / 2 + 10,this.baseSideY - (parseFloat(key[1])/100*barHeight) - 20);
            baseX += barWidth + 10;
        }
    }
}

