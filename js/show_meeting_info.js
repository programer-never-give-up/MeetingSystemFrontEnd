//获取会议信息的js文件 ——杨彬
    var activityInfoApi="#" ;  //获取活动信息的api
    /*
    字典格式 {logoSrc:"#",activityName:"#",time:{startTime:"#",endTime:"#"},location:"#",organizer:"#",introduction:"#",fileurls:["#","#"...],type:"#","status":int}
    status: 0未开始 1进行中 2已结束
     */
    function setActivityInfo(api){
        $.getJSON(api,function(data){
            //获取并设置图片logo
            $(".meeting-article *img").attr(
                {
                    "src": data["logoSrc"]
                }
            );
            //获取并设置图片标题
            $("#title-info").text(data["activityName"]);

        })
    }
    //测试函数
    function setInfoTets(data){
        $(".meeting-article *img").attr(
            {
                "src": data["logoSrc"]
            }
        );
        //获取并设置图片标题
        $("#title-info").text(data["activityName"]);
        //获取并设置开始时间和结束时间
        time = data["time"]["startTime"]+"-" +data["time"]["endTime"];
        $("#time-info").text(time);
        //获取地址
        $("#location-info").text(data["location"])
        //获取主办方
        $("#organizer-info").text(data["organizer"]);
        //获取个人简介
        $("#introduction-info").text(data["introduction"]);
        //获取会议的状态和类别 以标签的形式展示在右上角
        var status=data["status"];
        var statuslabel;
        switch(status){
            case 0:  //未开始
                statuslabel='<div class="activity-label" style="background-color:#f8fc20;color:white">未开始</div>';
                break;
            case 1:   //进行中
                statuslabel='<div class="activity-label" style="background-color:#5DFC2C;color:white">进行中</div>';
                break;
            case 2:  //已结束
                statuslabel='<div class="activity-label" style="background-color:#FC0C2B;color:white">已结束</div>';
                break;
            default:
        }
        //生成标签
        $("#activity-label-row").append(statuslabel);
        //生成类别标签
        var typeLabel='<div class="activity-label" style="background-color:#9A5DFC; color:white">'+data["type"]+'</div>';
        $("#activity-label-row").append( typeLabel);

    }
var data='{"logoSrc":"https://y4ngyy.xyz/assets/avatar.jpg","activityName":"东南大学实训宣讲会","time":{"startTime":"2019-6-8","endTime":"2019-6-9"},"location":"计算机楼","organizer":"东南大学计算机科学与工程学院","introduction":"这是软件学院计算机科学与工程学院举办的宣讲会","type":"讲座","status":2}';
data=JSON.parse(data);
$(function () {
    setInfoTets(data)
});
