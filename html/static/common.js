 var w = $(window).width() / 640 * 100;
var w0 = $(window).width() / 640;
document.getElementsByTagName('html')[0].style.fontSize = w + "px"
var Boss = 'http://boss-macaucf-beta.leanapp.cn/api/v1/' //测试
var Boss2 = 'http://boss-macaucf-beta.leanapp.cn/' //测试
var Boss3 = 'http://boss-macaucf-beta.leanapp.cn/api/v1/' //测试接口
var limit20 = 20
var data_jj = 1.03
var H = 0     




         
			//2.js调用ios原生的方法
			function setupWebViewJavascriptBridge(callback) {
				if(window.WebViewJavascriptBridge){
					return callback(WebViewJavascriptBridge);
				}
				if(window.WVJBCallbacks){
					return window.WVJBCallbacks.push(callback);
				}
				window.WVJBCallbacks = [callback];
				var WVJBIframe = document.createElement('iframe');
				WVJBIframe.style.display = 'none';
				WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
				document.documentElement.appendChild(WVJBIframe);
				setTimeout(function() {
					document.documentElement.removeChild(WVJBIframe)
				}, 0)
			}

			setupWebViewJavascriptBridge(function(bridge) {
				// 这里注册Native 要调用的js 功能。 ios的方法名字ios_test
				bridge.registerHandler('ios_test', function(data, responseCallback) {
					alert('JS方法被调用:' + data);
					responseCallback('js执行过了');
				})
				// 如果要有其他Native 调用的js 功能，在这里按照上面的格式添加。
				// 这里注册Native 要调用的js 功能。 ios的方法名字ios_test
				bridge.registerHandler('gotoChat', function(data, responseCallback) {
					alert('JS方法被调用:' + data);
					responseCallback('js执行过了');
				})
			})

			

            // 去了详情调用把方法给ios的检举
			function data_all() {
				
				var wheres=(locations('name')=='zusou'?'agent':'article')
				var objectId=locations('objectId')
				console.log(objectId)
				var bb={'objectId':objectId,'wheres':wheres}
				return bb
			};


  // 是否显示检举
  function isyulan(data){
            return data
  }

             //返回
			function goback(data) {
				var ua = navigator.userAgent.toLowerCase();
		    if (ua.match(/iPhone\sOS/i) == "iphone os") {
		    	// 苹果
					 console.log('苹果')
					WebViewJavascriptBridge.callHandler('goback', {pageNumber: data.toString(),needRefresh: 'YES'})
		    }else{
		    	// 安卓
                   console.log('安卓')
	               window.mianyong.goBack(data);  
		    }
				
			};




			// 聊天
			function gotoChat(data) {
						// 判斷機型, android / ios
		    var ua = navigator.userAgent.toLowerCase();
		    if (ua.match(/iPhone\sOS/i) == "iphone os") {
		    	// 苹果
					console.log('苹果')
					WebViewJavascriptBridge.callHandler('gotoChat',data, function(response) {
						document.getElementById("returnValue").value = response;
					});
		    }else{
		    	// 安卓
                   console.log('安卓')
	               window.mianyong.gotoChat(JSON.stringify(data));  
		    }    
			};

           function tixing() {
           	mui.confirm('離開本頁面將清空當前頁面的內容，確定離開？','title',['離開','取消'],function(data){
  			console.log(data)
  			if(data.index==0){
  				// if()
			    // localStorage.removeItem('huancun');
			    //  localStorage.removeItem('pics');
			      WebViewJavascriptBridge.callHandler('ClearData', {content_key: 'huancun'})
                  WebViewJavascriptBridge.callHandler('ClearData', {content_key: 'xiangqingData'})
                  WebViewJavascriptBridge.callHandler('ClearData', {content_key: 'xiaolin'})
                  // app的返回
			    goback(1)
  			}
  		},'div')
           };


            // 所有页面进来的时候手机都请求
            console.log('gerenxx')
			function information(objectId) {
				  console.log('个人信息'+objectId)
				  if(objectId){
				  	window.localStorage.setItem('userId',objectId)
				  	console.log(window.localStorage.getItem('userId'))
				  }
			}


//1.base64转文件对象
function commonFiles(files,formData,items){
                       for (var i = 0; i < files.length; i++) {
                       //base64转换为blob对象
                        var text = window.atob(files[i] .split(",")[1]);
                        var buffer = new ArrayBuffer(text.length);
                        var ubuffer = new Uint8Array(buffer);
                        var pecent = 0 , loop = null;

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
                            blob = new window.Blob([buffer], {type : 'image/png'});
                        }
                        //循环项目名称，依次添加项目
                            formData.append(items,blob);//依次添加的项目名称                 
                   
                    }           
}


// 2.解决地址栏传参和读取参数
function locations(name, url){
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

var sessiontoken=locations('sessiontoken')
// 检测用户是否可发布
function checker(who,callback) {
	// 检测点，posts = 帖，agents = 楼盘
	$.get(Boss3+'user/posts/checker',{'sessiontoken':sessiontoken,'point':who},function(data) {
		callback(data)
	})
}


// setInterval(function() {
// 	console.log(locations('sessiontoken'))
// 	 // console.log('个人信息')
// },10000)


//   	//返回的时候提示将清空我要发布模块的发布数据
// function qingkong(){
//   		mui.confirm('離開本頁面將清空當前頁面的內容，確定離開？','title',['離開','取消'],function(data){
//   			console.log(data)
//   			if(data.index==0){
//   				//清空我要发布模块发布的字段缓存，并通知手机返回
			   
  				
  				
//   			}else{
//                 // 留在当前页面，不通知手机返回
//   			}
//   		},'div')
  		
//   	}