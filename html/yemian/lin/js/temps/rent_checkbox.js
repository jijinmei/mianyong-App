'use strict';

var template = {
  template: '\n  <div>\n    <ul class="checkbox">\n      <li v-for="(item, index) in data" :style="setStyle(item)" @click="clickFunc(item, index)"><span>{{item.text}}</span><img :src="item.state ? item.slcImg : item.normalImg"></li>\n    </ul>\n  </div>\n  ',
  props: {
    data: []
  },
  methods: {
    clickFunc: function clickFunc(item, index) {
      this.$emit('actionclick', item, index);
    },
    setStyle: function setStyle(item) {
      return { backgroundImage: 'url(' + item.bgImg + ')' };
    }
  }
};

Vue.component('w-checkbox', template);