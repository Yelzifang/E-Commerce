// JavaScript Document
function cul(){
var x = document.getElementById("comnumset");
var y = document.getElementById("comprice");
var priceID=document.getElementsByTagName("p")[0].getAttribute("comprice");
document.write(priceID.innerHTML);
document.write(y.innerHTML);
var z = 0; 
	z = x*y;
	document.getElementById("purchase").innerHTML = z;
}

function hidetext()  
		{  
		var mychar = document.getElementById("shopping");
        document.getElementById("shopping").style.display="none";		
		}  
/*function hidden(){
	var hid = document.getElementById("comprice");
	document.getElementById("comprice").style.display="none";
}*/

function run(i){
	switch(i){
		case 0:
		{
		window.location.href='main.html';
		}
		case 1:
		{
//			document.getElementById("shoppingcart").style.display="block";
		}
		case 2:
		{
		window.location.href='';
		}
		case 3:
		{
		window.location.href='usercenter.html';
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