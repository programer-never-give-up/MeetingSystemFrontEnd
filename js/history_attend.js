var data=
    {
        "act":
            [
            {
                "uuid":123,
                "activityName":"东南大学实训宣讲会1",

            },
            {
                "uuid":123,
                "activityName":"东南大学实训宣讲会2",
            },
            {
                "uuid":123,
                "activityName":"东南大学实训宣讲会3",
            }
            ]
    };
function Render()
{
    function run1()
    {
        for(var i=0;i<data.act.length;i++)
        {
            var x = document.getElementById("history")
            var y1 = document.createElement("div");
            var y2 = document.createElement("div");
            var y4 = document.createElement("div")
            var y5 = document.createElement("button");
            y2.className = "card-body";
            y1.className = "card";
            y4.innerText = "label";
            y4.innerText = data.act[i].activityName;
            y5.className = "btn btn-info";
            y5.innerText = "详情";
            y2.appendChild(y4);
            y2.appendChild(y5);
            y1.appendChild(y2);
            x.appendChild(y1);
        }
    }

}