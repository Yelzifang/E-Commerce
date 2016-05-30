/**
 * 
 */
//$(document).ready(function(){
//	alert("view");
//	ViewCart_SendRequest();
//})
function ViewCart_CreateRequest(){
	
	var req=null;
	if(window.XMLHttpRequest)
		req=new XMLHttpRequest();
	else
		req=new ActiveXObject("Microsoft.XMLHTTP");
	
	return req;
}

function ViewCart_SendRequest(){
	request=ViewCart_CreateRequest();
	request.open("GET","http://localhost:8080/E-Commerce/ViewCart",true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=ViewCart_parseRequest;
	request.send();
}

function ViewCart_parseRequest(){
	
	if(request.status==200&&request.readyState==4){
		
		var viewcart=JSON.parse(request.responseText);
		
		$("#addcart").empty();
		if(viewcart.status){
			var cart_msg=viewcart.message;
			
			var htmltitle = "<div class='carttitle'><div class='title1'>"+
			"<label for='commess'>商品信息</label></div>"+
			"<div class='title3'><label id='comperp'>单价(元)</label></div>"+
			"<div class='title4'><label id='comnumber'>数量</label></div>"+
			"<div class='title5'><label id='comtotal'>金额(元)</label></div></div>";
			$("#addcart").append(htmltitle);
			
			var sum = 0;
			
			for(i=0;i<cart_msg.length;i++){
				
				var html = "<div class='shoppingcart' id='shopping'>"+
				"<div class='shoppingcart1'><input type='hidden' id='cartid"+i+"' value="+cart_msg[i].comid+" /><label id='cartname'>"+cart_msg[i].comname+
				"</label></div>"+"<div class='shoppingcart2'><label id='cartprice"+i+"'>"+cart_msg[i].comprice+"</label></div>"+
				"<div class='shoppingcart3'>"+
//<!--  	<input type="number" id="comnumset" style="width: 100px; font: 20; height: 20px;"/>-->
				"<br /><p class='p_num'><span class='sy_minus' id='sy_minus_gid1'>-</span>"+
				"<input class='sy_num' id='cartcount' readonly type='text' name='number1' value="+cart_msg[i].count+" />"+ 
				"<span class='sy_plus' id='sy_plus_gid1'>+</span></p></div>"+
				"<div class='shoppingcart4'><label id='cartpurchase"+i+"'>"+cart_msg[i].purchase+"</label></div><br /><br />"+
				"<div class='shoppingcart5'><input type='button' class='button' name='carid' id="+cart_msg[i].comid+" onclick='DelCart_SendRequest(this)' value='删除' /></div></div><br />";
		
				sum=sum+cart_msg[i].purchase;
				
				$("#addcart").append(html);
					
			}
			var htmlend = "<div class='showpay'><p id='purchase'>总额：元</p>"+
			"<input type='button' class='button' value='立即购买' onclick='sure2()' /></div><br/><br/><br/>";
			$("#addcart").append(htmlend);
				
			$("#purchase").html("总额:"+sum+"元");
				
			alert(cusself.detail);
		}else{
			alert(cusself.detail);
		}
	}		
}
