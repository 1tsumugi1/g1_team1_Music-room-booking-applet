// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'cloud1-9giqv72fa52b32c2', // 这里填入云开发环境 ID
        traceUser: true,
      })
    }

    this.globalData = {}

    // 假设获取用户信息的逻辑如下
    wx.getUserInfo({
      success: res => {
        this.globalData.userinfo = res.userInfo
        // 假设用户信息包含 _id 字段
        this.globalData.userinfo._id = 'some-unique-id' // 示例用户ID，实际应从数据库获取
      }
    })
  }
})
