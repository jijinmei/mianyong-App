'use strict';

new Vue({
  el: '#app',
  created: function created() {

    // this.rentobject = JSON.parse(localStorage.getItem('rentobject'))


    if (localStorage.getItem('rentobject')) {
      this.rentobject = JSON.parse(localStorage.getItem('rentobject'));
    } else {
      this.rentobject = JSON.parse(JSON.stringify(saveObject));
    }
  },

  watch: {
    rentobject: {
      handler: function handler(newVal) {
        localStorage.setItem('rentobject', JSON.stringify(newVal));
      },
      deep: true
    }
  },
  mounted: function mounted() {

    // 讀取樓層 狀態
    if (this.rentobject.floor) {
      this.getData(this.floorData, 'floor');

      // 讀取樓層自定義狀態 狀態
      var floorStr = this.rentobject.floor;
      if (floorStr !== '底層' && floorStr !== '中層' && floorStr !== '高層' && floorStr !== '極高層') {
        this.$refs.floor.value = floorStr;
      }
    }

    // 讀取可起租時間 狀態
    var starttime = this.rentobject.start_time;
    if (starttime && starttime === '隨時') {
      this.isRent = true;
    } else if (starttime) {
      this.datetime = starttime;
    }

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
        this.isContact = _index === 0 ? true : false;
        _item.state = true;
      }
    }, this);

    this.contactTypeData2.forEach(function (_item, _index) {
      if (this.rentobject.call === _item.eText) {
        _item.state = true;
      }
    }, this);

    // 讀取景觀 狀態
    this.getData(this.landscapeData, 'landscape');

    // 讀取裝修程度 狀態
    this.getData(this.decorationData, 'decoration');
  },

  computed: {
    starttime: function starttime() {
      return {
        backgroundImage: 'url(' + (this.isRent ? './imgs/fangzu/checkon.png' : './imgs/fangzu/checkoff.png') + ')'
      };
    },

    // 聯繫方式 不同選項不用樣式的顯示
    contactTypeStyle: function contactTypeStyle() {
      return {
        borderBottom: this.rentobject.contactType == '1' ? 'none' : '1px solid #e6e6e6',
        paddingBottom: this.rentobject.contactType == '1' ? '0' : '0.29rem'
      };
    },
    setStyle: function setStyle() {
      return {
        backgroundImage: 'url(' + (this.isRent ? './imgs/fangzu/checkon.png' : './imgs/fangzu/checkoff.png') + ')'
      };
    },
    setImg: function setImg() {
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
    },
    setaddImg: function setaddImg() {
      if (this.rentobject.pics != '' && this.rentobject.pics != null) {
        this.iseditImg = false;
        return './imgs/fangzu/editPic.png';
      } else {
        this.iseditImg = true;
        return './imgs/fangzu/addPic.png';
      }
    },

    // 用戶的電話號碼
    userphone: function userphone() {

      var phone = this.rentobject.phone;

      if (phone) {
        return phone;
      } else {
        var userdata = JSON.parse(localStorage.userData);
        return userdata.phone;
      }
    },

    // 联系人
    contacts: function contacts() {

      var contacts = this.rentobject.contacts;

      if (contacts) {
        return contacts;
      } else {
        var userdata = JSON.parse(localStorage.userData);
        return userdata.displayname;
      }
    }
  },
  methods: {
    setStyles: function setStyles(item) {
      return {
        backgroundImage: 'url(' + (item.state ? item.slcImg : item.normalImg) + ')'
      };
    },
    publish: function publish() {
      // this.publishObj.publish(res => {
      //   if (!res.message) {
      //     this.$router.push('HOME')
      //   }
      // })

    },

    // 添加照片
    addPic: function addPic() {

      location.href = 'pic.html' + location.search;
    },
    next: function next(name) {

      console.log('详情预览');
      location.href = 'preview.html' + location.search;
    },

    // 樓層點擊方法
    floorClick: function floorClick(item, index) {
      this.$refs.floor.value = '';
      this.saveData2(item, index, this.floorData, 'floor');
    },

    // 樓層自定義方法
    floorEdit: function floorEdit(value) {

      this.rentobject.floor = value;

      this.floorData.forEach(function (_item, _index) {
        _item.state = false;
      });
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
      var _this = this;

      console.log(saveKey);
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
      isRent: false,
      floor: '',
      fengmiantu: ''
    };
  }
});