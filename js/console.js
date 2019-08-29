/**
 * @author chonepieceyb
 * 会议的跳转模块
 */
//新建会议的跳转
$(function(){
    $("#new-activity-bottom").on('click',function (e) {
        window.location.href="console_newMeeting.html"
    })
});
//查看详情按钮的跳转
$(function(){
    $(".activity-card *button.btn-primary").on('click',function (e) {
        window.location.href="show_meeting_info.html"
    })
});
//编辑按钮的跳转
$(function(){
    $(".activity-card *button.btn-light").on('click',function (e) {
        window.location.href="console_newMeeting.html"
    })
});

//主页的跳蛛
$(function () {
    $(".activity-list-buttom").on('click',function (e) {
        window.location.href="index.html"
    })
})

/**
 * @author chonepieceyb
 * @param uuid 会议的id
 */
function deleteActivity(uuid){

}



/**
 * @author chonepieceyb
     * @param data:活动数据 json对象。 格式为{activities:[{logoSrc:"#",activityName:"#",location:"#",startTime:"#",endTime:"#",id:"#"},{...}，{...}>]}
 * @param buttomID  buttomType参数说明  block-subBlock 例如 活动管理模块下面的未发布为 mangement-Unpublished  ,mengement-published ....
 */
function setInfoList(data,buttomType){
    for(index in data["activities"]){
        activity=data["activities"][index];
        var $itemCard=$('<tr class="item-card"></tr>');
//<td><img src="https://y4ngyy.xyz/assets/avatar.jpg" alt="活动logo"></td>

        $itemCard.append('<td><img src="'+activity["logoSrc"]+'" alt="活动logo"></td>');   //添加缩略图

        $itemCard.append('<td>'+activity["activityName"]+'</td>');    //添加活动名称

        $itemCard.append('<td>'+activity["location"]+'</td>');        //添加活动地点

        var $timeTd=$('<td></td>');                                              //添加活动的开始时间和结束时间
        $timeTd.append(activity["startTime"]+"</br>"+activity["endTime"]);
        $itemCard.append($timeTd);

        var $buttonTd=$("<td class='buttonTd'></td>");    //添加查看详情按钮
        var $a =$('<a class="btn btn-primary">查看</a>');
        $a.attr("href","show_meeting_info.html?id="+activity["id"]);
        $buttonTd.append($a);
        $itemCard.append($buttonTd);
        $("tbody.activity-card").append($itemCard);
    }
    //根据不同的模块生成不同的链接样式
    if(buttomType=='management-unpublished' ||buttomType=='management-published'){      //活动管理的：未发布 和已发布
            var $aEdit =$('<a class="btn btn-light">编辑</a>');     //编辑按钮
            $aEdit.attr("href","console_newMeeting.html?id="+activity["id"]+"&type="+buttomType);
            $(".buttonTd").append($aEdit);

            $aDel =$('<a class="btn btn-danger">删除</a>');
            $aDel.attr("id","delete-button-"+activity["id"]);
            $aDel.on("click",function () {
                $(this).parent().parent().remove();
                deleteActivity(activity["id"]);
            })
            $(".buttonTd").append($aDel);

    }else if(buttomType=='management-processing' || buttomType=="management-finished"){   //活动管理的：进行中和已结束
            //上传按钮，进入界面后只能上传活动资料
            var $a =$('<a class="btn btn-light">编辑</a>');     //上传按钮
            $a.attr("href","console_newMeeting.html?id="+activity["id"]+"&type="+buttomType);
            $(".buttonTd").append($a);
    }else if(buttomType=="my-not-started"){    //我的活动的 未开始
            //取消报名的按钮
            $aDel =$('<a class="btn btn-danger">取消报名</a>');
            $aDel.attr("id","delete-button-"+activity["id"]);
            $aDel.on("click",function () {
                $(this).parent().parent().remove();
                deleteActivity(activity["id"]);
            });
            $(".buttonTd").append($aDel);
    }else if(buttomType=="fav-not-started" || buttomType=="fav-processing" ||buttomType=="fav-finished"){   //我的收藏模块的按钮
            //添加删除按钮
            $aDel =$('<a class="btn btn-danger">删除</a>');
            $aDel.attr("id","delete-button-"+activity["id"]);
            $aDel.on("click",function () {
                $(this).parent().parent().remove();
                deleteActivity(activity["id"]);
            });
            $(".buttonTd").append($aDel);
    }
}

/**
 *@author choenpieceyb
 * @usage: 向服务器请求一页的内容，应该是通用api，目前是首页api
 * @param api
 * @param btnID  按钮类型
 * @param pageID 第几页
 * @param perPage 每一页的页数
 */
function getActivityList(api,btnID,pageID,perPage){
    $.ajax({
        url:api,
        data:{"btn-type":btnID, "page-id":pageID,'per-page':perPage},
        type:"GET",
        dataType:'json',
        success:function (data) {
            setInfoList(data,btnID);
            toastMessage("刷新成功！");
        },
        error:function () {
            toastMessage("获取信息失败！");
        }
    })
}

/**
 * @author :chonepieceyb
 * usage:产生分页栏
 * @param btnID 缓存的当前是哪个按钮的页面
 * @param pageNum (总页数)
 * @param pageShowNum (最多展示的页数）>=3
 */
function generatePageItems(btnID,pageNum,pageShowNum=0){
    // if(pageShowNum<3){
    //     pageShowNum=3;
    // }
    // if(pageShowNum>pageNum){
    //     pageShowNum=pageNum;  //防止页面过少的情况
    // }
    //缓存当前页数（1）
    $('#page-bar').data('currentPage',1);
    //缓存按钮类型
    $('#page-bar').data('btnID',btnID);
    //缓存总页数
    $('#page-bar').data('pageNum',pageNum);
    //上一页按钮
    var $liP = $('<li class="page-item disabled">\n' +
        '                            <a class="page-link" href="#" id="page-previous">Previous</a>\n' +
        '                        </li>');
    $('#page-bar').append($liP);

    //动态添加
    for(var i=1;i<=pageNum;i++){
        var $li = $('<li class="page-item">\n' +
            '                            <a class="page-link" href="#"></a>\n' +
            '                        </li>');
        $li.children('a').attr('id','page-'+i);
        $li.children('a').text(i);
        $('#page-bar').append($li);
    }
    //添加next按钮
    var $liN = $('<li class="page-item activate">\n' +
        '                            <a class="page-link" href="#" id="page-next">next</a>\n' +
        '                        </li>');
    $('#page-bar').append($liN);

    //添加激活效果
    $('#page-1').parent().addClass('active');
}



//浏览器加载时运行
$(function () {
    //面包屑导航栏要用的字典
    var breadDict={
        "management-unpublished":['活动管理','未发布'],
        "management-published":['活动管理','已发布'],
        "management-processing":['活动管理','进行中'],
        "management-finished":['活动管理','已结束'],
        "to-be-audited":['活动管理','待审核'],
        "my-not-start":['我的活动','未开始'],
        "my-not-start":['我的活动',''],
        "my-not-start":['我的活动','未开始'],
    }
    //未开始等按钮的跳转
    $("div.function-list *div.collapse *a").on('click',function () {
        //实现按钮点击效果
        $(this).parent().parent().find('a').removeClass('active');
        $(this).addClass('active');
        $(this).parent('div').prev('a').addClass('active');
        //向前端请求数据 并更新首页列表
        getActivityList("#",$(this).attr('id'),1,5);
    });
    generatePageItems(1,7);

    //分页按钮点击
    $('#page-bar *a').on('click',function () {
        //取消激活状态
        var pageNum = $('#page-bar').data('pageNum');
        var currentPage=$('#page-bar').data('currentPage');
        $('#page-'+currentPage).parent().removeClass('active');

        if($(this).attr('id')=="page-previous"){                                 //获取当前的active
            currentPage-=1;                                                         //当前页-1
            $('#page-'+currentPage).parent().addClass('active');                     //激活效果
            $('#page-bar').data('currentPage',currentPage);                           //储存
        }
        else if($(this).attr('id')=="page-next" ){
            currentPage+=1;  //当前页+1
            $('#page-'+currentPage).parent().addClass('active');
            $('#page-bar').data('currentPage',currentPage);
        }else{
            $(this).parent().addClass('active');
            currentPage =  $(this).attr('id').split('-')[1];
            $('#page-bar').data('currentPage',currentPage);
        }

        if(currentPage==1){
            $('#page-previous').parent().addClass('disabled');
        }else if(currentPage==pageNum){
            $("#page-next").parent().addClass('disabled');
        }else{
            $('#page-previous').parent().removeClass('disabled');
            $("#page-next").parent().removeClass('disabled');
        }
    })
})
//测试代码
var data='{"activities":[{"logoSrc":"https://y4ngyy.xyz/assets/avatar.jpg","activityName":"东南大学实训宣讲会","startTime":"2019-6-8","endTime":"2019-6-9","location":"计算机楼","id":"00000000111111"},{"logoSrc":"https://y4ngyy.xyz/assets/avatar.jpg","activityName":"东南大学实训宣讲会","startTime":"2019-6-8","endTime":"2019-6-9","location":"计算机楼","id":"00000000111111"},{"logoSrc":"https://y4ngyy.xyz/assets/avatar.jpg","activityName":"东南大学实训宣讲会","startTime":"2019-6-8","endTime":"2019-6-9","location":"计算机楼","id":"00000000111111"}]}';
data=JSON.parse(data);
setInfoList(data,"fav-not-started");