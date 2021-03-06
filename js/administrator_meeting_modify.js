/**
 * @author: shixuezhiyi
 */
extIcons=
    {
        "docx": "icon_doc.gif",
        "doc": "icon_doc.gif",
        "xls": "icon_xls.gif",
        "xlsx": "icon_xls.gif",
        "txt": "icon_txt.gif",
        "png": "icon_img.gif",
        "jpg": "icon_img.gif",
        "jpeg": "icon_img.gif",
        "gif": "icon_img.gif",
        "zip": "icon_rar.gif",
        "rar": "icon_rar.gif",
        "7z": "icon_rar.gif",
        "pdf": "icon_pdf.gif",
        "unknown": "icon_txt.gif"
    }


/**
 * usuage:渲染页面信息的函数
 * @param data:json文件，格式为： 字典格式 {logo:"#",name:"#",start_time:"#",end_time:"#",location:"#",organizer:"#",introduction:"#",files:[{fileName:"#",fileSrc:"#"},..],type:"#","status":int}
 status: 0未开始 1进行中 2已结束
 */
function setActivityInfo(data)
{
//    $("#old_logo *img").attr
//    (
//        {
//            "src": data["logo_old"]
//        }
//    );
//    $("#new_logo *img").attr
//    (
//        {
//            "src": data["new_old"]
//        }
//    );
    //获取并设置图片标题

	//console.log(data["name_new"]);
    $("#title-info-new").text(data["name_new"]);
    //获取并设置开始时间和结束时间
    time = data["start_time_new"]+"至" +data["end_time_new"];
    $("#time-info-new").text(time);
    //获取地址
    $("#location-info-new").text(data["location_new"])
    //获取主办方
    $("#organizer-info-new").text(data["organizer_new"]);
    //获取个人简介
    $("#introduction-info-new").text(data["introduction_new"]);
    $("#title-info-old").text(data["name_old"]);
    //获取并设置开始时间和结束时间
    time2 = data["start_time_old"]+"至" +data["end_time_old"];
    $("#time-info-old").text(time2);
    //获取地址
    $("#location-info-old").text(data["location_old"])
    //获取主办方
    $("#organizer-info-old").text(data["organizer_old"]);
    //获取个人简介
    $("#introduction-info-old").text(data["introduction_old"]);
    //生成文件下载列表
	console.log("nihao")
    for(index in data["files_new"])
    {
        var item=data["files_new"][index];
        var name = item["fileName"];
        var ext = name.split(".")[1];
        iconSrc=extIcons["unknown"];
        if(ext in extIcons)
        {
            iconSrc=extIcons[ext];
        }
        iconSrc = "images/icons/" + iconSrc;
        html='<img src="'+iconSrc+'" >'+'<a href="'+item["fileSrc"]+item['fileName']+'">'+item["fileName"]+'</a>';
        $("#activity-files-box-new").append(html);
        $("#activity-files-box-new").append("</br>")
    }
	
	console.log(time2)

    if(data["location_old"]!==data["location_new"])
    {	
		var p1=document.getElementById("location-info-new")
		p1.setAttribute("style","border-color:#FF3333");
    }
	    if(time!==time2)
    {	
		var p1=document.getElementById("time-info-new")
		p1.setAttribute("style","border-color:#FF3333");
    }
	    if(data["organizer_old"]!==data["organizer_new"])
    {	
		var p1=document.getElementById("organizer-info-new")
		p1.setAttribute("style","border-color:#FF3333");
    }
	    if(data["introduction_old"]!==data["introduction_new"])
    {	
		var p1=document.getElementById("introduction-info-new")
		p1.setAttribute("style","border-color:#FF3333");
    }
}

//浏览器刷新时执行
function Render()
{
    //ajax请求
    var act_uuid = getParameter()['id']
    $.ajax({
        url:"api/yw/showModification/",
        data:{uuid: act_uuid,},
        type:"GET",
        dataType:'json',
        success:function (data) {
            //设置按钮
            console.log(data);
            setActivityInfo(data);
            toastMessage("获取会议信息成功！");
        },
        error:function () {
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
                    url: "api/activity/adminAgreeModify/",
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
                    url: "api/activity/adminRefuseModify/",
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