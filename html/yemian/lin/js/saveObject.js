'use strict';
var aaa=document.title;
var cats='';
if(aaa.indexOf('售')){
    cats='sell';
}else{
    cats='rent';
}
// 租,,售发布所有字段
var saveObject = {
    category:cats,
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