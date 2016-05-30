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

// function hidetext()  
// 		{  
// 		var mychar = document.getElementById("shopping");
//         document.getElementById("shopping").style.display="none";		
// 		}  
/*function hidden(){
	var hid = document.getElementById("comprice");
	document.getElementById("comprice").style.display="none";
}*/



//function run(i){
//	switch(i){
//		case 0:
//                window.location.href='main.html';
//                break;
//		case 1:
////			    document.getElementById("shoppingcart").style.display="block";
//                window.location.href='shoppingcart.html';
//                break;
//		case 2:
//                window.location.href='';
//                break;
//		case 3:
//            window.location.href='usercenter.html';
//            break;
//        default: return;
//	}
//}

$(document).ready (function ()
{
    // 删除
    $ (".cart-op button").click (function (){
        $(this).parent('.goods').css("display","none");
    });

    // 计算函数
    var pl = $("#total-price");
    var reg = /([\+\d\.])/g;

    total();    //初始化总价

    $ (".sy_minus").click (function ()
    {
        var me = $ (this), txt = me.next (":text"), pc = me.closest("div");
        var val = parseFloat (txt.val ());
        val = val < 1 ? 1 : val;
        if (val>1) {
            txt.val (val - 1);
        }else{
            return;
        }
        var price = parseFloat (pc.prev("div").text().replace(reg,'$1')) * txt.val ();
        //pc.prev("div") 单价 price 单个物品总价的值
        pc.next("div").text(price);
        //pc.next("div") 单个物品总价    
        var sum = 0;
        $(".goods").each(function (i, dom)
        {   
            sum += parseFloat ($(this).children('#purchase').html());
        });
        pl.text(sum);
    });
     
    $(".sy_plus").click (function ()
    {
        var me = $ (this), txt = me.prev (":text"), pc = me.closest("div");
        //me 当前点击的按钮 txt 数量值 pc 数量的整个div
        var val = parseFloat (txt.val ());
        txt.val (val + 1);
        var price = parseFloat (pc.prev("div").text().replace(reg,'$1')) * txt.val ();
        //pc.prev("div") 单价 price 单个物品总价的值
        pc.next("div").text(price);
        //pc.next("div") 单个物品总价    
        total();
    });

    // 计算、输出总价
    function total(){
        var sum = 0;
        $(".goods").each(function (i, dom)
        {   
            sum += parseFloat ($(this).children('#purchase').html());
        });
        pl.text(sum);
    }
})[0].onselectstart = new Function ("return false");