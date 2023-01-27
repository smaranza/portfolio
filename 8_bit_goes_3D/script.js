

$(document).ready(function() {


    // var projects = [bash, viola, hjwg, trenta, fraw, bitz, thumb, codepen];


    	console.log("hello world");
      console.log("100vw: "+ $(window).width());

      $(window).scrollTop(0);
      // random int per K

      // var randomInt;

      // function getRandomInt(min, max) {
      //   min = Math.ceil(min);
      //   max = Math.floor(max);
      //   randomInt = Math.floor(Math.random() * (max - min)) + min;
      //   return randomInt;
      // };

    // $(".mini p").each( function() {
    //    $(this).css({
    //     left: $(this).parent().width() +10
    //   })
    // })


    $(".tag, .link").click(function() {
      window.location = $(this).find("a").attr("href"); 
      return false;
    });
 
    $(".first").width($(".head").width());
    // $(".banner").width($(".forSticky").width()-2);
    
 

// LOOK AT ME - BOX PERSPECTIVE

    var lFollowX = 0;
    var lFollowY = 0;
    var x = 0;
    var y = 0;
    var friction = 1/60;


    function lookAtMe() {

      if ($(window).width() > 800) {


        $(".container.mini").css({
          "transform": "rotateY(" + x + "deg) rotateX(" + -y + "deg)"
         });

          x += (lFollowX - x) * friction/50;
          y += (lFollowY - y) * friction/50;



        $(".container.plus").css({
          "transform": "  translateZ(-5em) rotateY(" + x + "deg) rotateX(" + -y + "deg)"
         });

          x += (lFollowX - x) * friction;
          y += (lFollowY - y) * friction;



      }

      window.requestAnimationFrame(lookAtMe);
      
    };

// MOUSE POSITION

    $(window).on("mousemove", function(e) {  

      var lMouseX = Math.max( -100, Math.min(100, $(window).width() / 2 - e.clientX));
      var lMouseY = Math.max( -100, Math.min(100, $(window).height() / 2 - e.clientY));

      lFollowX = 15 * lMouseX / 100; // 100 : 12 = lMouxeX : lFollow
      lFollowY = 12 * lMouseY / 100;

    });

// HOVER ME
   
      function hoverMe() {


           $(".detect ").hover( function() {

            $(".BG").toggleClass("perspective");
            $(this).parent().toggleClass("hover");
            $(this).parent().find(".gif h2").toggleClass("evidence");


            // $(this).siblings("p").stop().fadeToggle("slow");
            // $(this).siblings("p").css({
            
            //     // left: $(this).width() + 15,
            //     top: $(this).height() + 10

            // });
          });
      }

// LOOPING ROLE

  let nowRole;
  const role = $(".role");
  const jobs = [ "2D Animator","book designer", "front-end developer","graphic designer",  "creative director", "illustrator", "3D sculptor",  "product designer"];

  loopJobs(0) 

  function loopJobs(i) {

    if (jobs.length > i) {

      setTimeout(function() {

        role.text(jobs[i]);
        
        loopJobs(++i);
        // console.log(jobs[i]);

        if (jobs[i-1][0] ==  "i" ) {
        
          // console.log("vocale"); 
          $("#n").css({visibility:"visible"});
          $("#n").show();
        
        } else {
          
          $("#n").css({visibility:"hidden"});
          $("#n").hide();
        }

            }, 1200);


        } else if (jobs.length == i) { 

            loopJobs(0);
        }

    }

// ABOUT

        $("#who").hover(function() {
          $(this).text("Who am I ?");
        }, function() {
          $(this).text("Who I am");

        })

        $(".mail").hover(function() {

          $(".big.mail .postcard").toggleClass("send");

        })
          
// scroll inutile


          // var violaP = $(".viola").offset().top;

          // $(window).scroll( function() {

          //   var loScrollo =  -$(window).scrollTop();
          //   loScrollo -= $(window).scrollTop();

          //   $("#item .cube").each(function() {

          //     $(this).offset({
          //     top: $(this).offset().top + loScrollo
          //       })

          //   })
          //   console.log($("#item .cube").offset().top)
            
          // })

          var scrollable = $(window).height();
          // var mapped;
          // var output_start = -200;
          // var output_end = scrollable + 500;
          // var input_start = 0;
          // var input_end = scrollable;
          // var input = $(window).scrollTop();

          // var mapped_scale;
          // const map = (num, in_min, in_max, out_min, out_max) => {
          
          //   mapped_scale = (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
          //   return mapped_scale;
          
          // }

          // console.log("map: " + map(input, input_start, scrollable, output_start, output_end));



          // $(window).scroll(function() {

          //       mapped = output_start + ((output_end - output_start) / (input_end)) * ($(window).scrollTop());

          //       // console.log("mapped: " + mapped);

          //        $(".container  .cube").each(function() {

          //             var initialO = ($(this).offset().top);
          //             var initialP = ($(this).position().top);
          //             var heightP = $(this).height();
            
          //             $("#works").css(
          //                 "transform", "translateZ(" + mapped/20 + "%) !important"
          //             )
          //         })

          //   var old_scroll = 0;
          //   var act_scroll = $(window).scrollTop();
            

          //   if (old_scroll < act_scroll) {
          //     console.log("UP: "+ $(window).scrollTop());
          //   } else if (old_scroll > act_scroll) {
          //     console.log("DOWN");
          //   }

          //   old_scroll= act_scroll;

          //   console.log("o_s: " + old_scroll);


          // })

// TILE 

  var colors = ["red", "yellow", "blue", "green", "orange", "pink"];
  var gif = ["avatar/alphatest.gif"];
  var tiles = document.getElementsByClassName('tile');

  // console.log(tiles);
    
    for (var i = tiles.length - 1; i >= 0; i--) {

        $(tiles[i]).css("background-color", colors[i]);
        $(tiles[i]).children().attr("src", "style/img/gif/"+ gif[i])



           console.log(colors[i]);
      }

// CALL

    if ($(window).width() > 800) {
          hoverMe();
          lookAtMe();
    }
  


    $(".banner").hide();
    // $("#noise").show();


    $("#projects li>div:not(.static)").hover(function() {
     
    });

    $("#projects li>div:not(.static)").hover(function() {
      for (var i = $('.banner video').prop('muted',true).length - 1; i >= 0; i--) {
          $('video').prop('muted',true)[i].pause();
        };
      $(this).find("video").prop("muted",true)[0].play();
       $("#projects li div").find(".banner").hide();
      $(this).find(".banner").show();
    });




    $("li:not(.static)").hover(function() {
      $("li h2").removeClass("selected");
      $(window).scrollTop(0);
      $("h2", this).addClass("selected");
    })

});
