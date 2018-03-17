const list = {
template: `
	<div>
		<!--2.帅选出来的列表内容-->
		<ul id="LIST" class="bgebebeb mui-table-view relative before00" style="z-index:1;" v-if="item!='no'">
			<li  v-if="type=='agent'"   class="mui-table-view-cell mui-media bai listLiebiao padding20" >		 

				 <!--正常列表1-->
				<a  class="padding0 margin0" >
					<div class="mui-media-object mui-pull-left tukuang overflow relative" >
							<img class="jz"  :src="item.pics!=undefined?item.pics[0]+imageView2:''" style="min-width:2.45rem;min-height:2.15rem;">
						<button type="button" class="mui-btn mui-btn-blue absolute fz19 cffffff" style="padding:0.05rem 0.1rem;border-radius:0;border:none;right: 0;top: 0;background-color: rgba(0,0,0,0.4);">
							{{item.pics.length}}張
						</button>
						<button type="button" class="mui-btn absolute fz21 cffffff" style="padding:0.05rem 0.1rem;border-radius:0;border:none;right: 0;bottom: 0;background-color: rgba(0,0,0,0.4);">
		          	      	<span class="cff4d00">@{{item.unit}}</span>/呎
		          	      </button>
					</div>

					<div class="mui-media-body relative">
						<div class="fz33 c36c748 overflow" >
							<p class="mui-pull-left c36c748 mui-ellipsis fz33"  style="width:2rem;font-weight:none;">{{item.title}}</p>
							<p class="mui-pull-right" style="overflow:visible;">
										<div class="right relative" style="height:0.35rem;">
												<img v-if="item.area_type=='1'" src="../../assets/img/taolunqu/bao.png" alt="" style="width:0.22rem !important;" class="czjz"/>
												<img v-if="item.area_type!='1'" src="../../assets/img/taolunqu/jian.png" alt="" style="width:0.22rem !important;" class="czjz"/>
												<span class="fz25 cff4c00 mui-inline" style="margin-left:0.25rem;height:0.35rem;line-height:0.35rem;" >{{item.area}}</span>
					                  			<span class="fz19 c666666 mui-inline" style="height:0.35rem;line-height:0.4rem;" >呎</span>
										</div>
					                  			
							</p>
							
						</div>
						<span class="fz16 c666666 absolute" style="right:0rem;top:0.25rem;">{{item.createdAt}}</span>
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
								{{item.intro==''||item.intro==undefined?'這業主很懶甚麼都沒有留下...':item.intro}}
							</div>
							<!--苹果保持居中
							<button type="button" class="mui-btn mui-btn-green fz15 mui-pull-left center" v-for="(items,indexs) in item.tag" style="margin-right:0.03rem;">{{items}}</button>-->
							<!--安卓保持居中-->
						   	<span class="fz15 mui-pull-left center radius bg36c748 cffffff" v-for="(items,indexs) in item.tag" style="padding:0.08rem;display:mui-inline;margin-right:0.03rem;line-height:1;">{{items}}</span>
						</div>
					</div>
				</a>
			

			</li>


			<li v-if="type=='article'"   class="mui-table-view-cell mui-media bai listLiebiao padding20" >
			
				 
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
</div>



  `,
		data:function() {
			return {
				imageView2:'?imageView2/1/w/'+parseInt(245*w0)+'/h/'+parseInt(215*w0),
				item:'no',
				type:''
			}
		},
		// prop:['item'],
		methods: {


		},
		mounted() {
			this.item=this.$parent.item
			this.type=locations('type')
	}
		}
