'use strict';

var vm = new Vue({
  el: '#app',
  created: function created() {
    // this.rentobject = JSON.parse(JSON.stringify(saveObject))    
  },
  mounted: function mounted() {},

  methods: {
    jis(value){
       this.rentobject.build_status=value
    },
    // 清除信息
    clearInfo: function clearInfo(type) {

      this.rentobject = JSON.parse(JSON.stringify(saveObject));
      this.rentobject.type = type;

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

      WebViewJavascriptBridge.callHandler('SetData', {
        content_key: 'xiaolin',
        content: JSON.stringify(this.rentobject)
      });

      if (name === 'buildname') {
        location.href = 'build_name.html' + location.search;
      } else if (name === 'buildarea') {
        location.href = 'build_area.html' + location.search;
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
      WebViewJavascriptBridge.callHandler('SetData', {
        content_key: 'xiaolin',
        content: JSON.stringify(this.rentobject)
      });
      // 物业状况是公有的
      if (!this.rentobject.build_status) {
                  mui.toast('帶*號項為必填項');
                  return;
                }
      if (this.rentobject.type === '商鋪') {
        // 放售的商铺发布必填为:类型 地区 街道 物业状况 商铺类型
        if (!this.rentobject.type|| !this.rentobject.build_area||!this.rentobject.build_status || !this.rentobject.build_street || !this.rentobject.shop_type) {
          mui.toast('帶*號項為必填項');
          return;
        }
      } else if (this.rentobject.type === '車位') {
        // 放售的車位发布必填:类型 物业名称 地区 物业状况
        if (!this.rentobject.type ||!this.rentobject.build_status ||!this.rentobject.build_name || !this.rentobject.build_area) {
          mui.toast('帶*號項為必填項');
          return;
        }
      } else {
 // 放售的住宅,写字楼,工业大厦发布必填:类型 物业名称 地区 物业现况
                    if (!this.rentobject.type ||!this.rentobject.build_status || !this.rentobject.build_name || !this.rentobject.build_area) {
                      mui.toast('帶*號項為必填項');
                      return;
                    }

  
      }

      if (this.rentobject.type == '住宅') {

        location.href = 'sell_zz.html' + location.search;
      } else if (this.rentobject.type == '車位') {

        location.href = 'sell_cw.html' + location.search;
      } else if (this.rentobject.type == '商鋪') {

        location.href = 'sell_sp.html' + location.search;
      } else if (this.rentobject.type == '寫字樓') {

        location.href = 'sell_xzl.html' + location.search;
      } else if (this.rentobject.type == '工業大廈') {

        location.href = 'sell_gyds.html' + location.search;
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

      this.typeData.forEach(function (_item, _index) {
        if (index === _index) {
          if (!_item.state) {
            _item.state = true;

            // 每次點擊類型都清空類型下面的數據
            this.clearInfo(_item.text);
            this.rentobject.build_status = '';
            this.rentobject.type = _item.text;
          }
        } else {
          _item.state = false;
        }
      }, this);
    }
  },
  data: {
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
      text: '分組',
      imgurl1: './imgs/fangzu/leixing/4+.png',
      imgurl2: './imgs/fangzu/leixing/4.png',
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
      text: '分組',
      imgurl1: './imgs/fangzu/leixing/4+.png',
      imgurl2: './imgs/fangzu/leixing/4.png',
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
    vm.rentobject = JSON.parse(JSON.stringify(saveObject));
    initdata();
    users()//在users里面调用initdata
  }
}


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

  // vm.$watch('rentobject', function () {

  //   console.log('保存数据...', newVal)
  //   WebViewJavascriptBridge.callHandler('SetData', {
  //     content_key: 'xiaolin',
  //     content: JSON.stringify(this.rentobject)
  //   })
  // }, {
  //   deep: true
  // })

  // vm.$watch('rentobject', function () {
  //   var ua = navigator.userAgent.toLowerCase()
  //   if (ua.match(/iPhone\sOS/i) == "iphone os") {

  //     console.log('保存数据...', newVal)
  //     WebViewJavascriptBridge.callHandler('SetData', {
  //       content_key: 'xiaolin',
  //       content: JSON.stringify(this.rentobject)
  //     })
  //   }
  // }, {
  //   deep: true
  // })
}