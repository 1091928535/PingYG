window.onload = function() {
    var email = document.querySelector('.email');
    var email_i = email.nextElementSibling;
    var email_p = email_i.nextElementSibling;
    var tagE = /^[1-9][0-9]{4,}@qq.com$/;
    var uname = document.querySelector('.uname');
    var uname_i = uname.nextElementSibling;
    var uname_p = uname_i.nextElementSibling;
    var tagU = /^[\u4e00-\u9fa5]{2,8}$/;
    var pawd = document.querySelector('.pawd');
    var pawd_i = pawd.nextElementSibling;
    var pawd_p = pawd_i.nextElementSibling;
    var tagP = /^[a-zA-Z0-9]\w{5,17}$/;
    var pawdqr = document.querySelector('.pawdqr');
    var pawdqr_i = pawdqr.nextElementSibling;
    var pawdqr_p = pawdqr_i.nextElementSibling;
    var code = document.querySelector('.code');
    var code_i = code.nextElementSibling;
    var code_p = code_i.nextElementSibling;
    var tagC = /^\d{6}$/;
    tagSet(email, email_i, email_p, tagE);
    tagSet(uname, uname_i, uname_p, tagU);
    tagSet(pawd, pawd_i, pawd_p, tagP);
    tagSet(code, code_i, code_p, tagC);

    function tagSet(ele, i, p, tag) {
        ele.onblur = function() {
            if (tag.test(ele.value)) {
                i.style.backgroundPosition = '-30px 0';
                p.innerHTML = '您输入的正确！';
                p.className = 'green';
            } else {
                i.style.backgroundPosition = '-60px 0';
                p.innerHTML = '您输入的有误！';
                p.className = 'red';
            }
        }
    }
    pawdqr.onblur = function() {
        if (pawdqr.value == pawd.value) {
            pawdqr_i.style.backgroundPosition = '-30px 0';
            pawdqr_p.innerHTML = '您输入的正确！';
            pawdqr_p.className = 'green';
        } else {
            pawdqr_i.style.backgroundPosition = '-60px 0';
            pawdqr_p.innerHTML = '您输入的有误！';
            pawdqr_p.className = 'red';
        }
    }

}