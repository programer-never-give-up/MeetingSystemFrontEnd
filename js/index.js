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
$(document).ready(function()
{
    $("#addEevement").click(function()
    {
        var gF=document.createElement("li");
        gF.className="item-card pull-left";
        var F1=document.createElement("h1");
        var S1=document.createElement("img");
        S1.src="https://y4ngyy.xyz/assets/avatar.jpg";
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
        gS2.className="btn btn-info"
        var S3=document.createElement("h3");
        var S6=document.createElement("h3");
        var S5=document.createElement("h3");
        S6.innerText="时间地点简介什么的";
        S5.innerText="时间地点简介什么的";
        S3.innerText="时间地点简介什么的";
        gS1.innerText="xxxxx会议";
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
