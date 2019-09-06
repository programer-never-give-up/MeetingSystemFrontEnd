/**
 * @author: y4ngyy
 */

/**
 * usage: 确认登录状态，更新导航栏状态
 * @param isRedirect true:启用跳转状态 false:关闭跳转状态
 * @param loginStatusToRedirect true:若在登录状态则跳转 false:若在非登录状态则跳转
 */
function checkLogin(isRedirect, loginStatusToRedirect=false)
{
	      // response格式{"status":True, "type":"企业用户 or 普通用户"}
    $.get('api/check/', function (data)
    {
        // status === True 已登录
       if (data.status)
       {
           Render();

       }
       else
           {
           if (isRedirect)
           {
               if (!loginStatusToRedirect)
               {
                   window.location.href = "login.html";
                   return;
               }
           }
       }
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