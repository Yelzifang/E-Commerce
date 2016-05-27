/**
 * 
 */

function ViewIndent_CreateRequest(){
	
	var req=null;
	if(window.XMLHttpRequest)
		req=new XMLHttpRequest();
	else
		req=new ActiveXObject("Microsoft.XMLHTTP");
	
	return req;
}

function ViewIndent_SendRequest(){
	alert("view");
	request=ViewIndent_CreateRequest();
	request.open("GET","http://localhost:8080/E-Commerce/IndShow",true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=ViewCart_parseRequest;
	request.send();
}

function ViewIndent_parseRequest(){
	
	if(request.status==200&&request.readyState==4){
		alert(request.responseText);
		
		var viewindent=JSON.parse(request.responseText);
		
		if(viewindent.status){
			var indent_msg=viewindent.message;
			alert(indent_msg.length);	
			
			var htmltitle = "";
			$("#addcart").append(htmltitle);
			
			var sum = 0;
			
			for(i=0;i<indent_msg.length;i++){
				alert("i="+i);
				indent_msg[i].comid
		
				
				
				$("#addcart").append(html);
					
			}
			var htmlend = "";
			
				
			$("#purchase").html("总额:"+sum+"元");
				
			

			alert(cusself.detail);
		}else{
			alert(cusself.detail);
		}
	}		
}