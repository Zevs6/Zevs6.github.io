//检查是否为空
function checkisnull() {
	var username = document.getElementById("username").value; //获取用户名输入框内容
	var pwd = document.getElementById("pwd").value;   //获取密码输入框内容
	if(username == "" | pwd == "") {
		alert("信息输入不完整，请检查输入内容！");
		return;
	} else {
		alert("你好！您已登陆成功！");
		return;
	}
}

////检查用户名
//function checkname() {
//	var username = document.getElementById("username").value;
//	var regname = /^[a-zA-Z]+\w{5,10}$/;
//	var rs = username.search(regname);
//	if(rs == -1) {
//		alert("用户名输入错误，请重新输入！");
//	}
//}
//
////密码检查
//function checkpwd() {
//	var valuepwd= document.getElementById("pwd").value;
//	var repwd = /^\S{8,12}$/;
//	var rs = .search(repwd);
//	if(rs == -1) {
//		alert("密码输入错误，请重新输入！");
//	}
//}