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

/**
 * @author:chonepieceyb
 * @usage:实现列表的向上滚动效果
 * @param ulID   ul的jQ对象（对ul以下的li元素实现滚动效果
 * @param showNum :列表展示的数目
 * @param timeStep :间隔时间
 */
function wheelList(ulObject,showNum=3,timeStep=10000){
    var $ul=ulObject;
    $ul.children('li').css('position','absolute');    //设置位置属性
    var liNum = $ul.children('li').length;
    var outerheight = $ul.children('li:first').outerHeight();
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

/**
 *
 * @param data 数据
 * @param h    一行的高度
 * @param showNum  展示的数目
 */
function renderIndex(data) {
    for (var i = 0; i < data.list_activity.length; i++) {
        //用JQuery重写

        var $itemCard = $('<li class="item-card" style="width:100%;"></li>');     //添加card主体

        var $imgDiv = $('<h1><img src="' + data.list_activity[i].logo + '"></h1>');    //添加头像区域

        var $infoDiv = $('<div class="item-info"></div>');

        var $titleLink = $('<a><h2></h2></a>');      //标题和头像链接
        $titleLink.attr('href', 'show_meeting_info.html?id=' + data.list_activity[i].uuid_act);
        $titleLink.children('h2').text(data.list_activity[i].name_act);
        $infoDiv.append($titleLink);

        var $timeh = $('<h3></h3>');                     //时间
        $timeh.html('时间:' + data.list_activity[i].start_time + '—' + data.list_activity[i].end_time);
        $infoDiv.append($timeh);

        var $locationh = $('<h3></h3>');            //地点
        $locationh.html('地点：' + data.list_activity[i].location);
        $infoDiv.append($locationh);

        var $organizerh = $('<h3></h3>');          //主办方
        $organizerh.html("主办方:" + data.list_activity[i].organizer);
        $infoDiv.append($organizerh);

        var $btnLink = $('<a><button class="btn btn-primary">查看详情</button></a>');  //查看详情按钮
        $btnLink.attr('href', 'show_meeting_info.html?id=' + data.list_activity[i].uuid_act);
        console.log(data);
        $infoDiv.append($btnLink);

        //添加元素
        $itemCard.append($imgDiv);
        $itemCard.append($infoDiv);
        $('#recommend').append($itemCard);
        // var outerHeight=$itemCard.outerHeight();
        var outerHeight = 200;
        $itemCard.css('top',outerHeight*i+'px');

    }
}

function renderRecent(data){
    for (var i = 0; i <data["list_activity"].length; i++)
    {
        var $itemCard = $('<li class="recent_activity_item"></li>');   //卡片主体

        var $img = $('<img class="align-middle">');             //logo
        $img.attr('src',data['list_activity'][i]["logo"]);
        $itemCard.append($img);

        var $itemInfo=$('<div class="d-inline-block align-middle ml-2"></div>');

        var $titleLink =$('<a><h3></h3></a>');
        $titleLink.children('h3').text(data["list_activity"][i]["name_act"]);
        $titleLink.attr('href','show_meeting_info.html?id='+data["list_activity"][i]["uuid_act"]);
        $itemInfo.append($titleLink);

        $itemInfo.append('<div class="recent_activity_info"></div>');
        $itemInfo.children('div.recent_activity_info').append('<span>'+data["list_activity"][i]["start_time"].split(' ')[0]+" ");   //添加时间
        $itemInfo.children('div.recent_activity_info').append('<span>'+data["list_activity"][i]["location"]);   //添加时间

        $itemCard.append($itemInfo);
        $('#latestAct').append($itemCard);
        var outerHeight= $itemCard.outerHeight();
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
            wheelList($('#recommend'),3,5000);

        },
        error: function ()
        {
            toastMessage("加载出现问题，请刷新页面重试");
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
            wheelList($('#latestAct'),5,5000);

        },
        error: function ()
        {
            toastMessage("加载出现问题，请刷新页面重试");
        }
    });
}