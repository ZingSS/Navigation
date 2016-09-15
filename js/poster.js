$(document).ready(function() {
    $("#owl-demo").owlCarousel({
		autoPlay : 5000,
      	navigation : true,
      	slideSpeed : 300,
      	paginationSpeed : 400,
      	singleItem : true,
      	stopOnHover : true,
        transitionStyle : "fadeUp"

    });

    setButton();
    setList();
    isDispear();

    setPosterSize();

});


function setButton(){
	var $prev = $(".owl-controls .owl-buttons .owl-prev");
    var $next = $(".owl-controls .owl-buttons .owl-next");
    $prev.text(" ");
    $next.text(" ");

    $prev.on({
    	mouseup : function(){
    		$(this).stop().animate({left: "-100"})
    			.animate({left: "-90"});
    	}
    })

    $next.on({
    	mouseup : function(){
    		$(this).stop().animate({right: "-100"})
    			.animate({right: "-90"});
    	}
    })
}


function setList(){
	var $listLi = $(".list-ul ul li span");
	var $owlPage = $(".owl-controls .owl-page span");
	for (var i = 0 ; i < $listLi.length; i++) {
		$owlPage.eq(i).text($listLi.eq(i).text());
	};

	$(".list-ul ul").css("display", "none");
	$(".owl-controls .owl-page span").on({
		mouseup: function(){
            if ($(this).parent().hasClass("active")) {return;};
			$(this).stop().animate({left: "10"})
				.animate({left: "0"});
		}
	})
}

function isDispear(){
    var $item = $(".owl-controls .owl-page");
    var $prev = $(".owl-controls .owl-buttons .owl-prev");
    var $next = $(".owl-controls .owl-buttons .owl-next");
    if ($item.last().hasClass("active")) {
       $next.css("display", "none");
    }
    else{
        $next.css("display", "block");
    }
    if ($item.first().hasClass("active")) {
       $prev.css("display", "none");
    }
    else{
        $prev.css("display", "block");
    }
    setTimeout("isDispear()", 100);
}

function setPosterSize(){
    var numOfPoster = $(".owl-wrapper").children().length;
    for (var i=0; i<numOfPoster; i++){
        // Create new offscreen image to test
        var theImage = new Image();
        theImage.src = $(".owl-wrapper .item").eq(i).children().attr("src");
        var imageWidth = theImage.width;
        var imageHeight = theImage.height;
        if(parseFloat(imageWidth/imageHeight) > parseFloat(700/860)){
            $(".owl-wrapper .item").eq(i).addClass("wider");
        }
    }
}