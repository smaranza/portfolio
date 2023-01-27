var ray, xRay, yRay, winWidth, winHeight;
var movLeft, movTop, startX, startY, newX, newY;
var TmovLeft, TmovTop, TstartX, TstartY, TnewX, TnewY;
var bool = true;
var id;
var generation;
var sameChapter;
var movBackW;

function Dial(key, chapter, outputH, outputG) {
  this.key = key;
  this.chapter = chapter;
  this.outputH = outputH;
  this.outputG = outputG;
}

var terrore = new Dial("terrore", 1, "nientepaura", ["cosa", "chi"]);
var entusiasmo = new Dial("entusiasmo", 1, "sonice", ["curioso"]);
var sospetto = new Dial("sospetto", 1, "nientepaura", ["cosa", "chi"]);
var chi = new Dial("chi", 2, "io", ["piacere"]);
var cosa = new Dial("cosa", 2, "casa", ["piacere"]);
var curioso = new Dial("curioso", 2, "offerta", ["accettazione", "rifiuto"]);
var piacere = new Dial("piacere", 3, "offerta", ["accettazione", "rifiuto"]);
var accettazione = new Dial("accettazione", 4, "bevi", [
  "the",
  "succo",
  "caffe"
]);
var rifiuto = new Dial("rifiuto", 4, "biscotto", ["puzza"]);
var puzza = new Dial("puzza", 5, "brucia", ["relax", "mentre"]);
var the = new Dial("the", 5, "subito", ["relax", "mentre"]);
var succo = new Dial("succo", 5, "subito", ["relax", "mentre"]);
var caffe = new Dial("caffe", 5, "subito", ["relax", "mentre"]);
var mentre = new Dial("mentre");
var relax = new Dial("relax", 6);
mentre.outputG = relax;

var penholder = new Dial("penholder", 8);
var fracture = new Dial("fracture", 8);
var frankie = new Dial("frankie", 8);
var gufi = new Dial("gufi", 8);
var cucina = new Dial("cucina", 8);
var viola = new Dial("viola", 2);
var bitter = new Dial("bitter", 2);

var guests = [
  terrore,
  entusiasmo,
  sospetto,
  chi,
  cosa,
  curioso,
  piacere,
  accettazione,
  rifiuto,
  puzza,
  the,
  succo,
  caffe,
  penholder,
  frankie,
  fracture,
  gufi,
  cucina,
  viola,
  bitter
];

var newId;

var bool2 = true;

var gamma = 40;

TstartX = 0;
TstartY = 0;

function pitagora(sideA, sideB) {
  ray = Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
  // console.log(ray);
}

// MOVING DIV function - OK!

function moveTr() {
  TnewX = TstartX - xRay / gamma;
  TnewY = TstartY - yRay / gamma;

  if (
    Math.abs(TnewX) < movW.substr(0, movW.length - 2) / 2 &&
    Math.abs(TnewY) < movH.substr(0, movH.length - 2) / 2
  ) {
    $("#alert").fadeOut();
    $("#big-container, #center").removeClass("pulse");

    if (ray > winHeight / 100 * 35) {
      $("#movable-background").css(
        "transform",
        "translate(" + TnewX + "px, " + TnewY + "px) "
      );

      TstartX = TnewX;
      TstartY = TnewY;
    }
  } else {
    console.log("stop here!");

    $("#alert").fadeIn();
    $("#big-container").addClass("pulse");
  }

  xRay = event.pageX - winWidth / 2;
  yRay = event.clientY - winHeight / 2;
}

// STORY DRIVER function - OK!

function stepForward(who) {
  console.log("beforif: " + bool2);

  if (bool2 == true) {
    $(".welcome").removeClass("redding");
  } else {
    console.log("else:" + newId.outputH);
    $("." + newId.outputH).removeClass("redding");
  }

  console.log("afterof: " + bool2);

  $(who).css({
    color: "black",
    "border-color": "black",
    "box-shadow": "none"
  });
  $(who).removeClass("trillo");

  id = $(who).attr("id");
  console.log(id);
  console.log(id + " img");

  $("#" + id + " img").css("width", "0px");

  // flip el

  if (id == "terrore" || id == "sospetto") {
    flip();
  }

  for (var i = 0; i < guests.length; i++) {
    if (guests[i].key == id) {
      console.log("trovato!");
      newId = guests[i];

      // showing new branches

      function poi() {
        setTimeout(function() {
          for (var i = 0; i < newId.outputG.length; i++) {
            // scala("#"+newId.outputG[i]);
            $("#" + newId.outputG[i]).fadeIn(500);
            $("#" + newId.outputG[i]).css("opacity", "100");
          }
        }, 1200);
      }

      console.log("newIdoutputH: " + newId.outputH);
      $("#" + newId.outputH).fadeIn(
        { start: scala("#" + newId.outputH), done: poi() },
        500
      );

      // filtering same chapter

      generation = guests.filter(item => item.chapter == newId.chapter);
      // console.log(generation);

      //  hiding same chapter branches

      $("." + newId.outputH).addClass("redding");

      for (var i = 0; i < generation.length; i++) {
        if (generation[i].key != newId.key) {
          // console.log(generation[i].key);
          sameChapter = "#" + generation[i].key;

          // $(sameChapter).css({
          // 	// "visibility": "hidden",
          // 	"opacity": "0%"
          // });
          $(sameChapter).fadeOut(800);
          $(sameChapter).removeClass("trillo");
        }
      }

      return true;
    }
  }
}

// FLIP function - OK!
function flip() {
  console.log("movback: " + $("#movable-background").css("width"));
  movBackW = movW.substr(0, $("#movable-background").css("width").length - 2);
  console.log(movBackW);

  $(".flip").each(function() {
    var flipLeft = $(this).css("left");

    console.log("flip before! " + flipLeft);

    if (flipLeft.includes("px")) {
      $(this).css(
        "left",
        movBackW - flipLeft.substr(0, flipLeft.length - 2) + "px"
      );
    } else if (flipLeft.includes("%")) {
      $(this).css("left", 100 - flipLeft.substr(0, flipLeft.length - 1) + "%");
    }

    $("#offerta").css("top", "67.3%");
    // $("#casa").css("top","74%");
    $("#accettazione").css("top", "59%");
    $("#bevi").css("top", "45%");
    $("#caffe").css("top", "42%");
    $("#succo").css("top", "30%");
    $("#the").css("top", "36%");
    $("#subito").css({
      top: "33.8%",
      left: "2.6%"
    });

    console.log("flip after! " + $(this).css("left"));
  });
}

function scala(who) {
  $(who).toggleClass("poppi");
}

$(document).ready(function() {
  winWidth = $(window).innerWidth();
  winHeight = $(window).innerHeight();

  movW = $("#movable-background").css("width");
  movH = $("#movable-background").css("height");

  // console.log(winWidth);
  // console.log(movW.substr(0, movW.length-2));
  // console.log(movW.substr(0, movW.length-2)/2);

  $("#center").append(
    "Tips: <br> <br> NAVIGATE through the map just by moving the pointer. <br> DOUBLE CLICK on the backgound to stop the movement. <br>EXPLORE."
  );

  $("#welcome").fadeIn({ start: scala("#welcome") });

  setTimeout(function() {
    $("#center").fadeIn();
  }, 500);

  setTimeout(function() {
    $("#terrore").fadeIn();
    $("#entusiasmo").fadeIn();
    $("#sospetto").fadeIn();
	 $("#welcome").toggleClass("redding");
  }, 2000);

	 setTimeout(function() {
    $("#center").fadeOut();
  }, 8000);


  // STOP BACKGROUND MOVEMENT - on double click

  $("#big-container").dblclick(function() {
    bool = !bool;
    console.log(bool);
  });

  // BACKGROUND MOVEMENT - on mouse move

  $("#big-container").mousemove(function(event) {


    xRay = event.pageX - winWidth / 2;
    yRay = event.clientY - winHeight / 2;

    // console.log("X: " + xRay);
    // console.log("Y: " + yRay);

    pitagora(xRay, yRay);

    if (bool && winWidth > 768) {
      moveTr();
    } else {
      $(this).css("overflow", "scroll");
    }
  });

  // BRANCH SELECTION - on click

  $(".guest").click(function() {
    //  fixing things

    stepForward(this);
    bool2 = false;
  });

  // greyscale off

  $(".greyscale").hover(function() {
    console.log("colors");
    idG = $(this).attr("id");

    $("#" + idG + " .selectImg").removeClass("selectImg");
    $("#" + idG).removeClass("trillo greyscale");
  });


});
