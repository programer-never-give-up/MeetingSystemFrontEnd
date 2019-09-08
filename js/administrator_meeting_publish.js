extIcons=
    {
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
 *

 * usuage:渲染页面信息的函数
 * @param data:json文件，格式为： 字典格式 {logo:"#",name:"#",start_time:"#",end_time:"#",location:"#",organizer:"#",introduction:"#",files:[{fileName:"#",fileSrc:"#"},..]}
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
    for(index in data["files"]){
        var item=data["files"][index];
        var name = item["fileName"];
        var ext = name.split(".")[1];
        iconSrc=extIcons["unknown"];
        if(ext in extIcons)
        {
            iconSrc=extIcons[ext];
        }
        iconSrc = "images/icons/" + iconSrc;
        html='<img src="'+iconSrc+'" >'+'<a href="'+item["fileSrc"]+item['fileName']+'">'+item["fileName"]+'</a>';
        $("#activity-files-box").append(html);
        $("#activity-files-box").append("</br>")
    }
}

//浏览器刷新时执行
function Render()
{
    //ajax请求
    var act_uuid = getParameter()['id']
    $.ajax({
        url:"api/activity/showActivity/",
        data:{uuid: act_uuid,},
        type:"GET",
        dataType:'json',
        success:function (data)
        {
            console.log(data);
            setActivityInfo(data);
            toastMessage("获取会议信息成功！");
        },
        error:function ()
        {
            toastMessage("获取会议信息失败！");
        }
    })
}
function agree()
{
    $.get('api/check/', function (data)
    {
        if (data.status)
        {
            var x;
            var r=confirm("确定同意吗!");
            if (r==true)
            {
                var act_uuid = getParameter()['id']
                $.ajax({
                    url: "api/activity/adminAgreePublish/",
                    dataType: "json",
                    data:{act_uuid:act_uuid},
                    type: "post",
                    success: function (data)
                    {
                        window.location.href = 'Administrators.html';
                    },
                    error: function ()
                    {
                        alert("出问题了");
                    }
                });
            }
        }
    });
}
function disagree()
{
    $.get('api/check/', function (data)
    {
        if (data.status)
        {
            var x;
            var r=confirm("确定拒绝吗!");
            if (r==true)
            {
                var act_uuid = getParameter()['id']
                $.ajax({
                    url: "api/activity/adminRefusePublish/",
                    dataType: "json",
                    data:{act_uuid:act_uuid},
                    type: "post",
                    success: function (data)
                    {
                        window.location.href = 'Administrators.html';
                    },
                    error: function ()
                    {
                        alert("出问题了");
                    }
                });
            }
        }
    });
}