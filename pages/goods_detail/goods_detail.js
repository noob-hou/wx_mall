import { request } from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
  goodsData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  const{goods_id}= options
  this.getDetailData(goods_id)
  },
  async getDetailData(goods_id){
  const{data:res} = await request({url:'/goods/detail',data:{goods_id}})
  this.setData({
    goodsData:{
      goods_id :res.message.goods_id,
      goods_name:res.message.goods_name,
      pics:res.message.pics,
      goods_price:res.message.goods_price,
      goods_introduce:res.message.goods_introduce.replace(/\.webp/g,'.jpg')
    }
  })
  },
  //点击图片放大预览
  imageClick(e){
  const current = e.currentTarget.dataset.url
  const urls = this.data.goodsData.pics.map(v=>v.pics_sma_url)
  wx.previewImage({
    urls,
    current
  })
  },
  // 加入购物车
  addCart(){
    const cart = wx.getStorageSync('cart')||[]
    const index = cart.findIndex(a=>a.goods_id == this.data.goodsData.goods_id)
    if(index === -1){
      this.data.goodsData.num =1
      this.data.goodsData.checked =true
      cart.push(this.data.goodsData)
    }else{
      cart[index].num++
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '加入购物车成功',
      icon:'success',
      mask:true
    })
   
  },
  //去往购物车页面
  goCart(){
    wx.switchTab({
      url: '../cart/cart',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})