let db = wx.cloud.database()
Page({
  goToMyAppointments() {
    wx.navigateTo({
      url: '/pages/myAppointments/myAppointments'
    });
  },

  /**
   * 页面的初始数据
   */
  data: {
    allow: false,
    user: {
      nickName: "昵称",
      avatarUrl: "../../images/tsumugi.png"
    },
    list: {
      all_time: 0,
      number: 0,
      pai: 0,
      maxlong_time: 0
    }
  },

  /**
   * 授权登录函数
   */
  denglus() {
    var that = this
    wx.getUserProfile({
      desc: '请完善个人信息',
      success(res) {
        that.setData({
          user: res.userInfo,
          allow: true
        })

        wx.setStorageSync('user', res.userInfo)
        that.adduser(res.userInfo)
      },
      fail() {
        wx.showToast({
          title: '授权失败',
          icon: 'none'
        })
      }
    })
  },

  /**
   * 添加用户到数据库
   */
  adduser(userInfo) {
    wx.cloud.callFunction({
      name: "openid",
      success(res) {
        wx.setStorageSync('openid', res.result.openid)
        db.collection("room_user").where({
          _openid: res.result.openid
        }).get()
          .then(res => {
            if (!res.data.length) {  // 没有数据传入数据
              db.collection("room_user").add({
                data: {
                  nickName: userInfo.nickName,
                  avatarUrl: userInfo.avatarUrl,
                  all_time: 0,
                  maxlong_time: 0,
                  number: 0,
                  study_list: []
                }
              })
                .then(res => {
                  wx.showToast({
                    title: '登录成功',
                  })
                })
                .catch(err => {
                  wx.showToast({
                    title: '登录失败',
                    icon: 'none'
                  })
                  console.error('添加用户失败', err)
                })
            }
            // 获取已有的用户信息
            else {
              that.getuser(res.result.openid)
            }
          })
          .catch(err => {
            console.error('查询用户失败', err)
          })
      },
      fail(err) {
        console.error('获取 openid 失败', err)
      }
    })
  },

  /**
   * 获取用户信息
   */
  getuser(openid) {
    var that = this
    db.collection("room_user").where({
      _openid: openid
    }).get().then(res => {
      if (res.data.length) {
        let list = that.data.list
        list.number = res.data[0].number
        list.all_time = res.data[0].all_time
        list.maxlong_time = res.data[0].maxlong_time
        that.setData({
          list: list
        })
      }
    }).catch(err => {
      console.error('获取用户信息失败', err)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (wx.getStorageSync("openid")) {
      var that = this
      that.setData({
        user: wx.getStorageSync('user'),
        allow: true
      })
      that.getuser(wx.getStorageSync('openid'))
    }
  },

 //解绑账号
  cancledenglu() {
    var that = this
    wx.showModal({
      title: '取消绑定',
      content: '是否确定取消绑定',
      success(res) {
        if (res.confirm) {
          let user = {
            nickName: "昵称",
            avatarUrl: "../../images/tsumugi.png"
          }
          let list = {
            all_time: 0,
            number: 0,
            pai: 0,
            maxlong_time: 0
          }
          that.setData({
            user: user,
            list: list,
            allow: false
          })
          wx.removeStorageSync('openid')
          wx.removeStorageSync('user')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {}

})