'use strict';

Vue.prototype.$axios = axios;
var vm=new Vue({
  el: '#app',
  created: function created() {

  },
  computed: {
    setstyle: function setstyle() {
      return {
        'backgroundImage': 'url(' + (this.isRent ? './imgs/fangzu/checkon.png' : './imgs/fangzu/checkoff.png') + ')'
      };
    },
    contactTypeStyle: function contactTypeStyle() {
      return {
        'borderBottom': this.isContact ? 'none' : '1px solid #e6e6e6',
        'paddingBottom': this.isContact ? '0' : '0.29rem'
      };
    },
    setImg: function setImg() {
      if (this.rentobject.fengmiantu) {
        return {
          'backgroundImage': 'url(' + this.rentobject.fengmiantu + ')'
        };
      } else {
        return {
          'backgroundImage': 'url(\'./imgs/fangzu/test.png\')'
        };
      }
    },
    setaddImg: function setaddImg() {
      if (this.rentobject.fengmiantu) {
        return './imgs/fangzu/editPic.png';
      } else {
        return './imgs/fangzu/addPic.png';
      }
    },
    iseditImg: function iseditImg() {
      if (this.rentobject.fengmiantu) {
        return false;
      } else {
        return true;
      }
    },

    // 用戶的電話號碼
    userphone: function userphone() {

      //   let phone = window.store.state.userData.phone

      //   if(phone) {
      //     return phone
      //   } else {
      //     let userdata = JSON.parse(this.rentobject.userData)
      //     return userdata.phone
      //   }
    },

    // 联系人
    contacts: function contacts() {

      //   let contacts = window.store.state.currentObject.contacts

      //   if (contacts) {
      //     return contacts
      //   } else {    
      //     let userdata = JSON.parse(this.rentobject.userData)
      //     return userdata.displayname
      //   }
    }
  },
  mounted: function mounted() {
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
  
  },

  methods: {
    gets(){
          // 讀取可起租時間 狀態
    var starttime = this.rentobject.start_time;
    if (starttime && starttime === '隨時') {
      this.isRent = true;
    } else if (starttime) {
      this.datetime = starttime;
    }

    // 裝修程度 讀取狀態
    this.getData2(this.decorationData, "decoration");

    // 读取特色说明状态
    this.getData(this.featuresData, "features");

    // 發佈者數據 读取状态
    var fromRead = this.rentobject.from;
    this.fromData.forEach(function (_item, _index) {
      if (fromRead === _item.text) {
        _item.state = true;
      }
    });

    // 聯繫方式 读取状态
    if (this.rentobject.contactType === '1') {
      var contactRead = '0';
    } else if (this.rentobject.contactType === '0') {
      var contactRead = '1';
    }
    this.contactTypeData.forEach(function (_item, _index) {
      if (parseInt(contactRead) === _index) {
        _item.state = true;
      }
    }, this);

    this.contactTypeData2.forEach(function (_item, _index) {
      if (this.rentobject.call === _item.eText) {
        _item.state = true;
      }
    }, this);
    },
    publish: function publish() {
var that=this;
      if (!this.rentobject.from || !this.rentobject.contactType) {
        this.alerts=true;
        setTimeout(function(){
         that.alerts=false;
        },2000)
        return 
      }

      if (this.rentobject.contactType === '1') {

        if (!this.rentobject.contacts || !this.rentobject.phone || !this.rentobject.call) {
          this.alerts=true;
          setTimeout(function(){
           that.alerts=false;
          },2000)
          return 
        }
      }
      this.isending=false;
      this.$axios.post('/agent', getFormDataFun(this.rentobject)).then(function (res) {

        if (!res.message) {
          console.log('发布成功');
          // clearthis.rentobjects();
          WebViewJavascriptBridge.callHandler('ClearData', {
            content_key: 'huancun'
          })
          WebViewJavascriptBridge.callHandler('ClearData', {
            content_key: 'xiaolin'
          })
          WebViewJavascriptBridge.callHandler('ClearData', {
            content_key: 'xiangqingData'
          })
          goback(3);
        }
      });
    },

    // 添加照片
    addPic: function addPic() {},

    // 下一步
    next: function next(name) {

      console.log('详情预览');
      location.href = 'preview.html' + location.search;
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
        document.body.style.position = '';
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

    // 裝修程度
    decorationClick: function decorationClick(item, index) {
      this.saveData2(item, index, this.decorationData, 'decoration');
    },

    // 特色说明
    featuresClick: function featuresClick(item, index) {
      // console.log(item, index)
      this.saveData(index, this.featuresData, "features", 4);
    },

    // 發佈者身份
    fromClick: function fromClick(item, index) {
      this.rentobject.from = item.text;
    },
    setStyle: function setStyle(item) {
      return {
        backgroundImage: 'url(' + (item.state ? item.slcImg : item.normalImg) + ')'
      };
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

    // 男士女士
    contactTypeClick2: function contactTypeClick2(item, index) {

      this.rentobject.call = item.eText;

      this.contactTypeData2.forEach(function (_item, _index) {
        if (index === _index) {
          if (item.state) {
            this.rentobject.call = '';
          }
        }
      }, this);
    },

    /**
     * data : 元数据
     * saveKey : 需要存的对象 键
     * number : 选项上限数
     */
    saveData: function saveData(index, data, saveKey, number) {
      var this = this;

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
            this.rentobject[saveKey] = arr.join("、");
            // console.log(arr)
          } else {
            _item.state = false;
            if (arr.indexOf(_item.text) > -1) {
              arr.splice(arr.indexOf(_item.text), 1);
              this.rentobject[saveKey] = arr.join("、");
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
      rentobject: null,
      alerts:false,
      isending:true,
      rentobject: null,
      isContact: false,
      remark: '',
      price: '',
      code: '',
      isRent: false,
      area: '',
      useableArea: '',
      fengmiantu: '',
      DatetimePickerShow: false,
      minDate: new Date(),
      currentDate: new Date(),
      datetime: '在日曆處選擇',
      featuresData: [{
        text: "全新裝修",
        bgImg: "./imgs/fangzu/teseshuoming/bg_8.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "人流極旺",
        bgImg: "./imgs/fangzu/teseshuoming/bg_9.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "單邊旺鋪",
        bgImg: "./imgs/fangzu/teseshuoming/bg_10.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "超寬門面",
        bgImg: "./imgs/fangzu/teseshuoming/bg_11.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "罕有巨鋪",
        bgImg: "./imgs/fangzu/teseshuoming/bg_12.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "特高樓底",
        bgImg: "./imgs/fangzu/teseshuoming/bg_13.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "有閣",
        bgImg: "./imgs/fangzu/teseshuoming/bg_14.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "全閣",
        bgImg: "./imgs/fangzu/teseshuoming/bg_15.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "一平面",
        bgImg: "./imgs/fangzu/teseshuoming/bg_16.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "有水源",
        bgImg: "./imgs/fangzu/teseshuoming/bg_17.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "有生財工具",
        bgImg: "./imgs/fangzu/teseshuoming/bg_18.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "可長租",
        bgImg: "./imgs/fangzu/teseshuoming/bg_19.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "停泊方便",
        bgImg: "./imgs/fangzu/teseshuoming/bg_20.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "合各行各業",
        bgImg: "./imgs/fangzu/teseshuoming/bg_21.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "有勞工額",
        bgImg: "./imgs/fangzu/teseshuoming/bg_22.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "有飲食牌",
        bgImg: "./imgs/fangzu/teseshuoming/bg_23.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "豪宅旺區",
        bgImg: "./imgs/fangzu/teseshuoming/bg_24.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "民生旺區",
        bgImg: "./imgs/fangzu/teseshuoming/bg_25.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }, {
        text: "旅遊旺區",
        bgImg: "./imgs/fangzu/teseshuoming/bg_26.png",
        slcImg: "./imgs/fangzu/checkon.png",
        normalImg: "./imgs/fangzu/checkoff.png",
        state: false
      }],
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
    };
  }
});