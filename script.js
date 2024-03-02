
function hidePopDiv() {
    document.getElementById("popdiv").style.visibility = "hidden";
    document.getElementById("overlay").style.visibility = "hidden";
}

function handleInput(event) {
    let searchInput = event.target.value;
    if (searchInput.trim().length === 0) {
        searchInput = "cake";
    }
    searchRecipes(searchInput);
}
async function searchRecipes(event) {
    event.preventDefault();
    let searchInput = document.getElementById("searchInput").value;

    if (searchInput.trim().length === 0) {
        searchInput = "cake";
    }

    const url = `https://food-recipes-with-images.p.rapidapi.com/?q=${searchInput}&limit=9`;
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "6c50e91cd8msh9b3bb0dea50c652p1265b2jsn2432b0e5a22e",
            "X-RapidAPI-Host": "food-recipes-with-images.p.rapidapi.com",
        },
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();

        let recipeCards = "";

        data.d.forEach((d) => {
            recipeCards += `
          <div class="col-md-4 rounded">
            <div class="card cardstyle">
              <h5 class="card-title text-center">${d.Title}</h5>
              <img src="${d.Image}" class="card-img-top rounded-5 cardimage" alt="${d.Title}" />
              <div class="card-body d-flex justify-content-between" >
                <a href="#" class="button-78 fudi" onClick="showPopDiv('${d.id}')" >Click to view
                </a>

                
                  <button class="button-78" onClick='hello()'>Share Link</button>

                
                
              </div>
              
            </div>
          </div>`;
        });

        document.getElementById("recipeContainer").innerHTML = recipeCards;
    } catch (error) {
        console.error(error);
    }
}
// document.querySelectorAll('.shareButton').forEach(shareButton => {
//     shareButton.addEventListener('click', async () => {
//         if (navigator.share) {
//             try {
//                 await navigator.share({
//                     title: 'Share Link',
//                     url: window.location.href
//                 });
//                 console.log('Link shared successfully!');
//             } catch (error) {
//                 console.error('Error sharing link:', error);
//             }
//         } else {
//             // Fallback if Web Share API is not supported
//             alert('Web Share API is not supported on this browser. You can manually share the link.');
//         }
//     });
// });
async function hello() {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Share Link',
                url: window.location.href
            });
            console.log('Link shared successfully!');
        } catch (error) {
            console.error('Error sharing link:', error);
        }
    } else {
        // Fallback if Web Share API is not supported
        alert('Web Share API is not supported on this browser. You can manually share the link.');
    }
}
async function showPopDiv(recipeId) {
    document.getElementById("popdiv").style.visibility = "visible";
    document.getElementById("overlay").style.visibility = "visible";

    try {
        const response = await fetch(
            `https://food-recipes-with-images.p.rapidapi.com/?q=${recipeId}&limit=6`,
            {
                headers: {
                    "X-RapidAPI-Key":
                        "6c50e91cd8msh9b3bb0dea50c652p1265b2jsn2432b0e5a22e",
                    "X-RapidAPI-Host": "food-recipes-with-images.p.rapidapi.com",
                },
            }
        );
        const recipeData = await response.json();

        const ingredientsList = document.getElementById("Ingredient");
        const preparationText = document.getElementById("Preparation");

        ingredientsList.innerHTML = "";
        console.log('recipeData.d:', recipeData.d);
        if (recipeData.d && Array.isArray(recipeData.d)) {
            const recipe = recipeData.d[0];
            console.log("lamba haee ", recipe.Ingredients.length);


            if (recipeData.d && Array.isArray(recipeData.d)) {
                const recipe = recipeData.d[0];
                if (
                    recipe.Ingredients &&
                    Object.keys(recipe.Ingredients).length > 0
                ) {
                    for (const key in recipe.Ingredients) {
                        const ingredient = recipe.Ingredients[key];
                        const listItem = document.createElement("li");
                        listItem.textContent = ingredient;
                        ingredientsList.appendChild(listItem);
                    }
                } else {
                    ingredientsList.textContent = "No ingredients available.";
                }
            }

            if (typeof recipe.Instructions === "string") {
                preparationText.textContent = recipe.Instructions;
            } else {
                preparationText.textContent =
                    "No preparation instructions available.";
            }
        }
    } catch (error) {
        console.error(error);
    }
}

function showtab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("shadow");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}


