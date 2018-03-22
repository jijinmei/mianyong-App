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
  }
}

// 获取 组合完后的formdata对象
function getFormDataFun(obj) {

  var formData = new FormData();
  commonFiles(obj.pics, formData, 'pics');
  formData.append("sessiontoken", location.search.slice(1).split('=')[1]);

  for (var key in obj) {
    if (key !== 'pics' && obj[key] != '' && obj[key] != null) {
      formData.append(key, obj[key]);
    }
  }

  // formData.append("category", obj.category)
  // formData.append("type", obj.type)
  // formData.append("build_name", obj.build_name)
  // formData.append("build_area", obj.build_area)
  // formData.append("build_street", obj.build_street)
  // formData.append("rent_type", obj.rent_type)
  // formData.append("build_status", obj.build_status)
  // formData.append("shop_type", obj.shop_type)
  // formData.append("price", obj.price)
  // formData.append("space", obj.space)
  // formData.append("area", obj.area)
  // formData.append("useable_area", obj.useable_area)
  // formData.append("floor", obj.floor)
  // formData.append("code", obj.code)
  // formData.append("direct", obj.direct)
  // formData.append("landscape", obj.landscape)
  // formData.append("decoration", obj.decoration)
  // formData.append("cook", obj.cook)
  // formData.append("pet", obj.pet)
  // formData.append("start_time", obj.start_time)
  // formData.append("infrastructure", obj.infrastructure)
  // formData.append("home_infrastructure", obj.home_infrastructure)
  // formData.append("location_infrastructure", obj.location_infrastructure)
  // formData.append("features", obj.features)
  // formData.append("contactType", obj.contactType)
  // formData.append("contacts", obj.contacts)
  // formData.append("phone", obj.phone)
  // formData.append("call", obj.call)
  // formData.append("remark", obj.remark)
  // formData.append("from", obj.from)


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