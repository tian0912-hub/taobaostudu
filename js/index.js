$(function(){
    // 页面卷曲搜索模块时小的搜索模块固定在页面头部
    $(window).scroll(function(){
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if(scrollTop > 133 ) {
            // alert(1)
            $('#search-fixed').show()
            // 控制返回顶部按钮显示与隐藏
            if(scrollTop >900 ){
                $('#to-top').fadeIn()
            } else {
                $('#to-top').fadeOut()
            }
        }else {
            // alert(1)
            $('#search-fixed').hide()
        }
    })
    // 给返回顶部按钮绑定事件
    $('#to-top').click(function(){
        $('html, body').animate({scrollTop:0},700)
    })
    $(".search .search-center .search-center-top li").click(function() {
        console.log(this.parentNode.children);
        // this.parentNode.children.forEach(item => {
        //     item.className = ''
        // });
        for(var i=0;i<this.parentNode.children.length;i++){
            this.parentNode.children[i].className = ''
        }
        this.className = "select"
    })
     // 轮播图效果实现
     var ulLun = document.querySelector('#ulLunBo')
     var imgWid = ulLun.children[0].offsetWidth
     var olLun = document.querySelector('#olLunBo')
     var key = circle = 0; // 监听当前轮播图所显示图片的页码
     // 动态生成ol中小圆点
     for (var i =0 ; i < ulLun.children.length ; i ++ ) {
         var newOlLi = document.createElement('li')
         // 添加自定义index属性
         newOlLi.setAttribute('index',i)
         olLun.appendChild(newOlLi)
         olLun.children[0].className = 'current'
         // 绑定点击事件
         // 因为点击事件时异步执行，所以触发点击事件的时候，给ol动态添加元素已经完成，所以内部排他思想可以使用olLun.children.length
        //  而如果使用ulLun去进行排他思想循环的时候就会发现，循环次数超过了ol中子元素的个数，那么就会发生一个underfind去设置className,则控制台报className的错误
         newOlLi.addEventListener('click', function(){
             var index = this.getAttribute('index')
             key = circle = index // 设置按钮点击与远点同步
            circleCallback()
             lunbotu(ulLun, -index*imgWid)
         })
     }
     
    // 第一步复制第一个li放到最后一个
    var newLi = ulLun.children[0].cloneNode(true)
    ulLun.appendChild(newLi)
     // 动态设置轮播图图片所在ul的宽度，以备新增图片
    // 方法一，使用jQuery的width方法
    // $('#ulLunBo').width($('#ulLunBo').children.length * imgWid) 
    // 方法二，原生js，注意不要忘记单位
    ulLun.style.width = ulLun.children.length * imgWid + 'px'
     // 左右箭头的点击事件
    //  第一步，轮播图鼠标移入则箭头显示，移出隐藏
     var focus = document.querySelector('.banner-main-top-left')
     focus.addEventListener('mouseenter',function(){
        //  清除自动轮播
        clearInterval(timer)
        // 利用jQuery方法获取两个箭头
        $(".arrow-l").show()
        $(".arrow-r").show()

    })
    focus.addEventListener('mouseleave',function(){
        // 鼠标离开启动定时器
        timer = setInterval(function() {
            $('.arrow-r').click()
        },1000)
        // 利用jQuery方法获取两个箭头
        $(".arrow-l").hide()
        $(".arrow-r").hide()
    })
    var flag = true // 定义节流阀
    // 第二步，监听箭头的点击事件
   $('.arrow-r').click(function(){
       if (flag){
            flag = false // 关闭节流阀，避免轮播事件未执行完成时的再次点击
            key ++
            if(key > ulLun.children.length -1) {
            //    key大于长度减一，说明此时已经是最后一张图片了，也就是克隆的最后一张
            // 定位到第一张
            ulLun.style.left = 0
                key = 1
            }
            lunbotu(ulLun, -key*imgWid)
            flag = true // 开启节流阀，轮播完成就可以再次进行点击
            // 处理圆点
            circle ++ 
            if( circle == ulLun.children.length -1 ) {
                circle = 0
            }
            circleCallback()

 
       }
       
   })
   $('.arrow-l').click(function(){
       if(flag) {
        if(key == 0) {
            //    key大于长度减一，说明此时已经是最后一张图片了，也就是克隆的最后一张
            // 定位到第一张
            ulLun.style.left = - (ulLun.children.length -1) * imgWid + 'px'
            key = ulLun.children.length -1
           }
           key --
           lunbotu(ulLun, -key*imgWid)
           flag = true
           // 处理圆点
           circle -- 
           circle = circle < 0 ? olLun.children.length-1 : circle
           circleCallback()
       }
})
    // 封装circle 的排他思想方法
    function circleCallback() {
        //排他思想
        for (var i =0;i<olLun.children.length;i++){
            olLun.children[i].className = ' '
        }
        olLun.children[circle].className = 'current'
    }
 
     var timer = setInterval(function(){
        $('.arrow-r').click()       
     },1000)
 })
   

