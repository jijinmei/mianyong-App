"use strict";

new Vue({
  el: '#app',
  data: {
    // 數據源 --- 樓層
    floorData: [{
      text: "低層",
      state: false
    }, {
      text: "中層",
      state: false
    }, {
      text: "高層",
      state: false
    }, {
      text: "極高層",
      state: false
    }],
    // 數據源 --- 座向
    directData: [{
      text: "東",
      state: false
    }, {
      text: "南",
      state: false
    }, {
      text: "西",
      state: false
    }, {
      text: "北",
      state: false
    }, {
      text: "東南",
      state: false
    }, {
      text: "西南",
      state: false
    }, {
      text: "東北",
      state: false
    }, {
      text: "西北",
      state: false
    }],
    // 數據源 --- 景觀
    landscapeData: [{
      text: "海景",
      slcImg: "./imgs/fangzu/jingguan/3+.png",
      normalImg: "./imgs/fangzu/jingguan/3.png",
      state: false
    }, {
      text: "山景",
      slcImg: "./imgs/fangzu/jingguan/2+.png",
      normalImg: "./imgs/fangzu/jingguan/2.png",
      state: false
    }, {
      text: "園景",
      slcImg: "./imgs/fangzu/jingguan/1+.png",
      normalImg: "./imgs/fangzu/jingguan/1.png",
      state: false
    }, {
      text: "湖景",
      slcImg: "./imgs/fangzu/jingguan/6+.png",
      normalImg: "./imgs/fangzu/jingguan/6.png",
      state: false
    }, {
      text: "城市景",
      slcImg: "./imgs/fangzu/jingguan/5+.png",
      normalImg: "./imgs/fangzu/jingguan/5.png",
      state: false
    }, {
      text: "樓景",
      slcImg: "./imgs/fangzu/jingguan/4+.png",
      normalImg: "./imgs/fangzu/jingguan/4.png",
      state: false
    }],
    // 數據源 --- 裝修程度
    decorationData: [{
      text: "未裝修",
      slcImg: "./imgs/fangzu/zhuangxiuchengdu/4+.png",
      normalImg: "./imgs/fangzu/zhuangxiuchengdu/4.png",
      state: false
    }, {
      text: "簡單裝修",
      slcImg: "./imgs/fangzu/zhuangxiuchengdu/3+.png",
      normalImg: "./imgs/fangzu/zhuangxiuchengdu/3.png",
      state: false
    }, {
      text: "精裝修",
      slcImg: "./imgs/fangzu/zhuangxiuchengdu/2+.png",
      normalImg: "./imgs/fangzu/zhuangxiuchengdu/2.png",
      state: false
    }, {
      text: "豪華裝修",
      slcImg: "./imgs/fangzu/zhuangxiuchengdu/1+.png",
      normalImg: "./imgs/fangzu/zhuangxiuchengdu/1.png",
      state: false
    }],
    // 數據源 --- 樓層
    price: '', // 租金 臨時存儲
    code: '', // 單位/座號 臨時儲存
    floor: '', // 自定義樓層 臨時儲存
    useableArea: '', // 實際面積
    area: '', // 建築面積
    fangjian: 1,
    keting: 0,
    xishoujian: 0,
    fengmiantu: '',
    iseditImg: true
  },
  mounted: function mounted() {

    // 讀取租金
    if (localStorage.price) {
      this.price = localStorage.price;
    }

    // 讀取間隔 狀態
    var str = localStorage.space;
    if (str) {
      // 判斷改字段是否存在數據, 存在->運行下面循環, 否則跳過循環
      str.split(',').forEach(function (_item, _index) {
        var temp = _item.substr(-1, 1);
        if (_index === 0) {
          this.fangjian = temp;
        } else if (_index === 1) {
          this.keting = temp;
        } else {
          this.xishoujian = temp;
        }
      }, this);
    } else {
      localStorage.space = '房間:1,客廳:0,洗手間:0';
    }

    // 讀取面積 狀態
    if (localStorage.useableArea) {

      this.useableArea = localStorage.useableArea;
    }
    if (localStorage.useableArea) {

      this.area = localStorage.area;
    }

    // 讀取樓層 狀態
    if (localStorage.floor) {
      this.getData(this.floorData, 'floor');

      // 讀取樓層自定義狀態 狀態
      var floorStr = localStorage.floor;
      if (floorStr !== '底層' && floorStr !== '中層' && floorStr !== '高層' && floorStr !== '極高層') {
        this.floor = floorStr;
      }
    }

    // 讀取單位/座號 狀態
    if (localStorage.code) {
      this.code = localStorage.code;
    }

    // 讀取座向 狀態
    if (localStorage.direct) {
      this.getData(this.directData, 'direct');
    }

    // 讀取景觀 狀態
    if (localStorage.landscape) {
      this.getData(this.landscapeData, 'landscape');
    }

    // 讀取裝修程度 狀態
    if (localStorage.decoration) {
      this.getData(this.decorationData, 'decoration');
    }
  },

  computed: {
    setImg: function setImg() {
      if (localStorage.fengmian) {
        return {
          backgroundImage: "url(" + localStorage.fengmian + ")"
        };
      } else {
        return {
          backgroundImage: "url(../imgs/fangzu/test.png)"
        };
      }
    },
    setaddImg: function setaddImg() {
      if (localStorage.fengmian) {
        this.iseditImg = false;
        return '../imgs/fangzu/editPic.png';
      } else {
        this.iseditImg = true;
        return '../imgs/fangzu/addPic.png';
      }
    },
    ketingNum: function ketingNum() {
      return { 'bordergreen': parseInt(this.keting) > 0 ? true : false };
    },
    xishoujianNum: function xishoujianNum() {
      return { 'bordergreen': parseInt(this.xishoujian) > 0 ? true : false };
    }
  },
  methods: {
    addPic: function addPic() {},
    priceEdit: function priceEdit(val) {
      this.price = val;
      if (val > 0) {
        localStorage.price = val;
      } else {
        localStorage.removeItem('price');
      }
    },

    // 添加 --- 間隔
    AddRoomClick: function AddRoomClick(room) {
      var str = '';
      if (room === 'f') {
        this.fangjian++;
      } else if (room === 'k') {
        this.keting++;
      } else {
        this.xishoujian++;
      }
      str = '房間:' + this.fangjian + ',客廳:' + this.keting + ',洗手間:' + this.xishoujian;
      localStorage.space = str;
    },

    // 減少 --- 間隔
    CutRoomClick: function CutRoomClick(room) {
      var str = '';
      if (room === 'f') {
        if (this.fangjian <= 1) {
          return;
        }
        this.fangjian--;
      } else if (room === 'k') {
        if (this.keting <= 0) {
          return;
        }
        this.keting--;
      } else {
        if (this.xishoujian <= 0) {
          return;
        }
        this.xishoujian--;
      }
      str = '房間:' + this.fangjian + ',客廳' + this.keting + ',洗手間' + this.xishoujian;
      localStorage.space = str;
    },

    // 建築面積 input 輸入方法
    areaEdit: function areaEdit(value) {
      localStorage.removeItem('useableArea');
      this.useableArea = '';
      this.area = value;
      localStorage.area = value;
      if (value <= 0) {
        localStorage.removeItem('area');
      }
    },

    // 實用面積 input 輸入方法
    useableAreaEdit: function useableAreaEdit(value) {
      localStorage.removeItem('area');
      this.area = '';
      this.useableArea = value;
      localStorage.useableArea = value;
      if (value <= 0) {
        localStorage.removeItem('useableArea');
      }
    },

    // 樓層點擊方法
    floorClick: function floorClick(item, index) {
      this.floor = '';
      this.saveData(item, index, this.floorData, 'floor');
    },

    // 樓層自定義方法
    floorEdit: function floorEdit(value) {

      if (value.length > 0) {

        this.floorData.forEach(function (_item, _index) {
          _item.state = false;
        });

        this.floor = value;
        localStorage.floor = value;
      } else {

        this.floor = '';
        localStorage.removeItem('floor');
      }
    },

    // 單位/座號
    codeEdit: function codeEdit(value) {
      this.code = value;
      if (value.length > 0) {
        localStorage.code = value;
      } else {
        localStorage.removeItem('code');
      }
    },

    // 座向
    directClick: function directClick(item, index) {
      this.saveData(item, index, this.directData, 'direct');
    },

    // 景觀
    landscapeClick: function landscapeClick(item, index) {
      this.saveData(item, index, this.landscapeData, 'landscape');
    },
    setStyle: function setStyle(item) {
      return {
        backgroundImage: "url(" + (item.state ? item.slcImg : item.normalImg) + ")"
      };
    },
    decorationClick: function decorationClick(item, index) {
      this.saveData(item, index, this.decorationData, 'decoration');
    },
    next: function next() {

      // let pics = localStorage.pics
      var price = localStorage.price;
      var space = localStorage.space;
      var useableArea = localStorage.useableArea;
      var area = localStorage.area;
      var floor = localStorage.floor;
      var landscape = localStorage.landscape;
      var decoration = localStorage.decoration;

      // let direct = localStorage.direct
      // let code = localStorage.code

      console.log(price, space, useableArea, area, floor, landscape, decoration);

      if (!price || !useableArea && !area || !floor || !landscape || !decoration) {
        alert('帶<span>*</span>號項為必填項');
        return;
      }

      location.href = 'rent_zzd.html';
    },

    /**
     * 存數據 公共方法
     * item : 存儲的對象
     * index: 下標
     * data : 數據源
     * saveName: 字段
     */
    saveData: function saveData(item, index, data, saveName) {
      data.forEach(function (_item, _index) {
        if (index === _index) {
          if (!_item.state) {
            _item.state = true;
            localStorage.setItem(saveName, item.text);
          } else {
            _item.state = false;
            localStorage.removeItem(saveName);
          }
        } else {
          _item.state = false;
        }
      });
    },

    /**
     * 取數據 公共方法
     * data : 數據源
     * getName: 字段
     */
    getData: function getData(data, getName) {
      var str = localStorage.getItem(getName);
      // 判斷是否存在該數據, 否則, 退出後面的循環, 性能優化
      if (!str) {
        return;
      }
      data.forEach(function (_item, _index) {
        if (str === _item.text) {
          _item.state = true;
          return true;
        } else {
          return false;
        }
      });
    }
  }
});