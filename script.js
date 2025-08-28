
const SearchBtn = document.querySelector('.searchbtn');
const SearchBox = document.querySelector('.searchBox');
const recipeContainer = document.querySelector('.recipe-Container');
const recipeDetailsContent=document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


// function to get recipe

const fetchRecipe = async(query) =>{
    recipeContainer.innerHTML ="<h2>Fetching Recipes....</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
const response = await data.json();

recipeContainer.innerHTML ="";
response.meals.forEach(meal => {
    const recipeDiv =document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML =`
     <img src = " ${meal.strMealThumb}"
     <h3>${meal.strMeal}</h3>
     <p><span>${meal.strArea}</span>Dish</p>
     <p><span>Belongs to ${meal.strCategory}</span>Cateogry</p>
     `
     // button
 const button = document.createElement('button');
      button.textContent = "View Recipe";
      recipeDiv.appendChild(button);

      // popup Add  event listener button 
    button.addEventListener('click',()=>{
      openRecipePopup(meal);
    });
     recipeContainer.appendChild(recipeDiv);
});
// console.log(response.meals[0]);
}
// function to fetch ingredients meals 



const fetchIngredients = (meal)=>{
    let ingredientsList = "";
    for(let i=1;i<=20;i++){
        const ingredient= meal[`strIngredient${i}`];
       if(ingredient){
        const measure = meal[`strMeasure${i}`];
        ingredientsList += `<li>${measure} ${ingredient}`
       }
       else{
        break;
       }
       return ingredientsList;
    }
}
const openRecipePopup = (meal)=>{
 recipeDetailsContent.innerHTML=`
 <h2 class="recipeName">${meal.strMeal}
 <h3>ingredients :</h3>
 <ul class="ingredientList"> ${fetchIngredients(meal)}</ul>
 <div>
    <h3>Instructions :</h3>
    <p class ="recipeIinstructions">${meal.strInstructions}</p>
    </div>
 `
 recipeDetailsContent.parentElement.style.display="block";
}
SearchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput = SearchBox.value.trim();
    fetchRecipe(searchInput);
 console.log("button click");
 
});
recipeCloseBtn.addEventListener('click',(e)=>{
recipeDetailsContent.parentElement.style.display="none";

});