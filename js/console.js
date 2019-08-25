/**
 * @author chonepieceyb
 * 会议的跳转模块
 */
//新建会议的跳转
$(function(){
    $("#new-activity-bottom").on('click',function (e) {
        window.location.href="console_newMeeting.html"
    })
});
//查看详情按钮的跳转
$(function(){
    $(".activity-card *button.btn-primary").on('click',function (e) {
        window.location.href="show_meeting_info.html"
    })
});
//编辑按钮的跳转
$(function(){
    $(".activity-card *button.btn-light").on('click',function (e) {
        window.location.href="console_newMeeting.html"
    })
});

//主页的跳蛛
$(function () {
    $(".activity-list-buttom").on('click',function (e) {
        window.location.href="index.html"
    })
})


