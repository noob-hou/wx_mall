export const request = params => {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseURL + params.url,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete:()=>{
                wx.hideLoading({})
            }
        });

    })
}