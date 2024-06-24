// 获取全部
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
}
// 获取具体时间
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('/') 
}
// 获取月份
const month = date => {
  const month = date.getMonth() + 1
  return [month].map(formatNumber).join('/') 
}
// 获取日
const day = date => {
  const day = date.getDate()
  return [day].map(formatNumber).join('/') 
}
// 获取小时
const hour = date => {
  const hour = date.getHours()
  return [hour].map(formatNumber).join('/') 
}
// 获取分钟
const minute = date => {
  const minute = date.getMinutes()
  return [minute].map(formatNumber).join('/') 
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatDate:formatDate,
  month:month,
  day:day,
  hour:hour,
  minute:minute
}
