function tts(){
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
// 判断图片旋转的函数
function getPhotoOrientation(img) {
  var orient;
  EXIF.getData(img, function () {
     orient = EXIF.getTag(this, 'Orientation');
  });
  return orient;
}

function rotateImg(img, direction,canvas,fileType,step) {
  console.log('3.进入了实际的进行旋转和压缩')
  tts()
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
  // return canvas.toDataURL('image/jpeg',0.5);
}


// 图片压缩代码区域
  //    用于压缩图片的canvas
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');
    //    瓦片canvas
    var tCanvas = document.createElement("canvas");
    var tctx = tCanvas.getContext("2d");
    var maxsize = 100 * 1024;


    function compress(img, fileType) {
      console.log('2.进入了compress判断图片方向的函数')
      tts()
      var canvas = document.createElement("canvas");
      var rotateshow;
      EXIF.getData(img, function(){
          EXIF.getAllTags(img);
          Orientation = EXIF.getTag(img,'Orientation');
          console.log('2.1进入了compres调用判断图片方向的函数返回Orientation')
          tts()
          switch (Orientation){
              case 6:
               rotateshow = rotateImg(img,'left',canvas,fileType,1); 
              // rotateImg(img,'left',canvas,fileType); 
               console.log(6);
                  break;
              case 8:
               rotateshow = rotateImg(img,'right',canvas,fileType,3); 
               console.log(8);
                  break;
              case 3:
                  // rotateImg(img,'right',canvas,fileType);
                   rotateshow = rotateImg(img,'right',canvas,fileType,2); 
                   console.log(3);
                  break;
              default:
                  //  rotateshow = img.src;
                   rotateshow = rotateImg(img,'',canvas,fileType,0); 
                   console.log(0);
                  //  upload(canvas.toDataURL('image/jpeg',0.75), fileType);

                   
          }
          
      
      });
  }
   
    //    图片上传，将base64的图片转成二进制对象，塞进formdata上传
    function upload(basestr, type) {
      console.log("4.旋转压缩完开始转换fordata并且赋图片路径base64到页面上")
      tts()
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
        vm.imgUrl.push(basestr);
       console.log("转换完成！") 
    }
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
// 图片压缩代码区域

      console.log('引用了')
$(function(){
	var delParent;
	var defaults = {
		fileType         : ["jpg","png","PNG","JPG","bmp","BMP","jpeg","JPEG"],   // 上传文件的类型
		fileSize         : 1024 * 1024 * 10                  // 上传文件的大小 10M
	};
		/*点击图片的文本框*/
        console.log('引用了imgup。js')
	$(document).on('change','#input',function(){
        console.log('files点击了图片上传框,粗发了事件')
		var idFile = $(this).attr("id");
		var file = document.getElementById("input");
    var imgContainer = $(this).parents().parents(".ul"); //存放图片的父亲元素
		var fileList = file.files; //获取的图片文件
		// console.log(fileList+"======filelist=====");
		var input = $(this).parent();//文本框的父亲元素
		var imgArr = [];
	 //遍历得到的图片文件
   var numUp = imgContainer.find(".alltu").length;//之前上传的存在页面上的
   var totalNum = numUp + fileList.length;  //总的数量=之前上传的+现在上传的
       
       console.log('上传前存在页面上的数量,上传前的数量加上现在上传的数量')
       if(locations('where')){
 // 不能超过9张图片
         var maxlength=9
       }else{
         // 不能超过12张图片
         var maxlength=12
       }
 console.log(numUp,totalNum,maxlength)
   if(totalNum> maxlength){
     // alert("上传图片数目不可以超过"+vm.$store.state.maxLength+"个，请重新选择");  //一次选择上传超过5个 或者是已经上传和这次上传的到的总数也不可以超过5个
     mui.toast('图片不能超过'+maxlength+'张,请重新选择!')
       }
   else if(totalNum <= maxlength){
      // console.log("开始处理上传文件")
			fileList = validateUp(fileList);
		
			fileList.forEach(function(file, i) {				 
            var reader = new FileReader();          
//          获取图片大小

          	console.log(fileList[i])
            reader.onload = function() {
               var result = this.result;
               // console.log(fileList[i])
                var img = new Image();
                img.src = result;
              
                //如果图片大小小于100kb，则直接上传
                if (result.length <= maxsize) {
                    img = null;
                    
                    upload(result,fileList[i].type);
                    return;
                }
//      图片加载完毕之后进行压缩，然后上传
console.log('第一步开始计时')
tts()
                if (img.complete) {
                    callback();
                } else {
                    img.onload = callback;
                }
                function callback() {
                    compress(img,fileList[i].type);
                    img = null;
                }
            };
            reader.readAsDataURL(fileList[i]);
     


		})
	
		 numUp = imgContainer.find(".up-section").length;
		if(numUp >= 9){//如果图片大于9张则隐藏上传框
			// $(this).parent().hide();
		}
		//input内容清空
		// $(this).val("");
    console.log('处理上传文件完成')
}

	});
	
	
   
  //   $(".z_photo").delegate(".close-upimg","click",function(){
  //    	  $(".works-mask").show();
  //    	  delParent = $(this).parent();
	// });






	
	// $(document).on('click',".wsdel-no",function(){
	// 	$(".works-mask").hide();
	// });
   	
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


//如果图片大于9张则隐藏上传框    270
//如果要限定上传的张数则在这里限制 185
//如果要设置压缩的比例，比例越大图片越清晰   49












