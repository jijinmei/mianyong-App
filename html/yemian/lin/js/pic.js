'use strict';

var vm = new Vue({
  el: '#app',
  created: function created() {
    // if (localStorage.getItem('rentobject')) {
    //   this.rentobject = JSON.parse(localStorage.getItem('rentobject'))
    // } else {
    //   this.rentobject = JSON.parse(JSON.stringify(saveObject))
    // }
  },

  computed: {
    setStyle: function setStyle() {
      return {
        'backgroundImage': 'url(\'./imgs/fangzu/addPic_2.png\')'
      };
    }
  },
  watch: {
    rentobject: {
      handler: function handler(newVal) {
        // localStorage.setItem('rentobject', JSON.stringify(newVal))
        WebViewJavascriptBridge.callHandler('SetData', {
          content_key: 'xiaolin',
          content: JSON.stringify(this.rentobject)
        });
      },
      deep: true
    }
  },
  mounted: function mounted() {},

  methods: {
    back: function back() {
      // this.$router.go(-1)
    },
// 添加图片
change: function change(e) {
  console.log('files点击了图片上传框,粗发了事件')
  var file = document.getElementById("input");
  var fileList = file.files //获取的图片文件
console.log(fileList)
// 缓存获取的图片的长度加上现在上传的图片的长度不能超过12个,声明变量记录超出的个数,到时候超出了的不进入循环
var num = fileList.length + this.imgUrl.length;
      if (num > 12) {
        mui.toast('图片不能超过12张,请重新选择!')
        return;
        // console.log('超过' + (num - 12), num);
        // var chao = num - 12;
      } else if(num==12) {
        // var chao = 0;
          this.showAdd = false;//上传框消失
  
      }


// var num = fileList.length + this.imgUrl.length;
// 重置fileList的个数
// console.log('fileList.length')
// console.log(fileList.length)
// if(num>12){
//   fileList.splice(fileList.length-chao,chao)
// }
//   // 
//   console.log('deleted')
//   console.log(fileList.length)
//   console.log(fileList)
//   bbbb=fileList
//   return 
// // 1.缓存的已经有12个,这个时候没有上传框
// if(this.imgUrl.length==12){
//   return
// }
// // 2.缓存少于12个,但是上传加缓存超过12个
// if(this.imgUrl.length<12&&num>12){
//   fileList.splice(fileList.length-chao,chao)
//   // return
// }
// // 3.缓存少于12个,上传加缓存没有超过12个
// if(this.imgUrl.length<12&&num<13){
//   // fileList.splice(fileList.length-chao,chao)
// }
// // 4.缓存无,上传的超过12个
// if(this.imgUrl.length==0&&num>12){
//   // return
//   fileList.splice(9,2)
// }
// // 5.缓存无,上传的没有超过12个
// if(this.imgUrl.length==0&&num<13){
//   // return
// }


  // 
  console.log("图片数量符合") 
    fileList = validateUp(fileList);
    // return
    fileList.forEach(function(file, i) {
      // if(i>(fileList.length-chao+1)){
      //   return
      // }
       console.log("开始处理上传文件")  			 
          var reader = new FileReader();          
//          获取图片大小

          reader.onload = function() {
             var result = this.result;
             // console.log(fileList[i])
              var img = new Image();
              img.src = result;
            
              //如果图片大小小于100kb，则直接上传
              if (result.length <= maxsize) {
                  img = null;
                  
                  upload(result,fileList[i].type);
                  return;
              }
//      图片加载完毕之后进行压缩，然后上传
              if (img.complete) {
                  callback();
              } else {
                  img.onload = callback;
              }
              function callback() {
                  var data = compress(img);
                  console.log(data)
                  upload(data, fileList[i].type);
                  img = null;
              }
          };
          reader.readAsDataURL(fileList[i]);
   

  console.log('处理上传文件完成')
})
    },
    // 添加图片
    change222: function change(e) {
      var _this = this;

      var files = e.target.files;

      var num = files.length + this.imgUrl.length;

      this.files = files;

      if (num > 12) {
        console.log('超过' + (num - 12), num);
        var chao = num - 12;
      } else {
        var chao = 0;
      }

      if (files) {
        var _loop = function _loop(i) {

          var read = new FileReader();
          read.addEventListener('load', function () {

            _this.imgUrl.push(read.result);

            console.log(_this.imgUrl.length + '张');

            if (_this.imgUrl.length >= 12) {
              _this.showAdd = false;
            }
            if (_this.imgUrl.length >= 9) {
              _this.isnormalfooter = false;
            }
          });
          read.readAsDataURL(files[i]);
        };

        for (var i = 0; i < files.length - chao; i++) {
          _loop(i);
        }
      }
    },

    // 点击 span 身上
    cancelSlc: function cancelSlc(index, e) {

      if (!this.setType) {

        // 當前的 span 标签宽高设置0, 相当于隐藏效果
        e.currentTarget.style.width = '0';
        e.currentTarget.style.height = '0';

        this.delArray.forEach(function (_item, _index) {
          if (_item === index) {
            this.delArray.splice(_index, 1);
            console.log(this.delArray);
          }
        }, this);
      }
    },

    // 点击图片 li 身上
    clickImg: function clickImg(index, e) {

      if (this.normalType) {

        // ImagePreview(this.imgUrl, index)
      } else if (this.delType) {

        // 当前span 标签宽高设置 1.92rem
        e.target.nextSibling.style.width = '1.92rem';
        e.target.nextSibling.style.height = '1.92rem';
        this.delArray.push(index);
        this.spanArray.push(e.target.nextSibling);

        console.log(this.delArray);
      } else if (this.setType) {

        console.log('點擊選中 -> 設置為封面', '第' + index + '张');

        if (this.tempSpan) {
          this.tempSpan.target.nextSibling.style.width = '';
          this.tempSpan.target.nextSibling.style.height = '';
          this.setArray.shift(index);
          this.spanArray.shift(e.target.nextSibling);
        }

        this.tempSpan = e;
        // 当前span 标签宽高设置 1.92rem
        e.target.nextSibling.style.width = '1.92rem';
        e.target.nextSibling.style.height = '1.92rem';

        this.setArray.push(index);
        this.spanArray.push(e.target.nextSibling);
      }
    },

    // 编辑照片
    editImg: function editImg() {
      console.log('编辑');
      this.show = true;
    },

    // 保存照片
    saveImg: function saveImg() {
      console.log('保存照片');
      if (this.imgUrl.length) {
        // 保存 圖片url 數組
        // localStorage.pics = this.imgUrl  ( 这个地方引用同一个对象, 当第二次选图片即使不运行该方法, 由于第一次已经引用了this.imgUrl数组对象, 所以之后只要该对象动态改变, 那么 currentObject.pics随之改变 )

        // this.rentobject.pics = JSON.parse(JSON.stringify(this.imgUrl)))
        this.rentobject.pics = [].concat(this.imgUrl);

        // goback(1)


        WebViewJavascriptBridge.callHandler('SetData', {
          content_key: 'xiaolin',
          content: JSON.stringify(this.rentobject)
        });

        setTimeout(function () {

          WebViewJavascriptBridge.callHandler('goback', {
            pageNumber: '1',
            needRefresh: 'YES'
          });
        }, 1000);
      } else {
        // localStorage.removeItem('pics')
        this.rentobject.pics = [];

        WebViewJavascriptBridge.callHandler('SetData', {
          content_key: 'xiaolin',
          content: JSON.stringify(this.rentobject)
        });
        // goback(1)

        setTimeout(function () {

          WebViewJavascriptBridge.callHandler('goback', {
            pageNumber: '1',
            needRefresh: 'YES'
          });
        }, 1000);
      }

      // 返回

      // if (isAPP) {
      //     var aa = JSON.parse(window.localStorage.getItem('huancun'))
      //     aa.pics = localStorage.pics
      //     window.localStorage.setItem('huancun', JSON.stringify(aa))
      //     locationClick('liebiaoZu', 1)
      // } else {
      //     var aa = JSON.parse(window.localStorage.getItem('huancun'))
      //     aa.pics = localStorage.pics
      //     window.localStorage.setItem('huancun', JSON.stringify(aa))
      //     this.$router.go(-1)
      // }
    },
    getBlobBydataURI: function getBlobBydataURI(dataURI, type) {
      var binary = atob(dataURI.split(',')[1]);
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {
        type: type
      });
    },

    // 弹窗中点击 --- 設置封面圖
    setingImg: function setingImg() {

      if (this.imgUrl.length > 0) {
        this.show = false;
        this.showAdd = false;
        this.normalType = false;
        this.delType = false;
        this.setType = true;
      }
    },

    // 弹窗中点击 -- 刪除照片
    delImg: function delImg() {

      if (this.imgUrl.length > 0) {
        this.show = false;
        this.showAdd = false;
        this.normalType = false;
        this.delType = true;
        this.setType = false;
      }
      if (this.imgUrl.length >= 12) {
        // 大于 等于 9张照片时, this.showAdd = false
        this.showAdd = false;
      }
    },

    // 取消刪除
    cancelClick: function cancelClick() {
      console.log('取消刪除');

      // 所有的勾选要清空
      this.delArray = [];
      this.spanArray.forEach(function (_item, _index) {
        _item.style.width = '0';
        _item.style.height = '0';
      });

      // 点击取消按钮, 取消删除, 按钮显示恢复正常形态
      this.showAdd = true;
      this.normalType = true;
      this.delType = false;
      this.setType = false;
      if (this.imgUrl.length >= 12) {
        // 大于 等于 9张照片时, this.showAdd = false
        this.showAdd = false;
      }
    },

    // 刪除
    delClick: function delClick() {

      // 確認

      // 重新排序 選中數組, 從大到小
      if (this.delArray.length >= 2) {
        this.delArray.sort(function (a, b) {
          if (a < b) {
            return 1;
          }
          if (a > b) {
            return -1;
          }
        });
      }
      console.log(this.delArray);
      // 根據排序號的 選中數組 開始循環刪除 存儲照片的數組, 從最後面開始刪除
      for (var i in this.delArray) {
        this.imgUrl.splice(this.delArray[i], 1);
      }

      console.log(this.imgUrl);
      // 每次删除清空delarray数组, 否则上一次的点击保留, 导致BUG
      this.delArray = [];

      // 删除照片也需要点击保存按钮才能最终保存更改
      // window.store.commit('savePics', this.imgUrl)


      // 白色選中圖, 隱藏
      this.spanArray.forEach(function (_item, _index) {
        _item.style.width = '0';
        _item.style.height = '0';
      });

      if (this.imgUrl.length <= 9) {
        this.isnormalfooter = true;
      }

      // 点击取消按钮, 取消删除, 按钮显示恢复正常形态
      this.showAdd = true;
      this.normalType = true;
      this.delType = false;
      this.setType = false;
      if (this.imgUrl.length >= 12) {
        // 大于 等于 9张照片时, this.showAdd = false
        this.showAdd = false;
      }

      // Dialog .confirm({
      //     message: '確認刪除照片嗎?'
      // }).then(() => {
      // }).catch(() => {

      // })

    },

    // 点击 設置封面
    setF: function setF() {
      console.log('設置封面');

      console.log(this.setArray);

      var temp = this.imgUrl.splice(this.setArray[0], 1);
      this.imgUrl.unshift(temp);

      // if (this.imgUrl.length) {

      //   // 封面圖設為 圖片url 數組的第一個
      //   window.store.state.fengmiantu = this.imgUrl[0]
      //   localStorage.pics[0] = temp
      // }

      // 白色選中圖, 隱藏
      this.spanArray.forEach(function (_item, _index) {
        _item.style.width = '0';
        _item.style.height = '0';
      });

      // 点击取消按钮, 取消删除, 按钮显示恢复正常形态
      this.showAdd = true; // 是否隱藏 加號 背景圖
      this.normalType = true; // 是否顯示正常類型
      this.delType = false; // 是否顯示刪除類型
      this.setType = false; // 是否顯示設置封面類型
      if (this.imgUrl.length >= 12) {
        // 大于 等于 9张照片时, this.showAdd = false
        this.showAdd = false;
      }

      this.setArray = [];
    },
    notShow: function notShow() {
      console.log('隱藏彈出層');
      this.show = false;
    }
  },
  data: function data() {
    return {
      imgUrl: [],
      showAdd: true,
      show: false,
      editType: 0,
      showPop: false,
      normalType: true,
      delType: false,
      setType: false,
      tempSpan: null,
      setArray: [],
      delArray: [], // 存储点击的下标
      spanArray: [], // 存储已经点击过的span
      isnormalfooter: true,
      files: [],
      rentobject: null
    };
  }
});

function getAppLocalData(data) {

  if (data) {
    console.log('有值传过来', data);
    vm.rentobject = JSON.parse(data);
    initdata();
  } else {
    console.log('没有传值过来', data);
    vm.rentobject = JSON.parse(JSON.stringify(saveObject));
    initdata();
  }
}

// 延时一秒
setTimeout(function () {

  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/iPhone\sOS/i) == "iphone os") {

    WebViewJavascriptBridge.callHandler('GetData', {
      content_key: 'xiaolin'
    });
  }
}, 1000);

function initdata() {
  // 判斷機型, android / ios
  var ua = navigator.userAgent.toLowerCase();
  // alert(ua)
  if (ua.match(/iPhone\sOS/i) == "iphone os") {
    vm.$refs.input.removeAttribute('capture');
  }

  console.log('window.innerHeight: ' + window.innerHeight + 'px');
  // 设置高度
  vm.$refs.temp.style.height = window.innerHeight + 'px';
  // 设置相对定位
  vm.$refs.temp.style.position = 'relative';

  if (vm.rentobject.pics != '' && vm.rentobject.pics != null) {
    // (负面信息, 引用bug)
    // vm.imgUrl = localStorage.pics
    vm.imgUrl = [].concat(vm.rentobject.pics);
  }
  // else if (window.store.state.fengmiantu) {
  //   vm.imgUrl.push(window.store.state.fengmiantu)
  // }

  // 读取编辑 / 保存按钮的位置
  if (vm.imgUrl.length <= 9) {
    vm.isnormalfooter = true;
  } else {
    vm.isnormalfooter = false;
  }

  // 读取 + 是否显示
  if (vm.imgUrl.length >= 12) {
    vm.showAdd = false;
  } else {
    vm.showAdd = true;
  }
}