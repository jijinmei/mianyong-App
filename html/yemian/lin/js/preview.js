'use strict';

Vue.prototype.$axios = axios;
var vm=new Vue({
  el: '#app',
  created: function created() {
    var _this = this;

    // this.rentobject = JSON.parse(localStorage.getItem('rentobject'))


    // if (localStorage.getItem('rentobject')) {
    //   this.rentobject = JSON.parse(localStorage.getItem('rentobject'));
    // } else {
    //   this.rentobject = JSON.parse(JSON.stringify(saveObject));
    // }

    if (localStorage.userId) {
      this.$axios.get('/user/' + localStorage.userId).then(function (res) {
        console.log(res);
        if (res.status) {
          _this.userData = res.result;
        }
      });
    }

    console.log('userData发生变化前');
  },

  watch: {
    rentobject: {
      handler: function handler(newVal) {
        localStorage.setItem('rentobject', JSON.stringify(newVal));
      },
      deep: true
    }
  },
  mounted: function mounted() {
    if (window.WebViewJavascriptBridge) {
      WebViewJavascriptBridge.callHandler('GetData', {
        content_key: 'xiaolin'
      });
    } else {
      // 延时一秒
      setTimeout(function () {
        WebViewJavascriptBridge.callHandler('GetData', {
          content_key: 'xiaolin'
        });
      }, 1000);
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
      var areaNumb = this.rentobject.area;
      var price = this.rentobject.price;
      if (!this.rentobject.area) {
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
      Dialog.alert({
        message: '平均呎價是按建築面積計算'
      });
    },

    // 点击轮播图
    clickSwipeImg: function clickSwipeImg(index) {
      // console.log(index, this.previewData.pics)
      ImagePreview(this.previewData.pics, index);
    }
  },
  data: function data() {
    return {
      rentobject: null,
      previewData: {},
      infrastructureData: [],
      homeInfrastructureData: [],
      locationInfrastructureData: [],
      userData: {}
    };
  }
});