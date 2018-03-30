'use strict';

// 简单的声明一个发布对象
// var publishObj = {}

//base64转文件对象
function commonFiles(files, formData, items) {
  for (var i = 0; i < files.length; i++) {
    //base64转换为blob对象
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
      blob = new window.Blob([buffer], { type: 'image/png' });
    }
    //循环项目名称，依次添加项目
    formData.append(items, blob); //依次添加的项目名称
    console.log(blob)
  }
}

// 获取 组合完后的formdata对象
function getFormDataFun(obj) {

  var formData = new FormData();
  commonFiles(obj.pics, formData, 'pics');
  formData.append("sessiontoken", location.search.slice(1).split('=')[1]);

  for (var key in obj) {
    if (key !== 'pics' && obj[key] != '' && obj[key] != null) {
      // ji加的判断 明火煮食和饲养宠物  发去后台的请求才改变这个,其他的显示就不改了
              if(key=='cook'||key=='pet'){
                    if(obj[key]=='可以'){
                      obj[key]='1'
                    }else if(obj[key]=='不可以'){
                      obj[key]='0'
                    }   
              }
      // console.log(key, obj[key])
      formData.append(key, obj[key]);
    }
  }
  return formData;
}

// 发布对象有个发布功能的函数 publish
// publishObj.publish = function (func) {

//   Axios.post(Api.agent, getFormDataFun())
//   .then(func)
// }


// 这个方法原本是用来Localstorage
function clearLocalStorages() {

  if (localStorage.rentobject) {
    localStorage.removeItem('rentobject');
  }
  // obj.removeItem('from')
  // obj.removeItem('remark')
  // obj.removeItem('call')
  // obj.removeItem('phone')
  // obj.removeItem('contacts')
  // obj.removeItem('contactType')
  // obj.removeItem('features')
  // obj.removeItem('locationInfrastructure')
  // obj.removeItem('homeInfrastructure')
  // obj.removeItem('infrastructure')
  // obj.removeItem('startTime')
  // obj.removeItem('pet')
  // obj.removeItem('cook')
  // obj.removeItem('decoration')
  // obj.removeItem('landscape')
  // obj.removeItem('direct')
  // obj.removeItem('code')
  // obj.removeItem('floor')
  // obj.removeItem('useableArea')
  // obj.removeItem('area')
  // obj.removeItem('space')
  // obj.removeItem('price')
  // obj.removeItem('shoptype')
  // obj.removeItem('buildstatus')
  // obj.removeItem('renttype')
  // obj.removeItem('buildstreet')
  // obj.removeItem('buildarea')
  // obj.removeItem('buildname')
  // obj.removeItem('type')
  // obj.removeItem('category')
  // obj.removeItem('pics')
}