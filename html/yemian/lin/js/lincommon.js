 // 2.解决地址栏传参和读取参数
 function locations(name, url) {
  if (!url) {
    url = window.location.href;
    console.log(url)
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var sessiontoken = locations('sessiontoken')