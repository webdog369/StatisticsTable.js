# StatisticsTable.js



#### ==============================利用Canvas绘制统计表==============================

---

### 如何引入

```html
<script src="StatisticsTable.js"></script>
```

### 如何使用

```html
<canvas class="table"></canvas>
```

```javascript
// 创建StatisticsTable实例对象

let sTable = new StatisticsTable(".table")
    // 调用绘制表格的方法 table() 该函数接收一个对象 具体参数如下
    sTable.table({
        // 画布宽度
        width:500,
        // 画布高度
        height:500,
        // 格子宽度
        baseWidth:30,
        // 格子高度
        baseHeight:30,
        // 格子横线颜色
        colLineColor:"#000",
        // 格子竖线颜色
        rowLineColor:"rgba(0,0,0,.5)",
        // 表格背景颜色
        backgroundColor:"snow"
    })

    // 调用绘制轴线的方法axis() 该函数接收一个对象 具体参数如下
    sTable.axis({
        // 原点x坐标
        x:30,
        // 原点y坐标
        y:480,
        // x轴长度(单位是baseWidth)
        xLength:14,
        // y轴长度(单位是baseHeight)
        yLength:15,
        // x轴的单位名称
        xName:"时间(年)",
        // y轴的单位名称
        yName:"代码量/行",
        // 坐标系字体大小 单位(px)"
        fontSize:16
    })

   // 绘制条形统计图
    sTable.bar({
        // 统计表标题
        title:"怪物猎人世界武器使用率(截止2020.05)",
        // 标题x坐标
        titleX:300,
        // 标题y坐标
        titleY:45,
        // 横轴数据,接收一个数组
        xData:["太刀","大剑","虫棍",
            "弓箭","双刀","锤子",
            "盾斧","斩斧","重弩",
            "轻弩","片手","长枪",
            "笛子","铳枪"],
        // 纵轴数据,接收一个数组
        yData:["22%","11%","9%","8%","7%","7%","7%","6%","6%","5%","3%","3%","2%","2%"],
        // 统计条的背景颜色
        barColor:"tomato",
        // 是否需要绘制为折线图样式 若开启折线图,则条形图就会隐藏
        lineChart:false,
        // 折线图背颜色
        lineChartColor:"red",
        // 是否启用统计条背景颜色渐变效果 true为启用 false为不启用 默认不启用
        linearColor:false,
        // 是否启用统计条背景颜色渐变效果 true为启用 false为不启用 默认不启用
        linearColor:false,
        // 横轴纵轴数据字体大小 单位:px
        fontSize: 13,
        // 横轴字体颜色 默认黑色
        xNameColor:"#333",
        // 纵轴字体颜色 默认黑色
        yNameColor:"#666"
    })
```

##### 注意:目前y轴数据只支持百分比类的数据 例如:30%,10%...

#### ===============================更多功能正在开发中===============================

