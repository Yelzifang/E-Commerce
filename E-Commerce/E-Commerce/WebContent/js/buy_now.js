/**
 * 立即购买
 */

//创建购买请求
function CreateBuyRequest(){
	var req=null;
	
	
	if(window.XMLHttpRequest)
		req=new XMLHttpRequest();
	else
		req=new ActiveXObject("Microsoft.XMLHTTP");
	
	return req;
}
//创建购买参数
function CreateBuyParamter(){
	
	var price_label=document.getElementById("privilege-price").innerText;
	var amount=document.getElementById("show-buy-amount").value;
	
	alert(window.location.search.replace("?","")+"&comprice="+price_label+"&count="+amount);
	
	return window.location.search.replace("?","")+"&comprice="+price_label+"&count="+amount;
}
//发送购买请求
function SendBuyRequest(){
	
	request=CreateBuyRequest();
	
	request.open("POST","http://localhost:8080/E-Commerce/CreateInd",true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=parseBuyRequest;
	request.send(CreateBuyParamter());
}
//解析购买请求
function parseBuyRequest(){
	if(request.status==200&&request.readyState==4){
//		alert(request.responseText);
		
		var buy_json=JSON.parse(request.responseText);
		
		alert(buy_json.detail);
	}
}

//创建请求
function CreateisLoginedRequest(){
	var req=null;
	
	if(window.XMLHttpRequest)
		req=new XMLHttpRequest();
	else
		req=new ActiveXObject("Microsoft.XMLHTTP");
	
	return req;
}

//发送请求
function SendisLoginedRequest(){
	
	request=CreateisLoginedRequest();
	
	request.open("POST","http://localhost:8080/E-Commerce/isLogin",true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=parseisLoginedRequest;
	
	request.send("");
}

function parseisLoginedRequest(){
	if(request.status==200&&request.readyState==4){
//		alert(request.responseText);
	
		var login_msg=JSON.parse(request.responseText);
		
		if(login_msg.status){
			SendBuyRequest();
		}
		else
			alert("请先登录");
	
	}
}


function buy(){
	
	SendisLoginedRequest();
}