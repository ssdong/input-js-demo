(function() {
            var timeStart = undefined;
            var timeNow = undefined;
            function transform(name, event) {
                $(name).css("-webkit-transform", event);
                $(name).css("-moz-transform", event);
                $(name).css("-o-transform", event);
                $(name).css("-ms-transform", event);
                $(name).css("transform", event);
            }
            function animation(name,event) {
                $(name).css("-webkit-animation-play-state",event);
                $(name).css("-moz-animation-play-state",event);
                $(name).css("-o-animation-play-state",event);
                $(name).css("-ms-animation-play-state",event);
                $(name).css("animation-play-state",event);   
            }
            function reset(name) {
                var oldPiece = $(name);
                var newPiece = oldPiece.clone(true);
                oldPiece.before(newPiece);
                $("." + oldPiece.attr("class") + ":last").remove();
            }
            function animateBind() {
             $(".main-circle").mouseover(function() {
                 var timeNow = $.now();
                 // check if the first mouse over or after some certain mouse over
                 if(!timeStart || timeNow - timeStart > 10000) {
                     timeStart = $.now();
                     transform(".thin-vertical-bar","rotate(180deg)");
                     animation(".small-round-piece","running");
                     animation(".thick-vertical-bar","running");     
                     $(".thin-vertical-bar").css("background-color", "#66CCFF");
                     $(".thin-vertical-bar").css("opacity", "0.5");
                     $(".thick-vertical-bar").css("opacity", "0.5");
                     $(".small-round-piece").css("opacity", "0.5");
                     $(".hide").css("color","#808080");
                     setTimeout(function() {
                        transform(".thin-vertical-bar","rotate(0deg)")         
                        animation(".thick-vertical-bar","paused");
                        animation(".small-round-piece","paused");
                        $(".thin-vertical-bar").css("opacity", "1");
                        $(".thick-vertical-bar").css("opacity", "1");
                        $(".small-round-piece").css("opacity", "1");
                        $(".thin-vertical-bar").css("background-color", "#FFFFFF");
                        setTimeout(function() {
                            reset(".thick-vertical-bar");
                            reset(".small-round-piece"); 
                        },5000);
                     },5000);
                     // ! important 
                     // Directly put reset here will cuz problems!!!
                     // reset()
                 }
             });
           }
          animateBind();
})();