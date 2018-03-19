'use strict';

Vue.prototype.$axios = axios;
var vm = new Vue({
  el: '#app',
  created: function created() {

    if (localStorage.getItem('rentobject')) {
      this.rentobject = JSON.parse(localStorage.getItem('rentobject'));
    } else {
      this.rentobject = JSON.parse(JSON.stringify(saveObject));
    }
  },

  mounted: function mounted() {
    this.searchVal = this.rentobject.build_name;
  },
  watch: {
    rentobject: {
      handler: function handler(newVal) {
        localStorage.setItem('rentobject', JSON.stringify(newVal));
      },
      deep: true
    }
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

    setdata: function setdata(data) {
      WebViewJavascriptBridge.callHandler('SetData', data, function (response) {
        document.getElementById("returnValue").value = response;
      });
    },
    goback: function (_goback) {
      function goback() {
        return _goback.apply(this, arguments);
      }

      goback.toString = function () {
        return _goback.toString();
      };

      return goback;
    }(function () {

      console.log(this.searchVal);
      this.rentobject.build_name = this.searchVal;
      this.setdata(JSON.stringify(this.rentobject));

      goback(1);
    })
  },
  data: {
    searchVal: '',
    result: [],
    inputval: '',
    rentobject: saveObject
  }
});