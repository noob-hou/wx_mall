 import { request } from "../../request/index.js";
 Page({

     /**
      * 页面的初始数据
      */
     data: {
         leftListData: [],
         rightListData: [],
         currentIndex: 0,
         scrollTop: 0
     },
     cates: [],
     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function(options) {
         const cates = wx.getStorageSync('cates');
         if (!cates) {
             this.getCatesList()
         } else {
             if (Date.now() - cates.time > 1000 * 300) {
                 this.getCatesList()
             } else {
                 this.cates = cates
                 const leftListData = this.cates.map(v => v.cat_name)
                 const rightListData = this.cates[0].children
                 this.setData({
                     leftListData,
                     rightListData
                 })
             }
         }
     },
     // 获取列表数据
     getCatesList() {
         request({ url: '/categories' }).then(res => {
             this.cates = res.data.message
             wx.setStorageSync('cates', this.cates);
             const leftListData = this.cates.map(v => v.cat_name)
             const rightListData = this.cates[0].children
             this.setData({
                 leftListData,
                 rightListData
             })
         })
     },
     //点击切换
     listToggle(e) {
         const index = e.target.dataset.index
         this.setData({
             currentIndex: index,
             scrollTop: -1
         })
         const rightListData = this.cates[index].children
         this.setData({
             rightListData
         })
     },
     /**
      * 生命周期函数--监听页面初次渲染完成
      */
     onReady: function() {

     },

     /**
      * 生命周期函数--监听页面显示
      */
     onShow: function() {

     },

     /**
      * 生命周期函数--监听页面隐藏
      */
     onHide: function() {

     },

     /**
      * 生命周期函数--监听页面卸载
      */
     onUnload: function() {

     },

     /**
      * 页面相关事件处理函数--监听用户下拉动作
      */
     onPullDownRefresh: function() {

     },

     /**
      * 页面上拉触底事件的处理函数
      */
     onReachBottom: function() {

     },

     /**
      * 用户点击右上角分享
      */
     onShareAppMessage: function() {

     }
 })