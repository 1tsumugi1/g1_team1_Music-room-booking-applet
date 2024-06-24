const app = getApp();

Page({
  data: {
    appointments: []
  },

  onLoad() {
    this.loadAppointments();
  },

  loadAppointments() {
    const db = wx.cloud.database();
    const user_id = app.globalData.userinfo && app.globalData.userinfo._id ? app.globalData.userinfo._id : 'default-user-id';

    db.collection('appointments').where({
      user_id: user_id
    }).get({
      success: res => {
        this.setData({
          appointments: res.data
        });
      },
      fail: err => {
        wx.showToast({
          title: '获取预约信息失败',
          icon: 'none'
        });
        console.error('获取预约信息失败', err);
      }
    });
  }
});