function animate(obj, target, callback) {
    //连续点击按钮时动画就会变快，需要每次点击的时候清除定时器
    clearInterval(obj.time);
    //这里用对象比声明变量好，因为不用开辟新的内存空间
    obj.time = setInterval(function() {
        //从快变缓动画公式是（目标值-当前动画左边距离页面值）/10
        var slow = (target - obj.offsetLeft) / 10;
        //Math.ceil 向上取整 ，Math.floor向下取整
        slow = slow > 0 ? Math.ceil(slow) : Math.floor(slow);
        //如果不清除定时器就会一直跳动
        if (obj.offsetLeft == target) {
            clearInterval(obj.time);
            if (callback) {
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + slow + 'px';
    }, 20)
}