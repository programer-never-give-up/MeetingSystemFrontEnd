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
    if(buttomType=='management-unpublished'){
            var $a =$('<a class="btn btn-light">编辑</a>');     //编辑按钮
            $a.attr("href","console_newMeeting.html?id="+activity["id"]+"&type=management-unplished");
            $(".buttonTd").append($a);

            $button =$('<button class="btn btn-danger">删除</button>');
            $button.attr("id","delete-button-"+activity["id"]);
            $button.on("click",function () {
                $(this).parent().parent().remove();
            })
            $(".buttonTd").append($button);

    }else if(buttomType=='management-published'){
            
    }
}

//测试代码
var data='{"activities":[{"logoSrc":"https://y4ngyy.xyz/assets/avatar.jpg","activityName":"东南大学实训宣讲会","startTime":"2019-6-8","endTime":"2019-6-9","location":"计算机楼","id":"00000000111111"},{"logoSrc":"https://y4ngyy.xyz/assets/avatar.jpg","activityName":"东南大学实训宣讲会","startTime":"2019-6-8","endTime":"2019-6-9","location":"计算机楼","id":"00000000111111"},{"logoSrc":"https://y4ngyy.xyz/assets/avatar.jpg","activityName":"东南大学实训宣讲会","startTime":"2019-6-8","endTime":"2019-6-9","location":"计算机楼","id":"00000000111111"}]}';
data=JSON.parse(data);
setInfoList(data,"management-unpublished");