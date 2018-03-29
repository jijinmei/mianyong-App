// 	两个帅选的：招生 家政 汽车 家私
	      //   一个帅选的：装修 搬屋 代购 跳蚤
	        
	      //  电话按钮：装修 搬屋 代购  招生 家政
	      // 没有电话按钮的：汽车 家私 跳蚤
const liebiaos = {
template: `
	<div>

	
		<!--2.帅选出来的列表内容-->
		<ul   class="bgebebeb mui-table-view relative LIEBIAOS" style="z-index:1;margin-top:0.7rem;" >
			<li  v-for="(item,index) in datas" @tap="xiangqings(item.objectId,item)"  class="mui-table-view-cell mui-media bai listLiebiao padding20" >
				
					<!--我的发布特有的封盘按钮@tap.stop="fengpan(item.title,index,item.objectId)"-->
				 <p v-show="who=='wodefabu'" @tap.stop="caozuos2(item.objectId,item,item.status,index)" class="border-b relative fz25 c555555 center" style="top:-0.2rem;height:0.6rem;line-height:0.6rem;">
				 	<span class="czjz fz25" style="left:0;" :class="{cff0000:bb=item.status=='-1',cff4d00:item.status=='0',c999999:item.status=='-2',c36c748:item.status=='1'}">{{item.status=='-1'?'不通過':(item.status=='0'?'審核中':(item.status=='1'?'已發佈':'已下架'))}}</span>
				 	<img  src="../../assets/img/me/caozuo.png" alt="" style="width:0.29rem;right:0.6rem;" class="czjz" />
				 	<span  class="czjz fz25 c000000" style="right:0;">操作</span>
				 </p>
				 
				<a href="javascript:;" class="padding0 margin0" >
					<div class="mui-media-object mui-pull-left tukuang overflow relative" >
						<img class="jz" :src="item.pics!=undefined?item.pics[0]+imageView2:''" style="min-width:2.45rem;min-height:2.15rem;" >
						<button type="button" class="mui-btn mui-btn-blue absolute fz19 cffffff" style="padding:0.05rem 0.1rem;border-radius:0;border:none;right: 0;top: 0;background-color: rgba(0,0,0,0.4);">
							{{item.pics.length}}張
						</button>
						
					</div>

					<div class="mui-media-body relative">
							<p class=" mui-pull-left c36c748 mui-ellipsis-2 fz30"  style="height:0.7rem;line-height:0.36rem;width:100%;font-weight:none;">{{item.title}}</p>
							
							<p  class="mui-pull-left c666666 fz21"   :class="{seconds:item.templeId=='content_01','mui-ellipsis-2':item.templeId=='content_02','mui-ellipsis-3':item.templeId=='content_01'}"  style="margin-top:0.1rem;font-weight:none;">
								{{item.content}}
							</p>
							
							
							<p v-if="item.templeId=='content_02'"  class="mui-pull-right right cff4d00 fz35 relative"  style="height:0.43rem;line-height:0.43rem;width:100%;font-weight:none;">
								<span class="fz16 c666666 absolute" style="left:0;bottom:0.03rem;line-height:0.2rem;">{{item.createdAt}}</span>
								{{item.price==-1?'面議':item.price}}<span class="fz25 c666666" v-if="item.price!=-1">元</span>
							</p>
							
						
						
						
					</div>
				</a>
				 <!-- contactType=0  仅在线咨询  -->
					<img @tap.stop="call(item.phone)" v-if="item.templeId=='content_01'&&item.contactType==1" src="../../assets/img/wuyebangzhu/phone1.png" style="width:1.15rem;right:0.2rem;bottom:0.2rem;" class="absolute"/>
			</li>

		</ul>
		<!--<div v-show="datas.length==0" class="c999999 fz23 center"  style="margin-top:4.22rem;">抱歉，未找到相關結果。</div>-->
	
	</div>


  `,
		data:function() {
			return {
				bb:'yifabu',
				name:'no',
				imageView2:'?imageView2/1/w/'+parseInt(245*w0)+'/h/'+parseInt(215*w0)
			}
		},
	props:['datas','who'],//接收父元素传过来的经过帅选的数据
		methods: {
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
				if(bb=='-1'||bb=='1'){
					//1.可以编辑加下架
					this.$parent.keep=2
				}else if(bb=='0'){
					//2.可以下架
					this.$parent.keep=1
				}else if(bb=='-2'){
					//3.编辑（不可修改）
					this.$parent.keep=0
				}
				//改变父元素
				this.$parent.tanchukuang=true
				this.$parent.arrayitem=item
				this.$parent.index=index
			},
			//下架
			xiajia(name,index,objectId,action){
				var that=this
				var title='確認【下架】此商店嗎？'
				mui.confirm(title,'  ',['取消','確認'],function(data){
					console.log(data)
					if(data.index==0){
						//点击了取消
					}else if(data.index==1){
						//点击了确定
					var formData = new FormData();             
                    formData.append("sessiontoken",sessiontoken);
                    formData.append("objectId",objectId);
                    formData.append("action",action);
                   jQuery.ajax({
                        url: Boss3 + 'article/'+objectId+"/status",
                        type: "POST",
                         async:false,
                        processData: false,
                        contentType: false,
                        data: formData,
                    })
                    .done(function(data, textStatus, jqXHR) {
                        console.log("HTTP Request Succeeded: " + jqXHR.status);
                        console.log(data);
                     //1.服务器返回响应，根据响应结果，分析是否登录成功；
												if(data.status == true) {
													//修改对应的发布状态 改为已下架
														that.datas[index].status='-2'
                                                
												}
                       
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log("HTTP Request Failed");
                        mui.toast("HTTP Request Failed")
                    })
                    .always(function() {});
					
					
					
					
					
						
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
    
//          alert("3"+this.name)
	}
		}
