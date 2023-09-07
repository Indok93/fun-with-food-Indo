// serch mode to determine serch button clicked
let searchMode = "none";

// dom elements for function --------------------------------------------------------

const myResultElement = document.getElementById("myResult");

const myfirstLetterInput = document.getElementById("firstLetterInput");
const myfirstLetterSearchButton = document.getElementById("firstLetterSearch");

myfirstLetterSearchButton.addEventListener("click", () => {
  searchMode = "firstLetterSearch";
  // console.info(myfirstLetterInput.value);
  getRecipiesByLetter(myfirstLetterInput.value)
});

const myNameInput = document.getElementById("nameInput");
const myNameSearchButton = document.getElementById("nameSearch");

myNameSearchButton.addEventListener("click", () => {
  searchMode = "nameSearch";
  // console.info(myNameInput.value);
  getRecipiesByName(myNameInput.value);
});

const myIdInput = document.getElementById("idInput");
const myIdSearchButton = document.getElementById("idSearch");

myIdSearchButton.addEventListener("click", () => {
  searchMode = "idSearch";
  // console.info(myIdInput.value);
  getRecipiesById(myIdInput.value);
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

    myReasultView(data);
     
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

    myReasultView(data);
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
    
    myReasultView(data);
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

      myData.meals.map((myMeal) => {
        let myMealName = 
        `<h2>${myMeal.strMeal}</h2>
        <img src="${myMeal.strMealThumb}" alt="meal">`;
 
        myResultElement.innerHTML += myMealName;
      });
      break;

    case 'nameSearch':
      // console.log(myData);

      myData.meals.map((myMeal) => {
        let myMealName = 
        `<h2>${myMeal.strMeal}</h2>
        <img src="${myMeal.strMealThumb}" alt="meal">`;
  
        myResultElement.innerHTML += myMealName;
      });
      break;

    case 'idSearch':
      // console.log(myData);


      myData.meals.map((myMeal) => {
        // udvidelse: jeg vil indsætte alle ikke-tomme dataobj i arrayet med for loop
        const ingredients = [];
        const measures = [];

        for (let i = 1; i <= 20; i++) {
          // console.log(index);
          const ingredient = myMeal[`strIngredient${i}`];
          const measurement = myMeal[`strMeasure${i}`]

          if (ingredient !== "" && ingredient !== "") {
            ingredients.push(ingredient);
          }

          if (measurement !== " " && measurement !== ""){
            measures.push(measurement);
          }
        }

        let myMealName = 
        `<h2>${myMeal.strMeal}</h2>
        <img src="${myMeal.strMealThumb}" alt="meal">
        <ul>
          <li>Ingredienser</li>
          ${ingredients.map((x) => `<li>${x}</li>`).join('')}
          ${measures.map((x) => `<li>${x}</li>`).join('')}
        </ul>
        <h3>Opskrift:</h3>
        <p>${myMeal.strInstructions}</p>`;
        
        myResultElement.innerHTML += myMealName;
      });
      break;

    default:
      console.warn("ooops no data to show from setupResultView");
      break;
  }
}