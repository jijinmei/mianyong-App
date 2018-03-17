const souye = {
template: `
<div id="souye" class="bgebebeb" style="padding-bottom:1.3rem;">
    <!--1.搜索条-->
    <nav class="mui-bar mui-bar-tab bg36c748 relative bai fixed" style="padding:0.15rem 0.2rem;">
      <img src="../../assets/img/home/logo.png" alt="" style="left:0.2rem;width:0.4rem;" class="czjz" />
      <span class="fz33 bold cffffff czjz" style="left:0.7rem;">免佣澳門</span>
      <img @click="gosearch()" src="../../assets/img/home/tiao.png" alt="" style="right:0.2rem;width:3.94rem;" class="czjz" />
    </nav>

    <!--2.最新消息-->
    <div class="swiper-container swiperNew bai h70 border-b swiper-no-swiping">
      <div class="swiper-wrapper">
        <div   v-for="(item,index) in newItem" class="swiper-slide w100% pT20 pR48 pB20 pL20" data-type='news'>
          <img src="../../assets/img/home/news.png" alt="" style="left:0.2rem;width:0.31rem;" class="czjz" />
          <span class="fz25 c36c748 czjz" style="left:0.6rem;">最新消息</span>
          <span class="fz25 c585858 czjz mui-ellipsis" style="right:0.48rem;width:4.2rem;">
                                            {{item}}
                    </span>
        </div>
      </div>
    </div>
    <!--3.租售物业轮播图-->
    <div class="swiper-container swiper1 bai" style="height:3rem;margin-bottom:0.15rem;">
      <div class="swiper-wrapper" style="height:3rem;">
        <div class="swiper-slide relative padding20" style="width:100%;height:3rem;">
          <div @click='zusouwuyes("zusouwuye")' class="fz33 c585858 center czjz" style="width:1.52rem;left:0.2rem;">
            <img src="../../assets/img/home/wuye.png" alt="" style="width:1.52rem;" />
            <p style="margin-top:0.05rem;height:0.5rem;line-height:0.5rem;" class="fz33 c585858">租售物業</p>
          </div>
          <ul class="absolute model" style="width:4.2rem;right:0.2rem;top:0.2rem;">
            <li @click='model8(item.title)' v-if="index<8" class="lf center" v-for='(item,index) in tus' style="width:23%;margin-bottom: 0.1rem;margin-right:2.5%;">
              <img :src="item.icon" alt="" style="width:0.73rem;" />
              <p style="height:0.3rem;line-height:0.2rem;" class="fz19 c585858">{{item.title}}</p>
            </li>
          </ul>

        </div>
        <div class="swiper-slide padding20" style="width:100%;height:3rem;">
          <ul class="model absolute" style="left:0.2rem;top:0.2rem;width:6rem;">
            <li @click='model8(item.title)' v-if="index>7" class="lf center" v-for='(item,index) in tus' style="width:20%;margin-bottom: 0.1rem;">
              <img :src="item.icon" alt="" style="width:0.73rem;" />
              <p style="height:0.3rem;line-height:0.2rem;" class="fz19 c585858">{{item.title}}</p>
            </li>
          </ul>

        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination swiper-pagination1" style="bottom:0.1rem;"></div>
    </div>

    <!--4.首页轮播图-->
    <div class="swiper-container swiper2 bai" style="height:3.5rem;">
      <div class="swiper-wrapper" style="height:3.5rem;">
        <div @click="gosrc(item.url)" class="swiper-slide" v-for="(item,index) in lbt2" style="width:100%;height:3.5rem;">
          <img :src="item.pic||''" class="jz" style="width:6.4rem;">
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination swiper-pagination2"></div>
    </div>

    <!--5.推荐服务-->
    <ul class="mui-table-view mg15 before00 after00" style="height:0.7rem;">
      <li class="mui-table-view-cell" style="padding:0 0.2rem;">
        <a class="mui-navigate-right fz25 c333333 padding0 margin0 after02" style="height:0.7rem;line-height:0.7rem;">
          <span style="border-left:0.05rem solid #36C748;margin-right:0.05rem;"></span> 推薦服務
          <span @click="tjfws()" class="fz22 c666666 mui-pull-right" style="margin-right:0.2rem;">
                  更多
                </span>
        </a>
      </li>
    </ul>

    <!--6.轮播图3-->
    <!-- Swiper -->
    <div class="swiper-container swiper55 bai" style="padding-left:0.2rem;padding-bottom:0.2rem;">
      <div class="swiper-wrapper">
        <div @click="xiangqings(item.objectId,item)" class="swiper-slide overflow swiper3" v-for="(item,index) in lbt3" style="width: 1.44rem !important;
    height: 1.44rem !important;">
          <img :src="item.pics" alt="" />
          <p style="padding:0 0.05rem;height: 0.35rem;line-height: 0.35rem;bottom:0;left:0;width:100%;background-color: rgba(0,0,0,0.4);" class="center fz18 cffffff mui-ellipsis absolute">{{item.title}}</p>
        </div>
      </div>
    </div>

    <!--热门话题-->
<div class="swiper-container swiperHot bai h120 mg15 swiper-no-swiping">
      <div class="swiper-wrapper">
        <div   v-for="(item,index) in hotItem" class="swiper-slide w100% pT25 pR20 pB25 pL30"  data-type='hots'>
        <div class="czjz" style="left:0.33rem;">
        <p class="fz31 cff4d00 bold" style="font-style: italic;">熱門</p>
        <p class="fz31 cff4d00 bold" style="font-style: italic;">話題</p>
      </div>

      <div  class="czjz" style="right:0.2rem;width:4.8rem;"  data-type='hots'>
        <p class="mui-ellipsis fz24 c333333">· {{item}}</p>
        <!--<p class="mui-ellipsis fz24 c333333">· {{item}}</p>-->
      </div>
        </div>
      </div>
    </div>
    
    <!--热门發布-->
    <ul class="mui-table-view mg15 before00 after00" style="height:0.7rem;">
      <li class="mui-table-view-cell" style="padding:0 0.2rem;">
        <a class="fz25 c333333 padding0 margin0 after02" style="height:0.7rem;line-height:0.7rem;">
          <span style="border-left:0.05rem solid #4da6f9;margin-right:0.05rem;"></span> 熱門發佈
        </a>
      </li>
    </ul>

    <ul class="mui-table-view overflow before0" style="padding:0 0.2rem 0 0.2rem;">
      <li @click="xiangqings(item.objectId,item,item.type)" v-if="hotfabu!='no'&&index<4" v-for="(item,index) in hotfabu" :class="{lf:index==0||index==2,rf:index==1||index==3}" class="mui-table-view-cell padding0 border after0 after00" style="margin-bottom:0.2rem;width:2.91rem;height:2.9rem;">
        <div id="" class="relative overflow" style="height:1.7rem;">
          <img :src="item.pics[0]+imageView3" alt="" style="min-height:1.7rem;min-width:100%" class="jz" />
          <button type="button" class="mui-btn mui-btn-blue absolute fz19 cffffff" style="padding:0.05rem 0.1rem;border-radius:0;border:none;right: 0;top: 0;background-color: rgba(0,0,0,0.4);">
              {{item.pics.length}}張
            </button>
          <button type="button" class="mui-btn absolute fz19 cffffff " style="padding:0.05rem 0.1rem;border-radius:0;border:none;right: 0;bottom: 0;background-color: rgba(0,0,0,0.4);">
                        <span :class="{c36c748:item.type=='租售物業',cfc9e4e:item.type=='汽車交易',cffcd1c:item.type=='跳蚤市場',c3796ff:item.type=='傢俬電器'}" >{{item.type}}</span>
                      </button>
        </div>
        <div id="" style='padding:0.13rem'>
          <p class="mui-pull-left c36c748 mui-ellipsis-2 fz25 h58 lh30" style="width:100%;">{{item.title}}</p>
          <p class="mui-inline mui-pull-left" style="margin-top:0.05rem;height:0.3rem;line-height:0.3rem;">
            <img src="../../assets/img/home/liulan.png" alt="" class="w28"/>
            <span class="c666666 mui-inline fz19" style="height:0.3rem;line-height:0.3rem;">5K</span>
          </p>
          <p class="fz25 c666666  mui-inline mui-pull-right" style="margin-top:0.05rem;height:0.3rem;line-height:0.3rem;">
            <span class="cff4d00 mui-inline fz25 bold" style="height:0.3rem;line-height:0.3rem;">{{item.price=='面議'?item.price:item.price+item.price_unit}}</span>
          </p>

        </div>
      </li>
    </ul>
    <!--最新發布-->
    <ul class="mui-table-view mg15 before00 after00" style="height:0.7rem;">
      <li class="mui-table-view-cell" style="padding:0 0.2rem;">
        <a class="fz25 c333333 padding0 margin0 after02" style="height:0.7rem;line-height:0.7rem;">
          <span style="border-left:0.05rem solid #4da6f9;margin-right:0.05rem;"></span> 最新發佈
        </a>
      </li>
    </ul>

    <ul class="mui-table-view overflow before0 lastfabus" style="padding:0 0.2rem 0 0.2rem;">
      <li @click="xiangqings(item.objectId,item,item.type)" v-if="lastfabu!='no'" v-for="(item,index) in lastfabu"  class="mui-table-view-cell padding0 border after0 after00" style="margin-bottom:0.2rem;width:2.91rem;height:2.9rem;">
        <div id="" class="relative overflow" style="height:1.7rem;">
          <img :src="item.pics[0]+imageView3" alt="" style="min-height:1.7rem;min-width:100%" class="jz" />
          <button type="button" class="mui-btn mui-btn-blue absolute fz19 cffffff" style="padding:0.05rem 0.1rem;border-radius:0;border:none;right: 0;top: 0;background-color: rgba(0,0,0,0.4);">
              {{item.pics.length}}張
            </button>
          <button type="button" class="mui-btn absolute fz19 cffffff " style="padding:0.05rem 0.1rem;border-radius:0;border:none;right: 0;bottom: 0;background-color: rgba(0,0,0,0.4);">
                        <span :class="{c36c748:item.type=='租售物業',cfc9e4e:item.type=='汽車交易',cffcd1c:item.type=='跳蚤市場',c3796ff:item.type=='傢俬電器'}" >{{item.type}}</span>
                      </button>
        </div>
        <div id="" style='padding:0.13rem'>
          <p class="mui-pull-left c36c748 mui-ellipsis-2 fz25 h58 lh30" style="width:100%;">{{item.title}}</p>
        
          <p class="fz25 c666666  mui-inline mui-pull-right" style="margin-top:0.05rem;height:0.3rem;line-height:0.3rem;">
            <span class="cff4d00 mui-inline fz25 bold" style="height:0.3rem;line-height:0.3rem;">{{item.price=='面議'?item.price:item.price+item.price_unit}}</span>
          </p>

        </div>
      </li>
    </ul>
    <!---->
  </div>

  `,
    data:function() {
      return {
      newItem: [],//最新消息的轮播图
        hotItem: [],//热门话题的轮播图
        hotfabu: 'no', //热门发布的数据
        lastfabu: 'no', //最新发布的数据
        imageView2: '?imageView2/1/w/' + parseInt(640 * w0) + '/h/' + parseInt(350 * w0),
        imageView3: '?imageView2/1/w/' + parseInt(291 * w0) + '/h/' + parseInt(170 * w0), //最新发布的图片
        lbt1: [1, 1], //物业租售的轮播图
        lbt2: 'no', //第2个轮播图
        lbt3: [], //第3个轮播图  推荐服务
        tus:[]
      }
    },
  methods: {
      homes(){
        var that=this
          $.get(Boss3+'home',{'sessiontoken':sessiontoken},function(data){
            if(data.status==true){
              
              that.newItem.push(data.result.news)//最新消息
              that.tus=data.result.services//租售物业8大模块
              that.hotItem=data.result.topic//热门话题
              that.lbt2 = data.result.slider//首页轮播图
              that.lbt3=data.result.recommend//推荐服务
              that.hotfabu=data.result.hotest//热门发布
              that.lastfabu=data.result.latest//最新发布
      //最新消息的轮播图
      that.swiperNews()
      
      //1.8大模块的轮播图
      that.swipers1()
      
      //热门话题的轮播图
      that.swiperHots()

      //lbt2第二个轮播图首页的
      that.lbt2s()
      
      //3.推荐服务的轮播图
      that.swiper()
              
            }
        })
      },
      swiperHots(name,objectId){
        setTimeout(function(){
        var swiper = new Swiper('.swiperHot', {              
          autoplay: 3000,
          observer: true,
          direction: 'vertical',
          loop: true
        });
        },500)
        var that = this
        $('.swiperHot').on('click','.swiper-slide',function(){
          location.href='hots.html?sessiontoken='+sessiontoken
//           that.$router.push({
//             'name': $(this).attr('data-type')
// //            params:{'objectId':'objectId'}
//           })
        })
        
      },
      //最新消息的轮播图
      swiperNews() {
        setTimeout(function(){
          var swiper = new Swiper('.swiperNew', {              
            autoplay: 3000,
            observer: true,
            direction: 'vertical',            
            loop: true
          });
        },500)
        var that = this
        $('.swiperNew').on('click','.swiper-slide',function(){
           location.href='news.html?sessiontoken='+sessiontoken
          // that.$router.push({
          //   'name': $(this).attr('data-type')
          // })
        })
      },
      //8大模块的轮播图
      swipers1() {
        setTimeout(function(){
          var swiper = new Swiper('.swiper1', {
          pagination: '.swiper-pagination1',
          autoplay: false,
          observer: true,
          loop: true
        });
        },500)
        
      },
      //取得首页幻灯片列表
      lbt2s() {
            setTimeout(function() {
              var swiper = new Swiper('.swiper2', {
                pagination: '.swiper-pagination2',
                autoplay: 3000,
                autoplayDisableOnInteraction: false,
                observer: true,
                loop: true

              });
            }, 500)
      },
      //首页幻灯片的跳转
      gosrc(src) {
        alert(src)
        location.href = src
      },
      //最新消息
      news(name) {
        location.href='news.html?sessiontoken='+sessiontoken
        //      console.log('news')
        // this.$router.push({
        //   name: name
        // })
      },
      //热门话题
//      hots(name,objectId) {
//        var that = this
//        $('.swiperHot').on('click','.swiper-slide',function(){
//          that.$router.push({
//            'name': $(this).attr('data-type'),
//            params:{'objectId':objectId}
//          })
//        })
//        this.$router.push({
//          name: name,
//          params:{'objectId':objectId}
//        })
//      },
      //租售物业按钮
      zusouwuyes(name) {
         location.href='../zusouwuye/zusouwuye.html?sessiontoken='+sessiontoken
        // this.$router.push({
        //   name: name
        // })
      },
      //推荐服务的更多按钮
      tjfws() {
         location.href='tuijianfuwu.html?sessiontoken='+sessiontoken
        // this.$router.push({
        //   name: 'tuijianfuwu'
        // })
      },
      //推荐服务的轮播图跳到详情
      xiangqings(objectId, item,type) {
        //含有检举按钮，不是预览
        this.$store.state.jianjuItem = item
        this.$store.state.jianju == 'yes'
        var nn=(type=='租售物業'?'zusou':'no')
        location.href='../xiangqing/xiangqing.html?jianju=yes&objectId='+objectId+'&name='+nn+'&sessiontoken='+sessiontoken
        // this.$router.push({
        //   name: 'xiangqing',
        //   params: {
        //     objectId: objectId,
        //     name: nn
        //   }
        // })
      },
      //推荐服务的轮播图
      swiper() {
        var b = parseInt(8 * w0)
        var swiper = new Swiper('.swiper55', {
          autoplayDisableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay。
          autoplay: false,
          slidesPerView: 'auto',
          spaceBetween: b
        });
      },
      //跳到联想的搜索页面
      gosearch() {
          location.href='lianxiang.html?sessiontoken='+sessiontoken
        // this.$router.push({
        //   name: 'lianxiang'
        // })
      },
      //租售物业的右边的8大模块 汽车之类的跳转
      model8(title) {
        location.href='../zusouwuye/model8.html?name='+title+'&sessiontoken='+sessiontoken
        // this.$router.push({
        //   name: 'model8',
        //   params: {
        //     name: title
        //   }
        // })
      },

    },
    mounted() {
      //请求首页的数据
      this.homes()
      

    

      


    }
    
    }
