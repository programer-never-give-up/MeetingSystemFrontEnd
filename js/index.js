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

/**
 * @author:chonepieceyb
 * @usage:实现列表的向上滚动效果
 * @param ulID   ul的jQ对象（对ul以下的li元素实现滚动效果
 * @param showNum :列表展示的数目
 * @param timeStep :间隔时间
 */
function wheelList(ulObject,interval,showNum=3,timeStep=3000){
    var $ul=ulObject;

    $ul.find('li').css('position','absolute');    //设置位置属性
    var liNum = $ul.children('li').length;
    var outerheight = $ul.children('li:first').outerHeight()+interval;
    function moveUp(dis) {
        $ul.find('li').each(function (index) {
            let top= $(this).position().top;
            top-=dis;
            $(this).animate({top:top},400,'linear',function () {
                //处理越界
                if(top<=-dis){
                    $(this).css('top',outerheight*(liNum-1)+'px');
                }
            })
        });
    }
    if(liNum<=showNum){
        showNum=liNum;
    }
    $ul.innerHeight(outerheight*showNum);

    function scorll(){
        // var $firstLi = $ul.children('li:first');
        // var $nextLi = $ul.children('li').eq(showNum);  //第showNum+1个
        // var height = $firstLi.height;
        // //让高度为0
        // if(!$firstLi.is(":animated")) {
        //     $firstLi.animate({
        //         height: 'hide',
        //         opacity: 'hide'
        //     }, 1000, function () {
        //         //将第一个移除，区别于remove
        //         $firstLi.addClass('whell-item-invisible');
        //         $firstLi.remove();
        //         $ul.append($firstLi);
        //         $firstLi.addClass('whell-item-invisible');
        //     });
        // }
        // $nextLi.removeClass('whell-item-invisible');
        // if(!$nextLi.is(":animated")) {
        //     $nextLi.animate({
        //         height: 'show',
        //         opacity: 'show'
        //     }, 1000);
        // }
    }
    if(showNum<liNum){
        setInterval(function(){moveUp(outerheight)}, timeStep);
    }
}


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


/**
 *
 * @param data 数据
 * @param h    一行的高度
 * @param showNum  展示的数目
 */
function renderIndex(data,interval=0) {
    for (var i = 0; i < data.list_activity.length; i++) {
        //用JQuery重写

        var $itemCard = $('<li class="item-card" style="clear:both"></li>');     //添加card主体

        var $imgDiv = $('<h1><img src="' + data.list_activity[i].logo + '"></h1>');    //添加头像区域

        var $infoDiv = $('<div class="item-info"></div>');

        var $titleLink = $('<a><h2></h2></a>');      //标题和头像链接
        $titleLink.attr('href', 'show_meeting_info.html?id=' + data.list_activity[i].uuid_act);
        $titleLink.children('h2').text(data.list_activity[i].name_act);
        $infoDiv.append($titleLink);

        var $timeh = $('<h3></h3>');                     //时间
        $timeh.html('时间:' + data.list_activity[i].start_time + '——' + data.list_activity[i].end_time);
        $infoDiv.append($timeh);

        var $locationh = $('<h3></h3>');            //地点
        $locationh.html('地点：' + data.list_activity[i].location);
        $infoDiv.append($locationh);

        var $organizerh = $('<h3></h3>');          //主办方
        $organizerh.html("主办方:" + data.list_activity[i].organizer);
        $infoDiv.append($organizerh);

        var $btnLink = $('<a><button class="btn btn-primary">查看详情</button></a>');  //查看详情按钮
        $btnLink.attr('href', 'show_meeting_info.html?id=' + data.list_activity[i].uuid);
        $infoDiv.append($btnLink);

        //添加元素
        $itemCard.append($imgDiv);
        $itemCard.append($infoDiv);
        $('#recommend').append($itemCard);
        var outerHeight=$itemCard.outerHeight()+interval;
        $itemCard.css('top',outerHeight*i+'px');

    }
}

function renderRecent(data,interval=0){
    for (var i = 0; i <data["list_activity"].length; i++)
    {
        $itemCard = $('<li class="recent_activity_item"></li>');   //卡片主体

        $img = $('<img class="align-middle">');             //logo
        $img.attr('src',data['list_activity'][i]["logo"]);
        $itemCard.append($img);

        $itemInfo=$('<div class="d-inline-block align-middle ml-2"></div>');

        $titleLink =$('<a><h3></h3></a>');
        $titleLink.children('h3').text(data["list_activity"][i]["name_act"]);
        $titleLink.attr('href','show_meeting_info.html?id='+data["list_activity"][i]["uuid_act"]);
        $itemInfo.append($titleLink);

        $itemInfo.append('<div class="recent_activity_info"></div>');
        $itemInfo.children('div.recent_activity_info').append('<span>时间:'+data["list_activity"][i]["start_time"]+" ");   //添加时间
        $itemInfo.children('div.recent_activity_info').append('<span>地点:'+data["list_activity"][i]["location"]);   //添加时间

        $itemCard.append($itemInfo);
        $('#latestAct').append($itemCard);
        var outerHeight= $itemCard.outerHeight()+interval;
        $itemCard.css('top',outerHeight*i+'px');
    }
}
function Render ()
{

    $.ajax({

        url: "api/yw/showRecommendation/",
        dataType: "json",
        type: "GET",
        success: function (data)
        {
            toastMessage(data['message']);
            renderIndex(data);
            wheelList($('#recommend'),0,3);

        },
        error: function ()
        {
            alert("出问题了");
        }
    });
    $.ajax({

        url: "api/yw/showRecent/",
        dataType: "json",
        type: "GET",
        success: function (data)
        {
            toastMessage(data['message']);
            renderRecent(data);
            wheelList($('#latestAct'),0,8);

        },
        error: function ()
        {
            alert("出问题了");
        }
    });
}



// for (var i = 0; i <data["list_activity"].length; i++)
// {
//     var gF = document.createElement("li");
//     gF.className = "recent_activity_item";
//     var F1 = document.createElement("img");
//     var F2 = document.createElement("div");
//     F2.className = "d-inline-block align-middle ml-2";
//     F1.className = "align-middle";
//     var S1 = document.createElement("a");
//     var S2 = document.createElement("div");
//     S2.className = "recent_activity_info";
//     var gS2 = document.createElement("span");
//     var gS3 = document.createElement("span");
// 	var baseUrl = "show_meeting_info.html";
//     var Url = baseUrl + "?id=" +data["list_activity"][i]["uuid_act"];
//     S1.setAttribute('href', Url);
//     var gS1 = document.createElement("h3");
//     gS3.innerText = data["list_activity"][i]["location"];
//     gS2.innerText =data["list_activity"][i]["start_time"]+ "-" + data["list_activity"][i]["end_time"]+ " ";
//     gS1.innerText =  data["list_activity"][i]["name_act"];
//     F1.src =  data["list_activity"][i]["logo"];
//     F2.appendChild(S1);
//     F2.appendChild(S2);
//     S1.appendChild(gS1);
//     S2.appendChild(gS2);
//     S2.appendChild(gS3);
//     gF.appendChild(F1);
//     gF.appendChild(F2);
//     var x = document.getElementById("latestAct");
//     x.appendChild(gF);
// }

// var gF = document.createElement("li");
// gF.className = "item-card";
// var F1 = document.createElement("h1");
// var S1 = document.createElement("img");
// S1.src = data.list_activity[i].logoSrc;
// F1.appendChild(S1);
// var F2 = document.createElement("div");
// F2.className = "item-info";
// var S2 = document.createElement("a");
// var S4 = document.createElement("a");
// S2.setAttribute('href', data.list_activity[i].detail);
// S4.setAttribute('href', data.list_activity[i].detail);
// var gS1 = document.createElement("h2");
// var gS2 = document.createElement("button");
// gS2.innerText = "查看详情";
// gS2.className = "btn btn-info";
// gS2.onclick = "location='data.list_activity[i].detail'";
// var S3 = document.createElement("h3");
// var S6 = document.createElement("h3");
// var S5 = document.createElement("h3");
// S3.innerText = "地点：" + data.list_activity[i].location + " 时间：" + data.list_activity[i].time.startTime + "——" + data.list_activity[i].time.endTime;
// S5.innerText = data.list_activity[i].organizer;
// S6.innerText = data.list_activity[i].introduction;
// gS1.innerText = data.list_activity[i].activityName;
// S2.appendChild(gS1);
// S4.appendChild(gS2);
// F2.appendChild(S2);
// F2.appendChild(S3);
// F2.appendChild(S5);
// F2.appendChild(S6);
// F2.appendChild(S4);
// gF.appendChild(F1);
// gF.appendChild(F2);
// var x = document.getElementById("recommend");
// x.appendChild(gF);

