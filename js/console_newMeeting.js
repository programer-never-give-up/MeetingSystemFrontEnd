//bootstrap fileinput




/**
 * @author chonepieceyb
 * @usage :初始化 fileinput 插件
 * @param col 控件ID
 * @param url   上传地址
 */
function initFileInput(colID,url){
    $("#"+colID).fileinput({
        language:'zh',   //设置语言为中文
        uploadUrl: url, //上传地址
        //allowedFileExtensions: ['jpg', 'gif', 'png','txt','word'],//接收的文件后缀
        showUpload:false,   //不显示上传按钮
        uploadAsync:true,
        previewFileIconSettings: {
            'docx': '<i class="fa fa-file-word-o text-primary" ></i>',
            'xlsx': '<i class="fa fa-file-excel-o text-success"></i>',
            'pptx': '<i class="fa fa-file-powerpoint-o text-danger"></i>',
            'jpg': '<i class="fa fa-file-photo-o text-warning"></i>',
            'pdf': '<i class="fa fa-file-pdf-o text-danger"></i>',
            'zip': '<i class="fa fa-file-archive-o text-muted"></i>',
            'doc': '<i class="fa fa-file-word-o text-primary"></i>',
            'xls': '<i class="fa fa-file-excel-o text-success"></i>',
            'ppt': '<i class="fa fa-file-powerpoint-o text-danger"></i>',
            'pdf': '<i class="fa fa-file-pdf-o text-danger"></i>',
            'zip': '<i class="fa fa-file-archive-o text-muted"></i>',
            'htm': '<i class="fa fa-file-code-o text-info"></i>',
            'txt': '<i class="fa fa-file-text-o text-info"></i>',
            'mov': '<i class="fa fa-file-movie-o text-warning"></i>',
            'mp3': '<i class="fa fa-file-audio-o text-warning"></i>',
            'jpg': '<i class="fa fa-file-photo-o text-danger"></i>',
            'gif': '<i class="fa fa-file-photo-o text-muted"></i>',
            'png': '<i class="fa fa-file-photo-o text-primary"></i>'
        },     //设置预览图标

        browseClass: "btn btn-primary",
        dropZoneEnabled: false,//是否显示拖拽区域
        minImageWidth: 50, //图片的最小宽度
        minImageHeight: 50,//图片的最小高度
        maxImageWidth: 1000,//图片的最大宽度
        maxImageHeight: 1000,//图片的最大高度
        maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
        minFileCount: 0,
        maxFileCount: 10, //表示允许同时上传的最大文件个数
        showAjaxErrorDetails:false,
        fileActionSettings: {
            showUpload: false,
            showZoom: true,
        }

    });
    $("#"+colID).on("fileuploaded",function () {
       jump(3,"上传文件成功","console.html");
    }).on("fileuploaderror",function () {
        jump(3,"上传文件失败","console.html");
    });
}



function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}

/**
 * @author chonepieceyb
 * @returns {boolean}
 * @usuage:上传上传并预览活动logo
 */
function uploadActivityLogo(){
    let file = $(this).get(0).files[0];
    //判断文件类型
    if (!/image\/\w+/.test(file.type)) {
        //图片文件的type值为image/png或image/jpg
        alert("文件必须为图片！");
        return false;
    }
    //判单图片的大小  100KB
    if(file.size>300*1024){
        alert("请选择小于300KB的图片");
        return false;
    }

    var logoSrc=getObjectURL(file);
    console.log(logoSrc);
    $("#activity-logo").attr("src",logoSrc);
}


/**
 * @author chonepieceyb
 * @usage:上传文件模块
 * @param url 上传地址
 */

/**
 * @author:chonepieceyb
 * return : 创建会议成功 true, 创建会议失败 false
 * 功能上传基本信息
 */
function uploadActivityInfo(){

    let form= new FormData();
    let logo = $("#upload-activity-logo")[0].files[0];
    let name= $('#name-input').val();
    let location = $('#location-input').val();
    let organizer =  $('#organizer-input').val();
    let introduction =$('#introduction-input').val();
    let type = $('input[name="activity-type"]:checked').parent('label').text();
    let startTime=$('#start-time-input').val();
    let endTime=$('#end-time-input').val();
    form.append('logo',logo);
    form.append('name',name);
    form.append('start_time',startTime);
    form.append('end_time',endTime);
    form.append('location',location);
    form.append('organizer',organizer);
    form.append('introduction',introduction);
    form.append('type',type);
    $.ajax({
        url:"api/activity/createActivity/",
        data:form,
        type:"POST",
        contentType: false,
        processData: false,
        success:function (data) {

            toastMessage("创建会议成功，开始上传会议文件！");
            $('#upload-file-input').on('filepreupload', function(event,outData, previewId, i) {

                outData.formdata.append('act_uuid',data["uuid"]);
            });
            $('#upload-file-input').fileinput("upload");
            return true;
        },
        error:function () {
            toastMessage("创建会议失败！");
            return false;
        }
    })

}


//浏览器加载时运行
$(function () {

    initFileInput("upload-file-input","api/activity/uploadFile/");

    $("#upload-activity-logo").on('change',uploadActivityLogo);    //上传图片

    //保存按钮(还没有上传文件）
    $("#activity-save-btn").on('click',uploadActivityInfo);
    //取消按钮
    $("#activity-cancel-btn").on('click',function () {
        window.location.href='console.html';
    })

});