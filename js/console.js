


/**
 * @author chonepieceyb
 * @param uuid 会议的id
 */
function deleteActivity(uuid){
    console.log(uuid);
    $.ajax({
        url:'api/activity/deleteActivity/',
        type : 'POST',
        data:{uuid:uuid},
        success:function (data) {
            toastMessage(data['message']);
            $('#delete-button-'+uuid).parent().remove();
        },
        error:function () {
            toastMessage('请求提交失败');
        }
    })
}


/**
 * @author chonepieceyb
 * @param data
 * @param buttomType   生成的类型
 * @returns {number | jQuery | HTMLElement}      //返回生成的jquery对象
 */

function generateActivityTable(data,buttomType){
    $activityTable = $('<table class="w-100" style="margin-top: 3%"></table>');
    //生成表头
    $actTableHead = $('<thead></thead>');
    $actTableHead.append('<tr></tr>');

    $actTableHead.children('tr').append('<th>活动logo</th>');
    $actTableHead.children('tr').append('<th>活动名称</th>');
    $actTableHead.children('tr').append('<th>活动地点</th>');
    $actTableHead.children('tr').append('<th>活动时间</th>');
    if(buttomType=="management-to_be_audited"){
        $actTableHead.children('tr').append('<th>操作类型</th>');
    }
    $activityTable.append($actTableHead);

    //生成表体
    $actTableBody = $('<tbody class="activity-card">\n' +
        '\n' +
        '                    </tbody>');

    for(index in data["activities"]) {
        activity = data["activities"][index];
        var $itemCard = $('<tr class="item-card"></tr>');

        $itemCard.append('<td><img src="' + activity["logoSrc"] + '" alt="活动logo"></td>');   //添加缩略图

        $itemCard.append('<td>' + activity["activityName"] + '</td>');    //添加活动名称

        $itemCard.append('<td>' + activity["location"] + '</td>');        //添加活动地点

        var $timeTd = $('<td></td>');                                              //添加活动的开始时间和结束时间
        $timeTd.append(activity["startTime"] + "</br>" + activity["endTime"]);
        $itemCard.append($timeTd);

        //如果是待审核添加操作类型
        if(buttomType=='management-to_be_audited'){
            $itemCard.append('<td>' + activity["action"] + '</td>');
        }

        var $buttonTd = $("<td class='buttonTd'></td>");    //添加查看详情按钮
        var $a = $('<a class="btn btn-primary">查看</a>');
        $a.attr("href", "show_meeting_info.html?id=" + activity["id"]);
        $buttonTd.append($a);

        //根据不同的模块生成不同的链接样式
        if (buttomType == 'management-unpublished' || buttomType == 'management-published') {      //活动管理的：未发布 和已发布
            var $aEdit = $('<a class="btn btn-my-edit">编辑</a>');     //编辑按钮
            $aEdit.attr("href", "console_newMeeting.html?id=" + activity["id"]);
            $buttonTd.append($aEdit);

            $aDel = $('<a class="btn btn-danger">删除</a>');
            $aDel.attr("id", "delete-button-" + activity["id"]);
            $aDel.on("click", function () {
                if(deleteActivity($(this).attr('id').split('delete-button-')[1])){
                    $(this).parent().parent().remove();
                };
            })
            $buttonTd.append($aDel);

        } else if (buttomType == 'management-processing' || buttomType == "management-finished") {   //活动管理的：进行中和已结束
            //上传按钮，进入界面后只能上传活动资料
            var $a = $('<a class="btn btn-my-edit">编辑</a>');     //上传按钮
            $a.attr("href", "console_newMeeting.html?id=" + activity["id"]);
            $(".buttonTd").append($a);
        } else if (buttomType == "my-not_start") {    //我的活动的 未开始
            //查看二维码按钮
            $acheck=$('<a class="btn btn-primary">查看门票</a>');
            $acheck.data('act_uuid',activity['id']);
            $acheck.on('click',function () {
                showQRCode($(this).data('act_uuid'));
            })
            //取消报名的按钮
            $aDel = $('<a class="btn btn-danger">取消报名</a>');
            $aDel.attr("id", "delete-button-" + activity["id"]);
            $aDel.on("click", function () {
                if(deleteActivity($(this).attr('id').split('delete-button-')[1])){
                    $(this).parent().parent().remove();
                };
            });
            $buttonTd.append($aDel);
            $buttonTd.append($acheck);
        } else if(buttomType=='my-processing'){
            //查看二维码按钮
            $acheck=$('<a class="btn btn-primary">查看门票</a>');
            $acheck.data('act_uuid',activity['id']);
            $acheck.on('click',function () {
                showQRCode($(this).data('act_uuid'));
            });
            $buttonTd.append($acheck);
        } else if (buttomType == "fav-not_start" || buttomType == "fav-processing" || buttomType == "fav-finished") {   //我的收藏模块的按钮
            //添加删除按钮
            $aDel = $('<a class="btn btn-danger">删除</a>');
            $aDel.attr("id", "delete-button-" + activity["id"]);
            $aDel.on("click", function () {
                if(deleteActivity($(this).attr('id').split('delete-button-')[1])){
                    $(this).parent().parent().remove();
                };
            });
            $buttonTd.append($aDel);
        }
        $itemCard.append($buttonTd);
        //给itemCard添加悬浮效果
        $itemCard.hover(function () {
            $(this).addClass('item-row-shadow');
        },function () {
            $(this).removeClass('item-row-shadow');
        })
        $actTableBody .append($itemCard);
    }
    //添加表体
    $activityTable.append($actTableBody);
    //添加到父对象
    return $activityTable;
}

/**
 *@author chonepieceyb
 * @param api
 * @param btnID 类型
 * @param pageID 第几页
 * @param perPage
 * @param $fatherObject  父对象（table 和导航栏的父对象）
 * @param isGeneratePage 是否产生导航栏
 */
function getActivityList(api,btnID,pageID,perPage,$fatherObject,isGeneratePage=false){
    $.ajax({
        url:api,
        data:{"btn-type":btnID, "page-id":pageID,'per-page':perPage},
        type:"GET",
        dataType:'json',
        success:function (data) {
            if(isGeneratePage){       //如果更换按钮种类
                $fatherObject.find('*').remove();
                $fatherObject.append(generateActivityTable(data,btnID));
                $fatherObject.append(
                    generatePageItems(function (currentPage) {
                        getActivityList(api,btnID,currentPage,perPage,$fatherObject);
                    },data['pageNum'])
                );
                //setNumInfo(btnID,data['sum']);
            }else{
                $fatherObject.children('table').remove();
                $fatherObject.prepend( generateActivityTable(data,btnID) );
            }
            toastMessage("刷新成功！");
        },
        error:function () {
            toastMessage("获取信息失败！");
        }
    })
}

/**
 * @author chonepieceyb
 * @param callBackfun   点击时的回调函数
 * @param pageNum
 * @param myID
 * @returns {number | jQuery | HTMLElement}  返回生成的jquery对象
 */
function generatePageItems(callBackfun=null,pageNum=5,myID='console',){

    $nav = $('<nav></nav>');
    $pageUl=$('<ul class="pagination pagination-sm justify-content-center" id="page-bar"></ul>');
    $nav.append($pageUl);

    $pageUl.find('*').remove();
    //缓存当前页数（1）
    $pageUl.data('currentPage',1);
    //缓存总页数
    $pageUl.data('pageNum',pageNum);
    //上一页按钮
    var $liP = $('<li class="page-item disabled">\n' +
        '                            <a class="page-link" href="#" id="'+myID+'-page-previous">Previous</a>\n' +
        '                        </li>');
    $pageUl.append($liP);
    //动态添加
    for(var i=1;i<=pageNum;i++){
        var $li = $('<li class="page-item">\n' +
            '                            <a class="page-link" href="#"></a>\n' +
            '                        </li>');
        $li.children('a').attr('id',myID+'-page-'+i);
        $li.children('a').text(i);
        $pageUl.append($li);
    }
    //添加next按钮
    var $liN = $('<li class="page-item">\n' +
        '                            <a class="page-link" href="#" id="'+myID+'-page-next">next</a>\n' +
        '                        </li>');
    if(pageNum==1){
        $liN.addClass('disabled');
    }
    $pageUl.append($liN);

    //添加激活效果
    $liN.addClass('disabled');
    $pageUl.find('li').eq(1).addClass('active');
    $pageUl.find('a').each(function(index,element){
        $(this).on('click',function(){
            var pageNum = $pageUl.data('pageNum');
            var currentPage=$pageUl.data('currentPage');
            //取消激活状态
            $pageUl.find('li').eq(currentPage).removeClass('active');
            if($(this).attr('id')=="page-previous"){                                 //获取当前的active
                currentPage-=1;                                                         //当前页-1
            }
            else if($(this).attr('id')==myID+"-page-next" ){
                currentPage+=1;  //当前页+1
            }else{
                currentPage =  $(this).attr('id').split('-').pop();
            }
            //添加激活状态
            $pageUl.find('li').eq(currentPage).addClass('active');
            //设置 pre 和next的状态
            if(pageNum<=1){
                $liP.addClass('disabled');
                $liN.addClass('disabled');
            }
            else if(currentPage==1){
                $liP.addClass('disabled');
                $liN.removeClass('disabled');
            }else if(currentPage==pageNum){
                $liP.removeClass('disabled');
                $liN.addClass('disabled');
            }else{
                $liP.removeClass('disabled');
                $liN.removeClass('disabled');
            }
            //执行回调函数
            callBackfun(currentPage,pageNum);
        })
    });
    return $nav;
}

function setNumInfo(id,num,maxNum=99){
    $('#'+id).children('span.num-info').remove();
    if(num<=maxNum){
        $('#'+id).append('<span class="num-info">'+num+'</span>');
    }else{
        $('#'+id).append('<span class="num-info">99+</span>');
    }
}

function showQRCode(act_uuid){
    $.ajax({
        type:'GET',
        data:{uuid_act:act_uuid},
        dataType: 'json',
        success:function (data) {
            url='QRCode.html?src='+data['qrcode'];
            window.open(url, '入场二维码','height:500px,width=500px,location=no,menubar=no,toolbar=no');
        }
    })
}
//浏览器加载时运行
$(function () {
    //分页按钮点击
    //面包屑导航栏要用的字典
    var breadDict={
        management:'活动管理',
        my:'我的活动',
        fav:'我的收藏',
        unpublished:'未发布',
        published:'未开始',
        processing:'进行中',
        not_start:'未开始',
        to_be_audited:'待审核',
        finished:'已结束'
    }

    //新建会议的跳转
    $(function(){
        $("#new-activity-bottom").on('click',function (e) {
            window.location.href="console_newMeeting.html"
        })
    });
    //主页的跳蛛
    $(function () {
        $(".activity-list-buttom").on('click',function (e) {
            window.location.href="index.html"
        })
    })
    //大模块点击效果
    $("div.function-list *a[data-toggle='collapse']").on('click',function(){
        $('.breadcrumb *li').remove();
        $(this).parent().find('a').removeClass('active');
        items=breadDict[$(this).attr('id')];
        $('.breadcrumb').append(' <li class="breadcrumb-item"><a herf="#">控制台</a></li>');
        $('.breadcrumb').append(' <li class="breadcrumb-item active"><a herf="#">'+items+'</a></li>');
        $(this).addClass('active');
    })
    //未开始等按钮的跳转
    $("div.function-list *div.collapse *a").on('click',function () {

        //实现按钮点击效果
        $(this).parent('div').find('*').removeClass('active');
        $(this).addClass('active');
        //更改面包导航栏
        item=breadDict[$(this).attr('id').split('-')[1]];
        if($('.breadcrumb').find('li').length>=3){
            $('.breadcrumb').find('li:last-child').remove();
        }
        $('.breadcrumb').find('li').removeClass('active');
        $('.breadcrumb').append(' <li class="breadcrumb-item active"><a herf="#">'+item+'</a></li>');
        //向前端请求数据 并更新首页列表,产生分页栏
        getActivityList("api/activity/pageDisplay/",$(this).attr('id'),1,5,$('#activity-content-div'),true);
    });

});
//测试代码