
//功能函数
/**
 * @author chonepieceyb
 * @param data:用户信息的json文件
 *             json格式   { avatar:"#", username:"#",gender:"#",email:"#",phone_number:"#",type:"#",
 *             address:"#",company:"#",profession:"#"，
 *             introduction:"#"}
 * @type {{exp: {profession: string, address: string, company: string}, introduction: string, base: {gender: string, avatarlogo: string, phone_number: string, type: string, email: string, username: string}}}
 * 从服务器读取json文件 将其展示到个人中心
 */

function setPersonalInfo(data){
    //生成图像
    var logoSrc=data["avatar"];
    console.log(logoSrc);
    $('#user-logo-info').attr('src',logoSrc);
    //设置基本信息
    $('#username-info').append(data["username"]);
    $('#user-gender-info').append(data["gender"]);
    $('#user-mail-info').append(data["email"]);
    $('#user-telphone-info').append(data["phone_number"]);
    $('#user-type-info').append(data["type"]);
    //设置扩展信息
    $('#user-address-info').append(data["address"]);
    $('#user-company-info').append(data["company"]);
    $('#user-job-info').append(data["profession"]);
    //设置个人简介
    $('#user-introduction-info').append("<p>"+data["introduction"]+"</p>");

    // //设置编辑栏的默认值
    // //设置基本信息
    // $('#username-input').append(data["base"]["username"]);
    // $('#user-gender-input').val(data["base"]["gender"]);
    // $('#user-mail-input').val(data["base"]["email"]);
    // $('#user-telephone-input').val(data["base"]["phone_number"]);
    // $('#user-type-input').append(data["base"]["type"]);
    // //设置扩展信息
    // $('#user-address-input').val(data["exp"]["address"]);
    // $('#user-company-input').val(data["exp"]["company"]);
    // $('#user-job-input').val(data["exp"]["profession"]);
    // //设置个人简介
    // $('#user-introduction-input').val(data["introduction"]);

}

/**
 * @author chonepieceyb
 * @param file 图片
 * @returns {*}本地url 用来实现预览效果
 */
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
 * 功能：选择图片并预览
 */
function uploadLogo(){
    $("#user-logo-input").attr("src",$("#user-logo-info").attr("src"));
    var file=$(this)[0].files[0];
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
    $("#user-logo-input").attr("src",logoSrc);
    $("#user-logo-info-div").hide();
    $("#user-logo-input-div").show();
}

function toastMessage(message) {
    $('#message').text(message);
    $('.toast').toast('show');
}

//浏览器加载时运行 by-chonepieceyb
$(function () {

        $.ajax({
            url:"api/personal_center/showInfo/",
            type:"GET",
            dataType:'json',
            success:function(data){
                setPersonalInfo(data);     //展示个人信息
            },
            error:function () {
                toastMessage("加载个人信息出错");
            }
        });
    $("#base-edit-link").on('click',function () {
        $("#base-info-col").hide();
        $("#base-input-col").show();
        $('#username-input').html($('#username-info').text());
        $('#user-gender-input').val($('#user-gender-info').text());
        $('#user-mail-input').html($('#user-mail-info').text());
        $('#user-telephone-input').val($('#user-telphone-info').text());
        $('#user-type-input').html($('#user-type-info').text());
    });

    $("#ext-edit-link").on('click',function () {
        $("#exp-info-col").hide();
        $("#exp-input-col").show();
        $('#user-address-input').val($('#user-address-info').text());
        $('#user-company-input').val($('#user-company-info').text());
        $('#user-job-input').val($('#user-job-info').text());
    });

    $("#intro-edit-link").on('click',function (){
        $("#intro-info-col").hide();
        $("#intro-input-col").show();
        $('#user-introduction-input').val($('#user-introduction-info').text());
    });

//取消编辑按钮
    $("#logo-cancel-button").on('click',function (){
        $("#user-logo-info-div").show();
        $("#user-logo-input-div").hide();
        $("#upload-logo").val("");
    });
    $("#base-cancel-link").on('click',function () {
        $("#base-info-col").show();
        $("#base-input-col").hide();
    });
    $("#exp-cancel-link").on('click',function () {
        $("#exp-info-col").show();
        $("#exp-input-col").hide();
    });

    $("#intro-cancel-save").on('click',function () {
        $("#intro-info-col").show();
        $("#intro-input-col").hide();
    });
//图片上传
    $('#upload-logo').on('change',uploadLogo);

        //保存模块
    //保存图片
    $('#logo-save-button').on('click',function () {
        let form = new FormData();
        let avatar = $('#upload-logo')[0].files[0];
        let userName=$('#username-info').text();
        form.append('username',userName);
        form.append("avatar",avatar);
        //提交
        $.ajax({
            url:"api/personal_center/editInfo/",
            data:form,
            type:"POST",
            contentType: false,
            processData: false,
            success:function (data) {
                toastMessage("上传头像成功");

                var name = $('#upload-logo')[0].files[0].name;
                var srcImg = $('#user-logo-info-div *img').attr('src');
                srcImg = srcImg.split('/');
                srcImg[2]=name;
                srcImg= srcImg.join('/');
                $('#user-logo-info-div *img').attr('src',srcImg);
                $('#user-logo-info-div').show();
                $('#user-logo-input-div').hide();
            },
            error:function () {
                toastMessage("上传头像失败！");
            }
        })
    });

    //保存基本信息
    $('#base-save-link').on('click',function () {
        let form = new FormData();
        var userName=$('#username-info').text();
        var gender = $('#user-gender-input').val();
        var phoneNumber =$('#user-telephone-input').val()
        form.append('username',userName);
        form.append('gender',gender);
        form.append('phone_number',phoneNumber);
        $.ajax({
            url:"api/personal_center/editInfo/",
            data:form,
            type:"POST",
            contentType: false,
            processData: false,
            success:function (data) {
                //更改 info
                $('#user-telphone-info').text(phoneNumber);
                $('#user-gender-info').text(gender);
                toastMessage("保存基本信息成功");
                $("#base-info-col").show();
                $("#base-input-col").hide();
            },
            error:function () {
                toastMessage("保存基本信息失败！");
            }
        })
    });

    //保存扩展信息
    $('#exp-save-link').on('click',function () {
        let form = new FormData();
        var userName=$('#username-info').text();
        var address = $('#user-address-input').val();
        var company =$('#user-company-input').val();
        var profession = $('#user-job-input').val();
        form.append('username',userName);
        form.append('address',address);
        form.append('company',company);
        form.append("profession",profession);
        $.ajax({
            url:"api/personal_center/editInfo/",
            data:form,
            type:"POST",
            contentType: false,
            processData: false,
            success:function (data) {
                //更改 info
                $('#user-address-info').text(address);
                $('#user-company-info').text(company);
                $('#user-job-info').text(profession);
                toastMessage("保存扩展信息成功");
                $("#exp-info-col").show();
                $("#exp-input-col").hide();
            },
            error:function () {
                toastMessage("保存扩展信息失败！");
            }
        })
    });

    //保存个人简介
    $('#intro-save-link').on('click',function () {
        let form = new FormData();
        var userName=$('#username-info').text();
        var introduction = $('#user-introduction-input').val();
        form.append('username',userName);
        form.append('introduction',introduction);
        $.ajax({
            url:"api/personal_center/editInfo/",
            data:form,
            type:"POST",
            contentType: false,
            processData: false,
            success:function (data) {
                //更改 info
                $('#user-introduction-info').html("<p>"+introduction+"</p>");
                toastMessage("保存个人简介成功");
                $("#intro-info-col").show();
                $("#intro-input-col").hide();
            },
            error:function () {
                toastMessage("保存个人简介失败！");
            }
        })
    })
});
//控制代码
//编辑按钮
// var data={
//     "avatar":"227af7b8-c7fc-11e9-ba32-887873aca633.png",
//     "type":"个人",
//     "email":"bigeras.@tutu.com",
//     "gender":"男",
//     "username":"大耳朵图图",
//     "phone_number":"123123",
//     "address":"翻斗大街翻斗花园二号楼1001室",
//     "profession":"幼儿园小豆班学员",
//     "company":"翻斗幼儿园",
//     "introduction":"我叫胡图图，今年三岁，我的爸爸叫胡英俊，我的妈妈叫张小丽，我家住在翻斗花园二号楼一零零一室，妈妈做的炸小肉丸最好吃。我的猫咪叫小怪。他是一只会说话的猫咪呦，小怪和图图一样是个男孩子，图图最喜欢的好朋友是小美，图图的耳朵很大很神奇，你们看动耳神功。"
// };
