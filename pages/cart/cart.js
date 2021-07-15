// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  address:{},
  cartListData:[],
  allChecked:false,
  totalNum:0,
  totalPrice:0
  },
 //获取收获地址
 getReceiveAddress(){
   wx.chooseAddress({
     success: (result) => {
       wx.setStorageSync('receive_address', result)
     },
   })
 },
  // 改变数量
  changeNum(e){
     let {index,change} = e.currentTarget.dataset
     const cart = this.data.cartListData

    //   let str = `cartListData[${index}].num`
      change = cart[index].num == 1&&change == -1?change=0:change
      cart[index].num =cart[index].num + parseInt(change)
    // const num   = this.data.cartListData[index].num+parseInt(chang)
    // this.setData({
    //   [str] : num
    // })
    this.setCart(cart)
  },
  //改变复选框状态
  checkChange(e){
   const { index } = e.currentTarget.dataset
   const cart = this.data.cartListData
   cart[index].checked = !cart[index].checked
   this.setCart(cart)
  },
  //全选复选框状态
  allCheckChange(){
    let allChecked = this.data.allChecked
    allChecked = !allChecked
    const cart = this.data.cartListData
    cart.forEach(v=>{
      v.checked = allChecked
    })
    this.setData({
      allChecked
    })
    this.setCart(cart)
  },
  // 删除商品
  deleteShop(e){
    const {index} = e.currentTarget.dataset
    let cart = this.data.cartListData
     wx.showModal({
       title:'提示',
       content:'真的要删除选中的商品吗？',
       cancelColor: 'cancelColor',
       success:(res)=>{
         if(res.confirm){
          cart.splice(index,1)
          this.setCart(cart)
         }
       }
     })
    
  },
  //结算支付
  payClick(){
    const {address,totalNum} = this.data
    if(!address.userName){
      wx.showToast({
        title: '请选择收获地址',
        icon:'none'
      })
    }
    if(totalNum == 0){
      wx.showToast({
        title: '您还没有选中任何商品',
        icon:'none'
      })
    }
    wx.navigateTo({
      url: '../auth/auth',
    })
  },
  //  * 生命周期函数--监听页面显示
  onShow: function () {
    const address = wx.getStorageSync('receive_address')
    const cartListData = wx.getStorageSync('cart')||[];
    // const allChecked = cartListData.length?cartListData.every(v=>v.checked):false;
   this.setData({
    address,
  })
  const cart = this.data.cartListData
  this.setCart(cartListData)
  },
  //封装购物车操作计算
  setCart(cart){
    let allChecked = true
    let totalNum = 0
    let totalPrice = 0
   cart.forEach(item => {
     if(item.checked){
     totalNum += item.num
     totalPrice += item.num*item.goods_price
     }else{
       allChecked = false
     }  
   });
    totalPrice= totalPrice.toFixed(2)
    allChecked = cart.length!=0?allChecked:false
     this.setData({
      cartListData:cart,
       totalNum,
       totalPrice,
       allChecked
     })
     wx.setStorageSync('cart', cart)
  },
})