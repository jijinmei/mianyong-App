const fuwu = {
template: `
<div class="bgebebeb">
    <!--1.头部轮播图-->
    
    <div id="slider" class="mui-slider fuwuSlider FUWU" v-if="slideimg!='no'">
      <div class="mui-slider-group mui-slider-loop">
        <!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
        <div class="mui-slider-item mui-slider-item-duplicate">
          <a @click="go(slideimg[slideimg.length-1].url)" style="height:3.85rem;width:6.4rem;">
            <img :src="slideimg[slideimg.length-1].cover.url" class="jz" >
          </a>
        </div>

        <!-- 第n张 -->
        <div class="mui-slider-item relative" v-for="(item,index) in slideimg" >
          <a @click="go(item.url)" style="height:3.85rem;width:6.4rem;">
            <img :src="item.url!=undefined?item.cover.url:''" class="jz" >
          </a>
        </div>
        <!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
        <div class="mui-slider-item mui-slider-item-duplicate">
          <a @click="go(slideimg[0].url)" style="height:3.85rem;width:6.4rem;">
            <img :src="slideimg[0].cover.url" class="jz" >
          </a>
        </div>
      </div>
      <div class="mui-slider-indicator">
        <div class="mui-indicator"  :class="{'mui-active':index==0}" v-for="(item,index) in slideimg"></div>
      </div>
    </div>
    
    <ul class="overflow bai" style="padding-top:0.3rem;margin-top:0.1rem;">
      <li @click="gorouter('jisuan')" style="width:20%;" class="lf center">
        <img src="../../assets/img/wuyebangzhu/jsq.png" alt="" style="width:0.54rem;"/>
        <p class="fz20 c555555">置業計算器</p>
      </li>
      <li  @click="gorouter('wuyebangzhu')" style="width:20%;" class="lf center">
        <img src="../../assets/img/wuyebangzhu/wybz.png" alt="" style="width:0.54rem;"/>
        <p class="fz20 c555555"> 物業幫助</p>
      </li>
      <li  @click="gorouter('falvyuanzhu')" style="width:20%;" class="lf center">
        <img src="../../assets/img/wuyebangzhu/flhz.png" alt="" style="width:0.54rem;"/>
        <p class="fz20 c555555">法律援助</p>
      </li>
      <li @click="gorouter('heyuecankao')"  style="width:20%;" class="lf center">
        <img src="../../assets/img/wuyebangzhu/hyck.png" alt="" style="width:0.54rem;"/>
        <p class="fz20 c555555">合約參考</p>
      </li>
      <li @click="gorouter('kefuzixun')"  style="width:20%;" class="lf center">
        <img src="../../assets/img/wuyebangzhu/kfzx.png" alt="" style="width:0.54rem;"/>
        <p class="fz20 c555555">客服諮詢</p>
      </li>
    </ul>
    
    
    
    
  </div>

  `,
    data:function() {
      return {
       slideimg:'no'
      }
    },
   methods: {
      //点击幻灯片的跳转
      go(src){
        location.href=src
      },
      //点击五个标题的跳转
      gorouter(router){
        this.$router.push({name:router})
      },
              image(){
                  var that=this
              mui.ajax(Boss + 'slider/', {
                      data: {
                        'channel': 'services'
                      },
                      dataType: 'json', //服务器返回json格式数据
                      type: 'GET', //HTTP请求类型
                      timeout: 10000, //超时时间设置为10秒；
                      //  headers:{'Content-Type':'application/json'},
                    success: function(data) {
                        //1.服务器返回响应，根据响应结果，分析是否登录成功；
                        if(data.status == true) {
                                                        that.slideimg=data.result.data
                                                        console.log(that.slideimg)
                                                        //当图片挂载后就初始化获得slider插件对象
                          setTimeout(function(){
                             var gallery = mui('.fuwuSlider');
                                                      gallery.slider({
                                interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
                              });
                          },100)
                        }
                        

                      },
                      error: function(xhr, type, errorThrown) {
                        //异常处理；
                        mui.toast(errorThrown, {
                          duration: 'long',
                          type: 'div'
                        })
                      }
                    });
              }
               
    },
    mounted() {
      this.$store.state.name='幫助'
            this.image()
            $('body').addClass('bodybai')
    }
    }
