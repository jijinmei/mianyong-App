// 存储验证信息
function MYgetPersonalInfo (sessionToken, objectId) {
  // sessionToken
  localStorage.setItem('sessionToken', sessionToken)
  sessiontoken=sessionToken
  console.log("sessiontoken:"+sessiontoken)
  // objectId
  localStorage.setItem('objectId', objectId)
  $.get(Boss+'user/'+objectId, function (data, status) {
    if (!data.result.message) {
      // userData 个人信息
      localStorage.setItem('userData', JSON.stringify(data.result))
      
    }
  })
}
// 需要清空时, 清空验证信息
function MYclearPersonalInfo () {
	sessiontoken=''
	 console.log("sessiontoken:"+sessiontoken)
  localStorage.removeItem('sessionToken')
  localStorage.removeItem('objectId')
  localStorage.removeItem('userData')
}

// 测试
function MYtest (sessionToken, objectId) {
  // alert(Boss)
  // var url = Boss + 'user/'
  // $.get(url+objectId, function (data, status) {
  //   console.log(data, status)
  // })
  var newElement = $('<div style="position:fixed;top:0;left:0;font-size:20px;color:red;background-color:white;">' +'sessionToken-> '+ sessionToken + '<br/>' + 'objectId-> ' + objectId +'</div>')
  $('body').append(newElement)

}

function MYtest2 () {
  var newElement = $('<div style="position:fixed;top:0;left:0;font-size:20px;color:red;background-color:white;">' +'sessionToken-> '+ sessionToken + '<br/>' + 'objectId-> ' + objectId +'</div>')
  $('body').append(newElement)
}