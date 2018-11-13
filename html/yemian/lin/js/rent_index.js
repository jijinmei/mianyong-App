'use strict';

var vm = new Vue({
  el: '#app',
  created: function created() {
    // this.rentobject = JSON.parse(JSON.stringify(saveObject))    
  },
  mounted: function mounted() {
    // mui.toast(location.search)
   
  },

  methods: {
    // 清除信息
    clearInfo: function clearInfo(type) {

      this.rentobject = JSON.parse(JSON.stringify(saveObject));
      this.rentobject.type = type;
      this.rentobject.build_status = '';

      this.rentData.forEach(function (_item) {
        _item.state = false;
      });
      this.rentData2.forEach(function (_item) {
        _item.state = false;
      });
      this.shopTypeData.forEach(function (_item) {
        _item.state = false;
      });
    },
    goto: function goto(name) {
      // var ua = navigator.userAgent.toLowerCase();
      // if (ua.match(/iPhone\sOS/i) == "iphone os") {
      //   console.log('苹果')
      //   WebViewJavascriptBridge.callHandler('SetData', {
      //     content_key: 'xiaolin',
      //     content: JSON.stringify(this.rentobject)
      //   });
      // } else {
      //   console.log('安卓')
        
      // }
      setDataxiaolin(this.rentobject)

      if (name === 'buildname') {
        location.href = 'build_name.html?sessiontoken='+ locations('sessiontoken');// + location.search;
      } else if (name === 'buildarea') {
        location.href = 'build_area.html?sessiontoken='+ locations('sessiontoken'); //+ location.search;
      }
    },
    // 聊天
    refresh: function refresh(data) {
      WebViewJavascriptBridge.callHandler('refresh', data, function (response) {
        document.getElementById("returnValue").value = response;
      });
    },
    // 下一步按鈕運行的方法
    nexts: function next() {
console.log('next')
// var ua = navigator.userAgent.toLowerCase();
// if (ua.match(/iPhone\sOS/i) == "iphone os") {
//   console.log('苹果')
//   WebViewJavascriptBridge.callHandler('SetData', {
//     content_key: 'xiaolin',
//     content: JSON.stringify(this.rentobject)
//   });
// } else {
//   console.log('安卓')
  
// }
setDataxiaolin(this.rentobject)
// 1.当前是放租的 商铺的时候必填项为 类型  地区 街道 出租类型 商铺类型
      if (this.rentobject.type === '商鋪') {
        // 商铺
        if (!this.rentobject.type||!this.rentobject.rent_type || !this.rentobject.build_street || !this.rentobject.shop_type || !this.rentobject.build_area) {
          mui.toast('帶*號項為必填項');
          return;
        }
      } else if (this.rentobject.type === '車位') {
// 2.当前是放租的 車位的时候必填项为 类型 物业名称 地区
        if (!this.rentobject.type||!this.rentobject.build_name || !this.rentobject.build_area) {
          mui.toast('帶*號項為必填項');
          return;
        }
      } else {
// 3.当前是放租的 其他三个类型住宅,写字楼,工业大厦必填项为
// 必填: 类型 物业名称  地区 出租类型
                    if (!this.rentobject.type|| !this.rentobject.build_name || !this.rentobject.build_area||!this.rentobject.rent_type) {
                    mui.toast('帶*號項為必填項');
                    return;
            }
        
  
      }

      if (this.rentobject.type == '住宅') {

        location.href = 'rent_zz.html?sessiontoken='+ locations('sessiontoken');// + location.search;
      } else if (this.rentobject.type == '車位') {

        location.href = 'rent_cw.html?sessiontoken='+ locations('sessiontoken');// + location.search;
      } else if (this.rentobject.type == '商鋪') {

        location.href = 'rent_sp.html?sessiontoken='+ locations('sessiontoken');// + location.search;
      } else if (this.rentobject.type == '寫字樓') {

        location.href = 'rent_xzl.html?sessiontoken='+ locations('sessiontoken');// + location.search;
      } else if (this.rentobject.type == '工業大廈') {

        location.href = 'rent_gyds.html?sessiontoken='+ locations('sessiontoken');// + location.search;
      }
    },
    // 商铺类型點擊方法
    selectShopTypeItem: function selectShopTypeItem(index) {

      this.shopTypeData.forEach(function (_item, _index) {

        if (index === _index) {
          _item.state = true;
          this.rentobject.shop_type = _item.text;
        } else {
          _item.state = false;
        }
      }, this);
    },

    // 出租類型
    selectRentTypeItem: function selectRentTypeItem(index) {

      this.rentData.forEach(function (_item, _index) {
        if (index === _index) {
          if (!_item.state) {
            _item.state = true;
            this.rentobject.rent_type = _item.text;
          }
        } else {
          _item.state = false;
        }
      }, this);
    },
    selectRentTypeItem2: function selectRentTypeItem2(index) {

      console.log(index);
      this.rentData2.forEach(function (_item, _index) {
        if (index === _index) {
          if (!_item.state) {
            _item.state = true;
            this.rentobject.rent_type = _item.text;
          }
        } else {
          _item.state = false;
        }
      }, this);
    },
    // 选择类型
    selectTypeItem: function selectTypeItem(index) {
      // 所有的编辑都不能更改类型
      if(this.rentobject.objectId){
              return;
      };
      this.typeData.forEach(function (_item, _index) {
        if (index === _index) {
          if (!_item.state) {
            _item.state = true;

            // 每次點擊類型都清空類型下面的數據
            this.clearInfo(_item.text);
            this.rentobject.type = _item.text;
          }
        } else {
          _item.state = false;
        }
      }, this);
    }
  },
  data: {

    xiaolin:[],
    rentobject: null,
    typeData: [{
      text: '住宅',
      imgurl1: './imgs/fangzu/leixing/5+.png',
      imgurl2: './imgs/fangzu/leixing/5.png',
      state: false
    }, {
      text: '車位',
      imgurl1: './imgs/fangzu/leixing/4+.png',
      imgurl2: './imgs/fangzu/leixing/4.png',
      state: false
    }, {
      text: '商鋪',
      imgurl1: './imgs/fangzu/leixing/3+.png',
      imgurl2: './imgs/fangzu/leixing/3.png',
      state: false
    }, {
      text: '寫字樓',
      imgurl1: './imgs/fangzu/leixing/2+.png',
      imgurl2: './imgs/fangzu/leixing/2.png',
      state: false
    }, {
      text: '工業大廈',
      imgurl1: './imgs/fangzu/leixing/1+.png',
      imgurl2: './imgs/fangzu/leixing/1.png',
      state: false
    }],
    rentData: [{
      text: '整租',
      imgurl1: './imgs/fangzu/leixing/5+.png',
      imgurl2: './imgs/fangzu/leixing/5.png',
      state: false
    }, {
      text: '分租',
      imgurl1: './imgs/fangzu/chuzuleixing/3+.png',
      imgurl2: './imgs/fangzu/chuzuleixing/3.png',
      state: false
    }, {
      text: '單間',
      imgurl1: './imgs/fangzu/leixing/3+.png',
      imgurl2: './imgs/fangzu/leixing/3.png',
      state: false
    }, {
      text: '床位',
      imgurl1: './imgs/fangzu/leixing/2+.png',
      imgurl2: './imgs/fangzu/leixing/2.png',
      state: false
    }],
    rentData2: [{
      text: '整租',
      imgurl1: './imgs/fangzu/leixing/5+.png',
      imgurl2: './imgs/fangzu/leixing/5.png',
      state: false
    }, {
      text: '分租',
      imgurl1: './imgs/fangzu/chuzuleixing/3+.png',
      imgurl2: './imgs/fangzu/chuzuleixing/3.png',
      state: false
    }],
    shopTypeData: [{
      text: '地鋪',
      imgurl1: './imgs/fangzu/shangpuleixing/3+.png',
      imgurl2: './imgs/fangzu/shangpuleixing/3.png',
      state: false
    }, {
      text: '商場鋪',
      imgurl1: './imgs/fangzu/shangpuleixing/2+.png',
      imgurl2: './imgs/fangzu/shangpuleixing/2.png',
      state: false
    }, {
      text: '樓上鋪',
      imgurl1: './imgs/fangzu/shangpuleixing/1+.png',
      imgurl2: './imgs/fangzu/shangpuleixing/1.png',
      state: false
    }]

  }
});

function getAppLocalData(data) {
  data=data.replace(/\n/g,"\\n").replace(/\r/g,"\\r");
  if (data) {
    console.log('有值传过来', data);
    vm.rentobject = JSON.parse(data);
    // initdata();
    if(!vm.rentobject.call&&!vm.rentobject.contacts&&!vm.rentobject.phone){
           console.log('电话及在线咨询同时无')
      users()//在users里面调用initdata
    }else{
      console.log('电话及在线咨询同时有')
      initdata()
          
    }
  } else {
    console.log('没有传值过来');
    if(locations('objectId')){
      // 根据id请求数据,有id说明是从我的楼盘过来的
      xiangqing()

    }else{
      vm.rentobject = JSON.parse(JSON.stringify(saveObject));
     initdata();
     users()//在users里面调用initdata
    }
    
  }
}

var ua = navigator.userAgent.toLowerCase();
if (ua.match(/iPhone\sOS/i) == "iphone os") {
  console.log('苹果')
  if(window.WebViewJavascriptBridge){
    WebViewJavascriptBridge.callHandler('GetData', {
      content_key: 'xiaolin'
    });
  }else{
    // 延时一秒
  setTimeout(function () {
    WebViewJavascriptBridge.callHandler('GetData', {
      content_key: 'xiaolin'
    });
  }, 1000);
  }
} else {
  console.log('安卓')
  window.callHandler.getResult('xiaolin');
 
}





function initdata() {

  // 读取类型
  vm.typeData.forEach(function (_item, _index) {
    if (vm.rentobject.type === _item.text) {
      _item.state = true;
    }
  });

  if (vm.rentobject.type === '住宅') {
    // 读取出租类型
    vm.rentData.forEach(function (_item, _index) {
      if (vm.rentobject.rent_type === _item.text) {
        _item.state = true;
      }
    });
  } else {
    // 读取出租类型
    vm.rentData2.forEach(function (_item, _index) {
      if (vm.rentobject.rent_type === _item.text) {
        _item.state = true;
      }
    });
  }

  // 读取商鋪类型
  vm.shopTypeData.forEach(function (_item, _index) {
    if (vm.rentobject.shop_type === _item.text) {
      _item.state = true;
    }
  });

  
}