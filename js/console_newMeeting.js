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
    if(file.size>700*1024){
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
    let type = $('input[name="activity-type"]:checked').val();
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
            if(data['status']) {
                toastMessage(data['message']);
                $('#upload-file-input').on('filepreupload', function (event, outData, previewId, i) {

                    outData.formdata.append('act_uuid', data["uuid"]);
                });
                $('#upload-file-input').fileinput("upload");
            }else{
                toastMessage(data['message']);
            }
        },
        error:function () {
            toastMessage("创建会议失败！");
            return false;
        }
    });
}

/**
 * @author chonepieceyb
 * @param act_uuid
 * @param api 保存的api
 * @usage : 编辑保存时候的函数（区别于新建会议）
 */
function uploadSaveChange(act_uuid,api='#',deleteFiles=null){
    let form= new FormData();
    let logo = $("#upload-activity-logo")[0].files[0];
    let name= $('#name-input').val();
    let location = $('#location-input').val();
    let organizer =  $('#organizer-input').val();
    let introduction =$('#introduction-input').val();
    let type = $('input[name="activity-type"]:checked').val();
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
    form.append('act_uuid',act_uuid);
    deleteFiles = JSON.stringify(deleteFiles);
    form.append('delete_files',deleteFiles);
    console.log(deleteFiles);
    $.ajax({
        url:api,
        data:form,
        type:"POST",
        contentType: false,
        processData: false,
        success:function (data) {

            toastMessage(data['message']);
            toastMessage('开始上传活动文件！');
            $('#upload-file-input').on('filepreupload', function(event,outData, previewId, i) {
                outData.formdata.append('act_uuid',act_uuid);
            });
            $('#upload-file-input').fileinput("upload");
            return true;
        },
        error:function () {
            toastMessage("编辑请求提交失败！");
            return false;
        }
    });
}

/**
 * @author chonepieceyb
 * @param status_published  活动发布状态
 * @param status_process    活动进行状态
 * @usage 根据活动的状态将有些输入框disable
 */
function setPageInput(status_published,status_process){
    $('.card-header *h5').text('编辑');
    if(status_published != "unpublished"){
        $('.card').find('input').attr('disabled','disabled')   //禁止所有input框
        $('textarea').attr('disabled','disabled');
    }
    if(status_published == "published"){     //如果是已发布 需要控制权限
        if(status_process=='not_start'){    //只能编辑未开始活动
            //移除可编辑选项的input
            $('#start-time-input').removeAttr('disabled');
            $('#end-time-input').removeAttr('disabled');
            $('#location-input').removeAttr('disabled');
            $('#introduction-input').removeAttr('disabled');
            $('#upload-file-input').removeAttr('disabled');
        }else{
            $('#upload-file-input').removeAttr('disabled');   //只能上传文件
        }
    }
}

/**
 * @author choenpeiceyb
 * @param className  内容发生变化时,添加的类名
 * @param data, 原始数据
 * usage:监听输入框，当输入框内容生变化时和原始内容比较，如果和原始内容不同，添加className 否则移除className
 */
function monittorInput(className,data){
    //监听文本框
    var myDict={      //字典，定义映射关系，方便查数据
        'name-input':'name',
        'upload-activity-logo':'logo',
        'start-time-input':'start_time',
        'end-time-input':'end_time',
        'location-input' :'location',
        'organizer-input':'organizer',
        'introduction-input' :'introduction',
        'radio':'type'
    };
    //监听文本框
    $('input[type="text"]').on('blur',function () {
        if($(this).val()!=data[myDict[$(this).attr('id')]]){
            $(this).addClass(className);
        }else{
            $(this).removeClass(className);
        }
    });
    //监听头像上传
    $('#upload-activity-logo').on('change',function () {
        $(this).addClass(className);
    });
    //监听 单选框
    $('input[type="radio"]').on('change',function () {
        $('.radio-inline').removeClass(className);
        if ($(this).val()!=data['type']) {
            $(this).parent('label').addClass(className);
        }
    });
    //监听简介框
    $('#introduction-input').on('blur',function () {
        console.log('进入个人简介模块');
        console.log($(this).val());
        console.log(myDict[$(this).attr('id')]);
        console.log(data[myDict[$(this).attr('id')]]);
        if($(this).val()!=data[myDict[$(this).attr('id')]]){
            $(this).addClass(className);
        }else{
            $(this).removeClass(className);
        }
    });
    //监听日期框框
    $('#start-time-input').on('change',function () {
        if($(this).val()!=data['start_time'].replace(' ','T')){
            $(this).addClass(className);
        }else{
            $(this).removeClass(className);
        }
    })
    $('#end-time-input').on('change',function () {
        if($(this).val()!=data['end_time'].replace(' ','T')){
            $(this).addClass(className);
        }else{
            $(this).removeClass(className);
        }
    })
}
/**
 * @author chonepieceyb
 * @param data 从服务器获取的数据
 * @usage : 遍及页面将原来的值作为预设值
 */
function setPageInfo(data){
    //可识别的扩展名列表
    extIcons={
        "docx":"icon_doc.gif",
        "doc":"icon_doc.gif",
        "xls":"icon_xls.gif",
        "xlsx":"icon_xls.gif",
        "txt" :"icon_txt.gif",
        "png":"icon_img.gif",
        "jpg":"icon_img.gif",
        "jpeg":"icon_img.gif",
        "gif":"icon_img.gif",
        "zip":"icon_rar.gif",
        "rar":"icon_rar.gif",
        "7z":"icon_rar.gif",
        "pdf":"icon_pdf.gif",
        "unknown":"icon_txt.gif"
    };

    $('#activity-logo').attr('src',data["logo"]);
    $('#name-input').val(data['name']);
    //$('#name-input').data("name",data['name']);

    startTime = data['start_time'].replace(' ','T');
    $('#start-time-input').val(startTime);
   // $('#start-time-input').data('startTime',data['start_time']);

    endTime = data['end_time'].replace(' ','T');
    $('#end-time-input').val(endTime);
   // $('#end-time-input').data('endTime',data['end_time']);

    $('#location-input').val(data['location']);
   // $('#location-input').data('location',data['location']);

    $('#organizer-input').val(data['organizer']);
   // $('#organizer-input').data('organizer',data['organizer']);

    $('#introduction-input').val(data['introduction']);
   // $('#introduction-input').data('introduction',data['introduction']);

    $("input[name='activity-type']").each(function (index,element) {
        //($(this).data('type',data['type']));
        if($(this).val()==data['type']){
                $(this).attr('checked',true);
        }
    });
    //添加删除文件列表
    var $filesDiv=$(' <div class="form-group row" id="uploaded-files-div">\n' +
        '                                <label class="col-2 control-label inputLabel" >已上传资料:</label>\n' +
        '                                <div class="col-10" >\n' +
        '                                </div>\n' +
        '                            </div>');
    //循环添加文件列表
    //生成文件下载列表
    var $fileTable = $('<table class="table table-hover"><tbody></tbody></table>');
    $filesDiv.children('div').append($fileTable);
    for(index in data["files"]){
        var $fileRow=$('<tr></tr>');
        var item=data["files"][index];
        var name = item["fileName"];
        var ext = name.split(".")[1];
        iconSrc=extIcons["unknown"];
        if(ext in extIcons) {
            iconSrc=extIcons[ext];
        }
        iconSrc = "images/icons/" + iconSrc;
        html='<img src="'+iconSrc+'" >'+'<a href="'+item["fileSrc"]+item['fileName']+'">'+item["fileName"]+'</a>';
        $fileRow.append('<td>'+html+'</td>');
        //添加删除按钮
        var $deleteLink = $('<a style="margin-left:10px; color:white; hight:15px;width:50px;padding:1px" class="btn btn-danger delete-file-link">删除</a>');
        $deleteLink.attr('id',name + '-delete-'+index);
        $fileRow.append($('<td></td>').append($deleteLink));
        $filesDiv.find('tbody').append($fileRow);
        //$filesDiv.children('div').append("</br>")

    }
    $('#uplodeFileGroup').before($filesDiv);
}

//浏览器加载时运行
$(function () {
    //给必选的元素前添加星号
    $('.required').prepend('<span style="color:red">*</span>');

    initFileInput("upload-file-input","api/activity/uploadFile/");

    $("#upload-activity-logo").on('change',uploadActivityLogo);    //上传图片

    var id = getParameter()["id"];    //获取uuid
    if(id){                          //如果是编辑按钮
        //向服务器请求数据
        $.ajax({
            url:"api/activity/showActivity/",
            data:{uuid:id},
            type:"GET",
            dataType:'json',
            success:function (data) {
                toastMessage("获取会议信息成功！");
                setPageInfo(data);
                setPageInput(data['status_publish'],data['status_process']);
                monittorInput('input-change',data);
                var deleteFiles=[];
                //获取已删除文件列表
                $('.delete-file-link').on('click',function () {
                    deleteFiles.push($(this).parent().prev().children('a').text());
                    $(this).parent().parent('tr').remove();
                    console.log(deleteFiles);
                })
                $("#activity-save-btn").on('click',function () {
                    if(checkRequired('required-input')) {
                        uploadSaveChange(id, 'api/activity/editActivity/', deleteFiles);
                    }else{
                        toastMessage('请填写所有必填内容！');
                    }
                });
            },
            error:function () {
                toastMessage("获取会议信息失败！");
            }
        })
    }else{
        //保存按钮(还没有上传文件）
        $("#activity-save-btn").on('click',function () {
            if(checkRequired('required-input')){
                uploadActivityInfo();
            }else{
                toastMessage('请填写所有必填内容！');
            }
        });
    }

    //取消按钮
    $("#activity-cancel-btn").on('click',function () {
        window.location.href='console.html';
    })

});