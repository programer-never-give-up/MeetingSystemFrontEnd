/**
 * @author: shixuezhiyi
 */

/**
管理员确认登陆
 */
function checkLogin()
{
    $.get('api/check/', function (data)
    {
       if (data.status)
       {
           if(data['type']==2)
           {
               Render();
               return;
           }
       }
           window.location.href = "login.html";
           return;
    });
}




/**
 * @author y4ngyy
 * @param message
 */
function toastMessage(message) {
    if ($(".toast").length <= 0) {
        let toast = "<div class=\"toast w-25\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\" data-delay=\"2000\" id=\"message-box\">\n" +
            "    <div class=\"toast-header bg-danger text-white\">\n" +
            "        <strong>提示</strong>\n" +
            "    </div>\n" +
            "    <div class=\"toast-body p-3\" id=\"message\">\n" +
            "    </div>\n" +
            "</div>";
        $(".navbar").after(toast);
    }
    $('#message').text(message);
    $('.toast').toast('show');
}

/**
 * @author chonepieceyb
 * @param seconds  跳转描述
 * @param message  提示信息
 * @param url       跳转的url
 */
function jump(seconds,message,url) {
    var timeOut = seconds;
    window.setInterval(function () {
        if(timeOut>0){
            toastMessage(message+" "+timeOut+"秒");
            timeOut--;
        }else{
            window.clearInterval();
            window.location.href=url;
        }
    },1000)
}

/**
 *@author chonepieceyb
 * @returns {Object}
 * @usage  parameters['参数名']
 */
function getParameter() {
    var url = window.location.search;
    var parameters = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            parameters[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return parameters;
}

/**
 * @author :chonepieceyb
 * @usage:必填信息检查函数，检查所有拥有className类的input值(用在文本框）是否为空
 * @param className
 */
function checkRequired(className){
    flag=true;
    $('.'+className).each(function (index,element) {
        if($(this).val()=="" ||$(this).val()==undefined ||$(this).val()==null ){
            flag=false;
        }
    });
    return flag;
}
function logout() {
    // reponse {status: True}
    $.get('api/logout/', function(data){
        if(data.status) {
            console.log('登出成功');
            window.location.href='index.html';
        } else {
            console.log('登出失败')
        }
    });
}