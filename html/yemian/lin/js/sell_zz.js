'use strict';
var vm = new Vue({
  el: '#app',
  mounted: function mounted() {
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
    // if(window.WebViewJavascriptBridge){
    //   WebViewJavascriptBridge.callHandler('GetData', {
    //     content_key: 'xiaolin'
    //   });
    // }else{
    //   // 延时一秒
    // setTimeout(function () {
    //   WebViewJavascriptBridge.callHandler('GetData', {
    //     content_key: 'xiaolin'
    //   });
    // }, 1000);
    // }
  },
 computed:{
  setImg: function setImg() {
    if(this.rentobject){
    if (this.rentobject.pics != '' && this.rentobject.pics != null) {
      var str = this.rentobject.pics[0];
      
      return {
        'backgroundImage': 'url(' + str + ')'
      };
    } else { 
      return {
        'backgroundImage': 'url(./imgs/fangzu/test.png)'
      };
    }
  }
  },
  setaddImg: function setaddImg() {
    if(this.rentobject){
    if (this.rentobject.pics != '' && this.rentobject.pics != null) {
      this.iseditImg = false;
      return './imgs/fangzu/editPic.png';
    } else {
      this.iseditImg = true;
      return './imgs/fangzu/addPic.png';
    }
  }
  },
  ketingNum: function ketingNum() {
    return {
      'bordergreen': parseInt(this.keting) > 0 ? true : false
    };
  },
  xishoujianNum: function xishoujianNum() {
    return {
      'bordergreen': parseInt(this.xishoujian) > 0 ? true : false
    };
  },
 },
  methods: {
   
    addPic: function addPic() {
      console.log('添加照片');
      setDataxiaolin(this.rentobject)
      // WebViewJavascriptBridge.callHandler('SetData', {
      //   content_key: 'xiaolin',
      //   content: JSON.stringify(this.rentobject)
      // });
      location.href = 'pic.html' + location.search;
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
      this.rentobject.space = str;
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
      str = '房間:' + this.fangjian + ',客廳:' + this.keting + ',洗手間:' + this.xishoujian;
      this.rentobject.space = str;
    },

    // 樓層點擊方法
    floorClick: function floorClick(item, index) {
      // this.floor = ''
      // this.$refs.floor.value = '';
      this.ref_floor='';
      this.saveData(item, index, this.floorData, 'floor');
    },

    // 樓層自定義方法
    floorEdit: function floorEdit(value) {

      this.rentobject.floor = value;

      this.floorData.forEach(function (_item, _index) {
        _item.state = false;
      });
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
        backgroundImage: 'url(' + (item.state ? item.slcImg : item.normalImg) + ')'
      };
    },
    decorationClick: function decorationClick(item, index) {
      this.saveData(item, index, this.decorationData, 'decoration');
    },
    next: function next() {
var that=this
setDataxiaolin(this.rentobject)
      // WebViewJavascriptBridge.callHandler('SetData', {
      //   content_key: 'xiaolin',
      //   content: JSON.stringify(this.rentobject)
      // });
// 放售的住宅第二个页面发布必填:图片 售价 间隔 实用面积 建筑面积 楼层 景观 装修程度
      if (this.rentobject.pics == '' || this.rentobject.pics == null) {
        // mui.toast('照片不能為空');
        this.alerts=true;
        setTimeout(function(){
         that.alerts=false;
        },2000)
        return;
      }
// 售价 间隔 实用面积 建筑面积 楼层 景观 装修程度
      if (!this.rentobject.price ||!this.rentobject.space || !this.rentobject.useable_area && !this.rentobject.area || !this.rentobject.floor || !this.rentobject.landscape || !this.rentobject.decoration) {
       this.alerts=true;
       setTimeout(function(){
        that.alerts=false;
       },2000)
        return;
      }

      location.href = 'sell_zzd.html' + location.search;
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
            this.rentobject[saveName] = item.text;
          } else {
            _item.state = false;
            this.rentobject[saveName] = '';
          }
        } else {
          _item.state = false;
        }
      }, this);
    },

    /**
     * 取數據 公共方法
     * data : 數據源
     * getName: 字段
     */
    getData: function getData(data, getName) {
      // let str = localStorage.getItem(getName)
      var str = this.rentobject[getName];
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
    // initdata: function initdata() {
    //   // 讀取樓層 狀態
    //   // if((this.rentobject){
    //   if (this.rentobject.floor) {
    //     console.log(1231231);
    //     this.getData(this.floorData, 'floor');

    //     // 讀取樓層自定義狀態 狀態
    //     var floorStr = this.rentobject.floor;
    //     if (floorStr !== '底層' && floorStr !== '中層' && floorStr !== '高層' && floorStr !== '極高層') {
    //       this.$refs.floor.value = floorStr;
    //     }
    //   }
    // // }
    //   // 讀取間隔 狀態
    //   var str = this.rentobject.space;
    //   if (str) {
    //     // 判斷改字段是否存在數據, 存在->運行下面循環, 否則跳過循環
    //     str.split(',').forEach(function (_item, _index) {
    //       var temp = _item.substr(-1, 1);
    //       if (_index === 0) {
    //         this.fangjian = temp;
    //       } else if (_index === 1) {
    //         this.keting = temp;
    //       } else {
    //         this.xishoujian = temp;
    //       }
    //     }, this);
    //   } else {
    //     this.rentobject.space = '房間:1,客廳:0,洗手間:0';
    //   }

    //   // 讀取座向 狀態
    //   if (this.rentobject.direct) {
    //     this.getData(this.directData, 'direct');
    //   }

    //   // 讀取景觀 狀態
    //   if (this.rentobject.landscape) {
    //     this.getData(this.landscapeData, 'landscape');
    //   }

    //   // 讀取裝修程度 狀態
    //   if (this.rentobject.decoration) {
    //     this.getData(this.decorationData, 'decoration');
    //   }

    //   // this.setImg();
    //   // this.addPic();
    //   // this.setaddImg();
    //   // this.ketingNum();
    //   // this.xishoujianNum();
    // }
  },
  data: {
    ref_floor:'',
    alerts:false,//
    fangjian: 1,
    keting: 0,
    xishoujian: 0,
    fengmiantu: '',
    iseditImg: true,
    rentobject: null,
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
    }]
  }
});

function initdata() {
  // 讀取樓層 狀態
  if (vm.rentobject.floor) {
    

    // 讀取樓層自定義狀態 狀態
    var floorStr = vm.rentobject.floor;
    if (floorStr !== '低層' && floorStr !== '中層' && floorStr !== '高層' && floorStr !== '極高層') {
      // vm.$refs.floor.value = floorStr;
      vm.ref_floor=floorStr;
    }else{
      vm.getData(vm.floorData, 'floor');
    }
  }

  // 讀取間隔 狀態
  let str = vm.rentobject.space
  if (str) { // 判斷改字段是否存在數據, 存在->運行下面循環, 否則跳過循環
    str.split(',').forEach(function(_item, _index) {
      let temp = _item.substr(-1, 1)
      if (_index === 0) {
        vm.fangjian = temp
      } else if (_index === 1) {
        vm.keting = temp
      } else {
        vm.xishoujian = temp
      }
    }, vm)  
  } else {
    vm.rentobject.space = '房間:1,客廳:0,洗手間:0'
  }
  
  // 讀取座向 狀態
  if (vm.rentobject.direct) {
    vm.getData(vm.directData, 'direct')
  }
  
  // 讀取景觀 狀態
  if (vm.rentobject.landscape) {
    vm.getData(vm.landscapeData, 'landscape')
  }
  
  // 讀取裝修程度 狀態
  if (vm.rentobject.decoration) {
    vm.getData(vm.decorationData, 'decoration')
  }
}
