Vue.use(Vuex)
var pb_array = [
  {category: '', type: '住宅', buildName: '', buildArea: '', buildStreet: '', rentType: '', propertStatus: '', shopType: '', pics: [], price: '', space: '', area: '', useableArea: '', floor: '', code: '', direct: '', landscape: '', decoration: '', cook: '', pet: '', startTime: '', infrastructure: '', homeInfrastructure: '', locationInfrastructure: '', features: '', contactType: '', contacts: '', phone: '', call: '', remark: '', from: '', sessiontoken: ''},
  {category: '', type: '車位', buildName: '', buildArea: '', buildStreet: '', rentType: '', propertStatus: '', shopType: '', pics: [], price: '', space: '', area: '', useableArea: '', floor: '', code: '', direct: '', landscape: '', decoration: '', cook: '', pet: '', startTime: '', infrastructure: '', homeInfrastructure: '', locationInfrastructure: '', features: '', contactType: '', contacts: '', phone: '', call: '', remark: '', from: '', sessiontoken: ''},
  {category: '', type: '商鋪', buildName: '', buildArea: '', buildStreet: '', rentType: '', propertStatus: '', shopType: '', pics: [], price: '', space: '', area: '', useableArea: '', floor: '', code: '', direct: '', landscape: '', decoration: '', cook: '', pet: '', startTime: '', infrastructure: '', homeInfrastructure: '', locationInfrastructure: '', features: '', contactType: '', contacts: '', phone: '', call: '', remark: '', from: '', sessiontoken: ''},
  {category: '', type: '寫字樓', buildName: '', buildArea: '', buildStreet: '', rentType: '', propertStatus: '', shopType: '', pics: [], price: '', space: '', area: '', useableArea: '', floor: '', code: '', direct: '', landscape: '', decoration: '', cook: '', pet: '', startTime: '', infrastructure: '', homeInfrastructure: '', locationInfrastructure: '', features: '', contactType: '', contacts: '', phone: '', call: '', remark: '', from: '', sessiontoken: ''},
  {category: '', type: '工業大廈', buildName: '', buildArea: '', buildStreet: '', rentType: '', propertStatus: '', shopType: '', pics: [], price: '', space: '', area: '', useableArea: '', floor: '', code: '', direct: '', landscape: '', decoration: '', cook: '', pet: '', startTime: '', infrastructure: '', homeInfrastructure: '', locationInfrastructure: '', features: '', contactType: '', contacts: '', phone: '', call: '', remark: '', from: '', sessiontoken: ''}
  ]
var store = new Vuex.Store({
  state:{  
  	tdate:[],//讨论区发布的图片
    xiangqingData:{
    	pics:[
    	{"objectId":"5a7ae487756571003c53a11e","url":"http://ac-UIci50Wq.clouddn.com/116005e258c949ec0ff6.jpg"},
    	{"objectId":"5a7ae488ac502e0032502f9e","url":"http://ac-UIci50Wq.clouddn.com/bf50cb52f6eedbeb1d42.jpg"},
    	{"objectId":"5a7ae488d50eee0042bf1a86","url":"http://ac-UIci50Wq.clouddn.com/7072ccbd9f5cdb1fe4e0.jpg"}
    	],
    	title:'1',
    	createdAt:'?',
    	views:'?',
    	rent_type:'1',
    	price:'331',
    	category:'1',
    	content:'1',
    	contacts:'',
    	templeId:'',
    	contactType:'',
    	from:'',
    	user:{
    		likes:'1',
    		call:'1',
    		displayname:'1',
    		createdAt:'1'
    	}
    },
    jianju:'yes',
    jianjuItem:'no',
    name:'no',//标题栏
    index:9,//这个是当前处于的标题模块
    apple:'',//                                  // state : 固定数据
    count: 0,
    publishArray: pb_array,
    currentType: 0,
    currentObject: pb_array[0], // 當前類型的數據數組
    userData: {}, // 登錄 / 註冊存儲的用戶個人信息的對象
    files: null,
    sellObject: {},
    notEdit: false
  },
  getters: {                                // getters : 获取数据
    readCurrentData(state) {
      return state.currentObject
    },
    getSellObject (state) {
      return state.sellObject
    }
  },
  mutations: {                              // 操作数据
    increment(state) {
      state.count++
    },
    changeTypeData(state, index) {
      state.currentType = index
      state.currentObject = state.publishArray[state.currentType]
    },
    setPublishData(state, obj) {
      state.currentObject[obj.name] = obj.content
    },
    // 存照片
    savePics (state, obj) {
      let arr = JSON.parse(JSON.stringify([].concat(obj)))
      state.currentObject.pics = arr
      
      // 存封面图
      state.currentObject.fengmiantu = arr[0]
    },
    clearFengmiantu (state) {
      state.currentObject.fengmiantu = ''
    },
    // 給對象添加屬性
    setSellObject (state, arr) {
      state.sellObject[arr[0]] = arr[1]
    },
    removeSellObjectSub (state, name) {
      if (state.sellObject[name]) {
        delete state.sellObject[name]
      }
    },
    clearSellObject (state) {
      state.sellObject = {}
    }
  },
  actions: {                                // 异步操作数据
           
  }

})

window.store=store


