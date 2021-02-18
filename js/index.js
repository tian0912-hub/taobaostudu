$(function(){
    // 页面卷曲搜索模块时小的搜索模块固定在页面头部
    $(window).scroll(function(){
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if(scrollTop > 133 ) {
            // alert(1)
            $('#search-fixed').show()
        }else {
            // alert(1)
            $('#search-fixed').hide()
        }
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



})