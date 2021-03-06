'use strict';
// function getAppLocalData(data) {
  
//     if (data) {
//       // console.log('有值传过来', data);
//       vm.rentobject = JSON.parse(data);
//       vm.gets();
//     } else {
//       console.log('没有传值过来');
//       vm.rentobject = JSON.parse(JSON.stringify(saveObject));
//       vm.gets();
//     }
//   }
Vue.prototype.$axios = axios;

var vm=new Vue({
  el: '#app',
  created: function created() {

  },

  computed: {
    starttime: function starttime() {
      return {
        backgroundImage: 'url(' + (this.isRent ? './imgs/fangzu/checkon.png' : './imgs/fangzu/checkoff.png') + ')'
      };
    },

    // 聯繫方式 不同選項不用樣式的顯示
    contactTypeStyle: function contactTypeStyle() {
      if(this.rentobject){
      return {
        borderBottom: this.rentobject.contactType == '1' ? 'none' : '1px solid #e6e6e6',
        paddingBottom: this.rentobject.contactType == '1' ? '0' : '0.29rem'
      };
    }
  }
  },
  mounted: function mounted() {

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
  },

  methods: {
    
    // 点击发布按钮, 发布
    publish: function publish() {
var that=this;
// 3.当前是放租的 住宅第三个页面的内容
// 必填: 发布者身份 联络方式
      if (!this.rentobject.from || !this.rentobject.contactType) {
        this.alerts=true;
        setTimeout(function(){
         that.alerts=false;
        },2000)
        return 
      }
// 如果是电话及在线咨询,则下面的3个详细的东西不能少
      if (this.rentobject.contactType === '1') {

        if (!this.rentobject.contacts || !this.rentobject.phone || !this.rentobject.call) {
          this.alerts=true;
          setTimeout(function(){
           that.alerts=false;
          },2000)
          return 
        }
      }
      this.isending=false
      console.log( getFormDataFun(this.rentobject))
      // getFormDataFun(this.rentobject)
      // return
      this.$axios.post('/agent', getFormDataFun(this.rentobject)).then(function (res) {
console.log(res)
        if (res.status==true) {
          console.log('发布成功');
          // clearLocalStorages();1
          cleardata('huancun')
          cleardata('xiaolin')
          cleardata('xiangqingData')
          goback(3);
        }else{
          that.errors=true
          that.errorss=res
          setTimeout(function(){
            that.errors=false
            that.errorss='no'
          },3000)
          that.isending=true
        }
      });
    },
    next: function next(name) {

      console.log('详情预览');
      // 保存数据
      setDataxiaolin(this.rentobject)
      // WebViewJavascriptBridge.callHandler('SetData', {
      //   content_key: 'xiaolin',
      //   content: JSON.stringify(this.rentobject)
      // });
      // location.href = 'preview.html' + location.search;
      location.href = 'preview.html?sessiontoken=' + locations('sessiontoken');
    },

    // 選擇可起租時間
    slcStartTime: function slcStartTime(e) {

      console.log(e);

      if (e.currentTarget.innerText === '隨時') {
        if (!this.isRent) {
          this.isRent = true;
          this.datetime = '在日曆處選擇';
          this.rentobject.start_time = '隨時';
        }
        this.DatetimePickerShow = false;
      } else {

        console.log(123123);

        this.isRent = false;
        // 彈出選擇時間框
        this.DatetimePickerShow = true;
        // document.body.style.position = 'fixed'

        console.log('彈出選擇時間框');
      }
    },

    // 確定時間
    slcTime: function slcTime(value) {

      this.datetime = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
      this.rentobject.start_time = this.datetime;
      console.log(this.datetime);

      this.DatetimePickerShow = false;
      document.body.style.position = '';
    },

    // 取消時間
    cancelTime: function cancelTime() {
      this.DatetimePickerShow = false;
      document.body.style.position = '';
    },

    // 明火煮食
    cookClick: function cookClick(item, index) {
      // console.log(item.text)
      this.rentobject.cook = item.text;
    },

    // 飼養寵物
    petClick: function petClick(item, index) {
      this.rentobject.pet = item.text;
    },

    // 配套設備
    infrastructureClick: function infrastructureClick(item, index) {
      this.saveData(index, this.infrastructureData, "infrastructure");
    },

    // 屋苑設施
    homeInfrastructureClick: function homeInfrastructureClick(item, index) {
      this.saveData(index, this.homeInfrastructureData, "home_infrastructure");
    },

    // 附近設施
    locationInfrastructureClick: function locationInfrastructureClick(item, index) {
      this.saveData(index, this.locationInfrastructureData, "location_infrastructure");
    },

    // 特色说明
    featuresClick: function featuresClick(item, index) {
      this.saveData(index, this.featuresData, "features", 4);
    },

    // 發佈者身份
    fromClick: function fromClick(item, index) {
      // return
     console.log(index)
    //  当前用户身份是个人,如果勾选了中介,提示当前账号身份是个人
    // var that=this;
    // console.log(usermessage)
    //  if(usermessage.user_role=='base_user'){
    //     if(index==2){
    //         this.totrips1=true
    //         setTimeout(function(){
    //           that.totrips1=false
    //         },2000)
    //         for(var i=0;i< this.fromData.length;i++){
    //           this.fromData[i].state=false
    //         } 
    //         return
    //     }
    //  }else{
    //   //  当前用户身份是中介,勾选业主,转租客,提示当前账号身份是中介,如需更改,请联系客服
    //   if(index==0||index==1){
    //        this.totrips2=true
    //        setTimeout(function(){
    //         that.totrips2=false
    //       },2000)
    //       return
    //   }
    //  }
      this.rentobject.from = item.text;
    },

    //聯絡方式
    contactTypeClick: function contactTypeClick(item, index) {
      var that=this;
      if (index === 0) {
        this.rentobject.contactType = '1'; // 电话
        

      } else {
        this.rentobject.contactType = '0'; // 仅在线
      }

      if (index === 1) {
        // this.rentobject.call = '';
        // this.rentobject.phone = '';
        // this.rentobject.contacts = '';
        this.contactTypeData2.forEach(function (_item) {
          if(_item.eText==that.rentobject.call)
          _item.state = true;
        });
      }
      // if (index === 0) {
      //   this.rentobject.contactType = '1'; // 电话
      // } else {
      //   this.rentobject.contactType = '0'; // 仅在线
      // }
      // if (index === 1) {
      //   this.rentobject.call = '';
      //   this.rentobject.phone = '';
      //   this.rentobject.contacts = '';
      //   this.contactTypeData2.forEach(function (_item) {
      //     _item.state = false;
      //   });
      // }
    },

    // 男士 小姐 太太
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
     * data : 數據源
     * getName : 取数据的字段
     *
     */
    getRadioPublic: function getRadioPublic(data, getName) {
      var temp = this.rentobject[getName];
      data.forEach(function (_item, _index) {
        if (temp === _item.text) {
          _item.state = true;
        }
      });
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
     * data : 數據源
     * getKey : 取数据对象 键
     *
     */
    getData: function getData(data, getKey) {
      if (this.rentobject[getKey] != '' && this.rentobject[getKey] != null) {
        console.log(getKey)
        var arr = [];
        arr = this.rentobject[getKey].split("、");
        console.log("::::"+getKey)
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
  data: {
    totrips1:false,//个人
    totrips2:false,//中介
    errors:false,//控制后台报错的弹出框
    errorss:'no',//后台报错的数据
    alerts:false,
    isending:true,
    DatetimePickerShow: false,
    minDate: new Date(),
    currentDate: new Date(),
    isRent: false, // 控制起租單選按鈕的開關
    datetime: '在日曆處選擇',
    rentobject: null,
    // 明火煮食
    cookData: [{
      text: "可以",
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: "不可以",
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }],
    // 飼養寵物
    petData: [{
      text: "可以",
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: "不可以",
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }],
    // 配套設備
    infrastructureData: [{
      text: "床",
      bgImg: './imgs/fangzu/petaosheshi/bg_1.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: "衣櫃",
      bgImg: './imgs/fangzu/petaosheshi/bg_2.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: "梳化",
      bgImg: './imgs/fangzu/petaosheshi/bg_3.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: "雪櫃",
      bgImg: './imgs/fangzu/petaosheshi/bg_4.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: "洗衣機",
      bgImg: './imgs/fangzu/petaosheshi/bg_5.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: "冷氣",
      bgImg: './imgs/fangzu/petaosheshi/bg_6.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: "電視",
      bgImg: './imgs/fangzu/petaosheshi/bg_7.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: "焗爐",
      bgImg: './imgs/fangzu/petaosheshi/bg_8.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: "熱水爐",
      bgImg: './imgs/fangzu/petaosheshi/bg_9.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }],
    // 屋苑設施
    homeInfrastructureData: [{
      text: "電梯",
      bgImg: './imgs/fangzu/wuyuansheshi/bg_1.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: "屋苑會所",
      bgImg: './imgs/fangzu/wuyuansheshi/bg_2.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: "游泳池",
      bgImg: './imgs/fangzu/wuyuansheshi/bg_3.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: "兒童遊樂場",
      bgImg: './imgs/fangzu/wuyuansheshi/bg_4.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: "籃球場",
      bgImg: './imgs/fangzu/wuyuansheshi/bg_5.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: "羽毛球場",
      bgImg: './imgs/fangzu/wuyuansheshi/bg_6.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }],
    // 附近設施
    locationInfrastructureData: [{
      text: "巴士站",
      bgImg: './imgs/fangzu/fujinsheshi/bg_1.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: "便利店",
      bgImg: './imgs/fangzu/fujinsheshi/bg_2.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: "超級市場",
      bgImg: './imgs/fangzu/fujinsheshi/bg_3.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: "街市",
      bgImg: './imgs/fangzu/fujinsheshi/bg_4.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: "銀行",
      bgImg: './imgs/fangzu/fujinsheshi/bg_5.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: "公共停車場",
      bgImg: './imgs/fangzu/fujinsheshi/bg_6.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }],
    // 特色說明
    featuresData: [{
      text: "活化工廈",
      bgImg: './imgs/fangzu/teseshuoming/bg_27.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
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
      text: "特高樓底",
      bgImg: './imgs/fangzu/teseshuoming/bg_13.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: "有落貨區",
      bgImg: './imgs/fangzu/teseshuoming/bg_30.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: "有貨物電梯",
      bgImg: './imgs/fangzu/teseshuoming/bg_31.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: "停泊方便",
      bgImg: './imgs/fangzu/teseshuoming/bg_20.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: "設備齊全",
      bgImg: './imgs/fangzu/teseshuoming/bg_32.png',
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
      text: "保安嚴密",
      bgImg: './imgs/fangzu/teseshuoming/bg_34.png',
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }],
    // 發佈者
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
    },
    {
      text: "中介",
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }
  ],
    // 聯繫方式
    contactTypeData: [{
      text: "電話及在線諮詢",
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }, {
      text: "僅在線諮詢",
      slcImg: './imgs/fangzu/checkon.png',
      normalImg: './imgs/fangzu/checkoff.png',
      state: false
    }],
    // 聯繫方式子項, 先生, 小姐, 女士 
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
    }]

  }
});


function initdata(){
    // 讀取明火煮食 狀態
vm.getRadioPublic(vm.cookData, 'cook');

  // 讀取飼養寵物 狀態
  vm.getRadioPublic(vm.petData, 'pet');

  // 讀取可起租時間 狀態
  var starttime = vm.rentobject.start_time;
  if (starttime && starttime === '隨時') {
    vm.isRent = true;
  } else if (starttime) {
    vm.datetime = starttime;
  }
  // 讀取配套設備 狀態
  vm.getData(vm.infrastructureData, "infrastructure");

  // 讀取屋苑設施 狀態
  vm.getData(vm.homeInfrastructureData, "home_infrastructure");

  // 讀取附近設施 狀態
  vm.getData(vm.locationInfrastructureData, "location_infrastructure");

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
      _item.state = true;
    }
  }, vm);

  vm.contactTypeData2.forEach(function (_item, _index) {
    if (vm.rentobject.call === _item.eText) {
      _item.state = true;
    }
  }, vm);

}