;AnnotationTool = (function($, window, document, undefined) {
      var annotations = {};

      var lastActivatedHighlight = [];

      var randomID = undefined;

      /* TODO; 
         <div class=\"wrapper\">\
            <div class=\"insidewrapper\">\
              <div class=\"pencil\"></div>\
              <div class=\"out\"></div>\
             </div>\
          </div>\
          May try to improve the annotation tool
      */
      function setUp() {
          var addNewWIdgets = "<div class=\"annotation-wrapper\">\
                                  <div class=\"annotation-input\">\
                                    <div class=\"insidewrapper\">\
                                      <textarea id=\"annotation-field\" placeholder=\"Comment\"></textarea>\
                                      <div class=\"annotation-control\">\
                                        <div class=\"annotation-cancel\">\
                                          <div class=\"closewrap\">\
                                            <div class=\"close\"></div>\
                                            <div class=\"closebefore\"></div>\
                                          </div>\
                                          <p>Cancel</p>\
                                        </div>\
                                        <div class=\"annotation-save\">\
                                          <div class=\"savewrap\">\
                                            <div class=\"save\"></div>\
                                            <div class=\"savebefore\"></div>\
                                          </div>\
                                          <p>Save</p>\
                                        </div>\
                                        <div class=\"edittriangleup\"></div>\
                                        <div class=\"edittriangledown\"></div>\
                                      </div>\
                                    </div>\
                                  </div>\
                                  <div class=\"annotationview-wrapper\">\
                                    <div class=\"annotation-hover\">\
                                      <p id=\"text-input\">No Comment</p>\
                                      <div id=\"edit-wrapper\">\
                                         <div id=\"edit-button\"></div>\
                                      </div>\
                                      <div id=\"delete-wrapper\">\
                                        <div id=\"delete-button1\"></div>\
                                        <div id=\"delete-button2\"></div>\
                                      </div>\
                                    </div>\
                                  </div>\
                              </div>";
          $("body").wrapInner(addNewWIdgets);
      }

      function generateID() {
          var text = "";
          var charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          // generate a length of 4 ID
          for(var i = 0; i < 4; i++) {
             text += charSet.charAt(Math.floor(charSet.length * Math.random()));
          }
          return text;
      }
      function textHighlight() {
          $("body").textHighlighter({
              onBeforeHighlight: function(range) {
                  return true;
              },
              onAfterHighlight: function(highlights, range) {
                  function forEach(array, action) {
                      for(var element in array) {
                          action(array[element]);
                      }
                  }

                  // Make current annotation input box inactive
                  $(".annotation-input").css("display", "none");

                  // Get current time
                  var newTime = $.now().toString();

                  // Reset last activated highlights array
                  lastActivatedHighlight = [];

                  // TODO; May have to improve the annotation tool by allowing clickable pen to show up
                    /*
                      randomID = generateID();
                      $(highlights[0]).append("<span id=\"" + randomID + "\"></span>");
                      var position = $("#" + randomID).position();
                      $("#" + randomID).remove();
                      position.top = position.top - $(".wrapper").css("width").substring(0,2) - 8;
                      position.left = position.left - Number($(".wrapper").css("height").substring(0,2)) / 2;

                    */
                  
                  // Iterate through the highlights array
                  forEach(highlights, function(highlight) {
                      // We store the highlight first
                      annotations[$(highlight).text()] = { "time" : newTime, "comment" : ""};
                      // Now we push them into the lastActiveedHighlight array
                      lastActivatedHighlight.push(highlight);
                  });
                  // TODO;
                    /*
                      $(".wrapper").css("display", "block").css("top",position.top).css("left",position.left);
                    */
              }
          });
      }

      function hoverEffect() {       
         // TODO;
         /* clickable pen code
             $(".wrapper").hover(function() {
                 $(".wrapper").css("background-color","#3385FF");
                 $(".out").css("border-top","10px solid #3385FF");
             }, function() {
                 $(".wrapper").css("background-color","#707070");
                 $(".out").css("border-top","10px solid #707070");
             });
         */
         // Annotation input box
         $(".annotation-cancel").hover(
                 function() {
                  $(this).css("background", "#3366FF");
                  $(this).children(".closewrap").css("background", "#FFFFFF")
                         .children(".close").css("background", "#3366FF")
                         .siblings(".closebefore").css("background", "#3366FF");
                  $(this).children("p").css("color", "#FFFFFF");
                 }, function() {
                   $(this).css("background", "#B4B4B4");
                   $(this).children(".closewrap").css("background", "#272727")
                          .children(".close").css("background", "#FFFFFF")
                          .siblings(".closebefore").css("background", "#FFFFFF");
                   $(this).children("p").css("color", "#000000");
         });

         $(".annotation-save").hover(
                 function() {
                  $(this).css("background", "#3366FF");
                  $(this).children(".savewrap").css("background", "#FFFFFF")
                         .children(".save").css("background", "#3366FF")
                         .siblings(".savebefore").css("background", "#3366FF");
                  $(this).children("p").css("color", "#FFFFFF");
                 }, function() {
                  $(this).css("background", "#B4B4B4");
                  $(this).children(".savewrap").css("background", "#272727")
                         .children(".save").css("background", "#FFFFFF")
                         .siblings(".savebefore").css("background", "#FFFFFF");
                  $(this).children("p").css("color", "#000000");
          });

         // hover on the annotation viewer
         $(".annotationview-wrapper").hover(
                 function() {
                   $(this).css("display", "block");
                 },function() {
                   $(this).css("display", "none");
          });

         // Show the annotation viewer
         $(document).on("mousemove", ".highlighted", function(event) {
                  // If we have in the middle of entering notes, deactivate this event
                  if($(".annotation-input").css("display") == "block") {
                               return;
                  }
                  // Now reset the value in the view box
                  $(".annotation-hover #text-input").text(annotations[$(this).text()] == undefined ? "No comment" : 
                                                          annotations[$(this).text()]["comment"] == "" ? "No comment" :
                                                          annotations[$(this).text()]["comment"]);
                  // Now we generate a small inline tag to help us get the right position of the view box
                  //randomID = generateID();
                  //$(this).append("<span id=\"" + randomID + "\"></span>");
                  //var position = $("#" + randomID).position();
                  //var top = position.top + 15;
                  var top = event.clientY - 7;
                  var left = event.clientX - 10;
                  //$("#" + randomID).remove();
                  // Reset lastActivated array to this
                  lastActivatedHighlight = [];
                  lastActivatedHighlight.push(this);
                  // Show the view box
                  $(".annotationview-wrapper").css("top", top).css("left", left).css("display", "block");
         });
         // Hide the annotation viewer
         $(document).on("mouseleave", ".highlighted", function() {
                  $(".annotationview-wrapper").css("display", "none");

         });

         // Switch between different colors to make users feel they are foucusing on the button
         $(document).on("mouseover", "#edit-wrapper", function() {
                  $("#edit-button").css("background", "#000000");
         });

         $(document).on("mouseleave", "#edit-wrapper", function() {
                  $("#edit-button").css("background", "#A1A1A1");
         });

         $(document).on("mouseover", "#delete-wrapper", function() {
                  $("#delete-button1").css("background", "#000000");
                  $("#delete-button2").css("background", "#000000");
         });

         $(document).on("mouseleave", "#delete-wrapper", function() {
                  $("#delete-button1").css("background", "#A1A1A1");
                  $("#delete-button2").css("background", "#A1A1A1");
         });
      }

      function clickEffect() {
         // TODO;
         /* clickable pen code
            $(document).on("click", ".wrapper", function() {
                var position = $(this).position();
                position.top = position.top - ($(".annotation-input").css("height").substring(0,3)) + 18;
                position.left = position.left - Number($(this).css("width").substring(0,2)) / 2;
                $(this).css("display", "none");
                $(".annotation-input").css("display", "block").css("top", position.top).css("left", position.left);      
            });
         */
        
         // Simply make it disappear when click on "Cancel"
         $(document).on("click", ".annotation-cancel", function() {
                $(".annotation-input").css("display", "none");
         });

         // Some issues going on here
         $(document).on("click", ".annotation-save", function() {
          // Be careful about multiple spans in different paragraphs
              var time = annotations[$(lastActivatedHighlight[0]).text()]["time"];
              for(var key in annotations) {
                // ! important here. Need to check own prop rather than inherited prop
                  if(annotations.hasOwnProperty(key)) {
                     var value = annotations[key];
                     if(time == value["time"]) {
                        value["comment"] = $("#annotation-field").val() == "" ? "No Comment" : $("#annotation-field").val();
                     }
                  }
              }
              $("#annotation-field").val("");
              $(".annotation-input").css("display", "none");
         });

         // Edit the annotation
         $(document).on("click", "#edit-wrapper", function() {
                var position = $(".annotationview-wrapper").position();
                position.top = position.top - ($(".annotation-input").css("height").substring(0,3));
                position.left = position.left;
                $(".annotationview-wrapper").css("display", "none");
                $(".annotation-input").css("display", "block").css("top", position.top).css("left", position.left);
                // Reset the comment value
                $("#annotation-field").val(annotations[$(lastActivatedHighlight[0]).text()] == undefined ? "" : 
                                           annotations[$(lastActivatedHighlight[0]).text()]["comment"] == "No Comment" ? "" :
                                           annotations[$(lastActivatedHighlight[0]).text()]["comment"]);
         });

         // Delete the annotation
         $(document).on("click", "#delete-wrapper", function() {
                var time = annotations[$(lastActivatedHighlight[0]).text()]["time"];
                $(".highlighted").each(function() {
                   if(annotations[$(this).text()] !== undefined && annotations[$(this).text()]["time"] == time) {
                      delete annotations[$(this).text()];
                      $(this).contents().unwrap();
                   }
                });
                $(".annotationview-wrapper").css("display", "none");
                $(".wrapper").css("display", "none");
         });
      }
      return {
        init: function() {
              setUp();
              textHighlight();
              hoverEffect();
              clickEffect();
        }
      }
})(jQuery, window, document);

$(function() {
    AnnotationTool.init();
});