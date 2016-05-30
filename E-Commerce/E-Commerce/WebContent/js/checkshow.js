/**
 * 
 */
//展示用户和商家
var jdg = null;
function CheckShow_CreateRequest(){
	
	var req=null;
	if(window.XMLHttpRequest)
		req=new XMLHttpRequest();
	else
		req=new ActiveXObject("Microsoft.XMLHTTP");
	
	return req;
}

function CheckShow_SendRequest(j){
	alert("checkshow");
	jdg = ""+j;
	alert("sendjdg:"+jdg);
	request=CheckShow_CreateRequest();
	if(jdg=="cus"){
		request.open("GET","http://localhost:8080/E-Commerce/CusShow",true);
	}else{
		request.open("GET","http://localhost:8080/E-Commerce/MerShow",true);
		alert("open");
	}
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=CheckShow_parseRequest;
	request.send();
}

function CheckShow_parseRequest(){
	
	if(request.status==200&&request.readyState==4){
		alert(request.responseText);
		
		var checkshow=JSON.parse(request.responseText);
		
		if(checkshow.status){
			var check_msg=checkshow.message;
			alert(check_msg.length);
			alert("jdg:"+jdg);
			if(jdg=="cus"){
				$("#cusroot1").empty();
			}else{
				$("#cusroot2").empty();
			}
			
			for(i=0;i<check_msg.length;i++){
				alert("i="+i);
				
				var html ="<div class='cusrootset1'><label id='cusname'>"+check_msg[i].name+"</label></div>"+
					"<div class='cusrootset3'><label id='cussex'>"+check_msg[i].sex+"</label></div>"+
					"<div class='cusrootset4'><label id='cusyear'>"+check_msg[i].year+"</label></div>"+
					"<div class='cusrootset5'><label id='custele'>"+check_msg[i].tele+"</label></div>"+
					"<div class='cusrootset5'><label id='pass'></label><input type='button' id='"+check_msg[i].id+"' onclick='Check_SendRequest(this)' "+
					"value='通过' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
					"<label for='dele'></label><input type='button' id='"+check_msg[i].id+"' onclick='Delete_SendRequest(this)'  value='删除' /></div>";
				alert("html");	
				if(jdg=="cus"){
					$("#cusroot1").append(html);
				}else{
					$("#cusroot2").append(html);
				}
			
				
			}
			var end = "<div class='mana'><div class='cusrootset6'><input type='button' class='button' id='all' value='全部通过' onclick='Check_SendRequest(this)'/></div>"+
			"<div class='cusrootset6'><input type='button' class='button' id='delall' value='全部删除' onclick='Delete_SendRequest(this)' /></div></div>";
			if(jdg=="cus"){
				$("#cusroot1").append(end);
			}else{
				$("#cusroot2").append(end);
			}
			
			alert(checkshow.detail);
		}else{
			alert(checkshow.detail);
			if(jdg=="cus"){
				runto(1);
			}else{
				runto(2);
			}
		}
	}		
}




//审核用户商家
function Check_SendRequest(t){
	var id=$(t).attr("id");
	request=CheckShow_CreateRequest();
	var param = "id="+id;
	if(jdg=="cus"){
		request.open("POST","http://localhost:8080/E-Commerce/CusCheck",true);
	}else{
		request.open("POST","http://localhost:8080/E-Commerce/MerCheck",true);
	}
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=Check_parseRequest;
	request.send(jdg+param);
}

function Check_parseRequest(){
	
	if(request.status==200&&request.readyState==4){
		alert(request.responseText);
		
		var check=JSON.parse(request.responseText);
		
		if(check.status){
			alert(check.detail);
		}else{
			alert(check.detail);
		}
		if(jdg=="cus"){
			runto(1);
		}else{
			runto(2);
		}
	}		
}


//删除用户商家
function Delete_SendRequest(t){
	var id=$(t).attr("id");
	request=CheckShow_CreateRequest();
	var param = "id="+id;
	if(jdg=="cus"){
		request.open("POST","http://localhost:8080/E-Commerce/CusDelete",true);
	}else{
		request.open("POST","http://localhost:8080/E-Commerce/MerDelete",true);
	}
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=Delete_parseRequest;
	request.send(jdg+param);
}

function Delete_parseRequest(){
	
	if(request.status==200&&request.readyState==4){
		alert(request.responseText);
		
		var del=JSON.parse(request.responseText);
		
		if(del.status){
			alert(del.detail);
		}else{
			alert(del.detail);
		}
		if(jdg=="cus"){
			runto(1);
		}else{
			runto(2);
		}
	}		
}
