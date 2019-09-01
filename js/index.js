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
        "act": [
            {
            "uuid":123,
            "logoSrc":"https://y4ngyy.xyz/assets/avatar.jpg",
            "activityName":"东南大学实训宣讲会1",
            "time":{"startTime":"2019-6-8","endTime":"2019-6-9"},
            "location":"计算机楼",
            "organizer":"东南大学计算机科学与工程学院",
            "introduction":"简介简介简介"
            },
            {
            "uuid":123,
            "logoSrc":"https://y4ngyy.xyz/assets/avatar.jpg",
            "activityName":"东南大学实训宣讲会2",
            "time":{"startTime":"2019-6-8","endTime":"2019-6-9"},
            "location":"计算机楼",
            "organizer":"东南大学计算机科学与工程学院",
            "detail":"show_meeting_info", "introduction":"简介简介简介"
            },
            {
            "uuid":123,
            "logoSrc":"https://y4ngyy.xyz/assets/avatar.jpg",
            "activityName":"东南大学实训宣讲会3",
            "time":{"startTime":"2019-6-8","endTime":"2019-6-9"},
            "location":"计算机楼",
            "organizer":"东南大学计算机科学与工程学院",
            "detail":"show_meeting_info", "introduction":"简介简介简介"
            }
        ]
    };
// var latestData=
// {
//     "act":
//         [
//             {
//                 "uuid":123,
//                 "logoSrc":"https://y4ngyy.xyz/assets/avatar.jpg",
//                 "activityName":"东南大学实训宣讲1",
//                 "time":{"startTime":"2019-6-8","endTime":"2019-6-9"},
//                 "location":"计算机楼"
//             },
//             {
//                 "uuid":123,
//                 "logoSrc":"https://y4ngyy.xyz/assets/avatar.jpg",
//                 "activityName":"东南大学实训宣讲会2",
//                 "time":{"startTime":"2019-6-8","endTime":"2019-6-9"},
//                 "location":"计算机楼"
//             }
//         ]
// };

function Render ()
{
    for (var i = 0; i < data.act.length; i++) {
        var gF = document.createElement("li");
        gF.className = "item-card";
        var F1 = document.createElement("h1");
        var S1 = document.createElement("img");
        S1.src = data.act[i].logoSrc;
        F1.appendChild(S1);
        var F2 = document.createElement("div");
        F2.className = "item-info";
        var S2 = document.createElement("a");
        var S4 = document.createElement("a");
        S2.setAttribute('href', data.act[i].detail);
        S4.setAttribute('href', data.act[i].detail);
        var gS1 = document.createElement("h2");
        var gS2 = document.createElement("button");
        gS2.innerText = "查看详情";
        gS2.className = "btn btn-info";
        gS2.onclick = "location='data.act[i].detail'";
        var S3 = document.createElement("h3");
        var S6 = document.createElement("h3");
        var S5 = document.createElement("h3");
        S3.innerText = "地点：" + data.act[i].location + " 时间：" + data.act[i].time.startTime + "——" + data.act[i].time.endTime;
        S5.innerText = data.act[i].organizer;
        S6.innerText = data.act[i].introduction;
        gS1.innerText = data.act[i].activityName;
        S2.appendChild(gS1);
        S4.appendChild(gS2);
        F2.appendChild(S2);
        F2.appendChild(S3);
        F2.appendChild(S5);
        F2.appendChild(S6);
        F2.appendChild(S4);
        gF.appendChild(F1);
        gF.appendChild(F2);
        var x = document.getElementById("recommend");
        x.appendChild(gF);
    }

    $.ajax({

        url: "api/yw/showRecent/",
        dataType: "json",
        type: "GET",
        success: function (data)
        {
            for (var i = 0; i <data["list_activity"].length; i++)
            {
                var gF = document.createElement("li");
                gF.className = "recent_activity_item";
                var F1 = document.createElement("img");
                var F2 = document.createElement("div");
                F2.className = "d-inline-block align-middle ml-2";
                F1.className = "align-middle";
                var S1 = document.createElement("a");
                var S2 = document.createElement("div");
                S2.className = "recent_activity_info";
                var gS2 = document.createElement("span");
                var gS3 = document.createElement("span");
				var baseUrl = "show_meeting_info.html";
                var Url = baseUrl + "?id=" +data["list_activity"][i]["uuid_act"];
                S1.setAttribute('href', Url);
                var gS1 = document.createElement("h3");
                gS3.innerText = data["list_activity"][i]["location"];
                gS2.innerText =data["list_activity"][i]["start_time"]+ "-" + data["list_activity"][i]["end_time"]+ " ";
                gS1.innerText =  data["list_activity"][i]["name_act"];
                F1.src =  data["list_activity"][i]["logo"];
                F2.appendChild(S1);
                F2.appendChild(S2);
                S1.appendChild(gS1);
                S2.appendChild(gS2);
                S2.appendChild(gS3);
                gF.appendChild(F1);
                gF.appendChild(F2);
                var x = document.getElementById("latestAct");
                x.appendChild(gF);
            }
        },
        error: function ()
        {
            alert("出问题了");
        }
    });
}



