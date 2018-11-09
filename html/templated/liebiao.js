const liebiao = { 
template: `
	<div :style="{paddingTop:datas.length==0?'1rem':'0'}">
		<!--2.帅选出来的列表内容-->
		<ul id="LIST" class="List bgebebeb mui-table-view relative before00 after00" style="background:#ebebeb;z-index:1;margin-top:0.7rem;" >
			<li @click="xiangqings(item.objectId,item)" :class="{mg10:name=='wodeloupan'}" class="mui-table-view-cell mui-media bai listLiebiao padding20" v-for="(item,index) in datas">
					
					<!--我的楼盘特有的封盘按钮 @click.stop="caozuos(item.objectId,item,item.status,index)"-->
				 <p v-if="name=='wodeloupan'"  @click.stop="caozuos(item.objectId,item,item.show,index)" class="border-b relative fz25 c555555 center" style="top:-0.2rem;height:0.6rem;line-height:0.6rem;">
				 	<span class="czjz fz25" style="left:0;" :class="{cff0000:bb=item.status=='-1',cff4d00:item.status=='0',c999999:item.status=='-2',c36c748:item.status=='1'}">
     
           {{item.show==0?'已封盤':'已開盤'}}
           {{item.status==-1?'不通過':(item.status==0?'待審核':'已通過')}}

				 	</span>
				 	<img  src="../../assets/img/me/caozuo.png" alt="" style="width:0.29rem;right:0.6rem;" class="czjz" />
				 	<span  class="czjz fz25 c000000" style="right:0;">操作</span>
				 </p>
				 
				 
				 

				 <!--正常列表1-->
				<a  class="padding0 margin0" >
					<div class="bgebebeb mui-media-object mui-pull-left tukuang overflow relative" >
							<img  v-lazy="item.pics[0]+imageView2" class="jz" style="min-width:2.45rem;min-height:2.15rem;">
						<button type="button" class="mui-btn mui-btn-blue absolute fz19 cffffff" style="padding:0.05rem 0.1rem;border-radius:0;border:none;right: 0;top: 0;background-color: rgba(0,0,0,0.4);">
							{{item.pics.length}}張
						</button>
						<button type="button" class="mui-btn absolute fz21 cffffff" style="padding:0.05rem 0.1rem;border-radius:0;border:none;right: 0;bottom: 0;background-color: rgba(0,0,0,0.4);">
		          	      	<span class="cff4d00">@{{item.unit}}</span>/呎
		          	      </button>
					</div>

					<div class="mui-media-body relative">
						<div class="fz33 c36c748 overflow" >
							<p class="mui-pull-left bugs mui-ellipsis fz33"  style="width:2rem;font-weight:none;">{{item.title}}</p>
							<p class="mui-pull-right" style="overflow:visible;">
										<div class="right relative" style="height:0.35rem;">
											   
												<img v-if="item.area_type=='1'" src="../../assets/img/taolunqu/bao.png" alt="" style="width:0.22rem !important;" class="czjz"/>
												<img v-if="item.area_type!='1'" src="../../assets/img/taolunqu/jian.png" alt="" style="width:0.22rem !important;" class="czjz"/>
												<span class="fz25 cff4c00 mui-inline" style="margin-left:0.25rem;height:0.35rem;line-height:0.35rem;" >{{item.area}}</span>
					                  			<span class="fz19 c666666 mui-inline" style="height:0.35rem;line-height:0.4rem;" >呎</span>
										</div>
					                  			
							</p>
							
						</div>
						<span class="fz16 c666666 absolute" style="right:0rem;top:0.25rem;">{{item.publishAt||item.createdAt}}</span>
						<div class="mui-ellipsis">
							<div class=" relative" style="height:0.4rem;">
								<span class="fz35 cff4d00 mui-inline" style="height:0.4rem;line-height:0.4rem;">{{item.price}}</span>
								<span class="fz21 c666666  mui-inline" style="height:0.4rem;line-height:0.5rem;">{{item.category=='rent'?'元/月':'萬元'}}</span>
								<button type="button" :class="{opacity0:item.label[0]==''||item.label[0]==undefined}" class="czjz mui-btn mui-btn-outlined c36c748 fenzu fz21 center" style="margin-left:0.05rem;border:1px solid #36C748;">
									{{item.label[0]}}
								</button>

							</div>
							<div class="fz25 c666666" style="height:0.4rem;line-height:0.4rem;">{{item.sub_title}}</div>
              <div class="fz19 c000000 mui-ellipsis-2" style="height:0.48rem;line-height:0.25rem;margin-bottom:0.12rem;white-space: normal;">
                <p class="fz19" v-if="item.intro!=''&&item.intro!=undefined">{{item.intro}}</p>
								<pre style="font-size:0.19rem;" class="overflow fz19 padding0 margin0" v-if="item.intro==''||item.intro==undefined">{{item.intro==''||item.intro==undefined?'這業主很懶甚麼都沒有留下...':item.intro}}</pre>
							</div>
							<!--苹果保持居中-->
							<button type="button" class="mui-btn mui-btn-green fz15 mui-pull-left center" v-for="(items,indexs) in item.tag" style="margin-right:0.03rem;">{{items}}</button>
							<!--安卓保持居中
						   	<span class="fz15 mui-pull-left center radius bg36c748 cffffff" v-for="(items,indexs) in item.tag" style="padding:0.08rem;display:mui-inline;margin-right:0.03rem;line-height:1;">{{items}}</span>-->
						</div>
					</div>
				</a>
			

			</li>

		</ul>
</div>



  `,
		data:function() {
			return {
				bb:'yifabu',
        imageView2:'?imageView2/1/w/'+parseInt(245*w0)+'/h/'+parseInt(215*w0),
        fabulimit:'',//8大板块的发布限制数
        yifabu:''//8大板块的已发布已通过数量
			}
		},
		props:['datas','name'],//接收父元素传过来的经过帅选的数据
		methods: {
			//跳到详情
			xiangqings(objectId,item){
				// window.localStorage.setItem('jianjuItem',JSON.stringify(item))
				// this.$store.state.jianjuItem=item
				// alert(objectId)
				console.log(item)
				location.href='../xiangqing/xiangqing.html?objectId='+objectId+'&name=zusou&jianju=yes&sessiontoken='+sessiontoken
				// if(isAPP){
				// 	locationClick('xiangqing/'+objectId+'/zusou')
				// }else{
				// 	this.$router.push({name:'xiangqing',params:{objectId:objectId,name:'zusou'}})
				// }
				
      },
      	//我的楼盘操作事件
			caozuos(id,item,bb,index){
        var that=this;
          if(bb=='1'){
            //1.可以封盘+编辑(灰)
            this.$parent.keep=1
          }else if(bb=='0'){
            //2.可以开盘+编辑
            this.$parent.keep=2
          }
          //改变父元素
          
          this.$parent.tanchukuang=true
          this.$parent.arrayitem=item
          this.$parent.index=index

            // 请求总发布限制数量和已发布已通过数量
        $.get(Boss+'user/'+locations('userId'),function(data){
          if(data.status){
              console.log(data)
              that.$parent.fabulimit=data.result.publish_setting[1].limit
              that.fabulimit=data.result.publish_setting[1].limit
              $.get(Boss3 + 'user/agent',{'page':1,'limit':10,'sessiontoken':sessiontoken,'section':'','status':1,'show':1},function(datas){
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
        
			// //我的楼盘操作事件
			// caozuos(id,item,bb,index){
			
			// 	if(bb=='1'||bb=='-1'){
			// 		//1.可以编辑加封盘
			// 		this.$parent.keep=2
			// 	}else if(bb=='0'){
			// 		//2.可以封盘
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
			
			// //封盘
			// fengpan(name,index,objectId){
			// 	var that=this
			// 	var title='確認【封盤】'+name+'此盤源嗎？'
			// 	mui.confirm(title,'  ',['取消','確認'],function(data){
			// 		console.log(data)
			// 		if(data.index==0){
			// 			//点击了取消
			// 		}else if(data.index==1){
			// 			//点击了确定
			// 						mui.ajax(Boss + 'agent/'+objectId, {
			// 								data:{
			// 									sessiontoken:sessiontoken
			// 								},
			// 								dataType: 'json', //服务器返回json格式数据
			// 								type: 'DELETE', //HTTP请求类型
			// 								timeout: 10000, //超时时间设置为10秒；
   		// 							success: function(data) {
			// 									//1.服务器返回响应，根据响应结果，分析是否登录成功；
			// 									if(data.status == true) {
			// 											that.datas.splice(index,1)
                                                
			// 									}
												

			// 								},
			// 								error: function(xhr, type, errorThrown) {
			// 									//异常处理；
			// 									mui.toast(errorThrown, {
			// 										duration: 'long',
			// 										type: 'div'
			// 									})
			// 								}
			// 							});
						
			// 		}
			// 	},'div')
      // },
      	//封盘
			fengpan(name,index,objectId){
				var that=this
				var title='確認【封盤】'+name+'此盤源嗎？'
        var content='此账号已成功发布租售信息'+that.yifabu+'条（上限'+that.fabulimit+'条）'
        mui.confirm(content,title,['取消','確認'],function(data){
					console.log(data)
					if(data.index==0){
						//点击了取消
					}else if(data.index==1){
						//点击了确定
									mui.ajax(Boss22 + 'agent/'+objectId+'/show', {
											data:{
                        sessiontoken:sessiontoken,
                        objectId:objectId,
                        show:'0'
											},
											dataType: 'json', //服务器返回json格式数据
											type: 'POST', //HTTP请求类型
											timeout: 10000, //超时时间设置为10秒；
   									success: function(data) {
												//1.服务器返回响应，根据响应结果，分析是否登录成功；
												if(data.status == true) {
                          mescroll.resetUpScroll(); //重新搜索,重置列表数据
                          // that.datas[index].show=0
														// that.datas.splice(index,1)
                                                
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
				},'div')
      },
      	//删除
			shanchu(name,index,objectId,action){
				var that=this
				var title='確認【刪除】此盤源嗎？'
        var content='此账号已成功发布租售信息'+that.yifabu+'条（上限'+that.fabulimit+'条）'
        mui.confirm(content,title,['取消','確認'],function(data){
					console.log(data)
					if(data.index==0){
						//点击了取消
					}else if(data.index==1){
						//点击了确定          
            $.ajax({    
              url : Boss22+"agent/"+objectId,    
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
      			//开盘
			kaipan(name,index,objectId){
				var that=this
				var title='確認【開盤】'+name+'此盤源嗎？'
        var content='此账号已成功发布租售信息'+that.yifabu+'条（上限'+that.fabulimit+'条）'
        mui.confirm(content,title,['取消','確認'],function(data){
					console.log(data)
					if(data.index==0){
						//点击了取消
					}else if(data.index==1){
            mui.ajax(Boss22 + 'agent/'+objectId+'/show',{
              data:{
                sessiontoken:sessiontoken,
                objectId:objectId,
                show:'1'
              },
											dataType: 'json', //服务器返回json格式数据
											type: 'POST', //HTTP请求类型
											timeout: 10000, //超时时间设置为10秒；
   									success: function(data) {
												//1.服务器返回响应，根据响应结果，分析是否登录成功；
												if(data.status == true) {
                          mescroll.resetUpScroll(); //重新搜索,重置列表数据
                          // that.datas[index].show=1
														// that.datas.splice(index,1)
                                                
												}else{
                          mui.toast(data.result.message)
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
				},'div')
			}
			

		},
		mounted() {
        console.log('到底执行了liebiao的组件')
	}
		}
