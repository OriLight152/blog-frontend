export function formatTime(time: string) {
  const date = new Date(time)
  let timeStr = ''
  timeStr += date.getFullYear() + '-'
  timeStr += (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) + '-' : '0' + (date.getMonth() + 1) + '-'
  timeStr += date.getDate() > 9 ? date.getDate() + ' ' : '0' + date.getDate() + ' '
  timeStr += date.getHours() > 9 ? date.getHours() + ':' : '0' + date.getHours() + ':'
  timeStr += date.getMinutes() > 9 ? date.getMinutes() + ':' : '0' + date.getMinutes() + ':'
  timeStr += date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  return timeStr
}