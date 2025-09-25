const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeList = document.querySelector('.recipe-container');
const recipeInfo = document.querySelector('.recipe-info');
const CloseBtn = document.querySelector('.recipe-closeBtn');

async function fetchRecipes(query) {
    try {
        if (!query) {
            recipeList.innerHTML = '<h2>Please enter a search term</h2>';
            return;
        }

        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${(query)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (!data.meals) {
            recipeList.innerHTML = '<h2>No recipes found. Please try a different search term.</h2>';
            return;
        } else {
            recipeList.innerHTML = '';
        }

        data.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p><strong>Cuisine:</strong> ${meal.strArea}</p>
                <p><strong>Category:</strong> ${meal.strCategory}</p>
            `;

            const button = document.createElement('button');
            button.textContent = 'View Recipe';
            button.addEventListener('click', () => {
                openRecipePopup(meal);
            });

            recipeDiv.appendChild(button);
            recipeList.appendChild(recipeDiv);
        });

    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

function openRecipePopup(meal) {
    recipeInfo.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>Ingredients:</h3>
        <ul>
            ${getIngredientsList(meal).map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
        ${meal.strYoutube ? `<h3>Video Tutorial:</h3><a href="${meal.strYoutube}" target="_blank">Watch on YouTube <span>▶</span></a>` : ''}
    `;
    document.querySelector('.recipe-details').style.display = 'flex';
}

function getIngredientsList(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient) {
            ingredients.push(`${measure} ${ingredient}`);
        } else {
            break;
        }
    }
    return ingredients;
}

CloseBtn.addEventListener('click', () => {
    document.querySelector('.recipe-details').style.display = 'none';
});

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const query = searchBox.value.trim();
    fetchRecipes(query);
});