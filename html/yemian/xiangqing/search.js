const search = {
template: `
	<!--头部的搜索条-->
	<div class="fz21 c000000" style="height:0.58rem;">
		<a id="" @click="isopen0" class="mui-btn czjz c36c748 fz27 bgebebeb border0" style="background:#ebebeb;padding:0;left:0.4rem;margin-top:0.05rem;">
			{{types==0?'租':'售'}}
			<span class='mui-icon mui-icon-arrowdown bold jiantou'></span>

			<div v-show='isopen==true' class="center absolute pop fz26 " style="width:1.06rem;height:1.31rem;">
				<p @click.stop='popover(0)' class="border-b c333333" style="height:0.54rem;line-height:0.54rem;margin-top:0.15rem;margin-bottom:0;">租</p>
				<p @click.stop='popover(1)' class="c333333" style="height:0.54rem;line-height:0.54rem;">售</p>
			</div>
		</a>

		<span class="czjz" style="left:1.2rem;height:0.3rem;border-right:1px solid #36C748;margin-top:0.05rem;"></span>
		<span class="mui-icon mui-icon-search fz30 czjz" style="left:1.4rem;margin-top:0.05rem;"></span>
		<input v-model="keyword" type="text" class="border0 fz21" placeholder="" placeholder="請輸入屋苑進行搜索"  style="width:5rem;padding-left:1.6rem;height:0.58rem;background:#EBEBEB;">
		<button @click="search" type="button" class="mui-btn mui-btn-green mui-pull-right fz28 radius" style="padding:0.07rem 0.1rem !important;">搜索</button>
	</div>

  `,
		data:function() {
			return {
				types:-1,//判断当前是租还是售 types: 0 //0是租，1是售
				keyword:'',//输入框搜索
				isopen: false //判断是否打开租售弹出框
			}
		},
		methods: {
			//搜索按钮
			search(){
//				if(this.keyword!=''){
					this.$parent.searchkey=this.keyword
					//调用父元素的方法根据条件去更新列表
				    this.$parent.onfresh()
//				}
				
			},
			//弹出框事件
			isopen0() {
				if(this.isopen == false) {
					this.isopen = true
					$('.jiantou').addClass('mui-icon-arrowup')
					$('.jiantou').removeClass('mui-icon-arrowdown')
				} else {
					this.isopen = false
					$('.jiantou').addClass('mui-icon-arrowdown')
					$('.jiantou').removeClass('mui-icon-arrowup')
				}

			},
			//弹出框的租售点击事件
			popover(n) {
				//设置租售并关闭弹窗
				this.types = n
				if(n==0){//租
					this.$parent.category='rent'
					this.$parent.torent()
				}else{//售
					this.$parent.category='sell'
					this.$parent.tosell()
				}
				this.isopen=false
				// alert(this.isopen)
				$('.jiantou').addClass('mui-icon-arrowdown')
				$('.jiantou').removeClass('mui-icon-arrowup')
				this.$parent.page=0
				// this.$parent.datas=[]
				this.$parent.refresh()
			}
		},
		mounted() {
			if(locations('keyword')){
				this.keyword=locations('keyword')
			}
             if(locations('souorzu')=='liebiaoZu'){
             	this.types=0
             }else{
             	this.types=1
             }
		}
		}
