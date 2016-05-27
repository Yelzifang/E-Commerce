// JavaScript Document

function sure2()
{
	var sure=confirm("确认购买物品吗？");
	if(sure==true)
	{
		Pay_SendRequest();
		
	}
	else
	{
		alert("物品仍在购物车等待你领走哦！");
	}
}
function hid(){
		var del = document.getElementById("commes");
        document.getElementById("commes").style.display="none";
}
function hidetext()  
		{  
		var mychar = document.getElementById("shopping");
        document.getElementById("shopping").style.display="none";		
		} 
function run(i){
	switch(i){
	case 0:
	window.location.href='main.html';
	break;
    case 1:{
      document.getElementById('iDBody1').style.display = "";
      document.getElementById('iDBody2').style.display = "none";
      document.getElementById('iDBody3').style.display = "none";
	  break;
    }
    case 2:{
      document.getElementById('iDBody1').style.display = "none";
      document.getElementById('iDBody2').style.display = "block";
      document.getElementById('iDBody3').style.display = "none";
  	  ViewCart_SendRequest();
	  break;
    }
    case 3:{
      document.getElementById('iDBody1').style.display = "none";
      document.getElementById('iDBody2').style.display = "none";
      document.getElementById('iDBody3').style.display = "block";
	  break;
    }
  }
}


		

$(document).ready (function ()
    {	
	
        var pl = $("p:last");
        var reg = /(.*[\:\：]\s*)([\+\d\.]+)(\s*元)/g;
        $ (".sy_minus").click (function ()
        {
            var me = $ (this), txt = me.next (":text"), pc = me.closest("p");
            var val = parseFloat (txt.val ());
            val = val < 1 ? 1 : val;
            txt.val (val - 1);
            var price = parseFloat (pc.prev("p").text().replace(reg,'$2')) * txt.val ();
            pc.next("p").text (pc.next("p").text().replace(reg, "$1" + price + "$3"));
            var sum = 0;
            $(".p_num").next("p").each(function (i, dom)
            {
                sum += parseFloat ($(this).text().replace(reg, "$2"));
            });
            pl.text(pl.text().replace(reg, "$1" + sum + "$3"));
        });
         
        $(".sy_plus").click (function ()
        {
            var me = $ (this), txt = me.prev (":text"), pc = me.closest("p");
            var val = parseFloat (txt.val ());
            txt.val (val + 1);
            var price = parseFloat (pc.prev("p").text().replace(reg,'$2')) * txt.val ();
            pc.next("p").text (pc.next("p").text().replace(reg, "$1" + price + "$3"));
            var sum = 0;
            $(".p_num").next("p").each(function (i, dom)
            {
                sum += parseFloat ($(this).text().replace(reg, "$2"));
            });
            pl.text(pl.text().replace(reg, "$1" + sum + "$3"));
        });
    })[0].onselectstart = new Function ("return false");
/*function changeBody(id){  
var mess=document.getElementById("iDBody1");  
var cart=document.getElementById("iDBody2");  
var order=document.getElementById("iDBody3"); 
if(id == 'order'){ 
	if(order.style.display=='none'){
    mess.style.display='none';   
    cart.style.display='none'; 
	order.style.display='block'; 
	}
}    
else if(id == 'cart'){ 
	if(cart.style.display=='none'){
    mess.style.display='none';   
    cart.style.display='block'; 
	order.style.display='none'; 
	}
}
else{   
    mess.style.display='block';   
    cart.style.display='none'; 
	order.style.display='none';  
}  
}  */