// 	两个帅选的：招生 家政 汽车 家私
        //   一个帅选的：装修 搬屋 代购 跳蚤 
        //:class="{cff0000:bb=item.status=='-1',cff4d00:item.status=='0',c999999:item.status=='-2',c36c748:item.status=='1'}"
	        
	      //  电话按钮：装修 搬屋 代购  招生 家政
        // 没有电话按钮的：汽车 家私 跳蚤
        //  <pre class="overflow margin0 padding0 fz21" style="font-size:0.21rem;">{{item.content==false?'這業主很懶甚麼都沒有留下...':item.content}}</pre>
const liebiaos = {
template: `
	<div>

	
		<!--2.帅选出来的列表内容-->
		<ul id="LIST"  class="before00 after00 bgebebeb mui-table-view relative LIEBIAOS" style="background:#ebebeb;z-index:1;margin-top:0.7rem;" >
			<li  v-for="(item,index) in datas" :class="{mg10:who=='wodefabu'}"  @click="xiangqings(item.objectId,item)"  class="before00  mui-table-view-cell mui-media bai listLiebiao padding20" >
				
					<!--我的发布特有的封盘按钮 @click.stop="caozuos2(item.objectId,item,item.status,index)" @click.stop="fengpan(item.title,index,item.objectId)"-->
				 <p v-show="who=='wodefabu'" @click.stop="caozuos2(item.objectId,item,item.show,index)" class="border-b relative fz25 c555555 center" style="top:-0.2rem;height:0.6rem;line-height:0.6rem;">
           <span class="czjz fz25" style="left:0;" :class="{cff0000:!(item.show=='1'&&item.status=='1'),c36c748:item.show=='1'&&item.status=='1'}">
           {{item.show==0?'已下架':'已上架'}}
           <!--{{item.status==-1?'不通過':(item.status==0?'待審核':'已通過')}}-->

           </span>
				 	<img  src="../../assets/img/me/caozuo.png" alt="" style="width:0.29rem;right:0.6rem;" class="czjz" />
				 	<span  class="czjz fz25 c000000" style="right:0;">操作</span>
				 </p>
				 
				<a href="javascript:;" class="padding0 margin0" >
					<div class="mui-media-object mui-pull-left tukuang overflow relative" >
						<img class="jz" v-lazy="item.pics!=undefined?item.pics[0]+imageView2:''" style="width:2.45rem;min-height:2.15rem;" >
						<button type="button" class="mui-btn mui-btn-blue absolute fz19 cffffff" style="padding:0.05rem 0.1rem;border-radius:0;border:none;right: 0;top: 0;background-color: rgba(0,0,0,0.4);">
							{{item.pics.length}}張
            </button>
            <button type="button" class="mui-btn mui-btn-blue absolute fz19 cffffff" style="padding:0.05rem 0.1rem;border-radius:0;border:none;right: 0;bottom: 0;background-color: rgba(0,0,0,0.4);">
            {{item.section}}
          </button>
						
					</div>

					<div class="mui-media-body relative">
              <p class="mui-pull-left bugs mui-ellipsis fz30"  style="width:100%;font-weight:none;">{{item.title}}</p>
              <p class="mui-pull-left bugs mui-ellipsis fz16 right c666666"  style="width:100%;font-weight:500;">
              {{formatMsgTime(item.publishAt||item.createdAt)}}
              </p>
             
              <p  class="mui-pull-left c666666 fz21 mui-ellipsis-2"   :class="{seconds:item.templeId=='content_01'}"  style="line-height:0.3rem;height:0.6rem;font-weight:none;word-break:break-all">
							{{item.content==false?'暫無詳細描述...':item.content}}
              </p>

            
              
							
              <p v-if="item.templeId=='content_02'"  class="mui-pull-right right cff4d00 fz35 relative"  style="height:0.43rem;line-height:0.43rem;width:100%;font-weight:none;">
             
              
              <button v-if="item.tags!=undefined&&item.tags!='undefined'" type="button" :class="{'mui-btn-green':ii.indexOf('中介')==-1,'mui-btn-orange':ii.indexOf('中介')!=-1}" class="mui-btn fz15 czjz L00 center" v-for="(ii,iii) in item.tags" style="margin-right:0.03rem;">{{ii}}</button>
               
								{{item.price==-1||item.price=='面議'?'面議':(item.price+'元')}}
							</p>
							
						
						
						
					</div>
				</a>
				 <!-- contactType=0  仅在线咨询  -->
          <img @click.stop="call(item.phone)" v-if="item.templeId=='content_01'&&item.contactType==1" src="../../assets/img/wuyebangzhu/phone1.png" style="width:1.15rem;right:0.2rem;bottom:0.2rem;" class="absolute"/>
       
			</li>

		</ul>
		<!--<div v-show="datas.length==0" class="c999999 fz23 center"  style="margin-top:4.22rem;">抱歉，未找到相關結果。</div>-->
	
	</div>


  `,
		data:function() {
			return {
				bb:'yifabu',
				name:'no',
        // imageView2:'?imageView2/1/w/'+parseInt(245*w0)+'/h/'+parseInt(215*w0),
        imageView2:'?imageView2/1/w/'+parseInt(2*245*w0)+'/h/'+parseInt(2*215*w0),
        fabulimit:'',//8大板块的发布限制数
        yifabu:''//8大板块的已发布已通过数量
			}
		},
	props:['datas','who'],//接收父元素传过来的经过帅选的数据
		methods: {
      formatMsgTime (timespan) { 
        timespan=timespan.replace(/-/g,':').replace(' ',':');
        timespan=timespan.split(':');
        var date24 = new Date(timespan[0],(timespan[1]-1),timespan[2],timespan[3],timespan[4]);
        // console.log(date24);
        var timespan = date24.getTime();
        // console.log(timespan)
        // var n = timespan;
        // var timespan = new Date(n);
        // var dateTime = new Date(timespan);  
        // var year = dateTime.getFullYear();  
        // var month = dateTime.getMonth() + 1;  
        // var day = dateTime.getDate();  
        // var hour = dateTime.getHours();  
        // var minute = dateTime.getMinutes();  
        // var second = dateTime.getSeconds();  
        // var now = new Date();  
        // var now_new = Date.parse(now.toDateString());   
        var now_new=(new Date()).getTime(); 
        var milliseconds = 0;  
        var timeSpanStr;  milliseconds = now_new - timespan; 
        console.log(now_new,timespan,milliseconds)
         if (milliseconds < 1000 * 1 * 1) {  
             timeSpanStr = '剛剛'; 
         }
         else if (1000 * 1 * 1 < milliseconds &&milliseconds < 1000 * 60 * 1) {   
          timeSpanStr = Math.round((milliseconds / (1000))) + '秒前';  
        }   
         else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {   
            timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分鐘前';  
          } 
         else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {   
            timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';  
          } 
          else {
          // if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {  
              timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';  
            }  
          // else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {   
          //    timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute; 
          //    }
          // else {    
          //   timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;  
          // }  
          return timeSpanStr;
        },
      
			  //拨打电话
      call(phone){
        if(phone){
        	console.log("tel:"+phone)
        	if(isNaN(phone)){
              mui.toast('電話號碼為中文')
        	}else{
        	 location.href="tel:"+phone
        	}
        	
        }else{
        	mui.toast('電話號碼為空')
        	// location.href="tel:13411615134"
        }
      },
      	//我的发布操作事件
			caozuos2(id,item,bb,index){
        var that=this;
				if(bb=='1'){
					//1.可以下架+编辑灰
					this.$parent.keep=1
				}else if(bb=='0'){
					//2.可以上架+编辑
					this.$parent.keep=2
				}
				//改变父元素
				this.$parent.tanchukuang=true
				this.$parent.arrayitem=item
        this.$parent.index=index
        
        // 请求总发布限制数量和已发布已通过数量locations('userId')
        $.get(Boss+'user/'+window.localStorage.getItem('userId'),function(data){
          if(data.status){
              console.log(data)
              that.$parent.fabulimit=data.result.publish_setting[1].limit
              that.fabulimit=data.result.publish_setting[1].limit
              $.get(Boss3 + 'user/article',{'page':1,'limit':10,'sessiontoken':sessiontoken,'section':'','status':1,'show':1},function(datas){
                if(datas.status){
                  console.log(datas);
                 that.$parent.yifabu=datas.result.count;
                 that.yifabu=datas.result.count;
                 console.log(that.$parent.fabulimit,that.$parent.yifabu);
                         
                              }else{
                                //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                                mui.toast(datas.result.message)
                              }
              })
                             
          }
      })


			},
			// //我的发布操作事件
			// caozuos2(id,item,bb,index){
			// 	if(bb=='-1'||bb=='1'){
			// 		//1.可以编辑加下架
			// 		this.$parent.keep=2
			// 	}else if(bb=='0'){
			// 		//2.可以下架
			// 		this.$parent.keep=1
			// 	}else if(bb=='-2'){
			// 		//3.编辑（不可修改）
			// 		this.$parent.keep=0
			// 	}
			// 	//改变父元素
			// 	this.$parent.tanchukuang=true
			// 	this.$parent.arrayitem=item
			// 	this.$parent.index=index
			// },
			//下架
			xiajia(name,index,objectId,action){
				var that=this
				var title='確認【下架】'+name+'嗎？'
        var content='此賬號已成功發布分類信息'+that.yifabu+'條（上限'+that.fabulimit+'條）'
        mui.confirm(content,title,['取消','確認'],function(data){
					console.log(data)
					if(data.index==0){
						//点击了取消
					}else if(data.index==1){
						//点击了确定
					var formData = new FormData();             
                   
                    $.post(Boss3 + 'article/'+objectId+"/status",{
                      sessiontoken:sessiontoken,
                      objectId:objectId,
                      action:action
                    },function(data){
                      console.log(data);
                      //1.服务器返回响应，根据响应结果，分析是否登录成功；
                         if(data.status == true) {
                          mescroll.resetUpScroll(); //重新搜索,重置列表数据
                           //修改对应的发布状态 改为已下架
                          //  that.datas[index].show=0
                            //  that.datas[index].status='-2'
                                                 
                         }else{
                          mui.toast("HTTP Request Failed")
                         }
                    })               																	
					}
				},'div')
      },
      			//上架
			shangjia(name,index,objectId,action){
				var that=this
        var title='確認【上架】'+name+'嗎？'
        var content='此賬號已成功發布分類信息'+that.yifabu+'條（上限'+that.fabulimit+'條）'
        mui.confirm(content,title,['取消','確認'],function(data){
					console.log(data)
					if(data.index==0){
						//点击了取消
					}else if(data.index==1){
						//点击了确定
					var formData = new FormData();             
                 
                    $.post(Boss3 + 'article/'+objectId+"/status",{
                      sessiontoken:sessiontoken,
                      objectId:objectId,
                      action:action
                    },function(data){
                      console.log(data);
                      //1.服务器返回响应，根据响应结果，分析是否登录成功；
                         if(data.status == true) {
                           //修改对应的发布状态 改为已上架
                           mescroll.resetUpScroll(); //重新搜索,重置列表数据
                            //  that.datas[index].show=1
                            //  console.log('5555555555')
                            //  mui.toast(data.result.publishAt)
                            //  console.log(data.result.publishAt)
                            //  that.datas[index].publishAt=data.result.publishAt;
                            //  that.datas[index].status='-2'
                                                 
                         }else{
                          mui.toast("HTTP Request Failed")
                         }
                    })               																	
					}
				},'div')
      },
      	//删除
			shanchu(name,index,objectId,action){
				var that=this
				var title='確認【刪除】'+name+'嗎？'
        var content='此賬號已成功發布分類信息'+that.yifabu+'條（上限'+that.fabulimit+'條）'
        mui.confirm(content,title,['取消','確認'],function(data){
					console.log(data)
					if(data.index==0){
						//点击了取消
					}else if(data.index==1){
						//点击了确定          
            $.ajax({    
              url : Boss22+"article/"+objectId+'?sessiontoken='+sessiontoken,    
              type : "DELETE",    
              data :{'sessiontoken':sessiontoken,'objectId':objectId},    
              success : function(data) {    
                    if(data.status){
                      // that.datas.splice(index,1)
                      mescroll.resetUpScroll(); //重新搜索,重置列表数据
                    }else{
                      mui.toast(data.result.message)
                    }
              },    
              error : function(data) {    
                   
              }    
         });      																	
					}
				},'div')
      },
			//跳到详情
			xiangqings(objectId,item){
				//含有检举按钮，不是预览
				// window.localStorage.setItem('jianjuItem',JSON.stringify(item))
				location.href='../xiangqing/xiangqing.html?objectId='+objectId+'&name='+this.name+'&jianju=yes&sessiontoken='+sessiontoken
				// if(isAPP){
				// 	locationClick('xiangqing/'+objectId+'/'+this.name)
				// }else{
				// 	this.$router.push({name:'xiangqing',params:{objectId:objectId,name:this.name}})
				// }
				
			}
			

		},
		mounted() {
			// var that=this
			// console.log(123)
			// setTimeout(function() {
			// 	console.log(JSON.parse(JSON.stringify(that.datas)))
			// },4000)
			
      this.name=locations('name')
      console.log('212')
    
//          alert("3"+this.name)
	}
		}
