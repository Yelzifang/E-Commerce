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
	alert("viewindent");
	request=ViewIndent_CreateRequest();
	request.open("GET","http://localhost:8080/E-Commerce/IndShow",true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=ViewIndent_parseRequest;
	request.send();
}

function ViewIndent_parseRequest(){
	
	if(request.status==200&&request.readyState==4){
		alert(request.responseText);
		
		var viewindent=JSON.parse(request.responseText);
		
		if(viewindent.status){
			var indent_msg=viewindent.message;
			alert(indent_msg.length);	
			
			$("#addindent").empty();
			for(i=0;i<indent_msg.length;i++){
				alert("i="+i);
				var html ="<div class='commess' id='commes'>"+"" +
				"<div class='ordertop'><label for='ordertime'>订单日期：&nbsp;</label>"+
				"<label id='intime'>"+indent_msg[i].intime+"</label></div><div class='commess1'>"+
				"<div class='commname'><label id='comname'>商品名字："+indent_msg[i].comname+"</label></div>"+
				"<div class='merrname'><label id='mername'>商家名字："+indent_msg[i].mername+"</label></div>"+
				"<div class='comperp'><label id='comprice'>单价："+indent_msg[i].comprice+"</label></div>"+
				"<div class='commnumber'><label id='comnumber'>数量："+indent_msg[i].count+"</label></div>"+
				"<div class='compay'><label id='purchase'>总价："+indent_msg[i].purchase+"</label></div>"+
				"<div class='combutton1'><input type='button' class='button' name='indid' id='"+indent_msg[i].comid+"' onclick='DelCart_SendRequest(this)' value='删除' /></div></div></div>";
						
				$("#addindent").append(html);
				
			}
		

			alert(cusself.detail);
		}else{
			alert(cusself.detail);
		}
	}		
}