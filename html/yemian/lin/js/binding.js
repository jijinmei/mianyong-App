'use strict';

Vue.prototype.$axios = axios;
new Vue({
  el: '#app',
  mounted: function mounted() {
    console.log(this.sessiontoken);
  },

  computed: {
    bgImg: function bgImg() {
      if (this.isTrue) {
        return {
          backgroundImage: 'url(\'./imgs/login/01.png\')',
          backgroundSize: '0.35rem 0.33rem'
        };
      } else {
        return {
          backgroundImage: 'url(\'./imgs/login/02.png\')',
          backgroundSize: '0.26rem 0.26rem'
        };
      }
    }
  },
  methods: {
    // 獲取驗證碼
    getCode: function getCode() {

      if (this.phone) {
        this.$axios.post(this.api.bdverify, {
          phone: this.phone,
          isdebug: '1', // 1:返回驗證碼用於調試,0或其他不返回驗證碼
          sessiontoken: this.sessiontoken
        }).then(function (res) {
          console.log(res);
        });
      }
    },

    // 稱呼: mr=先生 mrs=太太 miss=女士
    peoplesClick: function peoplesClick(item, index) {

      this.call = item.text === '先生' ? 'mr' : item.text === '太太' ? 'mrs' : 'miss';

      this.peoples.forEach(function (_item, _index) {
        if (_index === index) {
          if (!_item.state) {
            _item.state = true;
          }
        } else {
          _item.state = false;
        }
      });
    },
    peoplesBgimg: function peoplesBgimg(item) {
      if (item.state) {
        return {
          backgroundImage: 'url(\'./imgs/fangzu/checkon.png\')'
        };
      } else {
        return {
          backgroundImage: 'url(\'./imgs/fangzu/checkoff.png\')'
        };
      }
    },
    agentClick: function agentClick(item, index) {

      if (index === 1) {
        this.agent = 'estate_agent';
      } else {
        this.agent = 'base_user';
      }
      this.agentData.forEach(function (_item, _index) {
        if (_index === index) {
          if (!_item.state) {
            _item.state = true;
          }
        } else {
          _item.state = false;
        }
      });
    },
    vpassword: function vpassword() {

      if (this.password && this.verifyPassword) {
        if (this.password === this.verifyPassword) {
          this.isTrue = true;
          this.showSpan = true;
        } else {
          this.isTrue = false;
        }
      }

      if (this.verifyPassword.length === 0) {
        this.showSpan = false;
      }
    },

    // 確認按鈕
    confirmClick: function confirmClick() {
      var _this = this;

      console.log(this.phone, this.password, this.verifyPassword, this.verifycode, this.displayname, this.call, this.agent);

      if (this.phone && this.password && this.verifyPassword && this.verifycode && this.displayname && this.call) {
        if (this.isTrue) {
          this.$axios.post(this.api.binding, {
            phone: this.phone,
            password: this.password,
            verifycode: this.verifycode,
            call: this.call,
            displayname: this.displayname,
            sessiontoken: localStorage.getItem('sessiontoken')
          }).then(function (res) {
            console.log(res);

            if (!res.message) {
              Dialog.alert({
                message: '綁定成功'
              }).then(function () {
                _this.$router.go(-1);
              });
            } else {
              Dialog.alert({
                message: res.message
              }).then(function () {
                // do someting
              });
            }
          });
        }
      }
    }
  },
  data: function data() {
    return {
      peoples: [{
        text: "太太",
        slcImg: '../imgs/fangzu/checkon.png',
        normalImg: '../imgs/fangzu/checkoff.png',
        state: false
      }, {
        text: "小姐",
        slcImg: '../imgs/fangzu/checkon.png',
        normalImg: '../imgs/fangzu/checkoff.png',
        state: false
      }, {
        text: "先生",
        slcImg: '../imgs/fangzu/checkon.png',
        normalImg: '../imgs/fangzu/checkoff.png',
        state: false
      }],
      agentData: [{
        text: '一 般 用 戶',
        slcImg: '../imgs/fangzu/checkon.png',
        normalImg: '../imgs/fangzu/checkoff.png',
        state: false
      }, {
        text: '地 產 中 介',
        slcImg: '../imgs/fangzu/checkon.png',
        normalImg: '../imgs/fangzu/checkoff.png',
        state: false
      }],
      phone: '',
      password: '',
      verifycode: '',
      call: '',
      displayname: '',
      verifyPassword: '',
      registerData: {},
      isTrue: false,
      showSpan: false,
      agent: '',
      sessiontoken: location.search.slice(1).split('=')[1]
    };
  }
});