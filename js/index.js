// <ul class="p-0" id="recommend">
//     <li class="item-card">
//     <h1><img class=" " src="https://y4ngyy.xyz/assets/avatar.jpg" alt="会议logo"></h1>
//     <div class="item-info">
//         <a href="show_meeting_info.html"><h2>第十二届东南大学九龙湖校区超级长的不知道是什么东西的会议名称</h2></a>
//         <h3>时间 地点</h3>
//         <h3>主办方</h3>
//         <h3>简介十大大苏打撒旦</h3>
//         <a href="show_meeting_info.html"><button type="button" class="btn btn-primary">查看详情</button></a>
//     </div>
//     </li>
// </ul>
// $.ajax({
//     // 请求后台数据
//     url:"接口",
//     contentType: 'application/json;charset=UTF-8',
//     dataType: "json",
//     data: JSON.stringify(data),
//     type: "get",
//     async: false,
//     success: function (res) {
//
//
//     },
//     error: function () {
//
//
//     }
// });

var data=
    {
        "logoSrc":"https://y4ngyy.xyz/assets/avatar.jpg",
        "activityName":"东南大学实训宣讲会",
        "time":{"startTime":"2019-6-8","endTime":"2019-6-9"},
        "location":"计算机楼",
        "organizer":"东南大学计算机科学与工程学院",
        "detial":"show_meeting_info",
        "introduction":"简介简介简介"
    };

$(document).ready(function()
{
    $("#addEevement").click(function setJson()
    {
        var gF=document.createElement("li");
        gF.className="item-card pull-left";
        var F1=document.createElement("h1");
        var S1=document.createElement("img");
        S1.src=data.logoSrc;
        F1.appendChild(S1);
        var F2=document.createElement("div");
        F2.className="item-info";
        var S2=document.createElement("a");
        var S4=document.createElement("a");
        S2.setAttribute('href','show_meeting_info.html');
        S4.setAttribute('href','show_meeting_info.html');
        var gS1=document.createElement("h2");
        var gS2=document.createElement("button");
        gS2.innerText="查看详情";
        gS2.className="btn btn-info";
        gS2.onclick="location='data.detial'";
        var S3=document.createElement("h3");
        var S6=document.createElement("h3");
        var S5=document.createElement("h3");
        S3.innerText="地点："+data.location+" 时间："+data.time.startTime+"——"+data.time.endTime;
        S5.innerText=data.organizer;
        S6.innerText=data.introduction;
        gS1.innerText=data.activityName;
        S2.appendChild(gS1);
        S4.appendChild(gS2);
        F2.appendChild(S2);
        F2.appendChild(S3);
        F2.appendChild(S5);
        F2.appendChild(S6);
        F2.appendChild(S4);
        gF.appendChild(F1);
        gF.appendChild(F2);
        var x=document.getElementById("recommend")
        x.appendChild(gF);
    });
});

