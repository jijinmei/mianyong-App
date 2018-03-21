'use strict';

Vue.prototype.$axios = axios;

var vm = new Vue({
  el: '#app',
  created: function created() {

    // 判斷機型, android / ios
    // var ua = navigator.userAgent.toLowerCase()
    // if (ua.match(/iPhone\sOS/i) == "iphone os") {

    // WebViewJavascriptBridge.callHandler('GetData', {content_key: 'xiaolin'})
    // }

    // if (!this.rentobject) {
    //   this.rentobject = JSON.parse(JSON.stringify(saveObject))
    // }

  },

  mounted: function mounted() {
    this.searchVal = this.rentobject.build_name;
  },
  methods: {
    start: function start(value) {
      this.searchVal = value;
      var self = this;
      this.$axios.get('/agent/search/build', {
        params: {
          key: value,
          type: self.rentobject.type
        }
      }).then(function (res) {
        console.log(res);
        if (res.status) {
          self.result = res.result;
        }
      });
    },
    clickLi: function clickLi(item) {
      this.searchVal = item.name;
    },
    goback: function goback() {

      console.log(this.searchVal);
      this.rentobject.build_name = this.searchVal;

      WebViewJavascriptBridge.callHandler('SetData', {
        content_key: 'xiaolin',
        content: JSON.stringify(this.rentobject)
      });

      WebViewJavascriptBridge.callHandler('goback', {
        pageNumber: '1',
        needRefresh: 'YES'
      });
    }
  },
  data: {
    searchVal: '',
    result: [],
    inputval: '',
    rentobject: saveObject
  }
});

function getAppLocalData(data) {

  if (data) {
    console.log('有值传过来', data);
    vm.rentobject = JSON.parse(data);
  } else {
    console.log('没有传值过来');
    vm.rentobject = JSON.parse(JSON.stringify(saveObject));
  }
}

// 延时一秒
setTimeout(function () {

  WebViewJavascriptBridge.callHandler('GetData', {
    content_key: 'xiaolin'
  });
}, 1000);

// vm.$watch('rentobject', function () {

//   console.log('保存数据...', newVal)
//   WebViewJavascriptBridge.callHandler('SetData', {
//     content_key: 'xiaolin',
//     content: JSON.stringify(this.rentobject)
//   })
// }, {
//   deep: true
// })