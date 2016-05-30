/**
 * 首页初始化
 */
window.onload=function(){
	
	SendInitRequest();
	
}

var request;

//创建请求
function CreateInitRequest(){
	var req=null;
	
	if(window.XMLHttpRequest)
		req=new XMLHttpRequest();
	else
		req=new ActiveXObject("Microsoft.XMLHTTP");
	
	return req;
}

//发送请求
function SendInitRequest(){
	
	request=CreateInitRequest();
	
	request.open("POST","http://localhost:8080/E-Commerce/isLogin",true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=parseInitRequest;
	
	request.send("");
}

function parseInitRequest(){
	if(request.status==200&&request.readyState==4){
//		alert(request.responseText);
	
		var login_msg=JSON.parse(request.responseText);
		
		if(login_msg.status){
			var user_msg=login_msg.message;
			var name=user_msg.username;
			
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
//		else
//			alert(login_msg.detail);
		
	}
}