
function Render ()
{
    $.ajax({
        url: "api/yw/showActivityList/",
        dataType: "json",
        type: "get",
        success: function (data)
        {
            for (var i = 0; i < data["list_activity"].length; i++)
            {	
				console.log("for");
                if (data["list_activity"][i]["action"] == "publish")
                {
					console.log("publish");
                    var baseUrl = "administrator_meeting_publish.html";
                    setInfo(data["list_activity"][i], "publishRequest", baseUrl)
                }
                if (data["list_activity"][i]["action"] == "modify")
                {
					console.log("modify");
                    var baseUrl = "administrator_meeting_modify.html";
                    setInfo(data["list_activity"][i], "modifyRequest", baseUrl)
                }
                if (data["list_activity"][i]["action"] == "delete")
                {
					console.log("delete");
                    var baseUrl = "administrator_meeting_delete.html";
                    setInfo(data["list_activity"][i], "deleteRequest", baseUrl)
                }
            }

        },
        error: function ()
        {
            alert("出问题了喔");
        }
    });

}
function setInfo(data_min,elementId,baseUrl)
{
    var Url = baseUrl + "?id=" +data_min["uuid_act"];
    var gF = document.createElement("li");
    gF.className = "item-card";
    var F1 = document.createElement("h1");
    var S1 = document.createElement("img");
    var F2 = document.createElement("div");
    F2.className = "item-info";
    var S2 = document.createElement("a");
    S2.setAttribute('href', Url);
    var gS1 = document.createElement("h5");
    var S3 = document.createElement("h6");
    var S5 = document.createElement("h6");
    S3.innerText = "地点：" + data_min["location"] + " 时间：" + data_min["start_time"] + "——" + data_min["end_time"];
    S5.innerText = data_min["organizer"];
    gS1.innerText = data_min["name_act"];
    S2.appendChild(gS1);
    F2.appendChild(S2);
    F2.appendChild(S3);
    F2.appendChild(S5);
    gF.appendChild(F1);
    gF.appendChild(F2);
    var buttonAgree=document.createElement("button");
    buttonAgree.className="btn btn-info";
    var buttonDisagree=document.createElement("button");
    buttonDisagree.className="btn btn-danger";
    buttonAgree.innerText="同意";
    buttonDisagree.onclick=disagreeClick(data_min);
    buttonAgree.onclick=agreeClick(data_min);
    buttonDisagree.innerText="拒绝";
    F2.appendChild(buttonAgree);
    F2.appendChild(buttonDisagree);
    var x = document.getElementById(elementId);
    x.appendChild(gF);
}
function agreeClick(dataSent)
{
    var x;
    var r=confirm("确定同意吗!");
    if (r==true)
    {
        agree(dataSent);
    }
}
function disagreeClick(dataSent)
{
    var x;
    var r=confirm("确定拒绝吗!");
    if (r==true)
    {
        disagree(dataSent);
    }
}
function agree(dataSent)
{
    if(dataSent["action"]=="publish")
    {
        $.ajax({
            url: "api/yw/showActivityList/",
            dataType: "json",
            type: "post",
            success: function (data)
            {
                alert("连接成功");
            },
            error: function ()
            {
                alert("连接失败");
            }
        });
    }
    if(dataSent["action"]=="modify")
    {
    }
    if(dataSent["action"]=="delete")
    {

    }
}
function disagree(dataSent)
{
    if(dataSent["action"]=="publish")
    {

    }
    if(dataSent["action"]=="modify")
    {

    }
    if(dataSent["action"]=="delete")
    {

    }
}