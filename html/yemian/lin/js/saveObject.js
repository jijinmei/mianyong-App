'use strict';

// function SaveObject() {
//   return {
//     category: '',
//     type: '',
//     build_name: '',
//     build_area: '',
//     build_street: '',
//     rent_type: '',
//     build_status: '',
//     shop_type: '',
//     pics: [],
//     price: '',
//     space: '',
//     area: '',
//     useable_area: '',
//     floor: '',
//     code: '',
//     direct: '',
//     landscape: '',
//     decoration: '',
//     cook: '',
//     pet: '',
//     start_time: '',
//     infrastructure: '',
//     home_infrastructure: '',
//     location_infrastructure: '',
//     features: '',
//     contactType: '',
//     contacts: '',
//     phone: '',
//     call: '',
//     remark: '',
//     from: ''
//   }
// }


var saveObject = {
  category: '',
  type: '住宅',
  build_name: '',
  build_area: '',
  build_street: '',
  rent_type: '',
  build_status: '',
  shop_type: '',
  pics: [],
  price: '',
  space: '',
  area: '',
  useable_area: '',
  floor: '',
  code: '',
  direct: '',
  landscape: '',
  decoration: '',
  cook: '',
  pet: '',
  start_time: '',
  infrastructure: '',
  home_infrastructure: '',
  location_infrastructure: '',
  features: '',
  contactType: '',
  contacts: '',
  phone: '',
  call: '',
  remark: '',
  from: ''
};

function setvals(data) {
  WebViewJavascriptBridge.callHandler('SetData', data, function (response) {
    document.getElementById("returnValue").value = response;
  });
}