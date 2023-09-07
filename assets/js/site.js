// serch mode to determine serch button clicked
let searchMode = "none";

// dom elements for function --------------------------------------------------------

const myResultElement = document.getElementById("myResult");

const myfirstLetterInput = document.getElementById("firstLetterInput");
const myfirstLetterSearchButton = document.getElementById("firstLetterSearch");

myfirstLetterSearchButton.addEventListener("click", () => {
  searchMode = "firstLetterSearch";
  // console.info(myfirstLetterInput.value);
  myReasultView()
});

const myNameInput = document.getElementById("nameInput");
const myNameSearchButton = document.getElementById("nameSearch");

myNameSearchButton.addEventListener("click", () => {
  searchMode = "nameSearch";
  // console.info(myNameInput.value);
  myReasultView();
});

const myIdInput = document.getElementById("idInput");
const myIdSearchButton = document.getElementById("idSearch");

myIdSearchButton.addEventListener("click", () => {
  searchMode = "idSearch";
  // console.info(myIdInput.value);
  myReasultView();
});

//-------------------------------------------------------------------------------------

// fetch functions --------------------------------------------------------------------
// your code goes here
function myReasultView(myData) {
  switch (searchMode) {
    case 'firstLetterSearch':
      console.log(myData);
      getRecipiesByLetter(myfirstLetterInput.value);
      break;

    case 'nameSearch':
      console.log(myData);
      getRecipiesByName(myNameInput.value);
      break;

    case 'idSearch':
      console.log(myData);
      getRecipiesById(myIdInput.value);
      break;

    default:
      console.warn("ooops no data to show from setupResultView");
      break;
  }
}



function getRecipiesByLetter(myFirstLetter) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${myFirstLetter}`)

  .then((response) => {
    return response.json();
  })

  .then((data) => {
    console.log(data.meals);

    let myTextHTML = "";

      data.meals.map((myMeal) => {
        myTextHTML += myMeal.strMeal + ", ";
      });

      myResultElement.textContent = myTextHTML;
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

    let myTextHTML = "";

      data.meals.map((myMeal) => {
        myTextHTML += myMeal.strMeal + ", ";
      });

      myResultElement.textContent = myTextHTML;

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

    let myTextHTML = "";

      data.meals.map((myMeal) => {
        myTextHTML += myMeal.strMeal + ", ";
      });

      myResultElement.textContent = myTextHTML;

  })

  .catch((error) => {
    console.error(error);
  })
}






// view code --------------------------------------------------------------------------

function setupResultView(myData) {
  switch (searchMode) {
    case "firstLetterSearch":
      console.log(myData);
      // do view stuff with the data here
      break;

    case "nameSearch":
      console.log(myData.meals);
      let myText = "";

      myData.meals.map((myMeal) => {
        myText += myMeal.strMeal + ", ";
      });

      myResultElement.textContent = myText;
      break;

    case "idSearch":
      console.log(myData);
      // do view stuff with the data here
      break;

    case "errorMessage":
      console.log(myData);
      // do view stuff with the error msg here
      break;

    default:
      console.warn("ooops no data to show from setupResultView");
      break;
  }
}
