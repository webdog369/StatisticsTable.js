
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
        this.basePointX = obj.x;
        this.basePointY = obj.y;
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

    // 绘制条形图及折线图
    bar(obj){
        // 拿到画笔
        let oCtx = this.oCtx;
        // 定义单个统计条的宽度
        let barWidth = (this.baseWidth * this.xLength / obj.xData.length) - 15;
        // 定义统计条初始高度
        let barHeight = this.baseHeight * this.yLength * 2.5;
        // 获取原点x坐标
        let baseX = this.basePointX;
        // 获取原点y坐标
        let baseY = this.basePointY;
        // 获取x轴数据和y轴数据 并且将数据拼接成一个二维数组 以便遍历
        let dataList = obj.xData.map((key,value)=>[key,obj.yData[value]]);
        // 统计条颜色初始化
        let currentBarColor = obj.barColor?obj.barColor:"#333";
        // 再次获取原点坐标x备用
        let pointBaseX = this.basePointX;
        //设置标题样式及位置调整
        oCtx.textAlign = "center"
        oCtx.textBaseline = "middle"
        oCtx.fillText(obj.title?obj.title:"",obj.titleX?obj.titleX:this.oCanvas.width / 2,obj.titleY?obj.titleY:this.baseHeight*1.5);
        oCtx.beginPath();
        oCtx.lineWidth = 2
        oCtx.moveTo(this.basePointX+ 10 + barWidth / 2,this.basePointY - (parseFloat(obj.yData[0])/100*barHeight));
        // 遍历数据并绘制统计条
        for (let key of dataList){
            // 判断用户是否需要渲染为条形统计图
            if (!obj.lineChart){
                let linearGradient1 = oCtx.createLinearGradient(baseX + 10,baseY - (parseFloat(key[1])/100*barHeight),baseX + 10 + barWidth,baseY - (parseFloat(key[1])/100*barHeight));
                // 设置统计条颜色是否为渐变色
                oCtx.fillStyle = obj.barColor?obj.barColor:"#333";
                linearGradient1.addColorStop(0,currentBarColor);
                linearGradient1.addColorStop(.5,"#fff");
                linearGradient1.addColorStop(1,currentBarColor);
                obj.linearColor?oCtx.fillStyle = linearGradient1:oCtx.fillStyle = currentBarColor;
                oCtx.fillRect(baseX + 10,baseY - (parseFloat(key[1])/100*barHeight) ,barWidth,parseFloat(key[1])/100*barHeight);
            }else {
               // oCtx.arc(baseX + 10 + barWidth / 2,baseY - (parseFloat(key[1])/100*barHeight),5,0,Math.PI*2);
                oCtx.strokeStyle = obj.lineChartColor;
                oCtx.lineTo(baseX + 10 + barWidth / 2,baseY - (parseFloat(key[1])/100*barHeight));
            }

            // 将xy轴数据绘制到统计表中
            oCtx.textBaseline = "top"
            oCtx.font = obj.fontSize?`${obj.fontSize}px 微软雅黑`:"12px 微软雅黑"
            oCtx.fillStyle = obj.xNameColor?obj.xNameColor:"#000"
            oCtx.fillText(key[0],baseX + barWidth / 2 + 10,baseY + 5)
            oCtx.fillStyle = obj.yNameColor?obj.yNameColor:"#000"
            oCtx.fillText(key[1],baseX + barWidth / 2 + 10,baseY - (parseFloat(key[1])/100*barHeight) - 20);
            baseX += barWidth + 10;
        }
        // 将折线图连接起来
        oCtx.stroke();
        oCtx.closePath();

        // 绘制折线图坐标点
        for (let key of dataList){
            if (obj.lineChart){
            oCtx.beginPath();
            oCtx.arc(pointBaseX + 10 + barWidth / 2,baseY - (parseFloat(key[1])/100*barHeight),5,0,Math.PI*2);
            oCtx.fillStyle = obj.lineChartColor;
            oCtx.fill()
            pointBaseX += barWidth + 10;
            oCtx.closePath();
            }
        }
    }
}

