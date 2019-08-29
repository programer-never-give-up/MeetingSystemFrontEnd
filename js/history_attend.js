

// var data=
//     {
//         "act":
//             [
//             {
//                 "uuid":123,
//                 "activityName":"东南大学实训宣讲会1",
//                 "time":{"startTime":"2019-6-8","endTime":"2019-6-9"},
//             },
//             {
//                 "uuid":123,
//                 "activityName":"东南大学实训宣讲会2",
//                 "time":{"startTime":"2019-6-8","endTime":"2019-6-9"},
//             },
//             {
//                 "uuid":123,
//                 "activityName":"东南大学实训宣讲会3",
//                 "time":{"startTime":"2019-6-8","endTime":"2019-6-9"},
//             }
//             ]
//     };
function Render()
{
    $.ajax({

        url: "api/history_attend",
        contentType: 'application/json;charset=UTF-8',
        dataType: "json",
        data: JSON.stringify(data),
        type: "get",
        async: false,
        success: function (data)
        {
            for (var i = 0; i < data.act.length; i++)
            {
                var x = document.getElementById("history")
                var gF = document.createElement("tr");
                var F1 = document.createElement("td");
                var S1 = document.createElement("a");
                var F2 = document.createElement("td");
                var F3 = document.createElement("td");
                var baseUrl = "show_meeting_info";
                var Url = baseUrl + "?id=" + data.act[i].uuid;
                S1.setAttribute('href', Url);
                S1.innerText = data.act[i].activityName;
                F2.innerText = data.act[i].time.startTime;
                F3.innerText = data.act[i].time.endTime;
                F1.appendChild(S1);
                gF.appendChild(F1);
                gF.appendChild(F2);
                gF.appendChild(F3);
                x.appendChild(gF);
            }

        },
        error: function () {


        }
    });



}