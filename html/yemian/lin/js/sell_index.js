'use strict';

new Vue({
  el: '#app',
  data: {
    type: null,
    build_name: '',
    build_area: '',
    build_street: '',
    build_status: '',
    shop_type: '',
    isSPLX: false,
    sellOjb: {},
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
    }],
    sArr: [{
      text: '已交吉',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: '隨時交吉',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: '連約售',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }]
  },
  mounted: function mounted() {

    var sellobj = JSON.parse(localStorage.getItem('sellObj'));

    // console.log(sellobj)
    if (sellobj) {

      // 读取类型
      this.type = sellobj.type;
      this.typeData.forEach(function (_item) {
        if (this.type === _item.text) {
          _item.state = true;
        }
      }, this);

      // 读取物业名称
      if (sellobj.build_name) {
        this.build_name = sellobj.build_name;
      }

      // 读取地区
      this.build_area = sellobj.build_area;

      // 街道
      if (sellobj.build_street) {
        this.build_street = sellobj.build_street;
      }

      // 物业现况
      this.build_status = sellobj.build_status;
      this.sArr.forEach(function (_item) {
        if (this.build_status === _item.text) {
          _item.state = true;
        }
      }, this);

      // 商铺
      this.shop_type = sellobj.shop_type;
      if (this.shop_type) {

        this.isSPLX = true;

        this.shopTypeData.forEach(function (_item) {
          if (this.shop_type === _item.text) {
            _item.state = true;
          }
        }, this);
      }
    } else {

      // 第一次进入该页面, 选中的是住宅
      this.selectTypeItem(0);
    }
  },
  methods: {
    // 點擊物業現況
    buildStatusFunc: function buildStatusFunc(index) {
      var _this = this;

      this.sArr.forEach(function (_item, _index) {
        if (index === _index) {
          if (!_item.state) {
            _item.state = true;
            _this.build_status = _item.text;
          }
        } else {
          _item.state = false;
        }
      });
    },
    // 清除信息
    clearInfo: function clearInfo() {

      this.build_name = '';
      this.build_area = '';
      this.build_street = '';
      this.build_status = '';
      this.shop_type = '';
      localStorage.removeItem('sellObj');
      this.sArr.forEach(function (_item) {
        _item.state = false;
      });
      this.shopTypeData.forEach(function (_item) {
        _item.state = false;
      });
    },
    streetInputFunc: function streetInputFunc(value) {
      // 街道每次輸入完成后, 寫入街道數據到 stroe
      // window.store.commit('setPublishData', {name: 'buildStreet', content: this.testvalue})
      // window.store.commit('setSellObject', ['build_street', value])

      this.build_street = value;
    },
    goto: function goto() {},
    // 下一步按鈕運行的方法
    next: function next() {

      // location.href = 'sell_zz.html'

      if (this.isSPLX) {
        // 商铺
        if (!this.build_status || !this.build_street || !this.shop_type) {
          alert('帶*號項為必填項');
          return;
        }
      } else {
        if (!this.build_status) {
          alert('帶*號項為必填項');
          return;
        }
      }

      this.sellOjb.type = this.type;
      this.sellOjb.build_street = this.build_street;
      this.sellOjb.build_status = this.build_status;
      this.sellOjb.shop_type = this.shop_type;

      localStorage.setItem('sellObj', JSON.stringify(this.sellOjb));

      location.href = 'sell_zz.html';
    },
    // 商铺类型點擊方法
    selectShopTypeItem: function selectShopTypeItem(index) {
      var _this2 = this;

      this.shopTypeData.forEach(function (_item, _index) {

        if (index === _index) {
          _item.state = true;
          _this2.shop_type = _item.text;
        } else {
          _item.state = false;
        }
      });
    },
    // 选择类型
    selectTypeItem: function selectTypeItem(index) {
      var _this3 = this;

      if (index === 2) {
        this.isSPLX = true;
      } else {
        this.isSPLX = false;
      }

      this.typeData.forEach(function (_item, _index) {
        if (index === _index) {
          if (!_item.state) {
            _item.state = true;

            // 每次點擊類型都清空類型下面的數據
            _this3.clearInfo();
            // window.store.commit('setSellObject', ['type', _item.text])
            _this3.type = _item.text;
          }
        } else {
          _item.state = false;
        }
      });
    }
  }
});