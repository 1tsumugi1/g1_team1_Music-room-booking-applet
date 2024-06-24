//获取数据库
let db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
       list:["../../images/轮播图1.png","../../images/轮播图2.png","../../images/轮播图3.png"],
       news:[""]
  },
  //获取公告数据
  get_news(){
    var that=this
    db.collection("news").orderBy("time","desc").get()
    .then(res=> {
      that.setData({
        news:res.data
      })
    })
  },
  readnews(e){
     let id= e.currentTarget.dataset.id
     let skan= e.currentTarget.dataset.skan
     //更新浏览量
     db.collection("news").doc(id).update({
       data:{
       skan:skan+1
       }
     })
     .then(res=>{
       wx.navigateTo({
       url: '/pages/read_news/read_news?id='+id,
     })
    })
     
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
this.get_news()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})