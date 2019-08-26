
//功能函数
/**
 * @author chonepieceyb
 * @param data:用户信息的json文件
 *             json格式   { base:{ avatarlogo:"#", username:"#",gender:"#",email:"#",phone_number:"#",type:"#"},
 *             exp:{address:"#",company:"#",profession:"#"}
 *             introduction:"#"}
 * @type {{exp: {profession: string, address: string, company: string}, introduction: string, base: {gender: string, avatarlogo: string, phone_number: string, type: string, email: string, username: string}}}
 * 从服务器读取json文件 将其展示到个人中心
 */

function setPersonalInfo(data){
    //设置基本信息
    $('#username-info').append(data["base"]["username"]);
    $('#user-gender-info').append(data["base"]["gender"]);
    $('#user-mail-info').append(data["base"]["email"]);
    $('#user-telphone-info').append(data["base"]["phone_number"]);
    $('#user-type-info').append(data["base"]["type"]);
    //设置扩展信息
    $('#user-address-info').append(data["exp"]["address"]);
    $('#user-company-info').append(data["exp"]["company"]);
    $('#user-job-info').append(data["exp"]["profession"]);
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





//控制代码
//编辑按钮
$("#base-edit-link").on('click',function () {
    $("#base-info-col").hide();
    $("#base-input-col").show();
    $('#username-input').html($('#username-info').text());
    $('#user-gender-input').val($('#user-gender-info').text());
    $('#user-mail-input').val($('#user-mail-info').text());
    $('#user-telephone-input').val($('#user-telphone-info').text());
    $('#user-type-input').html($('#user-type-info').text());
})

$("#ext-edit-link").on('click',function () {
    $("#exp-info-col").hide();
    $("#exp-input-col").show();
    $('#user-address-input').val($('#user-address-info').text());
    $('#user-company-input').val($('#user-company-info').text());
    $('#user-job-input').val($('#user-job-info').text());
})

$("#intro-edit-link").on('click',function (){
    $("#intro-info-col").hide();
    $("#intro-input-col").show();
    $('#user-introduction-input').val($('#user-introduction-info').text());
})

//取消编辑按钮
$("#base-cancel-link").on('click',function () {
    $("#base-info-col").show();
    $("#base-input-col").hide();
})

$("#exp-cancel-link").on('click',function () {
    $("#exp-info-col").show();
    $("#exp-input-col").hide();
})

$("#intro-cancel-save").on('click',function () {
    $("#intro-info-col").show();
    $("#intro-input-col").hide();
})


//测试代码
  var data={
    base:{"avatarlogo":"https://y4ngyy.xyz/assets/avatar.jpg",
        "type":"个人",
        "email":"bigeras.@tutu.com",
        "gender":"男",
        "username":"大耳朵图图",
        "phone_number":"123123"},
      exp:{
        "address":"翻斗大街翻斗花园二号楼1001室",
          "profession":"幼儿园小豆班学员",
          "company":"翻斗幼儿园"
      },
      "introduction":"我叫胡图图，今年三岁，我的爸爸叫胡英俊，我的妈妈叫张小丽，我家住在翻斗花园二号楼一零零一室，妈妈做的炸小肉丸最好吃。我的猫咪叫小怪。他是一只会说话的猫咪呦，小怪和图图一样是个男孩子，图图最喜欢的好朋友是小美，图图的耳朵很大很神奇，你们看动耳神功。"
    };
setPersonalInfo(data);