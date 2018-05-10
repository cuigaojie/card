/**
 * Created by ZL on 2017/3/23.
 */



//1. 获取屏幕像素比值    1/像素比值   1/2=0.5

var num = 1/window.devicePixelRatio;

//2. 根据像素比值动态生成视口标签设置最佳视口大小
document.write('<meta name="viewport" content="width=device-width, user-scalable=0, initial-scale='+num+', maximum-scale='+num+', minimum-scale='+num+'" />');

//3.获取屏幕的十分之的宽

var fontSize = document.documentElement.clientWidth/10;

//4. 通过取巧的方式将页面的1%大小设置为html的字号

document.getElementsByTagName('html')[0].style.fontSize = fontSize+'px';

//获取url中的参数
//通过这个函数传递url中的参数名就可以获取到参数的值，
/*
http://localhost:33064/WebForm2.aspx?reurl=WebForm1.aspx
 var xx = getUrlParam('reurl');
 */
function getUrl(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数  match() 检查一个字符串是否匹配一个正则表达式。
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}

// url  的公共部分

// var ulr_common = 'http://192.168.0.196/credit/index.php/';

var ulr_common = 'http://huxin.yulengzhileng.com/index.php/';


/*返回*/
$('.back').click(function(){
    window.history.back()
});

// 获取token
var token = getUrl('token');
console.log(token);

// 获取url 参数  判断是否是 分享进来的
var from = getUrl('from');

//singlemessage 好友        groupmessage 群    timeline 朋友圈

/*if(from == 'singlemessage' || from == 'groupmessage' || from == 'timeline'){
    if(token != ''){  // 登录 时  的  分享
        console.log(from +'12');
        $.ajax({
            type:"post",
            data:{
                token:token
            },
            url: ulr_common+"water/qr_codepic",
            dataType:"json",
            success:function (data) {

                console.log(data);
              window.location.href =  data.body.qr_url
            }
        })

    }else{ // 没有 登录 的 分享
        //window.location.href = 'register.html'
    }

}*/

//跳出微信内置浏览器
    function onBridgeReady() {
        WeixinJSBridge.on('menu:share:appmessage', function(argv)
        {
            WeixinJSBridge.invoke('sendAppMessage',{
                "link":"http://m.exmail.qq.com/",
                "desc":"desc",
                "title":"title for WeiXinJsBridge"
            }, function(res) {
                WeixinJSBridge.log(res.err_msg);
            });
        });
        WeixinJSBridge.on('menu:share:timeline', function(argv)
        {
            WeixinJSBridge.invoke("shareTimeline",{
                    "link":"http://m.exmail.qq.com",
                    "img_url":"http://rescdn.qqmail.com/bizmail/zh_CN/htmledition/images/bizmail/v3/logo1ca3fe.png",
                    "img_width":"172",
                    "img_height":"40",
                    "desc":"i am description",
                    "title":"just test from WeixinJsBridge"
                },
                function(e){
                    alert(e.err_msg);
                })
        });
    }

    if (typeof WeixinJSBridge === "undefined"){
        if (document.addEventListener){
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        }
    }else{
        onBridgeReady();
    }
    
//用户个人中心   
var nickname ='' ; // 昵称
var header_pic ='' ; // 头像

$('.bottom li').eq(0).click(function(){
    window.location.href = 'index.html?token='+token;
});
$('.bottom li').eq(1).click(function(){ // 分类
    window.location.href = 'card_god.html?token='+token ;
});
$('.bottom li').eq(2).click(function(){ // 车险
    window.location.href = 'safe.html?token='+token ;
});
$('.bottom li').eq(3).click(function(){ // 车险
    window.location.href = 'My.html?token='+token ;
});
$(".flow_buy li:odd").attr('data_type','odd');
$(".flow_buy li:even").attr('data_type','even');



