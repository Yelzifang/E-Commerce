// JavaScript Document
function runto(i){
	switch(i){
	case 0:
	window.location.href='main.html';
	break;
    case 1:{
      document.getElementById('idroot1').style.display = "block";
      document.getElementById('idroot2').style.display = "none";
      alert("点击cus");
      var j = "cus"; 
      CheckShow_SendRequest(j);
	  break;
    }
    case 2:{
      document.getElementById('idroot1').style.display = "none";
      document.getElementById('idroot2').style.display = "block";
      alert("点击mer");
      var j = "mer"; 
      CheckShow_SendRequest(j);
	  break;
    }
	}
}
function rsure1(){
	var ensure=confirm("是否通过该用户的信息审核？");
	if(ensure==ture){
		alert("审核成功！");
	}
	else{
		alert("审核未通过！");
	}
}
/*function rsure2(){
	var ensure=confirm("是否删除该用户信息？");
	if(ensure==ture){
		
		alert("删除成功！");
	}
}*/
function rhid(){
		var del = document.getElementById("cusroot1");
        document.getElementById("cusroot1").style.display="none";
}

function rhid2(){
		var del = document.getElementById("cusroot2");
        document.getElementById("cusroot2").style.display="none";
}