/**
 * 上架商品
 */

function previewImg(){
	
	var a=document.getElementById("file");
	var reader=new FileReader();
	var b=document.getElementById("img1");
	
	reader.readAsDataURL(a.files.item(0));
	
	reader.onload=function(){
	b.setAttribute("src", this.result);
//		alert(this.result);
	}
}

//创建上架请求
function CreateAddRequest(){
	var req=null;
	
	
	if(window.XMLHttpRequest)
		req=new XMLHttpRequest();
	else
		req=new ActiveXObject("Microsoft.XMLHTTP");
	
	return req;
}

//创建上架参数
function CreateAddParamter(){
	
	var comname=document.getElementById("comname").value;
	var comprice=document.getElementById("comprice").value;
	var comimage=document.getElementById("file").value;
	var comtotal=document.getElementById("comtotal").value;
	var comsort=document.getElementById("comsort").value;
	var comdescribe=document.getElementById("comdescribe").value;
	
	alert("comname="+comname+"&comprice="+comprice+"&comimage="+comimage+"&comtotal="+comtotal+"&comsort="+comsort+"&comdescribe="+comdescribe);
	
	return "comname="+comname+"&comprice="+comprice+"&comimage="+comimage+"&comtotal="+comtotal+"&comsort="+comsort+"&comdescribe="+comdescribe;
	
}

function SendAddRequest(){
	
	request=CreateAddRequest();
	
	request.open("POST","http://localhost:8080/E-Commerce/InsCom",true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=parseAddRequest;
	
	request.send(CreateAddParamter());
}

//解析上架请求
function parseAddRequest(){
	if(request.status==200&&request.readyState==4){
//		alert(request.responseText);
		
		var upload_json=JSON.parse(request.responseText);
		
		if(upload_json.status){
		alert(upload_json.detail);
		window.location.href="storehost.html"
		}
	}
}