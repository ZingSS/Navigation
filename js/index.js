$(function(){
	//$(document).bind("contextmenu",function(){return false;});
    //$(document).bind("selectstart",function(){return false;});
    //$(document).keydown(function(){return key(arguments[0])});
})


// 缩小Maps
function reduceMaps(){
	$(".maps .map").css({"display":"block", "opacity": "0.8"});
	$(".maps").animate({left: "+=1000"});
	for (var i = maps.length - 1; i >= 0; i--) {
		var $map = $(maps[i]);
		var topChange = $map.position().top + 71 + i * 105;
		var leftChange = $map.position().left + 80 + i * (-20);
		var heightChange = $map.height() * 0.27;
		var widChange = $map.width() * 0.27 - 50;
		$map.stop().animate({height: heightChange, width: widChange,
			top: topChange, left: leftChange});
	};
}


// 放大Maps
function magMaps(){
	$(".maps .map").css({"display":"block", "opacity": "0.8"});
	if (!this.hasSearch) {return;};
	var l = $(".maps").position().left;
	$(".maps").animate({left: l - 1000});
	for (var i = maps.length - 1; i >= 0; i--) {
		var $map = $(maps[i]);
		var topChange = $map.position().top - 71 - i * 105;
		var leftChange = $map.position().left - 80 - i * (-20);
		var heightChange = $map.height() / 0.27;
		var widChange = ($map.width()+50) / 0.27;
		$map.stop().animate({height: heightChange, width: widChange,
			top: topChange, left: leftChange});
	};
	hasSearch = false;
	hasSelected = false;
	
}

// 关闭某个选择器
function hideSelector(selector){
	var $e = $(selector)
	$e.stop().animate({opacity: "0"}, 400, function(){
				$(this).css("display", "none");
			});
}

// 显示某个选择器
function showSelector(selector){
	var $e = $(selector);
	$e.css({"display": "block", "opacity": "0"})
		.stop().animate({opacity: "1"});
}