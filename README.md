# DrawTable.js
利用Canvas绘制简单方格

---

### 如何引入

```html
<script src="DrawTable.js"></script>
```

### 如何使用

```html
<canvas class="table"></canvas>
```

```html
<script>  
    drawTable({
        // Canvas标签的类名/id名/canvas
        elName:".table", 
        // 画布宽度
        width:300,  
        // 画布高度
        height:150,
        // 格子宽度
        baseWidth:30,
        // 格子高度
        baseHeight:15,
        // 格子横线颜色
        colLineColor:"#000",
        // 格子竖线颜色
        rowLineColor:"rgba(0,0,0,.5)",
        // 表格背景颜色
        backgroundColor:"snow"
    })
</script>
```
