 var w = $(window).width() / 640 * 100;
 var w0 = $(window).width() / 640;
 document.getElementsByTagName('html')[0].style.fontSize = w + "px"
 var Boss = 'http://boss-macaucf-beta.leanapp.cn/api/v1/' //测试
 var Boss2 = 'http://boss-macaucf-beta.leanapp.cn/' //测试
 var Boss3 = 'http://boss-macaucf-beta.leanapp.cn/api/v1/' //测试接口
 // 初始化刷新和加载插件的全局变量
 var mescroll;

 var limit20 = 20;

 //  计算器页面的变量
 var data_jj = 1.03;
 var H = 0;
 var httplu = 'http://stg-static-macaucf.leanapp.cn/html/yemian/';
 var httproot = 'http://stg-static-macaucf.leanapp.cn/html/';

 console.log('common.js common.js common.js common.js')

 //2.js调用ios原生的方法
 function setupWebViewJavascriptBridge(callback) {
   if (window.WebViewJavascriptBridge) {
     return callback(WebViewJavascriptBridge);
   }
   if (window.WVJBCallbacks) {
     return window.WVJBCallbacks.push(callback);
   }
   window.WVJBCallbacks = [callback];
   var WVJBIframe = document.createElement('iframe');
   WVJBIframe.style.display = 'none';
   WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
   document.documentElement.appendChild(WVJBIframe);
   setTimeout(function () {
     document.documentElement.removeChild(WVJBIframe)
   }, 0)
 }

 setupWebViewJavascriptBridge(function (bridge) {
   // 这里注册Native 要调用的js 功能。 ios的方法名字ios_test
   bridge.registerHandler('ios_test', function (data, responseCallback) {
     alert('JS方法被调用:' + data);
     responseCallback('js执行过了');
   })
   // 如果要有其他Native 调用的js 功能，在这里按照上面的格式添加。
   // 这里注册Native 要调用的js 功能。 ios的方法名字ios_test
   bridge.registerHandler('gotoChat', function (data, responseCallback) {
     alert('JS方法被调用:' + data);
     responseCallback('js执行过了');
   })
 })



 // 去了详情调用把方法给ios的检举
 function data_all() {

   var wheres = (locations('name') == 'zusou' ? 'agent' : 'article')
   var objectId = locations('objectId')
   console.log(objectId)
   var bb = {
     'objectId': objectId,
     'wheres': wheres
   }
   return bb
 };


 // 是否显示检举
 function isyulan(data) {
   return data
 }

 //返回
 function goback(data) {
   //  console.log(data)
   var ua = navigator.userAgent.toLowerCase();
   if (ua.match(/iPhone\sOS/i) == "iphone os") {
     // 苹果
     console.log('苹果')
     WebViewJavascriptBridge.callHandler('goback', {
       pageNumber: data.toString(),
       needRefresh: 'YES'
     })
   } else {
     // 安卓
     console.log('安卓(1代刷新 -1代表不刷新)')
     //  window.mianyong.goBack(data);
     // 1代刷新 -1代表不刷新
     window.callHandler.goBack(data, 1);

   }

 };




 // 聊天
 function gotoChat(data) {
   // 判斷機型, android / ios
   var ua = navigator.userAgent.toLowerCase();
   if (ua.match(/iPhone\sOS/i) == "iphone os") {
     // 苹果
     console.log('苹果')
     WebViewJavascriptBridge.callHandler('gotoChat', data, function (response) {
       document.getElementById("returnValue").value = response;
     });
   } else {
     // 安卓1
     console.log('安卓')
     window.callHandler.gotoChat(JSON.stringify(data));
   }
 };

 //  返回的提示框
 function tixing() {
   console.log("mui")
// 针对安卓的,因为安卓所有发布页面的返回都调用了这个
  //  try {
  //    //在这里运行代码
  //    if (mui == false) {
  //     goback(1)
  //      return
  //    }
  //  } catch (err) {
  //    //在这里处理错误
  //    goback(1)
  //    return
  //  }
   //  var countconfirm = 0; 
   mui.confirm('離開本頁面將清空當前頁面的內容，確定離開？', 'title', ['離開', '取消'], function (data) {
     console.log("data")
     console.log(data)
     console.log('提醒框')
     //  return
     if (data.index == 0) {
       console.log('离开')
       // if (data.index == 0&&countconfirm == 0) {
       //  countconfirm ++;
       var ua = navigator.userAgent.toLowerCase();
       if (ua.match(/iPhone\sOS/i) == "iphone os") {
         // 苹果清缓存
         console.log('苹果')
         WebViewJavascriptBridge.callHandler('ClearData', {
           content_key: 'huancun'
         })
         WebViewJavascriptBridge.callHandler('ClearData', {
           content_key: 'xiangqingData'
         })
         WebViewJavascriptBridge.callHandler('ClearData', {
           content_key: 'xiaolin'
         })
       } else {
         // 安卓清缓存
         console.log('安卓')
         window.callHandler.cleardata('huancun')
         window.callHandler.cleardata('xiaolin')
         window.callHandler.cleardata('xiangqingData')
       }

       // app的返回
       goback(1)

     } else {
       console.log('留下')
     }
     //  mui.close(data)
   }, 'div')

 };


 // 所有页面进来的时候手机都请求
 function information(objectId) {
   console.log('个人信息的objectId:::' + objectId)
   if (objectId) {
     window.localStorage.setItem('userId', objectId)
     //  console.log(window.localStorage.getItem('userId'))
   }
 }


 //1.base64转文件对象
 function commonFiles(files, formData, items) {
   for (var i = 0; i < files.length; i++) {
     //base64转换为blob对象
     console.log('files[i]')
     console.log(files[i])
     console.log(files.length)
     var text = window.atob(files[i].split(",")[1]);
     var buffer = new ArrayBuffer(text.length);
     var ubuffer = new Uint8Array(buffer);
     var pecent = 0,
       loop = null;

     for (var n = 0; n < text.length; n++) {
       ubuffer[n] = text.charCodeAt(n);
     }
     var Builder = window.WebKitBlobBuilder || window.MozBlobBuilder;
     var blob;
     if (Builder) {
       var builder = new Builder();
       builder.append(buffer);
       blob = builder.getBlob(type);
     } else {
       blob = new window.Blob([buffer], {
         type: 'image/png'
       });
     }
     //循环项目名称，依次添加项目
     formData.append(items, blob); //依次添加的项目名称 
     console.log('转完文件对象后提交到后台的文件大小')
     console.log(blob)

   }
 }


 // 2.解决地址栏传参和读取参数
 function locations(name, url) {
   if (!url) {
     url = window.location.href;
     console.log(url)
   }
   name = name.replace(/[\[\]]/g, "\\$&");
   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
     results = regex.exec(url);
   if (!results) return null;
   if (!results[2]) return '';
   return decodeURIComponent(results[2].replace(/\+/g, " "));
 }


//  setInterval(function () {
//    console.log('每个页面都要获取地址栏的sessiontoken:::')
//    console.log(location.href)
//    //  	 // console.log('个人信息')
//  }, 10000)


 var sessiontoken = locations('sessiontoken')
 console.log('第一次进来的时候是否有sessiontoken' + sessiontoken)

 // 检测用户是否可发布
 function checker(who, callback) {
   // 检测点，posts = 帖，agents = 楼盘
   $.get(Boss3 + 'user/posts/checker', {
     'sessiontoken': sessiontoken,
     'point': who
   }, function (data) {
     callback(data)
   })
 }






 // // 查看个人资料
 function users() {
   var id = localStorage.getItem('userId')
   if (id) {
     $.get(Boss + 'user/' + id, function (data, status) {
       if (data.status == true) {
         console.log('查看了个人资料赋值给了电话及在线咨询')
         console.log(data.result)
         vm.rentobject.phone = data.result.phone
         vm.rentobject.contacts = data.result.displayname
         vm.rentobject.call = data.result.call
         initdata()
       } else {
         initdata()
       }
     })
   }

 }



 function getBase64(img, lengths, i, data) {
   // var that = this
   //传入图片路径，返回base64
   function getBase64Image(img, width, height) { //width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
     var canvas = document.createElement("canvas");
     canvas.width = width ? width : img.width;
     canvas.height = height ? height : img.height;

     var ctx = canvas.getContext("2d");
     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
     var dataURL = canvas.toDataURL();

     // 
     console.log('转换为base64')
     vm.xiaolin.push(dataURL)
     // console.log(that.xiaolin)

     if (i == lengths - 1) {
       var space1
       if (data.space) {
         for (var ii = 0; ii < data.space.length; ii++) {
           if (isNaN(data.space[ii])) {
             // console.log(data.space[i])
           } else {
             if (ii == 0) {
               space1 = '房間:' + data.space[ii]
             }
             if (ii == 2) {
               space1 = space1 + ',客廳:' + data.space[ii]
             }
             if (ii == 4) {
               space1 = space1 + ',洗手間:' + data.space[ii]
             }
           }
         }
       } else {
         space1 = '房間:1,客廳:0,洗手間:0'
       };
       // console.log(space1)
       var feature1
       if (data.features && data.features.length == 0) {
         feature1 = ''
       } else {
         feature1 = JSON.stringify(data.features).replace(/,/g, '、').replace('[', '').replace(']', '').replace(/"/g, '')
       }
       var infrastructure1
       if (data.infrastructure && data.infrastructure.length == 0) {
         infrastructure1 = ''
       } else {
         infrastructure1 = JSON.stringify(data.infrastructure).replace(/,/g, '、').replace('[', '').replace(']', '').replace(/"/g, '')
       }
       var home1
       if (data.home_infrastructure) {
         home1 = data.home_infrastructure.replace(/,/g, '、')
       } else {
         home1 = ''
       }

       var location1
       if (data.location_infrastructure) {
         location1 = data.location_infrastructure.replace(/,/g, '、')

       } else {
         location1 = ''
       }
       var saveObject = {
         objectId: data.objectId,
         category: data.category,
         type: data.type,
         build_name: data.build_name,
         build_area: data.build_area,
         build_street: data.build_street,
         rent_type: data.rent_type,
         build_status: data.build_status,
         shop_type: data.shop_type,
         pics: vm.xiaolin,
         price: data.price,
         space: space1,
         area: data.area,
         useable_area: data.useable_area,
         floor: data.floor,
         code: data.code,
         direct: data.direct,
         landscape: data.landscape,
         decoration: data.decoration,
         cook: data.cook,
         pet: data.pet,
         start_time: data.start_time,
         infrastructure: infrastructure1,
         features: feature1,
         home_infrastructure: home1,
         location_infrastructure: location1,
         contactType: data.contactType,
         contacts: data.contacts,
         phone: data.phone,
         call: data.call,
         remark: data.remark,
         from: data.from
       };
       console.log(space1)
       console.log(saveObject)
       vm.rentobject = saveObject
       if (!vm.rentobject.call && !vm.rentobject.contacts && !vm.rentobject.phone) {
         console.log('电话及在线咨询同时无')
         users() //在users里面调用initdata
       } else {
         console.log('电话及在线咨询同时有')
         initdata()

       }
     }



   }
   var image = new Image();
   image.crossOrigin = '';
   image.src = img;
   var deferred = $.Deferred();
   if (img) {
     image.onload = function () {
       deferred.resolve(getBase64Image(image)); //将base64传给done上传处理
     }
     return deferred.promise(); //问题要让onload完成后再return sessionStorage['imgTest']
   }


 }


 // 根据id查看详细内容赋值给放租和放售的发布页面xiaolin
 function xiangqing() {
   $.get(Boss + 'agent/' + locations('objectId'), function (data) {
     if (data.status == true) {
       console.log(data.result)
       // return
       for (var i = 0; i < data.result.pics.length; i++) {
         getBase64(data.result.pics[i].url, data.result.pics.length, i, data.result)
       }
     } else {
       mui.toast(data.result.message)
     }
   })
 }




 // 我要放租和我要放售的xiaolin的数据存储和清空
 function setDataxiaolin(rentobjects) {
   var ua = navigator.userAgent.toLowerCase();
   if (ua.match(/iPhone\sOS/i) == "iphone os") {
     console.log('苹果')
     WebViewJavascriptBridge.callHandler('SetData', {
       content_key: 'xiaolin',
       content: JSON.stringify(rentobjects)
     });
   } else {
     console.log('安卓')
     window.callHandler.saveResult('xiaolin', JSON.stringify(rentobjects));
   }
 }

 // app保存8大模块发布的数据
 function setDatahuancun(rentobjects) {
   var ua = navigator.userAgent.toLowerCase();
   if (ua.match(/iPhone\sOS/i) == "iphone os") {
     console.log('苹果')
     WebViewJavascriptBridge.callHandler('SetData', {
       content_key: 'huancun',
       content: JSON.stringify(rentobjects)
     });
   } else {
     console.log('安卓')
     window.callHandler.saveResult('huancun', JSON.stringify(rentobjects));
   }
 }


 // app保存详情数据
 function setDataxiangqing(rentobjects) {
   var ua = navigator.userAgent.toLowerCase();
   if (ua.match(/iPhone\sOS/i) == "iphone os") {
     console.log('苹果')
     WebViewJavascriptBridge.callHandler('SetData', {
       content_key: 'xiangqingData',
       content: JSON.stringify(rentobjects)
     });
   } else {
     console.log('安卓')
     window.callHandler.saveResult('xiangqingData', JSON.stringify(rentobjects));
   }
 }


 // 清空APP的数据
 function cleardata(who) {
   var ua = navigator.userAgent.toLowerCase();
   if (ua.match(/iPhone\sOS/i) == "iphone os") {
     console.log('苹果')
     WebViewJavascriptBridge.callHandler('ClearData', {
       content_key: who
     })
   } else {
     console.log('安卓')
     window.callHandler.cleardata(who)
   }

 }