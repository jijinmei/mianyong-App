'use strict';

Vue.prototype.$axios = axios;

var vm = new Vue({
  el: '#app',
  created: function created() {
    // this.rentobject = JSON.parse(JSON.stringify(saveObject));
  },

  computed: {
    starttime: function starttime() {
      return {
        backgroundImage: 'url(' + (this.isRent ? './imgs/fangzu/checkon.png' : './imgs/fangzu/checkoff.png') + ')'
      };
    },
    setStyle: function setStyle() {
      return {
        backgroundImage: 'url(' + (isRent ? './imgs/fangzu/checkon.png' : './imgs/fangzu/checkoff.png') + ')'
      };
    },
    contactTypeStyle: function contactTypeStyle() {
      return {
        borderBottom: this.rentobject.contactType == '1' ? 'none' : '1px solid #e6e6e6',
        paddingBottom: this.rentobject.contactType == '1' ? '0' : '0.29rem'
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
    }
    ,
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
    // WebViewJavascriptBridge.callHandler('GetData', {
    //   content_key: 'xiaolin'
    // });
  },

  methods: {
    // 下一步
    next: function next(name) {

      WebViewJavascriptBridge.callHandler('SetData', {
        content_key: 'xiaolin',
        content: JSON.stringify(this.rentobject)
      });

      console.log('详情预览');
      location.href = 'preview.html' + location.search;
    },
    publish: function publish() {
      var that = this
      WebViewJavascriptBridge.callHandler('SetData', {
        content_key: 'xiaolin',
        content: JSON.stringify(this.rentobject)
      });
// 放租的车位发布必填为:图片 租金 楼层 发布者身份 联络方式
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
// 如果为电话及在线咨询 则下面3个不为空
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
      // console.log('this.rentobject.category')
      // console.log(this.rentobject.category)
      // return
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
           // 跳转到查看租盘页面
          //  window.location.href="../xiangqing/liebiaoZu.html"+location.search;
        }
      });
    },

    // 添加照片
    addPic: function addPic() {
      WebViewJavascriptBridge.callHandler('SetData', {
        content_key: 'xiaolin',
        content: JSON.stringify(this.rentobject)
      });
      location.href = 'pic.html' + location.search;
    },

    // 顯示樓層 彈出層
    isShow: function isShow() {
      this.showLouceng = !this.showLouceng;
      // document.body.style.position = 'fixed'
    },

    // 樓層彈出層組件點擊方法 --- 點擊樓層賦值給 input
    floorClick: function floorClick(value) {
      console.log(value);
      this.showLouceng = !this.showLouceng;
      this.rentobject.floor = value;
      // document.body.style.position = ''
      // this.floorValue = value
      // localStorage.floor = value
    },

    // 車位編號
    codeEdit: function codeEdit(value) {
      this.code = value;
      // localStorage.code = value
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
    radioPublic: function radioPublic(item, index, data, saveName) {
      data.forEach(function (_item, _index) {
        if (_index === index) {
          if (!_item.state) {
            _item.state = true;
            this.rentobject[saveName] = _item.text; // 存數據
          } else {
            _item.state = false;
            this.rentobject[saveName] = ''; // 存數據
          }
        } else {
          _item.state = false;
        }
      }, this);
    },

    /**
     * data : 數據源
     * saveKey : 需要存的对象 键
     * number : 选项上限数
     */
    saveData: function saveData(index, data, saveKey, number) {
      var _this = this;

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
            _this.rentobject[saveKey] = arr.join("、");
            // console.log(arr)
          } else {
            _item.state = false;
            if (arr.indexOf(_item.text) > -1) {
              arr.splice(arr.indexOf(_item.text), 1);
              if (arr.length) {
                _this.rentobject[saveKey] = arr.join("、");
              } else {
                _this.rentobject[saveKey] = '';
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
      if (this.rentobject[getKey]) {
        // console.log(localStorage[getKey])
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
    }
  },
  data: function data() {
    return {
      alerts: false,
      isending: true,
      DatetimePickerShow: false,
      minDate: new Date(),
      currentDate: new Date(),
      isContact: false, // 控制是否顯示聯繫方式的子項, 先生, 小姐, 女士的DIV塊的顯示
      isRent: false, // 控制起租 單選按鈕的開關
      showLouceng: false, // 顯示樓層
      datetime: '在日曆處選擇',
      rentobject: null,
      // 數據源 --- 特色說明
      featuresData: [{
        text: "有蓋",
        bgImg: "./imgs/fangzu/teseshuoming/bg_1.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "無蓋",
        bgImg: "./imgs/fangzu/teseshuoming/bg_2.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "大車位",
        bgImg: "./imgs/fangzu/teseshuoming/bg_3.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "可泊七人位",
        bgImg: "./imgs/fangzu/teseshuoming/bg_4.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "孖車位",
        bgImg: "./imgs/fangzu/teseshuoming/bg_5.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "極好泊",
        bgImg: "./imgs/fangzu/teseshuoming/bg_6.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "有監控",
        bgImg: "./imgs/fangzu/teseshuoming/bg_7.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }],
      // 數據源 --- 發佈者
      fromData: [{
        text: "業主",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "轉租客",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }],
      // 數據源 --- 聯絡方式
      contactTypeData: [{
        text: "電話及在線咨詢",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "僅在線咨詢",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }],
      // 數據源 --- 聯絡方式子項: 先生, 小姐, 太太
      contactTypeData2: [{
        text: "先生",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false,
        eText: 'mr'
      }, {
        text: "小姐",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false,
        eText: 'miss'
      }, {
        text: "太太",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false,
        eText: 'mrs'
      }],
      floordata: [{
        text: '負10層'
      }, {
        text: '負9層'
      }, {
        text: '負8層'
      }, {
        text: '負7層'
      }, {
        text: '負6層'
      }, {
        text: '負5層'
      }, {
        text: '負4層'
      }, {
        text: '負3層'
      }, {
        text: '負2層'
      }, {
        text: '負1層'
      }, {
        text: '1層'
      }, {
        text: '2層'
      }, {
        text: '3層'
      }, {
        text: '4層'
      }, {
        text: '5層'
      }, {
        text: '6層'
      }, {
        text: '7層'
      }, {
        text: '8層'
      }, {
        text: '9層'
      }, {
        text: '10層'
      }]
    };
  }
});

// 延时一秒
// setTimeout(function () {


// }, 50)


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
  }, vm);

  vm.contactTypeData2.forEach(function (_item, _index) {
    if (vm.rentobject.call === _item.eText) {
      _item.state = true;
    }
  });
}

// vm.$watch('rentobject', function() {      
//   console.log('保存数据...', newVal)
//   WebViewJavascriptBridge.callHandler('SetData', {
//     content_key: 'xiaolin',
//     content: JSON.stringify(this.rentobject)
//   })
// }, {
//   deep: true
// })