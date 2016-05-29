/**
 * 展示商品
 */
$(document).ready(function(){
//获得文本框对象
   var t = $("#show-buy-amount");
//初始化数量为1,并失效减
$('#show-min').attr('disabled',true);
    //数量增加操作
    $("#show-add").click(function(){    
        t.val(parseInt(t.val())+1)
        if (parseInt(t.val())!=1){
            $('#show-min').attr('disabled',false);
        }
      
    }) 
    //数量减少操作
    $("#show-min").click(function(){
        t.val(parseInt(t.val())-1);
        if (parseInt(t.val())==1){
            $('#shhow-min').attr('disabled',true);
        }
      
    })
   
});

var request;

//创建商品请求
function CreateComRequest(){
	var req=null;
	
	if(window.XMLHttpRequest)
		req=new XMLHttpRequest();
	else
		req=new ActiveXObject("Microsoft.XMLHTTP");
	
	return req;
}

//发送商品请求
function SendComRequest(){
	
	request=CreateComRequest();
	
	request.open("POST","http://localhost:8080/E-Commerce/ComShow",true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=parseComRequest;
	request.send(window.location.search.replace("?",""));
}

//解析商品请求
function parseComRequest(){
	if(request.status==200&&request.readyState==4){
//		alert(request.responseText);
		
		var com_json=JSON.parse(request.responseText);
		
		
		
		if(com_json.status){
			
			var com_message=com_json.message;
			
			var img_src=com_message.comimage;
			var name_value=com_message.comname;
			var price_value=com_message.comprice;
			var merid_value=com_message.mername;
			var describe_value=com_message.comdescribe;
			var comtotal_value=com_message.comtotal;
			
			var img_div=document.getElementById("show-mag");
			var name_label=document.getElementById("show-t");
			var price_label=document.getElementById("privilege-price");
			var merid_label=document.getElementById("shopkeeper");
			var describe_label=document.getElementById("describe");
			var comtotal_label=document.getElementById("show-stock");
			
			img_div.innerHTML="<img src=ftp://root:qq609150968.@115.28.228.39/root/img/"+img_src+" />";
			name_label.innerHTML=name_value;
			price_label.innerHTML=price_value;
			merid_label.innerHTML=merid_value;
			describe_label.innerHTML=describe_value;
			comtotal_label.innerHTML=comtotal_value;
		}else
			alert(com_json.detail);
		
		SendInitRequest();
	}
}



//初始化操作
window.onload=function(){
//	alert(window.location.search);
	
	SendComRequest();
	
}


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
		else
			alert(login_msg.detail);
		
	}
}