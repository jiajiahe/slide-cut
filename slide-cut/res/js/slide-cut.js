/**
 * Created by hejiajia on 2017/5/24.
 */

(function(global,factory){
    if(typeof define==='function' && (define.amd || define.cmd)){
        define(factory);
    }else{
        global.slideCut=factory();
    }
})(this,function(){
    'use sctrict';

    var slideCut=function(id, options){
        var ele=document.getElementById(id),
            slideUl=document.getElementsByTagName('ul')[0],
            slideLi=slideUl.getElementsByTagName('li'),
            slideNavLi=document.getElementById('slide_nav').getElementsByTagName('li');

        //获取元素当前对应样式
        var getStyle=function(obj,attr){
            return (obj.currentStyle || getComputedStyle(obj,false))[attr];
        };

        //首尾各添加一张图并重新获取li
        slideUl.appendChild(slideLi[0].cloneNode(true));
        slideUl.insertBefore(slideLi[slideLi.length-2].cloneNode(true),slideLi[0]);

        //设置ul的宽度
        slideUl.style.width=slideLi.length*100+'%';

        //记录容器相关属性
        ele.width=parseInt(getStyle(ele,'width'));//宽度
        ele.interval=null;
        ele.curIndex=1;//当前显示下标
        ele.nextIndex=2;//下一张显示下标

        //移除className
        var removeClass=function(objs,classNames){
            for(var i=0;i<objs.length;i++){
                objs[i].className=objs[i].className.replace(' '+classNames,'');
            }
        };
        //添加className
        var addClass=function(objs,classNames){
            removeClass(objs,classNames);
            for(var i=0;i<objs.length;i++){
                objs[i].className=objs[i].className+' '+classNames;
            }
        };

        addClass([slideLi[ele.curIndex],slideLi[ele.nextIndex]],'show');
        addClass([slideNavLi[ele.curIndex-1]],'cur');

        //图片切换动画
        var transformFun=function(obj,attr,end,callback){
            clearInterval(obj.interval);
            var start=parseInt(getStyle(obj,'left')),//动画起始值
                distance=end-start,//动画移动的值，end-start
                step=10,//移动的步数
                n= 0;//移动的步数
            obj.interval=setInterval(function(){
                n++;
                obj.style.left=start+distance/step*n+'px';

                //达到步数停止计时器
                if(n==step){
                    clearInterval(obj.interval);
                    callback && callback(obj);
                    if(!ele.interval) startPlay();
                }
            },30);
        };


        //图片切换方法
        var slideCallBack=function(obj){
            if(ele.nextIndex>slideNavLi.length){
                ele.curIndex=1;
            }else if(ele.nextIndex==0){
                ele.curIndex=slideNavLi.length;
            }
            removeClass(slideLi,'show');
            addClass([slideLi[ele.curIndex]],'show');
            obj.style.left=0;
        };
        var slideFun=function(n){
            removeClass(slideLi,'show');
            removeClass(slideNavLi,'cur');
            addClass([slideLi[ele.curIndex],slideLi[ele.nextIndex]],'show');
            if(ele.nextIndex>slideNavLi.length){
                var navCur=0;
            }else if(ele.nextIndex==0){
                var navCur=slideNavLi.length-1;
            }else{
                var navCur=ele.nextIndex-1;
            }
            addClass([slideNavLi[navCur]],'cur');
            if(ele.nextIndex>ele.curIndex){//下一张下标大于现在的下标
                slideUl.style.left=0;
                transformFun(slideUl,'left',-ele.width,slideCallBack);
            }
            if(ele.nextIndex<ele.curIndex){//下一张下标小于现在的下标
                slideUl.style.left=-ele.width+'px';
                transformFun(slideUl,'left',0,slideCallBack);
            }
            ele.curIndex=ele.nextIndex;
        };

        //焦点图导航点击切换
        for (var i=0;i<slideNavLi.length;i++){
                slideNavLi[i].index=i;
                slideNavLi[i].onclick=function(){
                    clearInterval(ele.interval);
                    ele.interval=null;
                    ele.nextIndex=this.index+1;
                    if(ele.nextIndex==1 && ele.curIndex==slideNavLi.length) ele.nextIndex=ele.curIndex+1;
                    if(ele.nextIndex==slideNavLi.length && ele.curIndex==1) ele.nextIndex=0;
                    if(ele.nextIndex==ele.curIndex) return;
                    slideFun();
                }
        }



        //开始自动轮播
        var startPlay=function(){
            stopPlay();
            ele.interval=setInterval(function(){
                ele.nextIndex=(ele.curIndex+1==slideLi.length)?0:ele.curIndex+1;
                slideFun();
            },4000);
        };

        //停止自动轮播
        var stopPlay=function(){
            clearInterval(ele.interval);
        };

        //自动轮播
        startPlay();

        //触屏滑动
        var touchSlide=function(obj){
            obj.addEventListener('touchstart',function(e){
                obj.startX= e.targetTouches[0].clientX;
                obj.startY= e.targetTouches[0].clientY;
                obj.startTime=new Date().getTime();
                addClass([slideLi[ele.curIndex-1],slideLi[ele.curIndex+1]],'show');
                obj.style.left='-800px';
                var moveFun=function(e){
                    stopPlay();
                    obj.curX= e.targetTouches[0].clientX;
                    obj.curY= e.targetTouches[0].clientY;
                    obj.curLeft= parseInt(getStyle(slideUl,'left'));

                    //移动
                    obj.move=obj.curX-obj.startX;
                    obj.style.left=obj.curLeft+obj.move+'px';
                    obj.startX=obj.curX;
                    obj.startY=obj.curY;
                };
                var endFun=function(e){
                    var endLeft=(Math.abs(parseInt(getStyle(obj,'left'))+800)>=ele.width/2 ||(new Date().getTime()-obj.startTime<150 && Math.abs(parseInt(getStyle(obj,'left'))+800)>=ele.width/5))?((parseInt(getStyle(obj,'left'))+800)>=0?0:'-1600'):'-800';
                    transformFun(obj,'left',endLeft,function(obj){
                        removeClass(slideLi,'show');
                        removeClass(slideNavLi,'cur');
                        if(endLeft==0){
                            ele.curIndex=ele.curIndex-1;
                        }else if(endLeft==-1600){
                            ele.curIndex=ele.curIndex+1;
                        }
                        if(ele.curIndex>slideNavLi.length){
                            ele.curIndex=1;
                        }else if(ele.curIndex==0){
                            ele.curIndex=slideNavLi.length;
                        }
                        addClass([slideLi[ele.curIndex]],'show');
                        addClass([slideNavLi[ele.curIndex-1]],'cur');
                        obj.style.left=0;
                    });
                    obj.removeEventListener('touchmove',moveFun,false);
                    document.removeEventListener('touchend',endFun,false);
                };
                obj.addEventListener('touchmove',moveFun,false);
                document.addEventListener('touchend',endFun,false);
            },false);
        };

        touchSlide(slideUl);
    };

    return slideCut;
});