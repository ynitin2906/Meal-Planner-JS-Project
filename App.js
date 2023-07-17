const card = document.getElementById("meal");
const recipe = document.getElementById("recipeSection");
const btn = document.getElementById("generate");
const caloriesClass = document.getElementsByClassName("calories");
const breakfastTime = document.getElementById("breakfast-time");
const LunchTime = document.getElementById("lunch-time");
const DinnerTime = document.getElementById("dinner-time");

let calorie, breakfastId, lunchId, dinnerId;

btn.addEventListener("click", calorieCal);

function calorieCal(e) {
  e.preventDefault();
  let bmr;
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  const age = document.getElementById("age").value;
  const activity = document.getElementById("activity").value;
  const gender = document.getElementById("gender").value;

  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((errorMsg) => (errorMsg.textContent = ""));

  // Validations
  let isValid = true;
  if (isNaN(height) || height <= 30 || height >= 280) {
    document.getElementById("height-error").textContent =
      "Height should be between 30 cm and 280 cm.";
    isValid = false;
  }

  if (isNaN(weight) || weight <= 0 || weight >= 500) {
    document.getElementById("weight-error").textContent =
      "Weight should be between 0 kg and 500 kg.";
    isValid = false;
  }

  if (isNaN(age) || age <= 0 || age >= 100) {
    document.getElementById("age-error").textContent =
      "Age should be between 1 and 99.";
    isValid = false;
  }

  if (!gender || !activity) {
    document.getElementById("gender-error").textContent =
      "Please select both gender and activity level.";
    isValid = false;
  }
  if (gender === "gender") {
    document.getElementById("gender-error").textContent =
      "Please select a gender.";
    isValid = false;
  }

  if (activity === "levels") {
    document.getElementById("activity-error").textContent =
      "Please select an activity level.";
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  if (height != "" || weight != "" || age != "") {
    if (gender === "male") {
      bmr = 66.47 + 13.75 * weight + 5.003 * height - 6.755 * age;
    } else if (gender === "female") {
      bmr = 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
    } else {
      return;
    }

    if (activity === "light") {
      calorie = bmr * 1.375;
    } else if (activity === "moderate") {
      calorie = bmr * 1.55;
    } else if (activity === "active") {
      calorie = bmr * 1.725;
    } else if (activity === "extreme") {
      calorie = bmr * 1.95;
    } else {
      return;
    }
    console.log(bmr, calorie);

    document.getElementById("recipeSection").style.display = "none";
    //function to fetch meal data for cards
    getMealData(calorie);

    setTimeout(() => {
      card.style.display = "block";
    }, 1000);
  }
}

function getMealData(calorie) {
  fetch(
    `https://api.spoonacular.com/mealplanner/generate?apiKey=c10e4445795a4bbbb0d1e26a454b8ce3&timeFrame=day&targetCalories=${calorie}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setMealData(data);
      caloriesClass[0].textContent = data.nutrients.calories;
      caloriesClass[1].textContent = data.nutrients.calories;
      caloriesClass[2].textContent = data.nutrients.calories;
    })
    .catch((error) => {
      console.log(error);
    });
  currentRecipe = "";
}
//-------------------FUNCTION SETTING MEAL DATA IN ALL THREE CARDS--------------------
function setMealData(data) {
  setBreakfastData(data.meals[0]);
  setLunchData(data.meals[1]);
  setDinnerData(data.meals[2]);
}

function setBreakfastData(data) {
  breakfastId = data.id;
  document.getElementById("breakfast-name").innerHTML = data.title;
  const img = document.getElementById("breakfast-image");
  img.src =
    "https://spoonacular.com/recipeImages/" +
    breakfastId +
    "-556x370." +
    data.imageType;
  // img.src = `${data.sourceUrl}`;
  breakfastTime.textContent = data.readyInMinutes;
}

function setLunchData(data) {
  lunchId = data.id;
  document.getElementById("lunch-name").innerHTML = data.title;
  const img = document.getElementById("lunch-image");
  img.src =
    "https://spoonacular.com/recipeImages/" +
    lunchId +
    "-556x370." +
    data.imageType;
  // img.src = `${data.sourceUrl}`;
  LunchTime.textContent = data.readyInMinutes;
}

function setDinnerData(data) {
  dinnerId = data.id;
  document.getElementById("dinner-name").innerHTML = data.title;
  const img = document.getElementById("dinner-image");
  img.src =
    "https://spoonacular.com/recipeImages/" +
    dinnerId +
    "-556x370." +
    data.imageType;
  // img.src = `${data.sourceUrl}`;
  DinnerTime.textContent = data.readyInMinutes;
}
let currentRecipe = "";
const BREAKFAST = "breakfast";
const LUNCH = "lunch";
const DINNER = "dinner";

//-------------------ONCLICK FOR GET RECIPE OF BREAKFAST-------------------
function breakFastRecipe() {
  //clear previous data
  if (currentRecipe != BREAKFAST) {
    currentRecipe = BREAKFAST;
    const ingredientsList = document.getElementById("ingredients-list");
    const stepsList = document.getElementById("steps-list");
    const equipmentList = document.getElementById("equipment-list");
    ingredientsList.textContent = "";
    stepsList.textContent = "";
    equipmentList.textContent = "";
    dataFetch(breakfastId);
    recipe.style.display = "block";
    document.getElementById("ingredients").style.display = "block";
    document.getElementById("steps").style.display = "none";
    document.getElementById("equipment").style.display = "none";
  }
}

//-------------------ONCLICK FOR GET RECIPE OF LUNCH-------------------
function lunchRecipe() {
  if (currentRecipe != LUNCH) {
    currentRecipe = LUNCH;
    const ingredientsList = document.getElementById("ingredients-list");
    const stepsList = document.getElementById("steps-list");
    const equipmentList = document.getElementById("equipment-list");
    ingredientsList.textContent = "";
    stepsList.textContent = "";
    equipmentList.textContent = "";
    dataFetch(lunchId);
    recipe.style.display = "block";
    document.getElementById("ingredients").style.display = "block";
    document.getElementById("steps").style.display = "none";
    document.getElementById("equipment").style.display = "none";
  }
}

//-------------------ONCLICK FOR GET RECIPE OF DINNER-------------------
function dinnerRecipe() {
  if (currentRecipe != DINNER) {
    currentRecipe = DINNER;
    const ingredientsList = document.getElementById("ingredients-list");
    const stepsList = document.getElementById("steps-list");
    const equipmentList = document.getElementById("equipment-list");
    ingredientsList.textContent = "";
    stepsList.textContent = "";
    equipmentList.textContent = "";
    dataFetch(dinnerId);
    recipe.style.display = "block";
    document.getElementById("ingredients").style.display = "block";
    document.getElementById("steps").style.display = "none";
    document.getElementById("equipment").style.display = "none";
  }
}

async function dataFetch(idOfMeal) {
  //-------------------FETCH FOR INGREDIENTS-------------------
  const response = await fetch(
    `https://api.spoonacular.com/recipes/${idOfMeal}/ingredientWidget.json?apiKey=c10e4445795a4bbbb0d1e26a454b8ce3`
  );
  const data = await response.json();
  console.log(data);
  const ingredientsList = document.getElementById("ingredients-list");
  const ingredientArray = data.ingredients;
  for (let i = 0; i < ingredientArray.length; i++) {
    let li = document.createElement("li");
    ingredientsList.appendChild(li);
    li.appendChild(document.createTextNode(`${ingredientArray[i].name}`));
  }

  //-------------------FETCH FOR STEPS-------------------
  const response2 = await fetch(
    `https://api.spoonacular.com/recipes/${idOfMeal}/analyzedInstructions?apiKey=c10e4445795a4bbbb0d1e26a454b8ce3`
  );
  const data2 = await response2.json();
  console.log(data2);
  const stepList = document.getElementById("steps-list");
  const stepsArray = data2[0].steps;
  for (let i = 0; i < stepsArray.length; i++) {
    let li = document.createElement("li");
    stepList.appendChild(li);
    li.appendChild(document.createTextNode(`${stepsArray[i].step}`));
  }

  //-------------------FETCH FOR EQUIPMENT-------------------
  const response3 = await fetch(
    `https://api.spoonacular.com/recipes/${idOfMeal}/equipmentWidget.json?apiKey=c10e4445795a4bbbb0d1e26a454b8ce3`
  );
  const data3 = await response3.json();
  console.log(data3);
  const equipmentList = document.getElementById("equipment-list");
  const equipmentArray = data3.equipment;
  for (let i = 0; i < equipmentArray.length; i++) {
    let li = document.createElement("li");
    equipmentList.appendChild(li);
    li.appendChild(document.createTextNode(`${equipmentArray[i].name}`));
  }
}

//-------------------RECIPE TAB TOGGLE-------------------
function openContent(evt, contentName) {
  // Declare all variables
  let i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(contentName).style.display = "block";
  evt.currentTarget.className += " active";
}
