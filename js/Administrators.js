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
var latestData=
    {
        "act":
            [
                {
                    "uuid":123,
                    "logoSrc":"https://y4ngyy.xyz/assets/avatar.jpg",
                    "activityName":"东南大学实训宣讲会1",
                    "time":{"startTime":"2019-6-8","endTime":"2019-6-9"},
                    "location":"计算机楼"
                },
                {
                    "uuid":123,
                    "logoSrc":"https://y4ngyy.xyz/assets/avatar.jpg",
                    "activityName":"东南大学实训宣讲会2",
                    "time":{"startTime":"2019-6-8","endTime":"2019-6-9"},
                    "location":"计算机楼"
                }
            ]
    };

function Render ()
{

    for (var i = 0; i < data.act.length; i++)
    {
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
        var x = document.getElementById("reviewRequset");
        x.appendChild(gF);
    }


    for (var i = 0; i < latestData.act.length; i++)
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
        S1.setAttribute('href', latestData.act[i].detail);
        var gS1 = document.createElement("h3");
        gS3.innerText = latestData.act[i].location;
        gS2.innerText = latestData.act[i].time.startTime + "-" + latestData.act[i].time.endTime + " ";
        gS1.innerText = latestData.act[i].activityName;
        F1.src = latestData.act[i].logoSrc;
        F2.appendChild(S1);
        F2.appendChild(S2);
        S1.appendChild(gS1);
        S2.appendChild(gS2);
        S2.appendChild(gS3);
        gF.appendChild(F1);
        gF.appendChild(F2);
        var x = document.getElementById("modifyRequest");
        x.appendChild(gF);
    }

}