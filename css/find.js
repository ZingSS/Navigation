var isRet = false;
var selectBtn = '<img class="sel-room" src="images/room-select.png">';

$(function(){
	$(".find-form .find-return").on({
		mousedown: function(){

			isRet = true;
			retTri(".find-return .tri");
		},
		mouseleave: function(){
			isRet = false;
		},
		mouseup: function(){
			$(".find-form").stop().animate({opacity: "0"}, 500, function(){
				$(".find-form").css("display", "none");
			});
			isRet = false;
		}
	});

	$("#search-button").on({
		mousedown: function(){
			isRet = true;
			retTri("#search-button .tri");
		},
		mouseleave: function(){
			isRet = false;
		},
		mouseup: function(){
			// $(".find-form .find-result ul").css({"display": "block", "opacity": "0"})
			// 	.stop().animate({opacity: "1"}, 500);
			$(".find-form .find-result ul").empty();
			var conditions = $("#find-condition").val();
			//获得结果列表
			$.get( "dealer.php",
				{ input: conditions },
				function(data) {
					for (var d in data) {
						var rid = data[d]["rid"];
						var name = data[d]["name"];
						var des = data[d]["des"];
						var resultLi = "<li id = " + rid + "><span>" + name + " " + 
						des + "</span>" + selectBtn + "</li>";
						$(".find-form .find-result ul").append(resultLi);
					};
				}, 
			"json");
			showSelector(".find-form .find-result ul");
			isRet = false;
		}
	})

	$(".find-return ul li .sel-room").on({
		mousedown: function(){
			
		},
		mouseleave: function(){
		},
		mouseup: function(){

		}
	})


})


function retTri(triName){
	var $tri = $(triName)
	if (!this.isRet) {return};
	$tri.animate({left: "10"}, 500)
		.animate({left: "0"}, function(){
			retTri(triName);
		});
}
