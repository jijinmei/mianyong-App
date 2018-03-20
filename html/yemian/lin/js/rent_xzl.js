'use strict';

new Vue({
    el: '#app',
    created: function created() {

        // this.rentobject = JSON.parse(localStorage.getItem('rentobject'))


        if (localStorage.getItem('rentobject')) {
            this.rentobject = JSON.parse(localStorage.getItem('rentobject'));
        } else {
            this.rentobject = JSON.parse(JSON.stringify(saveObject));
        }
    },

    watch: {
        rentobject: {
            handler: function handler(newVal) {
                localStorage.setItem('rentobject', JSON.stringify(newVal));
            },
            deep: true
        }
    },
    mounted: function mounted() {
        var _this = this;

        // window.store.state.name = '發佈租盤房源'

        // 租金 讀取狀態
        this.price = this.rentobject.price;

        // 讀取面積 狀態
        this.useableArea = this.rentobject.useableArea;
        this.area = this.rentobject.area;

        // 讀取樓層 狀態
        this.getData2(this.floorData, 'floor');

        // 讀取樓層自定義狀態 狀態
        var floorStr = this.rentobject.floor;
        if (floorStr !== '底層' && floorStr !== '中層' && floorStr !== '高層' && floorStr !== '極高層') {
            this.floor = this.rentobject.floor;
        }

        // 讀取景觀 狀態
        this.getData(this.landscapeData, 'landscape');

        // 讀取裝修程度 狀態
        this.getData(this.decorationData, 'decoration');

        // 單位/座號 讀取狀態
        this.code = this.rentobject.code;

        // 讀取可起租時間 狀態
        var starttime = this.rentobject.startTime;
        if (starttime && starttime === '隨時') {
            this.isRent = true;
        } else if (starttime) {
            this.datetime = starttime;
        }

        // 读取特色说明状态
        this.getData(this.featuresData, "features");

        // 發佈者數據 读取状态
        var fromRead = this.rentobject.from;
        this.fromData.forEach(function (_item, _index) {
            if (fromRead === _item.text) {
                _item.state = true;
            }
        });

        // 聯繫方式 读取状态
        var contactRead = this.rentobject.contactType;
        this.contactTypeData.forEach(function (_item, _index) {
            if (parseInt(contactRead) === _index) {
                this.isContact = _index === 0 ? true : false;
                _item.state = true;
            }
        }, this);

        // 業主的話 讀取狀態
        this.remark = this.rentobject.remark;

        // 读取用户信息
        var userdata = JSON.parse(localStorage.userData);
        var call = this.rentobject.call;
        // 判断 内存中是否存在该数据, 优先读取内存中的数据
        if (call) {
            this.contactTypeData2.forEach(function (_item) {
                if (call == _item.eText) {
                    _item.state = true;
                }
            });
        } else {
            // 否则, 读取登录时, 用户的个人信息
            if (userdata.call) {
                this.contactTypeData2.forEach(function (_item) {
                    if (userdata.call == _item.eText) {
                        _item.state = true;
                        _this.rentobject.call = _item.eText;
                    }
                });
            }
        }
    },

    computed: {
        setStyle: function setStyle() {
            return { backgroundImage: 'url(' + (this.isRent ? '../../assets/img/fangzu/checkon.png' : '../../assets/img/fangzu/checkoff.png') + ')' };
        },
        contactTypeStyle: function contactTypeStyle() {
            return {
                borderBottom: this.isContact ? 'none' : '1px solid #e6e6e6',
                paddingBottom: this.isContact ? '0' : '0.29rem'
            };
        },
        setImg: function setImg() {
            if (this.rentobject.fengmiantu) {
                return {
                    backgroundImage: 'url(' + this.rentobject.fengmiantu + ')'
                };
            } else {
                return {
                    backgroundImage: 'url(\'../imgs/fangzu/test.png\'))'
                };
            }
        },
        setaddImg: function setaddImg() {
            if (this.rentobject.fengmiantu) {
                return '../imgs/fangzu/editPic.png';
            } else {
                return '../imgs/fangzu/addPic.png';
            }
        },
        iseditImg: function iseditImg() {
            if (this.rentobject.fengmiantu) {
                return false;
            } else {
                return true;
            }
        }
    },
    methods: {
        publish: function publish() {
            var _this2 = this;

            // console.log(this.rentobject)


            this.publishObj.publish(function (res) {
                if (!res.message) {
                    _this2.$router.push('HOME');
                }
            });
        },

        // 添加照片
        addPic: function addPic() {
            // this.$router.push('rent_release_pic.html')
        },
        next: function next(name) {
            // console.log(window.store.state.currentObject);

            // let pics = window.store.state.currentObject.pics
            // let price = window.store.state.currentObject.price
            // let useableArea = window.store.state.currentObject.useableArea
            // let area = window.store.state.currentObject.area
            // let floor = window.store.state.currentObject.floor
            // let landscape = window.store.state.currentObject.landscape
            // let decoration = window.store.state.currentObject.decoration
            // let from = window.store.state.currentObject.from
            // let contactType = window.store.state.currentObject.contactType

            // console.log(price, useableArea, area, floor, landscape, decoration)

            // if (!pics.length || !price || (!useableArea && !area) || !floor || !landscape || !decoration || !from || !contactType) {
            //     Dialog.alert({
            //         message: '帶<span>*</span>號項為必填項'
            //     })
            //     return
            // }

            // this.$router.push(name);
        },

        // 建築面積 input 輸入方法
        areaEdit: function areaEdit(value) {
            this.area = value;
            window.store.state.currentObject.area = value;
            this.useableArea = '';
            window.store.state.currentObject.useableArea = '';
        },

        // 實用面積 input 輸入方法
        useableAreaEdit: function useableAreaEdit(value) {
            this.area = '';
            window.store.state.currentObject.area = '';
            this.useableArea = value;
            window.store.state.currentObject.useableArea = value;
        },

        // 租金 input 編輯方法
        priceEdit: function priceEdit(value) {
            this.price = value;
            window.store.state.currentObject.price = value;
        },

        // 樓層點擊方法
        floorClick: function floorClick(item, index) {
            this.floor = '';
            this.saveData2(item, index, this.floorData, 'floor');
        },

        // 樓層自定義方法
        floorEdit: function floorEdit(value) {

            // 判斷第一次輸入, this.floor還是空值, 只運行一次該循環
            if (!this.floor && window.store.state.currentObject.floor) {
                // 如果點擊自定義樓層的話, 選項的樓層失效
                this.floorData.forEach(function (_item, _index) {
                    _item.state = false;
                });
            }

            this.floor = value;
            window.store.state.currentObject.floor = value;
        },

        // 單位/座號 編輯方法
        codeEdit: function codeEdit(value) {
            this.code = value;
            window.store.state.currentObject.code = value;
        },

        // 景觀
        landscapeClick: function landscapeClick(item, index) {
            this.saveData2(item, index, this.landscapeData, 'landscape');
        },

        // 裝修程度
        decorationClick: function decorationClick(item, index) {
            this.saveData2(item, index, this.decorationData, 'decoration');
        },

        // 選擇可起租時間
        slcStartTime: function slcStartTime(e) {

            if (e.currentTarget.innerText === '隨時') {
                if (!this.isRent) {
                    this.isRent = true;
                    this.datetime = '在日曆處選擇';
                    window.store.state.currentObject.startTime = '隨時';
                }
                this.DatetimePickerShow = false;
                document.body.style.position = '';
            } else {
                this.isRent = false;
                // 彈出選擇時間框
                this.DatetimePickerShow = true;
                // document.body.style.position = 'fixed'
            }
        },

        // 確定時間
        slcTime: function slcTime(value) {

            this.datetime = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
            this.DatetimePickerShow = false;
            window.store.state.currentObject.startTime = this.datetime;
            document.body.style.position = '';
        },

        // 取消時間
        cancelTime: function cancelTime() {
            this.DatetimePickerShow = false;
            document.body.style.position = '';
        },

        // 特色说明
        featuresClick: function featuresClick(item, index) {
            this.saveData(index, this.featuresData, "features", 4);
        },

        // 發佈者身份
        fromClick: function fromClick(item, index) {
            this.fromData.forEach(function (_item, _index) {
                if (_index === index) {
                    if (!_item.state) {
                        _item.state = true;
                        window.store.state.currentObject.from = item.text; // 存數據
                    }
                } else {
                    _item.state = false;
                }
            });
        },

        //聯絡方式
        contactTypeClick: function contactTypeClick(item, index) {
            this.contactTypeData.forEach(function (_item, _index) {
                if (_index === index) {
                    this.isContact = _index === 0 ? true : false;
                    if (!_item.state) {
                        _item.state = true;
                        window.store.state.currentObject.contactType = index.toString(); // 存數據
                    }
                } else {
                    _item.state = false;
                }
            }, this);
        },

        // 男士女士
        contactTypeClick2: function contactTypeClick2(item, index) {
            this.contactTypeData2.forEach(function (_item, _index) {
                if (_index === index) {
                    if (!_item.state) {
                        _item.state = true;
                        window.store.state.currentObject.call = _item.eText;
                    }
                } else {
                    _item.state = false;
                }
            });
        },

        // 输入联系人电话号码
        inputUserPhone: function inputUserPhone(phone) {
            console.log(phone);
            localStorage.userphone = phone;
            window.store.state.currentObject.phone = phone;
        },

        // 输入联络人名称
        inputContacts: function inputContacts(value) {
            window.store.state.currentObject.contacts = value;
        },

        // 业主的话
        remarkEdit: function remarkEdit(value) {
            window.store.state.currentObject.remark = value;
        },

        /**
         * data : 元数据
         * saveKey : 需要存的对象 键
         * number : 选项上限数
         */
        saveData: function saveData(index, data, saveKey, number) {
            if (window.store.state.currentObject[saveKey].length > 0) {
                var arr = window.store.state.currentObject[saveKey].split("、");
            } else {
                var arr = [];
            }
            data.forEach(function (_item, _index) {
                if (_index === index) {
                    if (!_item.state) {
                        if (number) {
                            if (arr.length === number) {
                                return;
                            }
                        }
                        _item.state = true;
                        arr.push(_item.text);
                        window.store.state.currentObject[saveKey] = arr.join("、");
                        // console.log(arr)
                    } else {
                        _item.state = false;
                        if (arr.indexOf(_item.text) > -1) {
                            arr.splice(arr.indexOf(_item.text), 1);
                            window.store.state.currentObject[saveKey] = arr.join("、");
                            // console.log(arr)
                        }
                    }
                }
            });
        },

        /**
         * data : 元数据
         * getKey : 取数据对象 键
         *
         */
        getData: function getData(data, getKey) {
            if (window.store.state.currentObject[getKey].length > 0) {
                // console.log(window.store.state.currentObject[getKey])
                var arr = [];
                arr = window.store.state.currentObject[getKey].split("、");
                data.forEach(function (_item, _index) {
                    for (var key in arr) {
                        if (_item.text === arr[key]) {
                            _item.state = true;
                        }
                    }
                });
            }
        },

        /**
         * 存數據 公共方法
         * item : 存儲的對象
         * index: 下標
         * data : 數據源
         * saveName: 字段
         */
        saveData2: function saveData2(item, index, data, saveName) {
            data.forEach(function (_item, _index) {
                if (index === _index) {
                    if (!_item.state) {
                        _item.state = true;
                        window.store.state.currentObject[saveName] = item.text;
                    } else {
                        _item.state = false;
                        window.store.state.currentObject[saveName] = '';
                    }
                } else {
                    _item.state = false;
                }
            });
        },

        /**
         * 取數據 公共方法
         * data : 數據源
         * getName: 字段
         */
        getData2: function getData2(data, getName) {
            var str = window.store.state.currentObject[getName];
            // 判斷是否存在該數據, 否則, 退出後面的循環, 性能優化
            if (!str) {
                return;
            }
            data.forEach(function (_item, _index) {
                if (str === _item.text) {
                    _item.state = true;
                    return true;
                } else {
                    return false;
                }
            });
        }
    },
    data: function data() {
        return {
            rentobject: null,
            DatetimePickerShow: false,
            minDate: new Date(),
            currentDate: new Date(),
            datetime: '在日曆處選擇',
            floorData: [{ text: "低層", state: false }, { text: "中層", state: false }, { text: "高層", state: false }, { text: "極高層", state: false }],
            featuresData: [{
                text: "新裝修",
                bgImg: '../imgs/fangzu/teseshuoming/bg_28.png',
                slcImg: '../imgs/fangzu/checkon.png',
                normalImg: '../imgs/fangzu/checkoff.png',
                state: false
            }, {
                text: "開揚光猛",
                bgImg: '../imgs/fangzu/teseshuoming/bg_29.png',
                slcImg: '../imgs/fangzu/checkon.png',
                normalImg: '../imgs/fangzu/checkoff.png',
                state: false
            }, {
                text: "地點方便",
                bgImg: '../imgs/fangzu/teseshuoming/bg_33.png',
                slcImg: '../imgs/fangzu/checkon.png',
                normalImg: '../imgs/fangzu/checkoff.png',
                state: false
            }, {
                text: "山景",
                bgImg: '../imgs/fangzu/teseshuoming/bg_35.png',
                slcImg: '../imgs/fangzu/checkon.png',
                normalImg: '../imgs/fangzu/checkoff.png',
                state: false
            }, {
                text: "園景",
                bgImg: '../imgs/fangzu/teseshuoming/bg_36.png',
                slcImg: '../imgs/fangzu/checkon.png',
                normalImg: '../imgs/fangzu/checkoff.png',
                state: false
            }, {
                text: "湖景",
                bgImg: '../imgs/fangzu/teseshuoming/bg_37.png',
                slcImg: '../imgs/fangzu/checkon.png',
                normalImg: '../imgs/fangzu/checkoff.png',
                state: false
            }, {
                text: "海景",
                bgImg: '../imgs/fangzu/teseshuoming/bg_38.png',
                slcImg: '../imgs/fangzu/checkon.png',
                normalImg: '../imgs/fangzu/checkoff.png',
                state: false
            }, {
                text: "特高樓底",
                bgImg: '../imgs/fangzu/teseshuoming/bg_13.png',
                slcImg: '../imgs/fangzu/checkon.png',
                normalImg: '../imgs/fangzu/checkoff.png',
                state: false
            }, {
                text: "保安嚴密",
                bgImg: '../imgs/fangzu/teseshuoming/bg_34.png',
                slcImg: '../imgs/fangzu/checkon.png',
                normalImg: '../imgs/fangzu/checkoff.png',
                state: false
            }, {
                text: "豪華大廳",
                bgImg: '../imgs/fangzu/teseshuoming/bg_32.png',
                slcImg: '../imgs/fangzu/checkon.png',
                normalImg: '../imgs/fangzu/checkoff.png',
                state: false
            }, {
                text: "停泊方便",
                bgImg: '../imgs/fangzu/teseshuoming/bg_20.png',
                slcImg: '../imgs/fangzu/checkon.png',
                normalImg: '../imgs/fangzu/checkoff.png',
                state: false
            }],
            fromData: [{
                text: "業主",
                slcImg: '../imgs/fangzu/checkon.png',
                normalImg: '../imgs/fangzu/checkoff.png',
                state: false
            }, {
                text: "轉租客",
                slcImg: '../imgs/fangzu/checkon.png',
                normalImg: '../imgs/fangzu/checkoff.png',
                state: false
            }],
            contactTypeData: [{
                text: "電話及在線咨詢",
                slcImg: '../imgs/fangzu/checkon.png',
                normalImg: '../imgs/fangzu/checkoff.png',
                state: false
            }, {
                text: "僅在線咨詢",
                slcImg: '../imgs/fangzu/checkon.png',
                normalImg: '../imgs/fangzu/checkoff.png',
                state: false
            }],
            contactTypeData2: [{
                text: "先生",
                slcImg: '../imgs/fangzu/checkon.png',
                normalImg: '../imgs/fangzu/checkoff.png',
                state: false,
                eText: 'mr'
            }, {
                text: "小姐",
                slcImg: '../imgs/fangzu/checkon.png',
                normalImg: '../imgs/fangzu/checkoff.png',
                state: false,
                eText: 'miss'
            }, {
                text: "太太",
                slcImg: '../imgs/fangzu/checkon.png',
                normalImg: '../imgs/fangzu/checkoff.png',
                state: false,
                eText: 'mrs'
            }],
            decorationData: [{
                text: "未裝修",
                slcImg: '../imgs/fangzu/zhuangxiuchengdu/4+.png',
                normalImg: '../imgs/fangzu/zhuangxiuchengdu/4.png',
                state: false
            }, {
                text: "簡單裝修",
                slcImg: '../imgs/fangzu/zhuangxiuchengdu/3+.png',
                normalImg: '../imgs/fangzu/zhuangxiuchengdu/3.png',
                state: false
            }, {
                text: "精裝修",
                slcImg: '../imgs/fangzu/zhuangxiuchengdu/2+.png',
                normalImg: '../imgs/fangzu/zhuangxiuchengdu/2.png',
                state: false
            }, {
                text: "豪華裝修",
                slcImg: '../imgs/fangzu/zhuangxiuchengdu/1+.png',
                normalImg: '../imgs/fangzu/zhuangxiuchengdu/1.png',
                state: false
            }],
            landscapeData: [{
                text: "海景",
                slcImg: '../imgs/fangzu/jingguan/3+.png',
                normalImg: '../imgs/fangzu/jingguan/3.png',
                state: false
            }, {
                text: "山景",
                slcImg: '../imgs/fangzu/jingguan/2+.png',
                normalImg: '../imgs/fangzu/jingguan/2.png',
                state: false
            }, {
                text: "園景",
                slcImg: '../imgs/fangzu/jingguan/1+.png',
                normalImg: '../imgs/fangzu/jingguan/1.png',
                state: false
            }, {
                text: "湖景",
                slcImg: '../imgs/fangzu/jingguan/6+.png',
                normalImg: '../imgs/fangzu/jingguan/6.png',
                state: false
            }, {
                text: "城市景",
                slcImg: '../imgs/fangzu/jingguan/5+.png',
                normalImg: '../imgs/fangzu/jingguan/5.png',
                state: false
            }, {
                text: "樓景",
                slcImg: '../imgs/fangzu/jingguan/4+.png',
                normalImg: '../imgs/fangzu/jingguan/4.png',
                state: false
            }],
            isContact: false,
            remark: '',
            price: '',
            code: '',
            isRent: false,
            useableArea: '',
            area: '',
            floor: '',
            fengmiantu: ''
        };
    }
});