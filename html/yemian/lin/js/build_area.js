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

    // this.placeVal = localStorage.buildarea || '請輸入物業所在地區'
    var self = this;
    this.$axios.get('/system/area').then(function (res) {
      // console.log(res)
      self.result = res;
    });
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
        location.href = 'rent_index.html';
      }
    },
    clickLi2: function clickLi2(item, e) {
      e.stopPropagation();
      console.log(item);
      this.rentobject.build_area = item;
      // localStorage.setItem('buildarea', item)
      // location.href = 'rent_index.html'+location.search

      goback(1);
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