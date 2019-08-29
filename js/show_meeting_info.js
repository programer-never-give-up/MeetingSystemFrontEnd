/**
 * @author:chonepieceyb
 * @type {string}
 */
    var activityInfoApi="#" ;  //获取活动信息的api
    /*
    字典格式 {logoSrc:"#",activityName:"#",time:{startTime:"#",endTime:"#"},location:"#",organizer:"#",introduction:"#",files:[{fileName:"#",fileSrc:"#"},..],type:"#","status":int}
    status: 0未开始 1进行中 2已结束
     */

    //可识别的扩展名列表
    extIcons={
        "docx":"icon_doc.gif",
        "doc":"icon_doc.gif",
        "xls":"icon_xls.gif",
        "xlsx":"icon_xls.gif",
        "txt" :"icon_txt.gif",
        "png":"icon_img.gif",
        "jpg":"icon_img.gif",
        "jpeg":"icon_img.gif",
        "gif":"icon_img.gif",
        "zip":"icon_rar.gif",
        "rar":"icon_rar.gif",
        "7z":"icon_rar.gif",
        "pdf":"icon_pdf.gif",
        "unknown":"icon_txt.gif"
    }

/**
 * usuage:渲染页面信息的函数
 * @param data:json文件，格式为： 字典格式 {logo:"#",name:"#",start_time:"#",end_time:"#",location:"#",organizer:"#",introduction:"#",files:[{fileName:"#",fileSrc:"#"},..],type:"#","status":int}
  status: 0未开始 1进行中 2已结束
 */
    function setActivityInfo(data){
        $(".meeting-article *img").attr(
            {
                "src": data["logo"]
            }
        );
        //获取并设置图片标题
        $("#title-info").text(data["name"]);
        //获取并设置开始时间和结束时间
        time = data["start_time"]+"至" +data["end_time"];
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
        //生成文件下载列表
        for(index in data["files"]){
            console.log(index);
            console.log(item);
            var item=data["files"][index];
            var name = item["fileName"];
            var ext = name.split(".")[1];
            iconSrc=extIcons["unknown"];
            if(ext in extIcons) {
                    iconSrc=extIcons[ext];
            }
            iconSrc = "images/icons/" + iconSrc;
            html='<img src="'+iconSrc+'" >'+'<a href="'+item["fileSrc"]+item['fileName']+'">'+item["fileName"]+'</a>';
            $("#activity-files-box").append(html);
            $("#activity-files-box").append("</br>")
        }

    }

//浏览器刷新时执行
$(function () {
    //获取会议id
    var act_uuid=getParameter()['id'];
    //ajax请求
    $.ajax({
        url:"api/activity/showActivity/",
        data:{uuid:act_uuid},
        type:"post",
        dataType:'json',
        success:function (data) {
            setActivityInfo(data);
            toastMessage("获取会议信息成功！");
        },
        error:function () {
            toastMessage("获取会议信息失败！");
        }
    })
})





    //测试代码
// var data='{"logo":"https://y4ngyy.xyz/assets/avatar.jpg","activityName":"东南大学实训宣讲会","start_time":"2019-6-8","end_time":"2019-6-9","location":"计算机楼","organizer":"东南大学计算机科学与工程学院",' +
//     '"introduction":"这是软件学院计算机科学与工程学院举办的宣讲会","type":"讲座","status":2' +
//     ',"files":[{"fileName":"1.pdf","fileSrc":"#"},{"fileName":"1.pdf","fileSrc":"#"}]}';
// data=JSON.parse(data);
// $(function () {
//     setInfoByJson(data)
// });
