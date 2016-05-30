/**
 * 
 */
var judge = null;
function DelCart_CreateRequest(){
	
	var req=null;
	if(window.XMLHttpRequest)
		req=new XMLHttpRequest();
	else
		req=new ActiveXObject("Microsoft.XMLHTTP");
	return req;
}

function DelCart_CreateParams(b){
	var comid=$(b).attr("id");
	alert(comid);
	return comid;
}

function DelCart_SendRequest(b){
	var comid = b;
	judge=$(b).attr("name");
	
	request=DelCart_CreateRequest();
	request.open("POST","http://localhost:8080/E-Commerce/DeleteCart",true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=DelCart_parseRequest;
	request.send("comid="+DelCart_CreateParams(comid)+"");
}

function DelCart_parseRequest(){
	
	if(request.status==200&&request.readyState==4){
		alert(request.responseText);
		
		var deletecart=JSON.parse(request.responseText);
		if(deletecart.status){
			alert("judge:"+judge);
			if(judge=="carid"){
				alert("car");
				ViewCart_SendRequest();
			}else if(judge=="indid"){
				alert("ind");
				ViewIndent_SendRequest();
			}
			alert(del_msg.detail);
		}else{
			alert(del_msg.detail);
		}
	}
}
