const serachBox =document.querySelector(".searchBox");
const serachBtn =document.querySelector(".searchBtn");
const recipeContainer =document.querySelector(".recipe-container");
const recipeDetailsContent =document.querySelector(".recipe-details-content");
const closebtn =document.querySelector(".recipe-close-btn");
const fetchrecipe=async (query)=>{
    recipeContainer.innerHTML="<h2>Fetching Recipe's ...</h2>";
    try {
        
  
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const res=await data.json();
    recipeContainer.innerHTML="";
    res.meals.forEach(meal => {
        const recipeDiv=document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `
        const button=document.createElement('button');
        button.textContent="View Recipe";
        recipeDiv.appendChild(button);
        button.addEventListener('click',()=>{
                recpopup(meal);
        });
        recipeContainer.appendChild(recipeDiv);
    });
    } 
    catch (error) {
        recipeContainer.innerHTML="<h2>No Recipe Found... </h2>"
    }
}

const recpopup=(meal)=>{
    recipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents:</h3><br>
    <ul class="IngredientList">${fecthIngredients(meal)}</ul>
    <div class="recipeinstructions">
        <h3>Instructions: </h3>
        <p >${meal.strInstructions}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display="block";
}
const fecthIngredients=(meal)=>{
    let inglist="";
    for(let i=1;i<=20;i++){
        const ingc=meal[`strIngredient${i}`];
    
    if(ingc){
        const measure=meal[`strMeasure${i}`];
        inglist +=`<li>${measure} ${ingc}</li>`
    }else{
        break;
    }
    }
    return inglist;
}
closebtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display="none";
})
serachBtn.addEventListener('click', (evt)=>{
    evt.preventDefault();
    const searchinput=serachBox.value.trim();
    fetchrecipe(searchinput);
});
