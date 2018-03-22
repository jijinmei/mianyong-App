'use strict';

Vue.prototype.$axios = axios;
var vm = new Vue({
  el: '#app',
  created: function created() {

    // if (localStorage.getItem('rentobject')) {
    //   this.rentobject = JSON.parse(localStorage.getItem('rentobject'))
    // } else {
    //   this.rentobject = JSON.parse(JSON.stringify(saveObject))
    // }
  },

  mounted: function mounted() {

    // WebViewJavascriptBridge.callHandler('GetData', {content_key: 'xiaolin'})

    // this.placeVal = localStorage.buildarea || '請輸入物業所在地區'
    var self = this;
    this.$axios.get('/system/area').then(function (res) {
      // console.log(res)
      self.result = res;
    });
  },
  methods: {
    clickLi: function clickLi(items, e, item) {
      if (items.length > 0) {
        if (e.target.firstElementChild.style.display === 'block') {
          e.target.firstElementChild.style.display = 'none';
        } else {
          e.target.firstElementChild.style.display = 'block';
        }
      } else {
        console.log(item);
        this.rentobject.build_area = item;

        // localStorage.setItem('buildarea', item)
        // location.href = 'rent_index.html'
        // setvals(JSON.stringify(this.rentobject))
        // goback(1)

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
    clickLi2: function clickLi2(item, e) {
      e.stopPropagation();
      console.log(item);
      this.rentobject.build_area = item;
      // localStorage.setItem('buildarea', item)
      // location.href = 'rent_index.html'+location.search
      // setvals(JSON.stringify(this.rentobject))


      WebViewJavascriptBridge.callHandler('SetData', {
        content_key: 'xiaolin',
        content: JSON.stringify(this.rentobject)
      });

      WebViewJavascriptBridge.callHandler('goback', {
        pageNumber: '1',
        needRefresh: 'YES'
      });
    },
    searchFunc: function searchFunc() {

      this.retultsub = [];
      if (this.searchVal) {}
      var arr = [];

      for (var key in this.result.result) {
        arr.push(key);
      }

      for (var key in this.result.result) {
        if (this.result.result[key].length) {
          for (var key2 in this.result.result[key]) {
            arr.push(this.result.result[key][key2]);
          }
        }
      }

      for (var key in arr) {
        arr[key].split('').forEach(function (_item) {
          if (this.searchVal === _item) {
            this.retultsub.push(arr[key]);
            this.showtab = true;
          }
        }, this);
      }
    },
    inputfunc: function inputfunc(val) {
      // this.rentobject.build_area = val
      console.log(val);
      if (!val.length) {
        this.showtab = false;
      }
    }
  },
  data: {
    result: [],
    retultsub: [],
    showul: false,
    searchVal: '',
    placeVal: '',
    showtab: false,
    rentobject: saveObject
  }
});

function getAppLocalData(data) {

  if (data) {
    console.log('有值传过来', data);
    vm.rentobject = JSON.parse(data);
  } else {
    console.log('没有传值过来', data);
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