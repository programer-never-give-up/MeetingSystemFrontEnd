function Render()
{
    $.ajax({
        url: "api/personal_center/history_attend/",
        dataType: "json",
        type: "get",
        success: function (data)
        {
            
            for (var i = 0; i <data["list_activity"].length; i++)
            {
				
                var x = document.getElementById("history")
                var gF = document.createElement("tr");
                var F1 = document.createElement("td");
                var S1 = document.createElement("a");
                var F2 = document.createElement("td");
                var F3 = document.createElement("td");
                var baseUrl = "show_meeting_info.html";
                var Url = baseUrl + "?id=" +data["list_activity"][i]["uuid_act"];
                S1.setAttribute('href', Url);
                S1.innerText = data["list_activity"][i]["name_act"];
                F2.innerText = data["list_activity"][i]["start_time"];
                F3.innerText = data["list_activity"][i]["end_time"];
                F1.appendChild(S1);
                gF.appendChild(F1);
                gF.appendChild(F2);
                gF.appendChild(F3);
                x.appendChild(gF);
            }
        },
        error: function ()
        {
            alert("出问题了喔");
        }
    });
}