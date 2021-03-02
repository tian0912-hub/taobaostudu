function lunbotu(ele, target, callback) {
    clearInterval(ele.timer)
    ele.timer = setInterval(function () {
        var step = (target - ele.offsetLeft) / 10
        // 二次处理步长
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        // 判断最后一步，防止来回滑动 当盒子距离目标距离不足一个步长时，一步到位
        if (Math.abs(step) > Math.abs(target - ele.offsetLeft)) {
            ele.style.left = target + 'px'
            clearInterval(ele.timer)
            // 执行回调函数 使用短路操作，复习：与符号，1为真则执行2，1为假执行1；或符号，1为真执行1，1为假则执行2
            callback && callback()
        }
        ele.style.left = ele.offsetLeft + step + 'px'
    }, 15)


}