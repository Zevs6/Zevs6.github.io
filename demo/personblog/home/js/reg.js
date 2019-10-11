//检查是否为空
function checkisnull() {
	var username = document.getElementById("username").value; //获取用户名输入框内容
	var telephone = document.getElementById("telephone").value; //获取手机号码输入框内容
	var pwd = document.getElementById("pwd").value; //获取密码输入框内容
	var cmpwd = document.getElementById("cmpwd").value;
	if(username == "" | pwd == "" | cmpwd == "" | telephone == "") {
		alert("*信息输入不完整，请检查输入内容！");
		return false;
	} else {
		alert("*你好！您已注册成功！");
	}
}




//检查用户名
function checkname() {
	var username = document.getElementById("username");
	var valuename = username.value;
	var regname = /^[a-zA-Z]+\w{5,10}$/;
	var rs = valuename.search(regname);
	var nameinfo = document.getElementById("nameinfo");

	if(rs == -1) {
		nameinfo.innerHTML = "*用户名输入错误，请重新输入！";
		username.focus();

	} else {
		nameinfo.innerHTML = "*用户名输入正确！";
	}
}


function checktel(){
	var telephone = document.getElementById("telephone");
	var valuepwd = telephone.value;
	var retel = /^1[3|5|7|8]\d{9}$/;
	var rs = valuepwd.search(retel);
	var telinfo = document.getElementById("telinfo");
	if(rs == -1) {
		telinfo.innerHTML = "*手机号码输入不合法！";
		telephone.focus();
	} else {
		telinfo.innerHTML = "*手机号码输入正确！";
	}
}




//密码检查
function checkpwd() {
	var pwd = document.getElementById("pwd");
	var valuepwd = pwd.value;
	var repwd = /^\S{8,12}$/;
	var rs = valuepwd.search(repwd);
	var pwdinfo = document.getElementById("pwdinfo");
	if(rs == -1) {
		pwdinfo.innerHTML = "*密码输入不合法！";
		pwd.focus();
	} else {
		pwdinfo.innerHTML = "*密码输入正确！";
	}
}
//确认密码检查
function checkcmpwd() {
	var valuepwd = document.getElementById("pwd").value;
	var cmpwd = document.getElementById("cmpwd");
	var valuecmpwd = cmpwd.value;
	var cmpwdinfo = document.getElementById("cmpwdinfo");
	if(valuecmpwd == valuepwd) {
		cmpwdinfo.innerHTML = "*密码输入一致！";
	} else {
		cmpwdinfo.innerHTML = "*密码输入bu一致！";
		cmpwd.focus();
	}
}