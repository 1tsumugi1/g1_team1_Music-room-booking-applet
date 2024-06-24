let db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */


    data:{
     
         list:[],
         chooseInstrument:''

    },
    
    getlist(e){
      db.collection("Instrument").get()
      .then(res=>{
        this.setData({
          list:res.data
        })
      }
        )
  },

    /**
     * 就是单独搞一个预约表来存放用户的预约记录  status 表示状态  跟自习室关联起来 关联id 存放是哪个人预约的(关联用户表) 
     * index 知道用户预约的是哪个位置
     * create_time 预约时间
     * user_id 用户id
     * room_id 自习室id
     * status 预约状态
     * @param {*} options 
     */
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
     this.getlist(options.id)
  },
  //用户选择乐器
  chooseInstrument1(e){
    let all_list=this.data.list.all_list
    let index=e.currentTarget.dataset.index
    var that=this
    // console.log(all_list[index].condition)
    if(all_list[index].condition==1){
             wx.showToast({
               title: '此座位已有人',
             })
    }
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