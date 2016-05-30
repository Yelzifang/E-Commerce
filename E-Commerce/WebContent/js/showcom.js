/**
 * 
 */
/**
 * 
 */

function ComShow_CreateRequest(){
	
	var req=null;
	if(window.XMLHttpRequest)
		req=new XMLHttpRequest();
	else
		req=new ActiveXObject("Microsoft.XMLHTTP");
	
	return req;
}

function ComShow_SendRequest(){
	alert("com");
	request=ComShow_CreateRequest();
	request.open("GET","http://localhost:8080/E-Commerce/ShowCom",true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=ComShow_parseRequest;
	request.send();
}

function ComShow_parseRequest(){
	
	if(request.status==200&&request.readyState==4){
		alert(request.responseText);
		
		var comshow=JSON.parse(request.responseText);
		$("#addgoods").empty();
		if(comshow.status){
			var com_msg=comshow.message;
			alert(com_msg.length);	
			for(i=0;i<com_msg.length;i++){
				alert("i="+i);
				var html = "<div><a href='#'><label id='goods-name' >"+com_msg[i].comname+"</label></a>"+
				"<div class='modification-button'><input type='button' id="+com_msg[i].comid+" value='删除' onclick='ComDel_SendRequest(this)'/></div></div>";

				$("#addgoods").append(html);
					
			}		
			
			alert(comshow.detail);
		}else{
			alert(comshow.detail);
		}
	}		
}


//删除商品
function ComDel_SendRequest(j){
	var comid = $(j).attr("id");
	alert("del comid:"+comid);
	request=ComShow_CreateRequest();
	request.open("POST","http://localhost:8080/E-Commerce/ComDelete",true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=ComDel_parseRequest;
	request.send("comid="+comid);
}

function ComDel_parseRequest(){
	
	if(request.status==200&&request.readyState==4){
		alert(request.responseText);
		var comdel=JSON.parse(request.responseText);
		
		if(comdel.status){		
			alert(comdel.detail);
			ComShow_SendRequest();
		}else{
			alert(comdel.detail);
		}
	}		
}
