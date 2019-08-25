/**
 * @author: y4ngyy
 */

/**
 * usage: 确认登录状态，更新导航栏状态
 * @param isRedirect true:启用跳转状态 false:关闭跳转状态
 * @param loginStatusToRedirect true:若在登录状态则跳转 false:若在非登录状态则跳转
 */
function checkLogin(isRedirect, loginStatusToRedirect=false) {
    $.get('api/check/', function (data) {
        // status === True 已登录
       if (data.status) {
           if (isRedirect) {
               if (loginStatusToRedirect) {
                   window.location.href = "index.html";
                   return;
               }
           }
           var navList = $('.nav-list');
           navList.append('<a href="console.html" class="nav-list-item">控制台</a>');
           navList.append('<a href="#" class="nav-list-item">个人中心</a>');
           navList.append('<span style="color: #ff5722;" class="nav-list-item">' +
               '<i class="fas fa-power-off"></i>' +
               '<a href="#">退出</a>' +
               '</span>');
       } else {
           if (isRedirect) {
               if (!loginStatusToRedirect) {
                   window.location.href = "index.html";
                   return;
               }
           }
           var navList = $('.nav-list');
           navList.append('<a href="login.html" class="nav-list-item">登录</a>');
           navList.append('<a href="register.html" class="nav-list-item">注册</a>');
       }
    });
}
