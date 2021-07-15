import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
  tabs:[
    {
      id:0,
      value:'综合',
      isActive:true
    }, {
      id:1,
      value:'销量',
      isActive:false
    }, {
      id:2,
      value:'排序',
      isActive:false
    },
  ],
  params:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  goodsData:[],
  total:null
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const query = options.query
    this.data.params.cid = options.cid||'';
    this.data.params.query = query||'';
  this.getData()
  },
  tabClick(e){
    const {index} = e.detail
    let {tabs} = this.data
    tabs.forEach((v,i)=>{
      return i===index?v.isActive=true:v.isActive=false
    })
    this.setData({
      tabs
    })
  },
  //获取数据
  async getData(){
   const{data:res} = await request({url:'/goods/search',data:this.data.params})
   this.data.total = res.message.total
   this.setData({
     goodsData:[...this.data.goodsData,...res.message.goods]
   })
  },
   onReachBottom: function () {
    const page = Math.ceil(this.data.total/this.data.params.pagesize)
    if(this.data.params.pagenum >= page){
      wx.showToast({
        title: '没有更多内容了',
      })
    }else{
      this.data.params.pagenum++
      this.getData()
    }
  },
  onPullDownRefresh:function(){
    this.data.goodsData=[]
    this.data.params.pagenum = 1
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})