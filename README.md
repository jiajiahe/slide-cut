# slide-cut
    兼容移动PC焦点轮播图
    不依赖任何js库，纯javascript

# 用意
    平时工作项目中经常用到，索性就封装一个，以后需要改下样式就可以直接用

## html
``` html
<!--焦点图html结构,最外层容器-->
<div class="slide_container" id="slide_container">
    <!--图片-->
    <div class="slide_wrap">
        <ul class="slide_ul cl">
            <li class="slide_li">
                <img src="../res/img/1.jpg" width="800" height="400"/>
            </li>
            <li class="slide_li">
                <img src="../res/img/2.jpg" width="800" height="400"/>
            </li>
            <li class="slide_li">
                <img src="../res/img/3.jpg" width="800" height="400"/>
            </li>
            <li class="slide_li">
                <img src="../res/img/4.jpg" width="800" height="400"/>
            </li>
            <li class="slide_li">
                <img src="../res/img/5.jpg" width="800" height="400"/>
            </li>
        </ul>
    </div>
    <!--图片导航-->
    <ul class="slide_nav cl" id="slide_nav">
        <li class="slideNav_li"></li>
        <li class="slideNav_li"></li>
        <li class="slideNav_li"></li>
        <li class="slideNav_li"></li>
        <li class="slideNav_li"></li>
    </ul>
</div>
```

## css
```css
.cl{*zoom: 1;}
.cl:after{content: 'clear';display: block;clear: both;visibility: hidden;height: 0;overflow: hidden;}
.slide_container{width: 800px;height: 400px;margin: 0 auto;position: relative;overflow: hidden;}
.slide_wrap{width:100%;height:100%;}
.slide_ul{width:500%;position: absolute;left: 0;top: 0;}
.slide_li{width: 800px;height: 400px;float: left;display: none;}
.slide_li>img{width: 100%;height: 100%;}
.slide_nav{position: absolute;bottom: 10px;right: 10px;z-index: 2;}
.slideNav_li{width: 20px;height: 20px;background-color:#fff;background-color: rgba(255,255,255,0.8);border-radius: 50%;float: left;margin: 0 5px;}
.slide_nav .cur{background-color:#D2691E;background-color: rgba(210,105,30,0.8);}
.slide_ul .show{display: block;}
``` 

## js引入
``` javascript
<script src="../res/js/slide-cut.js"></script>
```

## 调用方式
    slideCut(最外层容器id);

# 温馨提示
    这是第一版粗版，没有配置项，不排除以后有增加配置的可能性
    但可能性不大，因为本人有代码洁癖，不喜欢有很多不相关代码
    以后分别封装别的效果的可能性更大
    样式可以自定义


