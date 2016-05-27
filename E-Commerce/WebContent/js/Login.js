/**
 * 登录
 */

var request=null;

//弹出登录框
function openLogin(){
$('body').css("overflow","hidden")
var upLogin = document.getElementById("logincontainer");
upLogin.style.display = "block";
}
//关闭登录框
function closeLogin(){
	$('body').css("overflow","visible")
	var cLogin = document.getElementById("logincontainer");
	cLogin.style.display="none";
}
//创建登录请求
function CreateLoginRequest(){
	var req=null;
	
	
	if(window.XMLHttpRequest)
		req=new XMLHttpRequest();
	else
		req=new ActiveXObject("Microsoft.XMLHTTP");
	
	return req;
}
//创建登录参数
function CreateLoginParamter(){
	var username=document.getElementById("username").value;
	var password=document.getElementById("password").value;
	var identitys=document.getElementsByName("identity");
	var identity=null;
	
	for(var i=0;i<identitys.length;i++){
		if(identitys[i].checked){
			identity=identitys[i].value;
			break;
		}
	}
	
//	alert("?username="+username+"&password="+password+"&identity="+identity);
	
	return "username="+username+"&password="+password+"&identity="+identity;
}
//发送登录请求
function SendLoginRequest(){
	
	request=CreateLoginRequest();
	
	request.open("POST","http://localhost:8080/E-Commerce/DoLogin",true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=parseLoginRequest;
	alert("你确定登录吗？");
	request.send(CreateLoginParamter());
}
//解析登录请求
function parseLoginRequest(){
	
	if(request.status==200&&request.readyState==4){
		alert(request.responseText);
		
		var login_msg=JSON.parse(request.responseText);
		
		if(login_msg.status){
			var user_msg=login_msg.message;
			var name=user_msg.username;
			
			alert(name);
			
			var login_li=document.getElementById("login_li");
			var register_li=document.getElementById("register_li");

			login_li.innerHTML="<a >"+name+"</a>";
			login_li.onclick=function jumpPersonHtml(){
				alert("个人中心");
			};
			
			register_li.innerHTML="<a > 注销</a>";
			register_li.onclick=function LogoutHtml(){
				alert("注销");
				window.location.href="Logout";
			};
			
		}
		else
			alert(login_msg.detail);
		
		closeLogin();
	}
	
}
