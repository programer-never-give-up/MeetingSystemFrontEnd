/**
 * @author: y4ngyy
 */

/**
 * usage: 确认登录状态，更新导航栏状态
 * @param isRedirect true:启用跳转状态 false:关闭跳转状态
 * @param loginStatusToRedirect true:若在登录状态则跳转 false:若在非登录状态则跳转
 */
function checkLogin(isRedirect, loginStatusToRedirect=false) {
	      // response格式{"status":True, "type":"企业用户 or 普通用户"}
    $.get('api/check/', function (data) {
        // status === True 已登录
       if (data.status) {
           if (isRedirect) {
               if (loginStatusToRedirect)
               {
                   window.location.href = "index.html";
                   return;
               }
           }
           var navList = $('.nav-list');
           navList.parent().css('position','relative');
           navList.before(generateSearchBar(navList.parent(),function (resultDiv,keyword) {
               searchCallBack(resultDiv,keyword);
           }));

           navList.append('<a href="console.html" class="nav-list-item">控制台</a>');
           navList.append('<a href="Personal_Center.html" class="nav-list-item">个人中心</a>');
           navList.append('<span style="color: #ff5722;" class="nav-list-item">' +
               '<i class="fas fa-power-off"></i>' +
               '<a href="#" onclick="logout()">退出</a>' +
               '</span>');
           navList.prev().css('right',navList.outerWidth()+30);
           if(data['type']==0){    //如果是个人用户
               $('a.business-user').hide();
               $('button.business-user').addClass('disabled');
               $('button.business-user').attr('disabled',true);
           }else if(data['type']==1){    //如果是企业用户
               $('a.business-user').show();
               $('button.business-user').removeClass('disabled');
               $('button.business-user').attr('disabled',false);
           }
       } else {
           if (isRedirect) {
               if (!loginStatusToRedirect) {
                   window.location.href = "index.html";
                   return;
               }
           }
           var navList = $('.nav-list');
           navList.parent().css('position','relative');
           navList.before(generateSearchBar(navList.parent(),function (resultDiv,keyword) {
               searchCallBack(resultDiv,keyword);
           }));
           navList.append('<a href="login.html" class="nav-list-item">登录</a>');
           navList.append('<a href="register.html" class="nav-list-item">注册</a>');
           navList.prev().css('right',navList.outerWidth()+30);
       }
    });
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

/**
 * $author chonepieceyb
 * @param fatherObject  搜索框的父对象
 * @param callBackFunction  回调函数
 */
function generateSearchBar($fatherObject,callbackFun=null,minWidth=310) {
    $searchDic = $('<div class="input-group search-box" id="search-background"></div>');
    //添加label和图标
    $searchIcon= $('<img class="search-icon"></img>');
    //搜索图标
    $searchIcon.attr('src',"images/icons/search.png");
    $searchDic.append($searchIcon);
    $searchInput=$('<input type="text" list="search-result-list" placeholder="搜索" class="search-input" id="search-input">')
    $searchDic  .append($searchInput);

    //设置搜索结果框框
    $resultDiv = $('<div class="card result-card" >\n' +
        '                <div class="card-body">\n' +
        '                    <table class="table table-hover table-borderless">\n' +
        '                       <tbody id="search-result-body">\n' +
        '            \n' +
        '                       </tbody>\n' +
        '                   </table>\n' +
        '               </div>\n' +
        '          </div>');
    $resultDiv.hide();
    $searchDic.append($resultDiv);
    $searchInput.on('focus',function () {
        var maxWidth = $fatherObject.width()-$fatherObject.children('*').eq(0).outerWidth()-$fatherObject.children('*').eq(2).outerWidth()-40;
        $searchInput.parent().animate({
            width:maxWidth,
            },300,function () {
                $searchInput.css('width','700px')
            }
        );
        $searchInput.animate({
                width:maxWidth-50,
            },300
        );
        searchCallBack($resultDiv,$searchInput.val());

    });
    $('body').bind('click',function (event) {
        if(event.target.id!='search-input' && event.target.id!="search-result-body" && event.target.id!='search-background'){
            $searchInput.parent().animate({
                    width:minWidth,
                },300
            );
            $searchInput.animate({
                    width:minWidth-50,
                },300
            );
            $resultDiv.hide();
        }

    });
    $searchInput.bind('input propertychange',function () {
        callbackFun($resultDiv,$searchInput.val());
    });
    return  $searchDic;
}


/**
 * @author choenpeiceyb
 * @usage: 获得搜索结果
 * @param $resultDiv
 * @param keyword
 */
function searchCallBack($resultDiv,keyword){
    //向服务器请求数据
    if(keyword=='' || keyword==null || keyword==undefined){
        return;
    }
    $.ajax({
        type:'GET',
        data:{keyword:keyword},
        url:"api/yw/search/",
        dataType:'json',
        success:function(data){
            var $rusultBody=$resultDiv.find('tbody');
            $rusultBody.find('*').remove(); //删除所有数
            console.log(data);
            toastMessage(data['message']);
            activitys= data['list_activity'];
            if(activitys.length>0){
                for(let i=0;i<activitys.length;i++){
                    activity=activitys[i];
                    var $activityRow=$('<tr style="display: flex;align-items:center; ">\n' +
                        '    <td></td>\n' +                      //logo
                        '    <td></td>\n' +                      //名称
                        '    <td></td>\n' +                      //地点
                        '    <td></td>\n' +                     //时间
                        '</tr>')
                    //插入logo
                    $activityRow.find('td').eq(0).append('<img style="width: 40px;height: 40px"  src="'+activity['logo']+'">');
                    $activityRow.find('td').eq(1).append('<a href="show_meeting_info.html?id='+activity['uuid_act']+'">' +activity['name_act']+'</a>' ); //名称
                    $activityRow.find('td').eq(2).text(activity['location']);         //插入地点
                    $activityRow.find('td').eq(3).text(activity['start_time']+' —— '+activity['end_time']);   //插入时间
                    $rusultBody.append( $activityRow);

                }
                $resultDiv.show();
            }
        },
        error:function () {
            toastMessage('搜索失败');
        }
    })
}