function Render()
{
    $.ajax({

        url: "api/personal_center/history_organize/",
        dataType: "json",
        type: "get",
        success: function (data)
        {
            for (var i = 0; i <data["list_activity"].length; i++)
            {
				console.log(data["list_activity"][i]["uuid_act"]);
                var x = document.getElementById("history")
                var gF = document.createElement("tr");
                var F1 = document.createElement("td");
                var S1 = document.createElement("a");
                var F2 = document.createElement("td");
                var F3 = document.createElement("td");
				var F4 = document.createElement("span");
				F4.className="badge badge-pill badge-primary"
				console.log(data["list_activity"][i]["num_actual"])
				//<span class="badge badge-pill badge-primary">主要</span>
                var baseUrl = "show_meeting_info.html";
                var Url = baseUrl + "?id=" +data["list_activity"][i]["uuid_act"];
                S1.setAttribute('href', Url);
                S1.innerText = data["list_activity"][i]["name_act"];
                F2.innerText = data["list_activity"][i]["start_time"];
                F3.innerText = data["list_activity"][i]["end_time"];
				F4.innerText = data["list_activity"][i]["num_actual"]+"/"+data["list_activity"][i]["num_should"];
                F1.appendChild(S1);
                gF.appendChild(F1);
                gF.appendChild(F2);
                gF.appendChild(F3);
				gF.appendChild(F4);
                x.appendChild(gF);
            }
        },
        error: function ()
        {
            toastMessage("加载出现问题，请刷新页面重试");
        }
    });
}