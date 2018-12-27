'use strict';

Vue.prototype.$axios = axios;
var vm=new Vue({
  el: '#app',
  created: function created() {
    var _this = this;

    
  },

  
  mounted: function mounted() {
    var that=this
    // if (window.WebViewJavascriptBridge) {
    //   WebViewJavascriptBridge.callHandler('GetData', {
    //     content_key: 'xiaolin'
    //   });
    // } else {
    //   // 延时一秒
    //   setTimeout(function () {
    //     WebViewJavascriptBridge.callHandler('GetData', {
    //       content_key: 'xiaolin'
    //     });
    //   }, 1000);
    // }
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
    
// 查看发布者的信息
var that=this
  var id = localStorage.getItem('userId')
  if (id) {
    $.get(Boss + 'user/' + id,{'sessiontoken':sessiontoken}, function (data, status) {
      if (!data.result.message) {
        console.log('查看了个人资料赋值给了电话及在线咨询')
        console.log(data)
        that.fabuzhe=data.result
       
      }
    })
  }



  },

  computed: {
    // 房间数量
    rooms: function rooms() {
      if (this.rentobject.space) {

        var str = this.rentobject.space;
        var strT = '';
        var arr = str.split(',');
        for (var key in arr) {

          if (arr[key].match(/房/)) {
            strT += arr[key].match(/房/)[0] + ':';
            if (key == 0) {
              strT += arr[key].substr(-1, 1);
            }
          }
          if (arr[key].match(/客/)) {
            strT += arr[key].match(/客/)[0] + ':';
            if (key == 1) {
              strT += arr[key].substr(-1, 1);
            }
          }
          if (arr[key].match(/洗/)) {
            strT += '廁' + ':';
            if (key == 2) {
              strT += arr[key].substr(-1, 1);
            }
          }
        }
        return strT;
      } else {
        return '--';
      }
    },

    // 用户的注册时间
    createdAt: function createdAt() {

      if (JSON.stringify(this.userData) !== '{}') {
        if (this.userData.createdAt) {
          return this.userData.createdAt.substr(0, 10);
        }
      } else {
        return '--';
      }
    },

    // 用戶頭像
    userIcon: function userIcon() {

      if (JSON.stringify(this.userData) !== '{}') {
        if (this.userData.avatar) {
          return this.userData.avatar.url;
        }
      } else {
        return './imgs/fangzu/icon.png';
      }
    },

    // 暱稱
    nickname: function nickname() {

      if (JSON.stringify(this.userData) !== '{}') {
        var str = this.userData.displayname;
        var call = this.userData.call;
      }

      if (call === 'mr') {
        str += '先生';
      } else if (call === 'mrs') {
        str += '太太';
      } else {
        str += '女士';
      }

      return str;
    },

    // 联络人
    contacts: function contacts() {

      // 上一界面有的话优先读取
      var contacts = this.rentobject.contacts;
      if (contacts) {

        var _call = this.rentobject.call;
        if (_call === 'mr') {
          contacts += '先生';
        } else if (_call === 'mrs') {
          contacts += '太太';
        } else {
          contacts += '女士';
        }
        return contacts;
      } else {

        // 读取登陆人的信息
        if (JSON.stringify(this.userData) !== '{}') {
          var str = this.userData.displayname;
          var call = this.userData.call;
          if (call === 'mr') {
            str += '先生';
          } else if (call === 'mrs') {
            str += '太太';
          } else {
            str += '女士';
          }
          return str;
        }
      }
    },

    // 平方尺
    averageFeet: function averageFeet() {
      var areaNumb = this.rentobject.area||this.rentobject.useable_area;
      var price = this.rentobject.price;
      if (!areaNumb) {
        return '--';
      } else {

        var result = parseInt(price) / parseInt(areaNumb);
        return result.toFixed(1);
      }
    },

    // 是否显示底部栏
    showFooter: function showFooter() {
      if (localStorage.contactType === '1') {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
     //拨打电话
     tel(phone) {
      if (sessiontoken && sessiontoken != 'null') {
        if (phone) {
          console.log("tel:" + phone)
          if (isNaN(phone)) {
            mui.toast('電話號碼為中文')
          } else {
            location.href = "tel:" + phone
          }

        } else {
          mui.toast('電話號碼為空')
          // location.href="tel:13411615134"
        }
      } else {
        mui.toast('請先到【我的】登錄')
      }

    },
    initdata(){
      if (this.rentobject.infrastructure) {
        
              // 配套設備
              this.infrastructureData = this.rentobject.infrastructure.split('、');
            }
            if (this.rentobject.home_infrastructure) {
        
              // 屋苑設施
              this.homeInfrastructureData = this.rentobject.home_infrastructure.split('、');
            }
            if (this.rentobject.location_infrastructure) {
        
              // 附近設施
              this.locationInfrastructureData = this.rentobject.location_infrastructure.split('、');
            }
    },
    // 平均價格
    average: function average() {
      // Dialog.alert({
      //   message: '平均呎價是按建築面積計算'
      // });
      mui.alert('平均呎價是按建築面積計算', null, ['好的'], null, 'div')
    }

    // // 点击轮播图
    // clickSwipeImg: function clickSwipeImg(index) {
    //   // console.log(index, this.previewData.pics)
    //   ImagePreview(this.previewData.pics, index);
    // }
  },
  data: function data() {
    return {
      fabuzhe:'no',//发布者咨询
      rentobject: null,
      previewData: {},
      infrastructureData: [],
      homeInfrastructureData: [],
      locationInfrastructureData: [],
      userData: {}
    };
  }
});