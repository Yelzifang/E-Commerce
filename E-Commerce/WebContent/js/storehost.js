/**
 * 
 */

$(document).ready(function(){
	
	Mer_SendRequest();
	
});

function Mer_CreateRequest(){
	
	var req=null;
	if(window.XMLHttpRequest)
		req=new XMLHttpRequest();
	else
		req=new ActiveXObject("Microsoft.XMLHTTP");
	
	return req;
}

//发送请求
function Mer_SendRequest(){
	//alert("mer")
	request=Mer_CreateRequest();
	request.open("GET","http://localhost:8080/E-Commerce/MerSelf",true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=Mer_parseRequest;
	request.send();
}
//解析请求
function Mer_parseRequest(){
	
	if(request.status==200&&request.readyState==4){
		//alert(request.responseText);
		
		var merself=JSON.parse(request.responseText);
		if(merself.status){
			
			var mer_msg=merself.message;
			$("#mername").html(mer_msg.mername);
			$("#merpassword").html(mer_msg.merpassword);
			if(mer_msg.mersex=="1"){
				$("#mersex").html("男");
			}else if(mer_msg.mersex=="2"){
				$("#mersex").html("女");
			}else{
				$("#mersex").html("保密");
			}
			$("#meryear").html(mer_msg.meryear);
			$("#mertele").html(mer_msg.mertele);
			
			//alert(merself.detail);
		}else
			alert(merself.detail);
		}	
}


//商家个人信息修改
function sure1(){
	var sure1=confirm("是否修改信息？");
	
	if(sure1==true){
		MerAlter_SendRequest();
	}
	else{
		alert("未进行修改！");
	}
}

function MerAlter_SendRequest(){
	request=Mer_CreateRequest();
	request.open("POST","http://localhost:8080/E-Commerce/MerAlter",true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=MerAlter_parseRequest;
	request.send(CreatMerParams());
}


function CreatMerParams(){
	var password=document.getElementById("merpassword2").value;
	var checksex = document.getElementsByName("mersex2");
	var sex;
	for(var i=0;i<checksex.length;i++) 
	    {  
	        //判断那个单选按钮为选中状态 
	        if(checksex[i].checked) 
	        { 
	            //弹出选中单选按钮的值 
	            sex=checksex[i].value 
	        }  
	    }  
	//var sex=document.getElementById("mersex2").value;
	var year=document.getElementById("meryear2").value;
	var tele=document.getElementById("mertele2").value;
	//alert("password="+password+"&sex="+sex+"&year="+year+"&tele="+tele);
	return "password="+password+"&sex="+sex+"&year="+year+"&tele="+tele;
}
//解析请求
function MerAlter_parseRequest(){
	if(request.status==200&&request.readyState==4){
		//alert(request.responseText);
		var meralterself=JSON.parse(request.responseText);
		if(meralterself.status){
			alert(meralterself.detail);
			location.reload(); 
		}else{
			alert(meralterself.detail);
		}
	}		
}
