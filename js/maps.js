var $floorsLi = $(".floors ol li");
var $reFloorsLi = $(".result-floors ul li");
var $reRoomLi = $(".find-result ul li");
var hasSelected = false;
var hasSearch = false;
var roadArr;
var roomArr;
var finalFloor;

var maps = [".maps .map-fir", ".maps .map-sec", 
		".maps .map-thi", ".maps .map-for", ".maps .map-fif"];

$(function(){
	cilckMap();	
	setList();
	clickFloor();
})

function setRoom(rid){
	var $e = $("#" + rid);

	$e.on({
		mousedown: function(){
			$(this).css("color","#e99f36");

			$(this).children("span").stop().animate({right: "-20"});
		},
		mouseleave: function(){
			$(this).css("color","#333");
			$(this).children("span").stop().animate({right: "0"});
		},
		mouseup: function(){
			$(this).css("color","#e99f36");
			$(this).children("span").stop().animate({right: "-20"},400,
				function(){
			setTimeout(hideSelector(".find-form"), 2000);
			
				});
			// 更改tips的房间号
			var roomName = $(this).children().children().text();
			$(".map-tips #final-room span").text(roomName);
			// 需要得到楼层（数据）、坐标（数组）
			var selRoomNum = $(this).index();
			var p = [{"pid":"2001","x":"125","y":"31","floor":"2"},{"pid":"2002","x":"247","y":"31","floor":"2"},{"pid":"2004","x":"247","y":"188","floor":"2"},{"pid":"2005","x":"369","y":"188","floor":"2"}];
			var q = [{"pid":"2001","x":"100","y":"31","floor":"2"},{"pid":"2002","x":"200","y":"31","floor":"2"},{"pid":"2004","x":"200","y":"200","floor":"2"},{"pid":"2005","x":"369","y":"200","floor":"2"}];
			roadArr = {"2": p};

			$.get( "http://ls.lilystudio.org/navigation/public/dealer.php?get_location",
					{ rid : rid},
						function(data) {
					       		var ret = data
								roomArr = ret;
					}, "json");
			$.get( "http://lilystudio.org/navigation/public/dealer.php?find_path",
					{ rid : rid},
						function(data) {
					 //    var ret = data
						 roadArr = data;
								showSearchRes(roadArr);
								// 展示房间
								showTips(roadArr);
								showSelector("#view-all-maps");
								clickViewAll();
					}, "json");
		}
	})
}


// 直接选择地图的效果
function cilckMap(){
	for (var i = maps.length - 1; i >= 0; i--) {
		var $e = $(maps[i]);

		$e.on({
		mousedown : function(){
		},
		mouseup : function(){
			$(this).attr("draggable", "false");
			$(this).css("z-index", "100");
			$(this).stop().animate({opacity: 1}, 300, 
				function(){
					$(this).stop().animate({opacity: 1}, 300,
				function(){
					whichFloor($(this).attr("name"), false);
				});
				});
			
			

			
		},
		mouseleave : function(){
			$(this).stop().animate({opacity: 0.8}, 200);
			$(this).css("z-index", "0");
		}
	})
	};
	
	return;
}

// 直接选择边上的圆圈
function clickFloor(){
	$floorsLi.on({
		mousedown : function(){
			var num = $(this).index();
			if ($(this).is(":has(img)")) {
				return;
			};
			if ($(this).parent().children().is(":has(img)")) {
				removeFloor();
				addFloors(num, $(this));
				$("#floor-down").stop().animate({height: "85", right: "-=5"});
			};
			if(!$(this).parent().children().is(":has(img)")){
				addFloors($(this).index(), $(this));
			}
		},
		mouseup : function(){
			var num = $(this).index();
			if($(this).is(":has(img)")){
				$("#floor-down").animate({height: "74", right: "80"}, 3);
				showAMap(num);
				return;
			}
			if ($(this).parent().children().is(":has(img)")) {
				$("#floor-down").animate({height: "74", right: "80"});
			}
		},
		mouseleave : function(){
		}
	})

}

// 搜索后选择边上的小小圆圈
function clickReFloor(){
	$reFloorsLi.on({
		mousedown : function(){
			if ($(this).text() == "") {return;};
			// alert($(this).text());
			var num = $(this).index();

		},
		mouseup : function(){
			if ($(this).text() == "") {return;};
			var num = $(this).index();
			changeReFloor(num);
		},
		mouseleave : function(){
		}
	})

}

// 判断选择的是哪个地图
function whichFloor(name, isDown){
	switch(name){
		case "first": changeFloors(4, isDown); break;
		case "second": changeFloors(3, isDown); break; 
		case "third": changeFloors(2, isDown); break; 
		case "forth": changeFloors(1, isDown); break; 
		case "fifth": changeFloors(0, isDown); break; 
	}
}

// 根据选择的地图改变小圆圈
function changeFloors(num, isDown){
	// var numOfLi = ".floors ol li:eq("+num +")";
	var $e = $floorsLi.eq(num);
	if (this.hasSearch) {
		changeReFloor(num); return;};
	if (isDown) {
		addFloors(num, $e);
	}
	else{
		showAMap(num);
	}
}

// 在搜索过后更改结果小小圆圈
function changeReFloor(num){
	var $e = $reFloorsLi.eq(num);
	if ($e.hasClass("current")) {
		return;
	}
	else{
		showAMap(num);
		$reFloorsLi.removeClass("current");
		$e.addClass("current");
	}
}

// 为边上的小圆圈添加选中效果
function addFloors(num, e){
	var imgDown = "<img id='floor-down' src='images/floor-down.png'>";
	var numDown = "<span id='floor-num-down'>"+(5-num)+"</span>";
	e.append(imgDown);
	e.append(numDown);
	$("#floor-down").css({"margin-top": "-20px", "right": "80px"});
	$("#floor-num-down").css({"margin-top": "-6px", "right": "105px"});
}

// 展示选中的地图
function showAMap(num){
	if (!this.hasSearch) {
		$(".maps img").stop().animate({opacity: 0}, 500);
		$(".maps img").css("display", "none");
		var $e = $floorsLi.eq(num);
		removeFloor();
		addFloors(num, $e);
		var src = "images/view-map-" + (5-num) + ".png"
		var aMap = "<img id='show-a-map' src=" + src + ">";
		$("#show-a-map").remove();
	}
	else{
		var src = "images/map-" + (5-num) + ".png"
		var aMap = "<img id='result-a-map' src=" + src + ">";
	}

	$("#result-a-map").remove();
	$(".maps").append(aMap);
	$("#result-a-map").attr("draggable","false");
	$("#show-a-map").attr("draggable","false");

	if (!this.hasSearch) {
		$("#show-a-map").stop().animate({opacity: 1}, 500);
	}
	else{
		$("#result-a-map").css("left", "-915px");
		$("#result-a-map").stop().animate({opacity: 1}, 500);
		$(".maps .line").remove();
		$(".maps .point").remove();
		$("#room-highlight").remove();
		// var f = (5-num).toString();
		drawMap(roadArr[5-num]);
		if (finalFloor == (5-num)) {
			drawRoom();
		};
	}

	
}

// 清空小圆圈的选中效果
function removeFloor(){
	$floorsLi.parent().children().empty();
}

// 根据查询结果显示地图
function showSearchRes(arr){
	var isFloors = new Array(false, false, false, false, false);
	var nums = new Array();
	var n = 0;
	// 要判断显示哪几个楼层
	for (var key in arr) {
		isFloors[key-1] = true;
		nums[n] = key;
		n++;
		finalFloor = key;
		alert(key);
	};	
	// alert(finalFloor);
	var numOfFloor = 5 - nums[0];

	hasSearch = true;
	// 缩小边上的圆圈们
	$(".floors").css("display","none");
	// 显示小组件
	showSelector(".result-floors");
	// 注册事件
	clickReFloor();
	// 显示提示
	showSelector(".map-tips");
	// 清除current类
	$reFloorsLi.removeClass("current");
	$reFloorsLi.eq(numOfFloor).addClass("current");
	if ($(".maps").is(":has('#show-a-map')")) {
		$(".maps #show-a-map").remove();
	};
	showAMap(numOfFloor);

	// 如果已经查找过了某个楼层，就不用再进行缩小了,修改floors
	if (hasSelected) {
		for (var i = isFloors.length - 1; i >= 0; i--) {
			var $rmLi = $reFloorsLi.eq(4-i);
			$rmLi.css("background", "url(images/res-floor.png) no-repeat");
			$rmLi.text(i+1);
			$reFloorsLi.removeClass("current");
			$(maps[i]).css("display","block");
			if (!isFloors[i]) {
				$rmLi.css("background", "none");
				$rmLi.text("");
				$(maps[i]).css("display", "none");
			};
		};
		
		return;};
	// 缩小Maps
	reduceMaps();
	// 隐藏非目标floors
	for (var i = isFloors.length - 1; i >= 0; i--) {
		if(!isFloors[i]){
			var $rmLi = $reFloorsLi.eq(4-i);	
			$rmLi.css("background", "none");
			$rmLi.text("");
			$(maps[i]).css("display","none");
		}
	};

	// 设置已经选中某个楼层
	hasSelected = true;
}

function drawMap(p){
	// 画线
	for (var j = 1; j < p.length; j++) {
		var lineDiv = "<div class='line'></div>";
		$(".maps").append(lineDiv);
		var $line = $(".maps .line").eq(j-1);
		
		var begin, end;
		var pjx = parseInt(p[j]["x"]);
		var pjy = parseInt(p[j]["y"]);
		var pjpx = parseInt(p[j-1]["x"]);
		var pjpy = parseInt(p[j-1]["y"]);

		// 如果x相等
		if (pjx == pjpx) {
			if (pjy < pjpy) {
				begin = p[j];
				end = p[j-1];
			}
			else {begin = p[j-1]; end = p[j];}
			$line.css({"height": end["y"] - begin["y"]});
			}
		// 如果y相等
		else if (pjy == pjpy) {
			if (pjx < pjpx) {
				begin = p[j];
				end = p[j-1];
			}
			else {begin = p[j-1]; end = p[j];}
			$line.css({"width": end["x"] - begin["x"]});
		}

		$line.css({"left": parseInt(begin["x"])-915, "top":parseInt(begin["y"])-55});

	}

	// 画最后一个点到门

	// 画点
	for (var i = 0; i < p.length; i++) {
		var pointDiv = "<div class='point'></div>";
		$(".maps").append(pointDiv);
		$(".maps .point").eq(i).css({"left":parseInt(p[i]["x"])-915, "top":parseInt(p[i]["y"])-55});
	};

	showSelector(".maps .line");
	showSelector(".maps .point");
}

// 查看所有地图
function clickViewAll(){
	var $all = $("#view-all-maps");
	$all.on({
		click : function(){
			hideSelector(".result-floors");
			hideSelector(".map-tips");
			showSelector(".floors");

			$(".maps #result-a-map").remove();
			$(".maps .line").remove();
			$(".maps .point").remove();
			magMaps();
			hideSelector("#view-all-maps");
		}
	})
}

function showTips(arr){
	var tri = "<img src='images/tip-tri.png'>";
	var $tipWay = $(".tip-way ul");
	$tipWay.empty();
	$tipWay.append("<li><span>路径：</span></li>");
	for (var key in arr) {
		var tip = "<li><span>"+ key + "楼 </span>" + tri + "</li>";
		$tipWay.append(tip);
	};
	var end = "<li><span>终点</span></li>";
	$tipWay.append(end);
}

function drawRoom(){
	// lux,luy,rdx,rdy
	var roomHL = "<div id='room-highlight'></div>";
	$(".maps").append(roomHL);
	var lux = roomArr["lux"], luy = roomArr["luy"];
	var rdx = roomArr["rdx"], rdy = roomArr["rdy"];
	var $resMap = $("#result-a-map");
	var iniLeft = $resMap.position().left;
	var iniTop = $resMap.position().top;
	$("#room-highlight").css({"height": rdy - luy,
							  "width": rdx - lux,
							  "left": lux-911, "top": luy-53});
	showSelector("#room-highlight");
}
