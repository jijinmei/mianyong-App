const items3 = {
template: `
<ul class="mui-table-view data-list"  :id="who==0?'dataList1':(who==1?'dataList2':'dataList3')" >
<li style="display:none;">
{{watch}}
</li>
<li v-if="datas!='no'" class="mui-table-view-cell taolunquli" v-for="(item,index) in datas">
    <ul class="mui-table-view">
   
        <li class="mui-table-view-cell mui-media padding20">
            <a href="javascript:;" class="padding0 margin0">
              <div   @tap="zhezhaocengs(item)" class="mui-media-object mui-pull-left relative center" style="max-width:0.8rem;width:0.8rem;height:1.5rem;margin-right:0.15rem;">
                    <!--个人头像-->
                    <div class="radius50 overflow" style="max-width:0.8rem;width:0.8rem;height:0.8rem;">
                      <img  :src="item.user.avatar!=undefined&&item.user!=undefined?item.user.avatar.url:'../../assets/img/taolunqu/head.png'" style="width:100%;">
                    </div>
                       
                           <img src="../../assets/img/taolunqu/zong.png" alt="" class="spjz" style="margin-top:0.05rem;width:0.3rem;"/>            
                           <span class="fz23 cff4d00 mui-block spjz" style="height:0.4rem;line-height: 0.4rem;margin-top:0.4rem;">{{item.user.likes}}</span>
                      
                  
             
                </div>
                <div class="mui-media-body fz23 cff4d00" >
                           {{(!isNaN(item.user.nickname)==false?item.user.nickname:item.user.nickname.substring(0,2)+'****'+item.user.nickname.substring(item.user.nickname.length,item.user.nickname.length-2))}}
                    <p @tap="xiangqing(item.objectId)" :class="{pL55:item.tag!='綜合'}" class="mui-ellipsis fz30 c000000 relative bold" style="height:0.5rem;line-height:0.5rem;">
                      <button v-if="item.tag!='綜合'" type="button" class="mui-btn mui-btn-green czjz" style="font-size: 0.21rem;left:0rem;">{{item.tag}}
                      </button>
                      {{item.title}}
                      
                    </p>
                    <p @tap="xiangqing(item.objectId)" class="mui-ellipsis-2 fz25 c888888" style="margin-top:0.1rem;">{{item.content}}</p>
               <div  style="margin:0.15rem 0 0 0;">
              <!--列表大图-->
              <div class="mui-card-content" >
                <ul class="overflow pics" >
                  <li class="mui-pull-left overflow" v-for="(pic,idx) in item.pics" :class="{onepic:item.pics.length==1,twopic:item.pics.length==2,morepic:item.pics.length>2}">
                    <img  :src="item.pics.length==1?pic.url+imageView1:(item.pics.length==2?pic.url+imageView2:pic.url+imageView3)" alt=""  :data-preview-src="pic.url+imageView" :data-preview-group="'1'+index" />
                  </li>
                </ul>
                
              </div>
              <!--页脚，放置补充信息或支持的操作-->
              <div class="mui-card-footer fz21 c666666"  @tap="xiangqing(item.objectId)" >
                <span>{{item.createdAt}}</span>
                
                <span >
                  <img :src="item.isgood==0?'../../assets/img/taolunqu/zan.png':'../../assets/img/taolunqu/liebiaozan.png'"  alt="" style="width:0.3rem;top:0.05rem;" class="relative"/>
                    <span class="fz25" :class="{c666666:item.isgood==0,c36c748:item.isgood==1}">{{item.goods}}</span>
                </span>
                <span >
                   <img :src="item.iscomment==0?'../../assets/img/taolunqu/reply.png':'../../assets/img/taolunqu/replylv.png'" alt="" style="width:0.3rem;top:0.05rem;" class="relative"/>
                   <span class="fz25"  :class="{c666666:item.iscomment==0,c36c748:item.iscomment==1}">{{item.comments}}</span>
                </span>
                
              </div>
            </div>
                </div>
            </a>
        </li>
       
    </ul>
  </li>
</ul>

  `,
    
		data:function() {
			return {
        imageView1:'?imageView2/1/w/'+parseInt(500*w0)+'/h/'+parseInt(500*w0),
        imageView2:'?imageView2/1/w/'+parseInt(245*w0)+'/h/'+parseInt(245*w0),
        imageView3:'?imageView2/1/w/'+parseInt(163*w0)+'/h/'+parseInt(163*w0),
        imageView:''
			}
    },
    props:['datas','who'],//接收父元素传过来的经过帅选的数据
		methods: {
		
    },
    computed:{
      watch(){
        if(this.who==0){
          this.datas=this.$parent.datas1
          console.log(1)
        }else if(this.who==1){ console.log(11)
          this.datas=this.$parent.datas2
        }else if(this.who==2){ console.log(111)
          this.datas=this.$parent.datas3
        }
  
        console.log('this.datas6666666666666666666666')
        console.log(this.datas.length)
      }
    },
		mounted() {

		}
		}
