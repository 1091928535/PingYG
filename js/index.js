//等页面加载完执行js
window.addEventListener('load', function() {
    //第一步，鼠标移动到图片上，焦点就出现，离开消失
    var span_l = document.querySelector('.span_l');
    var span_r = document.querySelector('.span_r');
    var img = document.querySelector('.img');
    img.addEventListener('mouseenter', function() {
        span_l.style.display = 'block';
        span_r.style.display = 'block';
        clearInterval(timer);
        timer = null; //清除定时器后，把定时器为空节省空间
    })
    img.addEventListener('mouseleave', function() {
            span_l.style.display = 'none';
            span_r.style.display = 'none';
            timer = setInterval(function() {
                // 手动调用点击事件
                span_r.click();
            }, 2000)
        })
        //第二步 把ol小点设置为动态生成
    var ol = document.querySelector('.point');
    var ul = img.querySelector('ul');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        //创建索引值
        ol.appendChild(li);
        //添加index值
        li.setAttribute('index', i);
        //为每一个创建的li添加点击事件
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            //获取index值
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            //要想移动必须加定位
            animate(ul, -index * 721);
        })
    }
    ol.children[0].className = 'current';
    //克隆一份li，直接添加的话小点也会变多，可以放在添加小点的下面
    var first = ul.children[0].cloneNode(true);
    //需要在后面加上一个图片，无缝链接效果
    ul.appendChild(first);
    var num = 0;
    var circle = 0;
    var flag = true;
    span_r.addEventListener('click', function() {
        //节流阀，判断为true执行，执行之后立即变为false，最后等动画执行完，回调函数让flag变为true
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * 721, function() {
                flag = true;
            });
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }
    })
    span_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * 721 + 'px';
            }
            num--;
            animate(ul, -num * 721, function() {
                flag = true;
            });
            circle--;
            //点击一次，circl小于0 ，图片要跳到最后一张，索引值为3
            if (circle < 0) {
                circle = 3;
            }
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }
    })

    var timer = setInterval(function() {
        // 手动调用点击事件
        span_r.click();
    }, 2000)

    var flag = true;
    $(function() {
        var recommend = $(".recommend").offset().top;
        //每次刷新会消失，所以封装起来，每次自己调用
        getToggleTab();
        getAddColor();

        function getToggleTab() {
            if ($(document).scrollTop() >= recommend) {
                $(".liftnav").fadeIn();
            } else if ($(document).scrollTop() < recommend) {
                $(".liftnav").fadeOut();
            }
        }

        function getAddColor() {
            if (flag) {
                if ($(document).scrollTop() >= $(".recommend").offset().top) {
                    $(".liftnav a").removeClass("ahover");
                    $(".liftnav li:first-child a").addClass("ahover");
                }
                $(".floor").each(function(index, ele) {
                    // 如果页面滚动大于每个盒子的top值，就把相应的索引的导航添加类
                    if ($(document).scrollTop() >= $(ele).offset().top) {
                        $(".liftnav a").removeClass("ahover");
                        $(".liftnav li:nth-child(2) a,.liftnav li:nth-child(3) a,.liftnav li:nth-child(4) a").eq(index).addClass('ahover');
                    }
                })
            }
        }
        $(window).scroll(function() {
            getToggleTab();
            getAddColor()
        })
        $(".liftnav li:nth-child(2),.liftnav li:nth-child(3),.liftnav li:nth-child(4)").click(function() {
            flag = false;
            var floor = $(".floor").eq(($(this).index() - 1)).offset().top;
            $("html,body").animate({
                scrollTop: floor
            }, function() {
                flag = true;
            })
        })

        $(".liftnav li:first-child").click(function() {
            flag = false;
            $("html,body").animate({
                scrollTop: recommend
            }, function() {
                flag = true;
            })
        })
        $(".liftnav li:last-child").click(function() {
            flag = false;
            $("html,body").animate({
                scrollTop: 0
                    //当动画做完了就打开节流阀
            }, function() {
                flag = true;
            })
        })
        $(".liftnav li a").click(function() {
            $(this).parents(".liftnav").find("a").removeClass("ahover");
            $(this).addClass("ahover");
        })
    })
})