// serch mode to determine serch button clicked
let searchMode = "none";

// dom elements for function --------------------------------------------------------

const myResultElement = document.getElementById("myResult");

const myfirstLetterInput = document.getElementById("firstLetterInput");
const myfirstLetterSearchButton = document.getElementById("firstLetterSearch");

myfirstLetterSearchButton.addEventListener("click", () => {
  searchMode = "firstLetterSearch";
  // console.info(myfirstLetterInput.value);
  myReasultView(myfirstLetterInput.value)
});

const myNameInput = document.getElementById("nameInput");
const myNameSearchButton = document.getElementById("nameSearch");

myNameSearchButton.addEventListener("click", () => {
  searchMode = "nameSearch";
  // console.info(myNameInput.value);
  myReasultView(myNameInput.value);
});

const myIdInput = document.getElementById("idInput");
const myIdSearchButton = document.getElementById("idSearch");

myIdSearchButton.addEventListener("click", () => {
  searchMode = "idSearch";
  // console.info(myIdInput.value);
  myReasultView(myIdInput.value);
});

//-------------------------------------------------------------------------------------

// fetch functions --------------------------------------------------------------------
// your code goes here
function getRecipiesByLetter(myFirstLetter) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${myFirstLetter}`)

  .then((response) => {
    return response.json();
  })

  .then((data) => {
    console.log(data.meals);

    data.meals.map((myMeal) => {
      let myMealName = 
      `<h2>${myMeal.strMeal}</h2>
      <img src="${myMeal.strMealThumb}" alt="meal">`;

      myResultElement.innerHTML += myMealName;
    });
  })

  .catch((error) => {
    console.error(error);
  })
}

function getRecipiesByName(myFirstName) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${myFirstName}`)

  .then((response) => {
    return response.json();
  })

  .then((data) => {
    console.log(data.meals);

    data.meals.map((myMeal) => {
      let myMealName = 
      `<h2>${myMeal.strMeal}</h2>
      <img src="${myMeal.strMealThumb}" alt="meal">`;

      myResultElement.innerHTML += myMealName;
    });
  })

  .catch((error) => {
    console.error(error);
  })
}

function getRecipiesById(myFirstId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${myFirstId}`)

  .then((response) => {
    return response.json();
  })

  .then((data) => {
    console.log(data.meals);
    data.meals.map((myMeal) => {
      let myMealName = 
      `<div>
      <h2>${myMeal.strMeal}</h2>
      <img src="${myMeal.strMealThumb}" alt="meal">
      </div>`;

      myResultElement.innerHTML += myMealName;
    });
  })

  .catch((error) => {
    console.error(error);
  })
}


// view code --------------------------------------------------------------------------
function myReasultView(myData) {
  switch (searchMode) {
    case 'firstLetterSearch':
      // console.log(myData);
      getRecipiesByLetter(myData);
      break;

    case 'nameSearch':
      // console.log(myData);
      getRecipiesByName(myData);
      break;

    case 'idSearch':
      // console.log(myData);
      getRecipiesById(myData);
      break;

    default:
      console.warn("ooops no data to show from setupResultView");
      break;
  }
}

