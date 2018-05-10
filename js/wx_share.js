/**
 * Created by Administrator on 2017/12/12.
 */



//document.write('<script src="layerMobile/layer.js"><\/script>')  // js中调用js

$(function(){
    var url2= location.href.split('#')[0];


    var url3 = encodeURIComponent(url2);
   // console.log(url2);
    //console.log(url3);

    $.ajax({
        type:'get',
        url: ulr_common+'mobile/Wx/Wx',
        dataType:'json',
        data:{
            url: url3
        },
        success:function (data) {
            //console.log(data);
            //alert(data.body.url)
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。

                appId: data.body.appId , // 必填，公众号的唯一标识

                timestamp:data.body.timestamp  , // 必填，生成签名的时间戳

                nonceStr: data.body.nonceStr , // 必填，生成签名的随机串

                signature:data.body.signature ,// 必填，签名，见附录1

                jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","chooseWXPay","openLocation","getLocation"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2

            });
        },
        error:function (errordata) {
            //alert('请求出错222');
        }
    });

});

// 获取token
var token = getUrl('token');
//alert(token+'222');

wx.ready(function(){
    var title = '51互信管家' ;
    //alert(exten_code+'握手伏击推荐吗')
    var kk =   token ;
    //alert('kk='+kk);

    //分享朋友圈
    wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: 'http://huxin.yulengzhileng.com/card/share.html?p_token='+kk+'&bankid=1&diff=1', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
           imgUrl:'http://huxin.yulengzhileng.com/uploads/logo.jpg', // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            /*   layer.open({
             content: '分享成功'
             ,skin: 'msg'
             ,time: 1//2秒后自动关闭
             })*/
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            layer.open({
                content: '分享取消'
                ,skin: 'msg'
                ,time: 1//2秒后自动关闭
            })
        }
    });

    wx.onMenuShareAppMessage({ //分享朋友

        title: title, // 分享标题

        desc: '【51互信管家】邀请您共享各大银行信用卡核卡佣金！', // 分享描述

        link:  'http://huxin.yulengzhileng.com/card/share.html?p_token='+kk+'&bankid=1&diff=1',  // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

          imgUrl: 'http://huxin.yulengzhileng.com/uploads/logo.jpg', // 分享图标

        type: '', // 分享类型,music、video或link，不填默认为link

        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
            /* layer.open({0p
             content: '分享成功',skin: 'msg',time: 1 //2秒后自动关闭
             })*/

        },

        cancel: function () {

            // 用户取消分享后执行的回调函数
            layer.open({
                content: '分享失败',skin: 'msg',time: 1//2秒后自动关闭
            })

        }

    });

});