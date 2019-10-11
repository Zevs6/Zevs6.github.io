function validateForm(){
var x=document.forms["myForm"]["tel"].value;
var y=document.forms["myForm"]["yzm"].value;
var pwd=document.forms["myForm"]["pwd"].value;
var cmpwd=document.forms["myForm"]["cmpwd"].value;
if (x==null || x==""){
  alert("手机号码不能为空");
  return false;
  }
if (y==null || y==""){
  alert("验证码不能为空！！！");
  return false;
  }
if(pwd!=cmpwd){
	alert("密码不一致，请重新输入！！！");
	return false;
}

if (document.getElementById("jym").validity.rangeOverflow) {
    alert("您输入的数值大于100，请重新输入！");
    return false;
}

}