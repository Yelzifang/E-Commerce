/**
 * 更多商品
 */
window.onload=function CreateDivCom(){
	
//	 alert("动态加载");
	
//	 addElement(10,"16052313.jpg","商品2");
	 SendMoreRequest(1,8);
 }

var request;

//创建请求
function CreateMoreRequest(){
	var req=null;
	
	if(window.XMLHttpRequest)
		req=new XMLHttpRequest();
	else
		req=new ActiveXObject("Microsoft.XMLHTTP");
	
	return req;
}

//发送登录请求
function SendMoreRequest(pageno,pagecount){
	
	request=CreateMoreRequest();
	
	request.open("POST","http://localhost:8080/E-Commerce/ComDiv",true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=parseMoreRequest;
	request.send("pageno="+pageno+"&pagecount="+pagecount);
}
//解析请求
function parseMoreRequest(){
	
	if(request.status==200&&request.readyState==4){
	
		var more_json=JSON.parse(request.responseText);
	
		if(more_json.status){
			var message_array=more_json.message;
		
			for(var i=0;i<message_array.length;i++){
				var message=message_array[i];
				
				addElement(message.comid, message.comimage, message.comname);
				
			}
			
		}
		else
			alert(more_json.detail);
	}
}
//动态加载
function addElement(comid,comimage,comname){
	var main_content=document.getElementById("main_content");
	 
	 var com_a=document.createElement("a");
	 var com_div=document.createElement("div");
	 var com_img=document.createElement("img");
	 var com_label=document.createElement("label");
	 var com_br=document.createElement("br");
	 
	 com_a.setAttribute("href", "http://localhost:8080/E-Commerce/show.html?comid="+comid);
	 com_div.setAttribute("name", "com_div")
	 com_div.setAttribute("class", "con");
	 com_img.setAttribute("alt","更多....");
	 com_img.setAttribute("src", "images/food.jpg");
	 com_label.innerHTML=comname;
	 
	 com_div.appendChild(com_a);
	 com_a.appendChild(com_img);
	 com_a.appendChild(com_br);
	 com_a.appendChild(com_label);
	
	 main_content.appendChild(com_div);
}

//清空页面
function removeAll(){
	var main_content=document.getElementById("main_content");
	var com_child=main_content.childNodes;
	
	while(com_child.length>0){
		main_content.removeChild(com_child[com_child.length-1]);
	}
}


function jump_page(){
	var page_label=document.getElementById("showmore-page").value;
	
	if(page_label>0){
		removeAll();
		SendMoreRequest(page_label,8);
	}
	else
		alert("页数不能小于0");
}

function pre_page(){
	var page_label=document.getElementById("showmore-page").value;
	
	if(page_label>=1){
		
		page_label=page_label-1;
		
		removeAll();
		SendMoreRequest(page_label,8);
		
		document.getElementById("showmore-page").value=page_label;
	}else
		alert("页数不能小于0");
	
	
	
}

function next_page(){
	var page_label=document.getElementById("showmore-page").value;
	page_label++;
	
	removeAll();
	SendMoreRequest(page_label,8);
	
	document.getElementById("showmore-page").value=page_label;
}

function check_page(){
	
	var page_label=document.getElementById("showmore-page").value;
	
	if(page_label<0)
		alert("页数不能小于0");
	
	document.getElementById("showmore-page").value=1;
}
