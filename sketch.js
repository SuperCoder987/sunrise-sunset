const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backgroundImg;
var hour;

var bg = {
    sunrise: undefined,
    sunset: undefined
};
var currentBg = 0;

function preload() {
    bg.sunset = loadImage('sunset.png')
    bg.sunrise = loadImage('sunrise.png')
    getBackgroundImg();
}

function setup(){
    createCanvas(1200,700);
    engine = Engine.create();
    world = engine.world;

}

function draw(){
    background(currentBg);

    Engine.update(engine);

    fill("black");
    textSize(30);
    
    if(hour>=12){
        text("Time : "+ hour%12 + " PM", 50,100);
    }else if(hour==0){
        text("Time : 12 AM",100,100);
    }else{
        text("Time : "+ hour%12 + " AM", 50,100);
    }

}

async function getBackgroundImg(){

    // write code to fetch time from API
 
    //change the data in JSON format and store it in variable responseJSON
    
    const json = await (await fetch('https://worldtimeapi.org/api/timezone/Australia/Melbourne')).json();

    const datetime = json.datetime;
    
    hour = new Date(datetime).getHours();
    
    if(hour>=0 && hour<18 ){
        currentBg = bg.sunrise
    }
    else{
        currentBg = bg.sunset;
    }
}
