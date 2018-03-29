const shuaixuans = {
template: `
	<div>
		<!--1.头部帅选-->
		<header style="z-index:997;" class="mui-bar mui-bar-nav bai header padding0" :class="{SHUAIXUANS:sousuobar=='no',SHUAIXUANS1:sousuobar=='yes',model8shuaixuans:routename=='model8Search'}" data-top='0' data-offset='150' data-duration='16' data-scrollby=".mui-scroll-wrapper">
			<ul class="mui-table-view fz23 c666666">
			    <li v-if="jiaSitype.length>1" class="first tap mui-table-view-cell mui-collapse mui-pull-left center" style="width:50%;">
			        <a @tap="zzc1($event)" class=" mui-navigate-right tap1 fz23  center" :class="{c36c748:zuoitem!='全部分類',jiantou2:zuoitem.length==2,jiantou3:zuoitem.length==3,jiantou4:zuoitem.length==4,jiantou5:zuoitem.length==5}" href="#">{{zuoitem}}</a>
			        <div class="mui-collapse-content mT08 paddingt0 margint0" >
			            <ul class="mui-table-view list margint0">
			                    <li @tap="type(item)" class="mui-table-view-cell fz27" v-for="(item,index) in jiaSitype">
			                        
			                            {{item}}
			                       
			                    </li>

			                </ul>
			        </div>
			    </li>
			    <li class="second tap mui-table-view-cell mui-collapse mui-pull-right center" style="width:50%;">
			        <a @tap="zzc2($event)"  class=" mui-navigate-right tap2 fz23 center jiantou80"  href="#"  :class="{c36c748:youitem!='默認排序'}" >{{youitem}}</a>
			        <div class="mui-collapse-content center mT08 paddingt0 margint0" >
			            <ul class="mui-table-view list fz27 margint0">
			                    <li  @tap="paixu(item)" class="mui-table-view-cell fz27" v-for="(item,index) in jiaSipaixu">
			                        
			                              {{item}}
			                       
			                    </li>

			                </ul>
			        </div>
			           
			    </li>
			   
			</ul>
			<!--v-if="name!='banWu'&&name!='daiGou'&&name!='tiaoSi'&&name!='zhuangXiu'"-->
			<span  v-if="jiaSitype.length>1" class="border-r jz" style="height:0.3rem;width:0.1rem;"></span>
		</header>
		<!--遮罩层-->
		<div class="mui-backdrop" v-show="backdrop==true" style="z-index:996;"></div>
	</div>

  `,
		data:function() {
			return {
				// routename:'',//如果是8大模块的查询页面则將top设置为0.88rem
				name:'no',
				page:0,
				count:'',
				jiaSitype:[],
				jiaSipaixu:['默認排序','發佈時間','瀏覽次數'],
				zuoitem:'全部分類',//当前选择的类型
				youitem:'默認排序',//当前选择的状态
				backdrop:false,
			}
		},
		props:['datas','sousuobar','routename'],//接收父元素传过来的经过帅选的数据
		methods: {
			//点击全部类型
			zzc1(e){
				
				if($('.first').hasClass('mui-active')){
					this.backdrop=false
				}else{
					this.backdrop=true
				}
			},
			//点击全部状态
			zzc2(e){
				if($('.second').hasClass('mui-active')){
					this.backdrop=false
				}else{
					this.backdrop=true
				}
			},
//全部类型
type(item){
	this.zuoitem=item
	this.backdrop=false
	this.$parent.datas=[]
	$('.first').toggleClass('mui-active')
	this.$parent.page=0
	this.$parent.tags=(item=='全部分類'?'':item)
//	alert(item)
	this.$parent.refresh()
	
},
//默认排序
paixu(item){
	this.youitem=item
	this.backdrop=false
	this.$parent.datas=[]
	$('.second').toggleClass('mui-active')
	this.$parent.page=0
	this.$parent.sort=(item=='默認排序'?'':item)
	this.$parent.refresh()
	
}
			

		},
		mounted() {
			var that=this
			// this.routename=locations('routename')
            this.name=locations('name')
			$.get(Boss3+'section/tagItems',{'title':this.name,'sessiontoken':sessiontoken},function(data){
				console.log(data.result.tags)
				that.jiaSitype=data.result.tags
				console.log(that.jiaSitype)
				that.jiaSitype.unshift('全部分類')
			})
	}
		}
