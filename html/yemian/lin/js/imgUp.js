// 图片压缩代码区域
  //    用于压缩图片的canvas
  console.log('引用了imgup.js')
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext('2d');
  //    瓦片canvas
  var tCanvas = document.createElement("canvas");
  var tctx = tCanvas.getContext("2d");
  var maxsize = 100 * 1024;
// 图片压缩代码区域
$(function(){
	var delParent;
	var defaults = {
		fileType         : ["jpg","png","PNG","JPG","bmp","BMP","jpeg","JPEG"],   // 上传文件的类型
		fileSize         : 1024 * 1024 * 10                  // 上传文件的大小 10M
  };
  

		/*点击图片的文本框*/
	$(document).on('change','#input',function(){
        console.log('1.files点击了图片上传框,粗发了事件')
       getTimes()
    var orientation = 0;
		var idFile = $(this).attr("id");
		var file = document.getElementById("input");
    var imgContainer = $(this).parents().parents(".ul"); //存放图片的父亲元素
		var fileList = file.files; //获取的图片文件
		var input = $(this).parent();//文本框的父亲元素
		var imgArr = [];
	 //遍历得到的图片文件
   var numUp = imgContainer.find(".alltu").length;//之前上传的存在页面上的
   var totalNum = numUp + fileList.length;  //总的数量=之前上传的+现在上传的      
       if(locations('where')){
 // 不能超过9张图片
         var maxlength=9
       }else{
// 不能超过12张图片
         var maxlength=12
       }
       console.log('上传前存在页面上的数量,上传前的数量加上现在上传的数量,总张数限制')
       console.log(numUp,totalNum,maxlength)
   if(totalNum> maxlength){
     mui.toast('图片不能超过'+maxlength+'张,请重新选择!')
       }
   else if(totalNum <= maxlength){
			fileList = validateUp(fileList);
      console.log('2.上传的图片没有超过总张数限制:'+orientation)
      getTimes()
			fileList.forEach(function(file, i) {
        console.log('3.开始循环fileList上传的图片对象:'+orientation)
        getTimes()	
        EXIF.getData(fileList[i], function() {
          EXIF.getAllTags(this);
          orientation = EXIF.getTag(this, 'Orientation');
          console.log('4.exif里面获取图片的方向信息'+orientation)
          getTimes()
        });
        
        
            var reader = new FileReader();          
//          获取图片大小
            reader.onload = function() {
              console.log('4.reader.onload:'+orientation)
              getTimes()	
               var result = this.result;
                var img = new Image();
                img.src = result;
              
//1.如果图片大小小于100kb，则直接上传
                if (result.length <= maxsize) {
                    img = null;
                    upload(result,fileList[i].type);
                    return;
                }
//2.图片大于100kb,图片加载完毕之后进行压缩，然后上传
                if (img.complete) {
                    callback();
                } else {
                    img.onload = callback;
                }
                function callback() {
                  console.log('5.图片complete完后进入callback执行compres函数:'+orientation)
                  getTimes()
                    compress(img,fileList[i].type,orientation);
                    img = null;
                }
            };
            reader.readAsDataURL(fileList[i]);
     


		})
}

	});
	
	
   

   	//判断上传的图片类型是否正确 
		function validateUp(files){
			var arrFiles = [];//替换的文件数组
			for(var i = 0, file; file = files[i]; i++){
				//获取文件上传的后缀名
				var newStr = file.name.split("").reverse().join("");
				if(newStr.split(".")[0] != null){
						var type = newStr.split(".")[0].split("").reverse().join("");
						console.log(type+"===type===");
						if(jQuery.inArray(type, defaults.fileType) > -1){
							// 类型符合，可以上传
							if (file.size >= defaults.fileSize) {
								// alert(file.size);
								mui.toast('您这个"'+ file.name +'"文件大小过大');	
							} else {
								// 在这里需要判断当前所有文件中
								arrFiles.push(file);	
							}
						}else{
							mui.toast('您这个"'+ file.name +'"上传类型不符合');	
						}
					}else{
						mui.toast('您这个"'+ file.name +'"没有类型, 无法识别');	
					}
			}
			console.log(arrFiles)
			return arrFiles;
		}	
	
})


// 1.获取当前时间的函数
function getTimes(){
  var date = new Date();
  this.year = date.getFullYear();
  this.month = date.getMonth() + 1;
  this.date = date.getDate();
  this.day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()];
  this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  var currentTime = "现在是:" + this.year + "年" + this.month + "月" + this.date + "日 " + this.hour + ":" + this.minute + ":" + this.second + " " + this.day;
  console.log(currentTime);
  
}


// 2.判断图片旋转方向的函数
function getPhotoOrientation(img) {
  var orient;
  EXIF.getData(img, function () {
     orient = EXIF.getTag(this, 'Orientation');
  });
  return orient;
}

// 3.进行图片方向的判断
function compress(img, fileType,Orientation) {
  console.log('6.进入了compress判断图片方向的函数')
  getTimes()
  var canvas = document.createElement("canvas");
  // var rotateshow;
      switch (Orientation){
          case 6:
           rotateImg(img,'left',canvas,fileType,1); 
           console.log(6);
              break;
          case 8:
          rotateImg(img,'right',canvas,fileType,3); 
           console.log(8);
              break;
          case 3:
              rotateImg(img,'right',canvas,fileType,2); 
               console.log(3);
              break;
          default:
              rotateImg(img,'',canvas,fileType,0); 
               console.log(0);

               
      }
    
}
// 4.进行图片旋转和绘制的函数
function rotateImg(img, direction,canvas,fileType,step) {
  console.log('7.进入了实际的进行旋转和压缩rotateImg函数')
  getTimes()
  // //img的高度和宽度不能在img元素隐藏后获取，否则会出错
  var height = img.height;
  var width = img.width;
  var degree = step * 90 * Math.PI / 180;
  var ctx = canvas.getContext('2d');
  switch (step) {
      case 0://1或者无或者其他
      var ratio;
      if ((ratio = width * height / 1000000) > 1) {
          ratio = Math.sqrt(ratio);
          width /= ratio;
          height /= ratio;
      } else {
          ratio = 1;
      }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0,width,height);
          break;
      case 1://6
              var ratio;
        if ((ratio = width * height / 1000000) > 1) {
            ratio = Math.sqrt(ratio);
            width /= ratio;
            height /= ratio;
        } else {
            ratio = 1;
        }
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height,width,height);
          break;
      case 2://3
      var ratio;
      if ((ratio = width * height / 1000000) > 1) {
          ratio = Math.sqrt(ratio);
          width /= ratio;
          height /= ratio;
      } else {
          ratio = 1;
      }
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height,width,height);
          break;
      case 3://8
      var ratio;
      if ((ratio = width * height / 1000000) > 1) {
          ratio = Math.sqrt(ratio);
          width /= ratio;
          height /= ratio;
      } else {
          ratio = 1;
      }
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0,width,height);
          break;
  }
  upload(canvas.toDataURL('image/jpeg',0.75), fileType);

}

  // 5.图片上传，将base64的图片转成二进制对象，塞进formdata上传
  function upload(basestr, type) {
    vm.imgUrl.push(basestr);
    console.log("8.旋转压缩完开始转换fordata并且赋图片路径base64到页面上upload函数")
    getTimes()
    return//只需要base64,不需要下面的blob对象
      var text = window.atob(basestr.split(",")[1]);
      var buffer = new ArrayBuffer(text.length);
      var ubuffer = new Uint8Array(buffer);
      var pecent = 0 , loop = null;
      for (var i = 0; i < text.length; i++) {
          ubuffer[i] = text.charCodeAt(i);
      }
      var Builder = window.WebKitBlobBuilder || window.MozBlobBuilder;
      var blob;
      if (Builder) {
          var builder = new Builder();
          builder.append(buffer);
          blob = builder.getBlob(type);
      } else {
          blob = new window.Blob([buffer], {type: type});
      }
     
  }

  //   function compress(img, fileType) {
  //     console.log('2.进入了compress判断图片方向的函数')
  //     getTimes()
  //     var canvas = document.createElement("canvas");
  //     var rotateshow;
  //     // EXIF.getData(img, function(){
  //         // EXIF.getAllTags(img);
  //         Orientation =getPhotoOrientation(img)
  //         // Orientation = EXIF.getTag(img,'Orientation');
  //         console.log('2.1进入了compres调用判断图片方向的函数返回Orientation:'+Orientation)
  //         getTimes()
  //         switch (Orientation){
  //             case 6:
  //              rotateshow = rotateImg(img,'left',canvas,fileType,1); 
  //             // rotateImg(img,'left',canvas,fileType); 
  //              console.log(6);
  //                 break;
  //             case 8:
  //              rotateshow = rotateImg(img,'right',canvas,fileType,3); 
  //              console.log(8);
  //                 break;
  //             case 3:
  //                 // rotateImg(img,'right',canvas,fileType);
  //                  rotateshow = rotateImg(img,'right',canvas,fileType,2); 
  //                  console.log(3);
  //                 break;
  //             default:
  //                 //  rotateshow = img.src;
  //                  rotateshow = rotateImg(img,'',canvas,fileType,0); 
  //                  console.log(0);
  //                 //  upload(canvas.toDataURL('image/jpeg',0.75), fileType);

                   
  //         }
          
      
  //     // });
  // }
   
  
 /**
     * 获取blob对象的兼容性写法
     * @param buffer
     * @param format
     * @returns {*}
     */
    function getBlob(buffer, format) {
        try {
            return new Blob(buffer, {type: format});
        } catch (e) {
            var bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
            buffer.forEach(function(buf) {
                bb.append(buf);
            });
            return bb.getBlob(format);
        }
    }
    /**
     * 获取formdata
     */
    function getFormData() {
        var isNeedShim = ~navigator.userAgent.indexOf('Android')
            && ~navigator.vendor.indexOf('Google')
            && !~navigator.userAgent.indexOf('Chrome')
            && navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534;
        return isNeedShim ? new FormDataShim() : new FormData()
    }
    /**
     * formdata 补丁, 给不支持formdata上传blob的android机打补丁
     * @constructor
     */
    function FormDataShim() {
        console.warn('using formdata shim');
        var o = this,
            parts = [],
            boundary = Array(21).join('-') + (+new Date() * (1e16 * Math.random())).toString(36),
            oldSend = XMLHttpRequest.prototype.send;
        this.append = function(name, value, filename) {
            parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');
            if (value instanceof Blob) {
                parts.push('; filename="' + (filename || 'blob') + '"\r\nContent-Type: ' + value.type + '\r\n\r\n');
                parts.push(value);
            }
            else {
                parts.push('\r\n\r\n' + value);
            }
            parts.push('\r\n');
        };
        // Override XHR send()
        XMLHttpRequest.prototype.send = function(val) {
            var fr,
                data,
                oXHR = this;
            if (val === o) {
                // Append the final boundary string
                parts.push('--' + boundary + '--\r\n');
                // Create the blob
                data = getBlob(parts);
                // Set up and read the blob into an array to be sent
                fr = new FileReader();
                fr.onload = function() {
                    oldSend.call(oXHR, fr.result);
                };
                fr.onerror = function(err) {
                    throw err;
                };
                fr.readAsArrayBuffer(data);
                // Set the multipart content type and boudary
                this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
                XMLHttpRequest.prototype.send = oldSend;
            }
            else {
                oldSend.call(this, val);
            }
        };
    }



//如果图片大于9张则隐藏上传框    270
//如果要限定上传的张数则在这里限制 185
//如果要设置压缩的比例，比例越大图片越清晰   49












