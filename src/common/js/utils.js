/**
 * Created by Administrator on 2017/3/8.
 */
export function urlParse(key) {
  let url = location.href;
  let reg = /([^?=&]+)=([^&=?]+)/g;
  let obj = {};
  while (reg.exec(url)) {
    obj[RegExp.$1] = RegExp.$2;
  }
  return obj[key];
}
