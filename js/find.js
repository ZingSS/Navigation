var isRet = false;
var selectBtn = '<img class="sel-room" src="images/room-select.png">';

$(function(){

	setRtnBtn();
	setSearchBtn();
})


function setRtnBtn(){
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
}

function setSearchBtn(){
	$("#search-button").on({
		mousedown: function(){
			isRet = true;
			retTri("#search-button .tri");
		},
		mouseleave: function(){
			isRet = false;
		},
		mouseup: function(){
			$(".find-form .find-result ul").empty();
			var conditions = $("#find-condition").val();
			//获得结果列表
			$.get( "ls.lilystudio.org/navigation/public/dealer.php?find_room",
				{ input: conditions },
				function(data) {
					if(data==null){
						var resultLi = "<li><span><b>该房间不存在或不开放</b></span></li>";
						$(".find-form .find-result ul").append(resultLi);
					}
					else{
						for (var d in data) {
							var rid = data[d]["rid"];
							var name = data[d]["name"];
							var des = data[d]["des"];
							var resultLi = "<li id = " + rid + "><span><b>" + name + "</b> " +
								des + "</span></li>";
							$(".find-form .find-result ul").append(resultLi);
							setRoom(rid);
						};
					}

				}, 
			"json");
			showSelector(".find-form .find-result ul");
			isRet = false;
		}
	})
}


function retTri(triName){
	var $tri = $(triName)
	if (!this.isRet) {return};
	$tri.animate({left: "10"}, 500)
		.animate({left: "0"}, function(){
			retTri(triName);
		});
}
