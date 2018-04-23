const shuaixuan = {
template: `
	<div>
		<!--1.头部帅选-->

		<ul class="mui-table-view fz23 c666666 shuaixuan relative parent" style="z-index:1000;width:100%;">
			<li class="mui-table-view-cell mui-collapse isquyu" >
        <a class="mui-navigate-right jtc36c748 relative"style="text-align:right;padding-right:0.3rem !important;max-width:1.3rem;min-width:0.5rem !important;" href="#" :class="{c36c748:quyuIdx!=0,leng2:this.$parent.build_area.length==2,leng3:this.$parent.build_area.length==3,leng4:this.$parent.build_area.length>3}" @click="open($event)">
        
					{{this.$parent.build_area=='不限'?'區域':(this.$parent.build_area.indexOf(',')!=-1?this.$parent.buildsheng:this.$parent.buildshi)}}
	
				</a>
				<!--列表选项-->
				<div class="mui-collapse-content bai paddingt0 margin0" style="left:0rem;top:0;width: 6.4rem;height:auto;">
                      <ul class="mui-table-view mui-pull-left margint0 quyuz overflow" style="width:3.2rem;">
                              <li  v-for="(items,keys,indexs) in quyuZuo" class="mui-table-view-cell padding0" @tap="province(items,indexs,keys)"  style="height:0.74rem;line-height:0.74rem;" :class="{bgeeeeee:quyuIdx!=indexs,bgffffff:quyuIdx==indexs}" >
                                  <a :class="{'mui-navigate-right':items.length>0,c36c748:quyuIdx==indexs,c666666:quyuIdx!=indexs,jiantous:indexs<3}" class="fz27 margin0" style="padding-left:0.4rem;">
                                     {{keys}}
                                  </a>

                              </li>
                              
                          </ul>
                          <ul class="mui-table-view mui-pull-right margint0 quyuy" style="height:7.4rem;width:3.2rem;overflow-y:scroll;">
                              <li v-for="(items,indexs) in quyuYou" class="mui-table-view-cell padding0" @tap="city(items,indexs)"  style="height:0.74rem;line-height:0.74rem;"   >
                                  <a :class="{c36c748:quyuIdxr==indexs,c333333:quyuIdxr!=indexs}" class="fz27 margin0" style="padding-left:0.4rem;">
                                     {{items}}
                                  </a>

                              </li>
                              
                          </ul>
                        
                          <div class="center mui-pull-left" style="width:100%;margin-top:0.35rem;margin-bottom:0.05rem;">
                          	<button  @tap="quedings" type="button" class="mui-btn mui-btn-green fz30" style="padding:0.1rem 0.3rem !important;margin-right:0.69rem;">確定</button>
                          <button @tap="resets" type="button" class="mui-btn mui-btn-success mui-btn-outlined fz30 " style="padding:0.1rem 0.3rem !important;">重置</button>
                          </div>
                          
				</div>
			</li>
			<li class="mui-table-view-cell mui-collapse iszujin relative">
				<a class="mui-navigate-right jtc36c748" href="#" @tap="open($event)" :class="{c36c748:zujinIdx!=0}">
					{{souorzu=='liebiaoZu'?'租金':'售價'}}
					
				</a>
				
				<div class="mui-collapse-content bai zujin paddingt0 margin0" style="left:-1.6rem;top:0;width: 6.4rem;">
					<ul class="mui-table-view c333333" style="margin-top:0;">
					        <li class="mui-table-view-cell fz27" @tap="zhujins(index)" :class="{c36c748:index==zujinIdx}" v-for="(item,index) in zujin" style="padding-left:0.43rem;">{{item}}</li>
					</ul>
				</div>
				<span style="border-right:1px solid #EBEBEB;left:0rem;top:0.17rem;height: 0.3rem;width:0;" class="absolute"></span>
				<span style="border-right:1px solid #EBEBEB;right:0rem;top:0.17rem;height: 0.3rem;width:0;" class="absolute"></span>
			</li>
			<li class="mui-table-view-cell mui-collapse istype">
				<a class="mui-navigate-right jtc36c748" href="#" @tap="open($event)" :class="{c36c748:leixingIdx!=0}">
					類型
					
				</a>
				<div class="mui-collapse-content bai leixing paddingt0 margin0" style="left:-3.2rem;top:0;width: 6.4rem;">
					<ul class="mui-table-view c333333" style="margin-top:0;">
					        <li class="mui-table-view-cell fz27" @tap="leixings(item,index)" :class="{c36c748:index==leixingIdx}" v-for="(item,index) in leixing" style="padding-left:0.43rem;">{{item}}</li>
					</ul>
				</div>
				<span style="border-right:1px solid #EBEBEB;right:0rem;top:0.17rem;height: 0.3rem;width:0;" class="absolute"></span>
			</li>
			<li class="mui-table-view-cell mui-collapse islaiyuan">
				<a class="mui-navigate-right jtc36c748" href="#" @tap="open($event)" :class="{c36c748:laiyuanIdx!=0}">
					{{laiyuanIdx==0?'來源':(laiyuanIdx==1?'個人':'中介')}}

				</a>
				<div class="mui-collapse-content bai laiyuan paddingt0 margin0" style="left:-4.8rem;top:0;width: 6.4rem !important;">
					<ul class="mui-table-view c333333" style="margin-top:0;">
					        <li class="mui-table-view-cell fz27" @tap="laiyuans(item,index)" :class="{c36c748:index==laiyuanIdx}" v-for="(item,index) in from" style="padding-left:0.43rem;">{{item}}</li>
					</ul>
				</div>
			</li>
		</ul>
		
		<!--遮罩层-->
		<div class="mui-backdrop" v-show="backdrop==true"></div>
	</div>

  `,
		data:function() {
			return {
				backdrop:false,
				quyuZuo:[],
				quyuYou:[],//地区详细
				quyuItem:[],//地区标题
				sheng:'不限',//提交的省
				shi:'不限',//提交的市
				quyuIdx:0,//区域左边的index
				quyuIdxr:0,//区域右边的index
				zujins:[],
				zujin:[],
				zujinIdx:0,//默认选择租金的不限,点击哪个就让哪个对应的下标设置为他，if(zujinIdx==0){var price_min=4000}
				leixing:['不限','住宅','車位','商鋪','寫字樓','工業大廈'],
				leixingIdx:0,//默认选择租金的不限,点击哪个就让哪个对应的下标设置为他，if(zujinIdx==0){var price_min=4000}
				from:['全部來源','個人','中介'],
				laiyuanIdx:0,//默认选择租金的不限,点击哪个就让哪个对应的下标设置为他，if(zujinIdx==0){var price_min=4000}
				chooseZu:[
								{'price_min':'不限','price_max':'不限'},
								{'price_min':'','price_max':'4000'},
								{'price_min':'4000','price_max':'8000'},
								{'price_min':'8000','price_max':'10000'},
								{'price_min':'10000','price_max':'15000'},
								{'price_min':'15000','price_max':'20000'},
								{'price_min':'20000','price_max':''}
				               ],//租的价格
				chooseZus:['不限','$4,000元或以下','$4,000-$8,000元','$8,000-$10,000元','$10,000-$15,000元','$15,000-$20,000元','$20,000元以上'],
				chooseSou:[
								{'price_min':'不限','price_max':'不限'},
								{'price_min':'','price_max':'200'},
								{'price_min':'200','price_max':'400'},
								{'price_min':'400','price_max':'600'},
								{'price_min':'600','price_max':'800'},
								{'price_min':'800','price_max':'1000'},
								{'price_min':'1000','price_max':'1200'},
								{'price_min':'1200','price_max':''}
				               ],//售的价格
				 chooseSous:['不限','200萬或以下','$200-$400萬','$400-$600萬','$600-$800萬','$800-$1000萬','$1000-$1200萬','$1200萬以上']
			}
		},
		props:['souorzu'],//是售盘还是租盘
		methods: {
			torent(){
				//租盘列表的帅选
                    this.zujins=this.chooseZu
					this.zujin=this.chooseZus
			},
			tosell(){
                   //售盘列表的帅选
					this.zujins=this.chooseSou
					this.zujin=this.chooseSous
			},
			//判断是哪个列表进来的，从而设置租金或者售价
			souorzus(){
				
				//租盘列表的帅选
				if(this.souorzu=='liebiaoZu'){
//					alert(1)
					this.zujins=this.chooseZu
					this.zujin=this.chooseZus
				}else if(this.souorzu=='liebiaoSou'||this.souorzu=='liebiaoSearch'){
//					alert(2)
					//售盘列表的帅选
					this.zujins=this.chooseSou
					this.zujin=this.chooseSous
				}
			},
			//1.区域重置按钮和确定按钮
			resets(){
				this.quyuIdx=0//不限左边的下标
				this.quyuIdxr=0//不限右边的下标
				this.quyuYou=[]//不限右边是空的
				// this.$parent.build_area='不限'
				this.shi='不限'
				this.sheng='不限'
			},
			quedings(){
				if(this.shi!=''&&this.shi!='不限'){
          this.$parent.build_area=this.shi
          this.$parent.buildshi=this.shi
          this.$parent.buildsheng=this.sheng
//					alert("shi"+this.shi)
				}else{
          this.$parent.build_area=this.sheng
          this.$parent.buildsheng=this.sheng
          this.$parent.buildshi=this.shi
//					alert("sheng"+this.sheng)
				}
				$('.isquyu').removeClass('mui-active')
				this.backdrop=false
				//调用父元素的方法根据条件去更新列表
				
				this.$parent.onfresh()
			},
			//2.租金
			zhujins(index){
				this.zujinIdx=index
				this.$parent.price_min=this.zujins[index].price_min
				this.$parent.price_max=this.zujins[index].price_max
				$('.iszujin').removeClass('mui-active')
				this.backdrop=false
				//调用父元素的方法根据条件去更新列表
				this.$parent.onfresh()
			},
			//3.类型
			leixings(item,index){
				this.leixingIdx=index
				this.$parent.type=item
				$('.istype').removeClass('mui-active')
				this.backdrop=false
				//调用父元素的方法根据条件去更新列表
				this.$parent.onfresh()
				
			},
				//4.来源
			laiyuans(item,index){
				this.laiyuanIdx=index
				this.$parent.from=item
				$('.islaiyuan').removeClass('mui-active')
				this.backdrop=false
				//调用父元素的方法根据条件去更新列表
				this.$parent.onfresh()
				
      },
      		//点击帅选的时候让遮罩层出现
			opens(e){
				$('ul>li.mui-active').removeClass('mui-active')
					this.backdrop=false
			},
			//点击帅选的时候让遮罩层出现
			open(e){
				if($(e.currentTarget).parent('li').hasClass('mui-active')){
					this.backdrop=false
					console.log(1)
				}else{
					this.backdrop=true
          console.log(0)
          // 让搜索的弹出框消失
          if(document.title=='搜索'){
              this.$parent.tosearch()
          }
        
				}
      },
      // 点击了省,则取省对应的所有市
			province(item,index,keys){
				this.quyuIdx=index
				this.quyuIdxr=-1
        this.quyuYou=item
        if(item.length==0){
          	this.shi='不限'
        }else{
          this.shi=item.join(",");
        }
      
				this.sheng=keys
			},
            city(item,index){
            	this.quyuIdxr=index
            	this.shi=item
            },
            aa(){
//          	var mask = mui.createMask(callback);//callback为用户点击蒙版时自动执行的回调；
mask.show();//显示遮罩
            }
		},
		mounted() {
			console.log(this.souorzu)
			var that=this
			//售价和租金的列表判断是哪个租售列表进来的
			this.souorzus();
			//获取区域
				mui.ajax(Boss + 'system/area', {
											dataType: 'json', //服务器返回json格式数据
											type: 'GET', //HTTP请求类型
											timeout: 10000, //超时时间设置为10秒；
											//	headers:{'Content-Type':'application/json'},
   									success: function(data) {
												//1.服务器返回响应，根据响应结果，分析是否登录成功；
												if(data.status == true) {
														that.quyuZuo=data.result
                                                
												}
												

											},
											error: function(xhr, type, errorThrown) {
												//异常处理；
												self.endPullDownToRefresh();//关闭刷新
												mui.toast(errorThrown, {
													duration: 'long',
													type: 'div'
												})
											}
										});
		
		}
		}
