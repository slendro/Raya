var outputCanvas;
var angles;
var angle1;
var angle2;
var angle3;
var seriously, src, target;

var angle1Ready = false;
var angle2Ready = false;
var angle3Ready = false;

var streamStarted = false;

var sourceWidth = 1280;
var sourceHeight = 720;

var targetWidth = 1280;
var targetHeight = 720;

var sourceID;
var targetID;

function setup(){
    outputCanvas = createCanvas(targetWidth, targetHeight, WEBGL);
    outputCanvas.id('targetoutput');

    angle1 = createVideo(["ftp://192713ftp1@e126393-ftp.services.easyname.eu/html/slend.ro/test/1.mp4"],angle1Load);
    angle2 = createVideo(["ftp://192713ftp1@e126393-ftp.services.easyname.eu/html/slend.ro/test/2.mp4"],angle2Load);
    angle3 = createVideo(["ftp://192713ftp1@e126393-ftp.services.easyname.eu/html/slend.ro/test/3.mp4"],angle3Load);

    angles = [angle1, angle2, angle3];

    angle1.id("angle1");
    angle2.id("angle2");
    angle3.id("angle3");

    angle1.class("footage");
    angle2.class("footage");
    angle3.class("footage");

    //Set angle1 as default source
    sourceID = "#angle1";

    //Set div as output target
    targetID = "#targetoutput";
    hideVideos();
}

function draw()
{

}

function loadOutput()
{
    if(angle1Ready && angle2Ready && angle3Ready && !streamStarted)
    {
        playVideos();
        streamStarted = true;
    }

    seriously = new Seriously();
    src = seriously.source(sourceID);
    target = seriously.target('#targetoutput');
    target.source = src;
    seriously.go();
    outputCanvas.parent('main-stream-container');
}

function switchAngles(source_id)
{
    src = seriously.source(source_id);
    target = seriously.target(targetID);
    target.source = src;
}

function playVideos()
{
    for(var i = 0; i < angles.length; i++)
    {
        angles[i].play();
        angles[i].loop();
        angles[i].volume(0);
        angles[i].hide();
        var id = "angle" + (i+1);
        console.log(id);
        document.getElementById(id).setAttribute("controls","controls");
        document.getElementById(id).setAttribute("muted","muted");
        document.getElementById(id).setAttribute("width",sourceWidth);
        document.getElementById(id).setAttribute("height",sourceHeight);
    }
}

function hideVideos()
{
    for(var i = 0; i < angles.length; i++)
    {
        angles[i].hide();
    }
}

function angle1Load()
{
    angle1Ready = true;
}

function angle2Load()
{
    angle2Ready = true;
}

function angle3Load()
{
    angle3Ready = true;
}

function nv()
{
    var nv = seriously.effect("nightvision");
    // nv.amount = slider.value();
    nv.source = src;
    target.source = nv;
}

