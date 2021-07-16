var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed,lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  


 
}

function draw() {
  background(46,139,87);
  foodObj.display();

 // write code to fetch time from API
 var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");

 //change the data in JSON format
 var responseJSON = await response.json();
 var datetime = responseJSON.datetime;
 

 

  //write code to read fedtime value from the database 
  lastFed = datetime.slice(11,13);
 
  //write code to display text lastFed time here
  if(lastFed >= 12){
    text("Last feed : 9 PM ",350,30)
  }else if(lastFed == 0){
    text("Last feed : 12 AM",350,30)
  }else {
    text("Last feed : 3 PM",350,30)
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
var food_stock_val = foodObj.getFoodStock();
if(food_stock_val<=0){
  foodObj.updateFoodStock(food_stock_val *0);
}else{
  foodObj.updateFoodStoke(food_stock_val -1);
}



}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
