var isLeft = true;
// var isRight = false;

$(function(){
	$(".content-left .paper .guide").on({ 
		mousedown: function(){
			$(this).stop().animate({right: "-10"});
		},
		mouseleave: function(e){
			$(this).animate({right:"-103"});

		},
		mouseup: function(){
			$(this).animate({right:"-103"});
			$(".content").animate({left: "-1920"},500);
			isLeft = false;
			// 点击查询之后，隔10分钟刷新一次
			setTimeout("self.location.reload();",600000);
			magMove();
			magShadowChange();
		}
	});

	var $findBtn = $("#find-button");
	var $returnBtn = $("#return-button");
	$(".content-right .paper .find-room").on({	
		mousedown: function(){
			$findBtn.attr("draggable","false");
			$("#magnifier").attr("draggable","false");
			$("#mag-shadow").attr("draggable","false");
			$(this).stop().animate({width: "300"});
			$findBtn.stop().animate({left: "-32"});
		},
		mouseleave: function(){
			$(this).animate({width:"272"});
			$findBtn.animate({left:"-60"});
		},
		mouseup: function(){
			$(this).animate({width:"272"});
			$findBtn.animate({left:"-60"});
			showSelector(".find-form");
		}
	})

	$(".content-right .paper .return").on({
		mousedown: function(){
			$returnBtn.attr("draggable","false");
			$(this).stop().animate({width:"200"});
			$returnBtn.stop().animate({left: "-21"});
		},
		mouseleave: function(){
			$(this).animate({width:"171"});
			$returnBtn.animate({left:"-50"});
		},
		mouseup: function(){
			$(this).animate({width:"171"});
			$returnBtn.animate({left:"-50"});
			$(".content").animate({left: "0"},500);

			isLeft = true;
			pointMove();
			pointShadowChange();
		}
	})

	pointMove();
	pointShadowChange();


})

function pointMove(){
	if (!this.isLeft) {return};
	$(".guide #point").animate({top:"-90", height:"138", width:"90"},500)
		// .animate({height:"140", width:"90"})
		.animate({top:"-62", height:"130",width:"90"},400, function(){
			pointMove();
		});
}

function pointShadowChange(){
	if (!this.isLeft) {return};
	$(".guide #point-shadow").animate({top:"-50", height:"128"},500)
		.animate({top:"-40", height:"120"},400, function(){
			pointShadowChange();
		});
}

function magMove(){
	if (this.isLeft) {return};
	$(".find-room #magnifier").animate({top:"45", height:"130", width:"97"}, 500)
		.animate({top:"65", height: "122"}, 400, function(){
			magMove();
		});
}

function magShadowChange(){
	if (this.isLeft) {return};
	$(".find-room #mag-shadow").animate({top:"-30", height:"220"},500)
		.animate({top:"0", height:"200"},400, function(){
			magShadowChange();
		});
}