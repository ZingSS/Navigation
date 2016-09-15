$(function(){

	refresh();

})


function refresh(){
	var d = new Date();
	var vYear = d.getFullYear()
	var vMon = d.getMonth() + 1;
	var vDay = d.getDate();
	var h = d.getHours(); 
	var m = d.getMinutes(); 
	var se = d.getSeconds(); 
	s=vYear+"年"+vMon+"月"+ vDay + "日" + " " +
	(h<10 ? "0"+ h : h)+ " : " +(m<10 ? "0" + m : m) +" : " +(se<10 ? "0" + se : se);
	
	$(".header #time span").text(s);

	setTimeout("refresh()", 1000);
}
