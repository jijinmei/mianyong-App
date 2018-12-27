'use strict';

Vue.component('w-radio', {
  template: '\n    <ul class="radiobox">\n      <li v-for="(item, index) in data" @click="clickFunc(item, index)" :style="setStyle(item)">\n        {{item.text}}\n      </li>\n    </ul>\n  ',
  props: {
    data: Array,
    savestr: String,
    isradio: String
  },
  methods: {
    setStyle: function setStyle(item) {
      return {
        'backgroundImage': 'url(' + (item.state ? item.slcImg : item.normalImg) + ')'
      };
    },
    clickFunc: function clickFunc(item, index) {
      console.log(22222)
      var that=this;
      console.log(usermessage)
       if(usermessage.user_role=='base_user'){
          if(item.text=='中介'){
              vm.totrips1=true
              setTimeout(function(){
                vm.totrips1=false
              },2000)
             
              return
          }
       }else{
        //  当前用户身份是中介,勾选业主,转租客,提示当前账号身份是中介,如需更改,请联系客服
        if(item.text=='業主'||item.text=='轉租客'){
          vm.totrips2=true
             setTimeout(function(){
              vm.totrips2=false
            },2000)
            return
        }
       }



      this.$emit('actionclick', item, index);

      // 單選 radio
      if (this.isradio === 'radio') {

        this.data.forEach(function (_item, _index) {
          if (_index === index) {
            if (!_item.state) {
              _item.state = true;
              // if (this.savestr === 'contactType') {

              //   localStorage.setItem(this.savestr, _index.toString())
              // } else {
              //   localStorage.setItem(this.savestr, item.text)
              // }
            }
          } else {
            _item.state = false;
          }
        }, this);
      } else {

        this.data.forEach(function (_item, _index) {
          if (_index === index) {
            if (!_item.state) {
              _item.state = true;
              // if (this.savestr === 'contactType') {

              //   localStorage.setItem(this.savestr, _index.toString())
              // } else {
              //   localStorage.setItem(this.savestr, item.text)
              // }
            } else {
              _item.state = false;
              // localStorage.removeItem(this.savestr)
            }
          } else {
            _item.state = false;
          }
        }, this);
      }
    }
  }
});