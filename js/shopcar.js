$(function() {

    //点击全选按钮，鼠标发生改变就让购物车的其他按钮选中
    $(".tab_checkbox").change(function() {
        // 让其他按钮跟随全选按钮改变, $(this).prop("checked")这个是全选按钮的checked布尔值
        //底下结算的全选按钮也要一起变化,可以直接写在选择器里面
        $(".car_checkbox,.tab_checkbox").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            $(".product_info").addClass("colorFFF8E1");
        } else {
            $(".product_info").removeClass("colorFFF8E1");
        }
    })

    //点击其他按钮，当其他按钮全部被选择时，全选按钮也要被选择
    $(".car_checkbox").change(function() {
        //$(".car_checkbox:checked").length，这个是选择的按钮的个数
        // console.log($(".car_checkbox:checked").length);
        //$(".car_checkbox").length这个是其他按钮的总个数，每次其他按钮改变是，就判断是否等于总个数
        if ($(".car_checkbox:checked").length == $(".car_checkbox").length) {
            $(".tab_checkbox").prop("checked", true);
        } else {
            $(".tab_checkbox").prop("checked", false);
        }
        $(this).parents(".shop_info").siblings(".product_info").find("input").prop("checked", $(this).prop("checked"));
        $(this).parents(".product_info").siblings(".shop_info").find("input").prop("checked", $(this).prop("checked"));

        //这里应该用$(this)，当前按钮的背景色改变，如果是$(".car_checkbox"),则只会选中第一个改变
        if ($(this).prop("checked")) {
            $(this).parents(".product_info").addClass("colorFFF8E1");
            $(this).parents(".shop_info").siblings(".product_info").addClass("colorFFF8E1");
        } else {
            $(this).parents(".product_info").removeClass("colorFFF8E1");
            $(this).parents(".shop_info").siblings(".product_info").removeClass("colorFFF8E1");
        }

    })


    //增减商品数量模块
    var index = 1;
    $(".amount_wrapper_top_jia").click(function() {
        //val()先获取最新value的值
        var index = $(this).siblings("input").val();
        //用parents()寻找最近的祖辈，简洁代码
        var unitPrice = $(this).parents(".th_amount").siblings(".th_price").find(".th_price_inner_top span").text();
        // var unitPrice = $(this).parent().parent().parent().parent().siblings(".th_price").find(".th_price_inner_top span").text();
        //不能用prop("value",index),
        if (index == 5) {
            //等于5时跳出循环
            return false;
        }
        index++;
        //要得到当前兄弟文本框的值，不然其他商品的加减都会动
        $(this).siblings("input").val(index);
        //用parents()寻找最近的祖辈，简洁代码
        $(this).parents(".th_amount").siblings(".th_sum").find("span").text((index * unitPrice).toFixed(2));
        // $(this).parent().parent().parent().parent().siblings(".th_sum").find("span").text(index * unitPrice);
        getSum();
    })
    $(".amount_wrapper_top_jian").click(function() {
        var index = $(this).siblings("input").val();
        //用parents()寻找最近的祖辈，简洁代码
        var unitPrice = $(this).parents(".th_amount").siblings(".th_price").find(".th_price_inner_top span").text();
        // var unitPrice = $(this).parent().parent().parent().parent().siblings(".th_price").find(".th_price_inner_top span").text();
        if (index == 1) {
            return false;
        }
        index--;
        $(this).siblings("input").val(index);
        //用parents()寻找最近的祖辈，简洁代码,toFixed(2)保留两位小数
        $(this).parents(".th_amount").siblings(".th_sum").find("span").text((index * unitPrice).toFixed(2));
        // $(this).parent().parent().parent().parent().siblings(".th_sum").find("span").text(index * unitPrice);
        getSum();
    })

    //修改文本框时，价格和数量也会跟着改变
    $(".amount_wrapper_top input").change(function() {
            // val()拿到文本框修改的值
            var amount = $(this).val();
            if (amount > 5) {
                $(this).val(1);
                return alert("您输入的有误！请重新输入");
            }
            var unitPrice = $(this).parents(".th_amount").siblings(".th_price").find(".th_price_inner_top span").text();
            $(this).parents(".th_amount").siblings(".th_sum").find("span").text((amount * unitPrice).toFixed(2));
            getSum();
        })
        //打开页面先调用一次，不会出现合计是0的情况
    getSum();
    // 合计结算模块,封装一个函数
    function getSum() {
        //合计数量
        var amount = 0;
        //合计价格
        var price = 0;
        //index索引，ele当前的元素
        $('.amount_wrapper_top input').each(function(index, ele) {
            // 不能直接写ele需要加上$，获取的是字符串，需要转换
            amount += parseInt($(ele).val());
            // amount += ele.val();
        })
        $(".bar_wrapper_inner_right1 em").text(amount);
        $('.th_sum span').each(function(index, ele) {
            // 不能直接写ele需要加上$，获取的是字符串，需要转换
            price += parseInt($(ele).text());
            // amount += ele.val();
        })
        $(".bar_wrapper_inner_right2 em").text(price.toFixed(2));
    }

    //删除模块
    $('.th_op a:last-child').click(function() {
            $(this).parents(".car_info").remove();
            getSum();
        })
        //删除选中的商品
    $(".bar_wrapper_inner_left a:first-child").click(function() {
        //找到选中的按钮,用:checked，隐式迭代会自动循环,选中的都会被删除
        $(".car_checkbox:checked").parents(".car_info").remove();
        getSum();
    })
})