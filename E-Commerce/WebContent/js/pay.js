/**
 * 
 */
function Pay_CreateRequest(){
	var req=null;
	if(window.XMLHttpRequest)
		req=new XMLHttpRequest();
	else
		req=new ActiveXObject("Microsoft.XMLHTTP");
	
	return req;
}

function Pay_SendRequest(){
	request=Pay_CreateRequest();
	request.open("GET","http://localhost:8080/E-Commerce/Payment",true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=Pay_parseRequest;
	request.send();
}

function Pay_parseRequest(){
	if(request.status==200&&request.readyState==4){
		//alert(request.responseText);
		
		var paycart=JSON.parse(request.responseText);
		if(paycart.status){
			ViewCart_SendRequest();
			alert(del_msg.detail);
		}else{
			
			alert(del_msg.detail);
		}
	}
}