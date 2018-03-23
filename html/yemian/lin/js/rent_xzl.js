'use strict';
var vm = new Vue({
  el: '#app',
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
    starttime: function starttime() {
      return {
        backgroundImage: 'url(' + (this.isRent ? './imgs/fangzu/checkon.png' : './imgs/fangzu/checkoff.png') + ')'
      };
    },
    contactTypeStyle: function contactTypeStyle() {
      return {
        borderBottom: this.isContact ? 'none' : '1px solid #e6e6e6',
        paddingBottom: this.isContact ? '0' : '0.29rem'
      };
    },
    setStyle: function setStyle() {
      return {
        backgroundImage: 'url(' + (this.isRent ? './imgs/fangzu/checkon.png' : './imgs/fangzu/checkoff.png') + ')'
      };
    },
    setImg: function setImg() {
      if (this.rentobject) {
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
      if (this.rentobject) {

        if (this.rentobject.pics != '' && this.rentobject.pics != null) {
          this.iseditImg = false;
          return './imgs/fangzu/editPic.png';
        } else {
          this.iseditImg = true;
          return './imgs/fangzu/addPic.png';
        }
      }
    },

    // 用戶的電話號碼
    // userphone: function userphone() {

    //   var phone = this.rentobject.phone;

    //   if (phone) {
    //     return phone;
    //   } else {
    //     var userdata = JSON.parse(this.rentobject.userData);
    //     return userdata.phone;
    //   }
    // },

    // // 联系人
    // contacts: function contacts() {

    //   var contacts = this.rentobject.contacts;

    //   if (contacts) {
    //     return contacts;
    //   } else {
    //     var userdata = JSON.parse(this.rentobject.userData);
    //     return userdata.displayname;
    //   }
    // }
  },
  methods: {
    publish: function publish() {
      var that = this
      WebViewJavascriptBridge.callHandler('SetData', {
        content_key: 'xiaolin',
        content: JSON.stringify(this.rentobject)
      });

      // 照片
      if (this.rentobject.pics == '' || this.rentobject.pics == null) {
        // alert('照片不能為空');
        this.alerts = true;
        setTimeout(function () {
          that.alerts = false;
        }, 2000)
        return;
      }

      // 租金    楼层       发布者身份    联繁方式
      if (!this.rentobject.price || !this.rentobject.floor || !this.rentobject.from || !this.rentobject.contactType) {
        this.alerts = true;
        setTimeout(function () {
          that.alerts = false;
        }, 2000)
        return
      }

      if (this.rentobject.contactType === '1') {
        // 联繁人     联繁电话       呼称
        if (!this.rentobject.contacts || !this.rentobject.phone || !this.rentobject.call) {
          this.alerts = true;
          setTimeout(function () {
            that.alerts = false;
          }, 2000)
          return
        }
      }
      this.isending = false;
      this.$axios.post('/agent', getFormDataFun(this.rentobject)).then(function (res) {

        if (!res.message) {
          console.log('发布成功');
          WebViewJavascriptBridge.callHandler('ClearData', {
            content_key: 'huancun'
          })
          WebViewJavascriptBridge.callHandler('ClearData', {
            content_key: 'xiaolin'
          })
          WebViewJavascriptBridge.callHandler('ClearData', {
            content_key: 'xiangqingData'
          })
          goback(2);
        }
      });
    },

    setStyles: function setStyles(item) {
      return {
        backgroundImage: 'url(' + (item.state ? item.slcImg : item.normalImg) + ')'
      };
    },
    publish: function publish() {
      var _this = this;

      // console.log(this.rentobject)


      this.publishObj.publish(function (res) {
        if (!res.message) {
          _this.$router.push('HOME');
        }
      });
    },

    // 添加照片
    addPic: function addPic() {

      location.href = 'pic.html' + location.search;
    },
    next: function next(name) {
      // console.log(window.store.state.currentObject);

      // let pics = window.store.state.currentObject.pics
      // let price = window.store.state.currentObject.price
      // let useableArea = window.store.state.currentObject.useableArea
      // let area = window.store.state.currentObject.area
      // let floor = window.store.state.currentObject.floor
      // let landscape = window.store.state.currentObject.landscape
      // let decoration = window.store.state.currentObject.decoration
      // let from = window.store.state.currentObject.from
      // let contactType = window.store.state.currentObject.contactType

      // console.log(price, useableArea, area, floor, landscape, decoration)

      // if (!pics.length || !price || (!useableArea && !area) || !floor || !landscape || !decoration || !from || !contactType) {
      //     Dialog.alert({
      //         message: '帶<span>*</span>號項為必填項'
      //     })
      //     return
      // }

      // this.$router.push(name);
    },

    // 建築面積 input 輸入方法
    areaEdit: function areaEdit(value) {
      this.area = value;
      window.store.state.currentObject.area = value;
      this.useableArea = '';
      window.store.state.currentObject.useableArea = '';
    },

    // 實用面積 input 輸入方法
    useableAreaEdit: function useableAreaEdit(value) {
      this.area = '';
      window.store.state.currentObject.area = '';
      this.useableArea = value;
      window.store.state.currentObject.useableArea = value;
    },

    // 租金 input 編輯方法
    priceEdit: function priceEdit(value) {
      this.price = value;
      window.store.state.currentObject.price = value;
    },

    // 樓層點擊方法
    floorClick: function floorClick(item, index) {
      this.floor = '';
      this.saveData2(item, index, this.floorData, 'floor');
    },

    // 樓層自定義方法
    floorEdit: function floorEdit(value) {

      // 判斷第一次輸入, this.floor還是空值, 只運行一次該循環
      if (!this.floor && window.store.state.currentObject.floor) {
        // 如果點擊自定義樓層的話, 選項的樓層失效
        this.floorData.forEach(function (_item, _index) {
          _item.state = false;
        });
      }

      this.floor = value;
      window.store.state.currentObject.floor = value;
    },

    // 單位/座號 編輯方法
    codeEdit: function codeEdit(value) {
      this.code = value;
      window.store.state.currentObject.code = value;
    },

    // 景觀
    landscapeClick: function landscapeClick(item, index) {
      this.saveData2(item, index, this.landscapeData, 'landscape');
    },

    // 裝修程度
    decorationClick: function decorationClick(item, index) {
      this.saveData2(item, index, this.decorationData, 'decoration');
    },

    // 選擇可起租時間
    slcStartTime: function slcStartTime(e) {

      if (e.currentTarget.innerText === '隨時') {
        if (!this.isRent) {
          this.isRent = true;
          this.datetime = '在日曆處選擇';
          this.rentobject.start_time = '隨時';
        }
        this.DatetimePickerShow = false;
        // document.body.style.position = ''
      } else {
        this.isRent = false;
        // 彈出選擇時間框
        this.DatetimePickerShow = true;
        // document.body.style.position = 'fixed'
      }
    },

    // 確定時間
    slcTime: function slcTime(value) {

      this.datetime = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
      this.DatetimePickerShow = false;
      this.rentobject.start_time = this.datetime;
      document.body.style.position = '';
    },

    // 取消時間
    cancelTime: function cancelTime() {
      this.DatetimePickerShow = false;
      document.body.style.position = '';
    },

    // 特色说明
    featuresClick: function featuresClick(item, index) {
      this.saveData(index, this.featuresData, "features", 4);
    },

    // 發佈者身份
    fromClick: function fromClick(item, index) {

      this.rentobject.from = item.text;
    },

    //聯絡方式
    contactTypeClick: function contactTypeClick(item, index) {

      if (index === 0) {
        this.rentobject.contactType = '1'; // 电话
      } else {
        this.rentobject.contactType = '0'; // 仅在线
      }

      if (index === 1) {
        this.rentobject.call = '';
        this.rentobject.phone = '';
        this.rentobject.contacts = '';
        this.contactTypeData2.forEach(function (_item) {
          _item.state = false;
        });
      }
    },

    // 男士 小姐 太太
    contactTypeClick2: function contactTypeClick2(item, index) {

      this.rentobject.call = item.eText;

      this.contactTypeData2.forEach(function (_item, _index) {
        if (_index === index) {
          if (_item.state) {
            this.rentobject.call = '';
          }
        }
      }, this);
    },

    /**
     * data : 數據源
     * saveKey : 需要存的对象 键
     * number : 选项上限数
     */
    saveData: function saveData(index, data, saveKey, number) {
      var _this2 = this;

      console.log(this.rentobject.features);
      if (this.rentobject[saveKey]) {
        var arr = this.rentobject[saveKey].split("、");
      } else {
        var arr = [];
      }
      data.forEach(function (_item, _index) {
        if (_index === index) {
          if (!_item.state) {
            if (number) {
              if (arr.length === number) {
                return;
              }
            }
            _item.state = true;
            arr.push(_item.text);
            _this2.rentobject[saveKey] = arr.join("、");
            // console.log(arr)
          } else {
            _item.state = false;
            if (arr.indexOf(_item.text) > -1) {
              arr.splice(arr.indexOf(_item.text), 1);
              if (arr.length) {
                _this2.rentobject[saveKey] = arr.join("、");
              } else {
                _this2.rentobject[saveKey] = '';
              }
              // console.log(arr)
            }
          }
        }
      });
    },

    /**
     * data : 元数据
     * getKey : 取数据对象 键
     *
     */
    getData: function getData(data, getKey) {
      if (this.rentobject[getKey].length > 0) {
        // console.log(window.store.state.currentObject[getKey])
        var arr = [];
        arr = this.rentobject[getKey].split("、");
        data.forEach(function (_item, _index) {
          for (var key in arr) {
            if (_item.text === arr[key]) {
              _item.state = true;
            }
          }
        });
      }
    },

    /**
     * 存數據 公共方法
     * item : 存儲的對象
     * index: 下標
     * data : 數據源
     * saveName: 字段
     */
    saveData2: function saveData2(item, index, data, saveName) {
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
    getData2: function getData2(data, getName) {
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
  },
  data: function data() {
    return {
      iseditImg: true,
      alerts: false,
      isending: true,
      fangjian: 1,
      rentobject: null,
      DatetimePickerShow: false,
      minDate: new Date(),
      currentDate: new Date(),
      datetime: '在日曆處選擇',
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
      featuresData: [{
        text: "新裝修",
        bgImg: './imgs/fangzu/teseshuoming/bg_28.png',
        slcImg: './imgs/fangzu/checkon.png',
        normalImg: './imgs/fangzu/checkoff.png',
        state: false
      }, {
        text: "開揚光猛",
        bgImg: './imgs/fangzu/teseshuoming/bg_29.png',
        slcImg: './imgs/fangzu/checkon.png',
        normalImg: './imgs/fangzu/checkoff.png',
        state: false
      }, {
        text: "地點方便",
        bgImg: './imgs/fangzu/teseshuoming/bg_33.png',
        slcImg: './imgs/fangzu/checkon.png',
        normalImg: './imgs/fangzu/checkoff.png',
        state: false
      }, {
        text: "山景",
        bgImg: './imgs/fangzu/teseshuoming/bg_35.png',
        slcImg: './imgs/fangzu/checkon.png',
        normalImg: './imgs/fangzu/checkoff.png',
        state: false
      }, {
        text: "園景",
        bgImg: './imgs/fangzu/teseshuoming/bg_36.png',
        slcImg: './imgs/fangzu/checkon.png',
        normalImg: './imgs/fangzu/checkoff.png',
        state: false
      }, {
        text: "湖景",
        bgImg: './imgs/fangzu/teseshuoming/bg_37.png',
        slcImg: './imgs/fangzu/checkon.png',
        normalImg: './imgs/fangzu/checkoff.png',
        state: false
      }, {
        text: "海景",
        bgImg: './imgs/fangzu/teseshuoming/bg_38.png',
        slcImg: './imgs/fangzu/checkon.png',
        normalImg: './imgs/fangzu/checkoff.png',
        state: false
      }, {
        text: "特高樓底",
        bgImg: './imgs/fangzu/teseshuoming/bg_13.png',
        slcImg: './imgs/fangzu/checkon.png',
        normalImg: './imgs/fangzu/checkoff.png',
        state: false
      }, {
        text: "保安嚴密",
        bgImg: './imgs/fangzu/teseshuoming/bg_34.png',
        slcImg: './imgs/fangzu/checkon.png',
        normalImg: './imgs/fangzu/checkoff.png',
        state: false
      }, {
        text: "豪華大廳",
        bgImg: './imgs/fangzu/teseshuoming/bg_32.png',
        slcImg: './imgs/fangzu/checkon.png',
        normalImg: './imgs/fangzu/checkoff.png',
        state: false
      }, {
        text: "停泊方便",
        bgImg: './imgs/fangzu/teseshuoming/bg_20.png',
        slcImg: './imgs/fangzu/checkon.png',
        normalImg: './imgs/fangzu/checkoff.png',
        state: false
      }],
      fromData: [{
        text: "業主",
        slcImg: './imgs/fangzu/checkon.png',
        normalImg: './imgs/fangzu/checkoff.png',
        state: false
      }, {
        text: "轉租客",
        slcImg: './imgs/fangzu/checkon.png',
        normalImg: './imgs/fangzu/checkoff.png',
        state: false
      }],
      contactTypeData: [{
        text: "電話及在線咨詢",
        slcImg: './imgs/fangzu/checkon.png',
        normalImg: './imgs/fangzu/checkoff.png',
        state: false
      }, {
        text: "僅在線咨詢",
        slcImg: './imgs/fangzu/checkon.png',
        normalImg: './imgs/fangzu/checkoff.png',
        state: false
      }],
      contactTypeData2: [{
        text: "先生",
        slcImg: './imgs/fangzu/checkon.png',
        normalImg: './imgs/fangzu/checkoff.png',
        state: false,
        eText: 'mr'
      }, {
        text: "小姐",
        slcImg: './imgs/fangzu/checkon.png',
        normalImg: './imgs/fangzu/checkoff.png',
        state: false,
        eText: 'miss'
      }, {
        text: "太太",
        slcImg: './imgs/fangzu/checkon.png',
        normalImg: './imgs/fangzu/checkoff.png',
        state: false,
        eText: 'mrs'
      }],
      decorationData: [{
        text: "未裝修",
        slcImg: './imgs/fangzu/zhuangxiuchengdu/4+.png',
        normalImg: './imgs/fangzu/zhuangxiuchengdu/4.png',
        state: false
      }, {
        text: "簡單裝修",
        slcImg: './imgs/fangzu/zhuangxiuchengdu/3+.png',
        normalImg: './imgs/fangzu/zhuangxiuchengdu/3.png',
        state: false
      }, {
        text: "精裝修",
        slcImg: './imgs/fangzu/zhuangxiuchengdu/2+.png',
        normalImg: './imgs/fangzu/zhuangxiuchengdu/2.png',
        state: false
      }, {
        text: "豪華裝修",
        slcImg: './imgs/fangzu/zhuangxiuchengdu/1+.png',
        normalImg: './imgs/fangzu/zhuangxiuchengdu/1.png',
        state: false
      }],
      landscapeData: [{
        text: "海景",
        slcImg: './imgs/fangzu/jingguan/3+.png',
        normalImg: './imgs/fangzu/jingguan/3.png',
        state: false
      }, {
        text: "山景",
        slcImg: './imgs/fangzu/jingguan/2+.png',
        normalImg: './imgs/fangzu/jingguan/2.png',
        state: false
      }, {
        text: "園景",
        slcImg: './imgs/fangzu/jingguan/1+.png',
        normalImg: './imgs/fangzu/jingguan/1.png',
        state: false
      }, {
        text: "湖景",
        slcImg: './imgs/fangzu/jingguan/6+.png',
        normalImg: './imgs/fangzu/jingguan/6.png',
        state: false
      }, {
        text: "城市景",
        slcImg: './imgs/fangzu/jingguan/5+.png',
        normalImg: './imgs/fangzu/jingguan/5.png',
        state: false
      }, {
        text: "樓景",
        slcImg: './imgs/fangzu/jingguan/4+.png',
        normalImg: './imgs/fangzu/jingguan/4.png',
        state: false
      }],
      isContact: false,
      remark: '',
      price: '',
      code: '',
      isRent: false,
      useableArea: '',
      area: '',
      floor: '',
      fengmiantu: ''
    };
  }
});





function initdata() {

  // 讀取可起租時間 狀態
  var starttime = vm.rentobject.start_time;
  if (starttime && starttime === '隨時') {
    vm.isRent = true;
  } else if (starttime) {
    vm.datetime = starttime;
  }

  // 读取特色说明状态
  vm.getData(vm.featuresData, "features");

  // 發佈者數據 读取状态
  var fromRead = vm.rentobject.from;
  vm.fromData.forEach(function (_item, _index) {
    if (fromRead === _item.text) {
      _item.state = true;
    }
  });

  // 聯繫方式 读取状态
  if (vm.rentobject.contactType === '1') {
    var contactRead = '0';
  } else if (vm.rentobject.contactType === '0') {
    var contactRead = '1';
  }

  vm.contactTypeData.forEach(function (_item, _index) {
    if (parseInt(contactRead) === _index) {
      vm.isContact = _index === 0 ? true : false;
      _item.state = true;
    }
  }, this);

  vm.contactTypeData2.forEach(function (_item, _index) {
    if (vm.rentobject.call === _item.eText) {
      _item.state = true;
    }
  }, vm);

  // 讀取景觀 狀態
  vm.getData(vm.landscapeData, 'landscape');

  // 讀取裝修程度 狀態
  vm.getData(vm.decorationData, 'decoration');
}