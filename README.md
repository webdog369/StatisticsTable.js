# StatisticsTable.js



#### =========================利用Canvas绘制统计表==========================

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
```

#### ==========================更多功能正在开发中===========================

