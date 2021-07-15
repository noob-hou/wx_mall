import { request } from '../../request/index.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperList: [],
        navList: [],
        floorList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getSwiperList()
        this.getNavData()
        this.getFloorData()
    },
    // 获取轮播图数据
    getSwiperList() {
        request({ url:'/home/swiperdata' }).then(res => {
            this.setData({
                swiperList: res.data.message
            })
        })
    },
    // 获取导航栏数据
  getNavData() {
        request({ url: '/home/catitems' }).then(res => {
            this.setData({
                navList: res.data.message
            })
        })

    },
    //获取楼层数据
    getFloorData() {
        request({ url: '/home/floordata'}).then(res => {
        const floorList = res.data.message
        floorList.forEach(item=>{
            item.product_list.forEach(item1=>{
                item1.navigator_url=item1.navigator_url.replace(/goods_list/,"goods_list/goods_list")
                console.log(item1.navigator_url);
            })
        })
            this.setData({
                floorList
            })
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