const elPokemonsList = document.querySelector(".pokemons__list");
let pokemonFragment = document.createDocumentFragment();
const elForm = document.querySelector(".form");
const elFormInput = document.querySelector(".search");
let elSortSelectPokemons = document.querySelector(".style");
const elSorting = document.querySelector("#sort");

let pokemonTypes = [];


function pokemonList() {
    pokemons.forEach(element => {
        const pokemonType = element.type;
        
        pokemonType.forEach(item => {
            if (!pokemonTypes.includes(item)) {
                pokemonTypes.push(item);
            }
        })
    });
    
    pokemonTypes.sort();
    
}


function showPokemonsByTypes() {
    const newSelectFragment = document.createDocumentFragment();
    
    pokemonTypes.forEach(item => {
        const newPokemonsOption = document.createElement("option");
        
        newPokemonsOption.textContent = item;
        newPokemonsOption.value = item;
        newPokemonsOption.classList.add("styles")
        newSelectFragment.appendChild(newPokemonsOption);
    });
    elSortSelectPokemons.appendChild(newSelectFragment);
}

function rendering(param, titleRegex = "") {
    elPokemonsList.innerHTML = ""
    
    for(let i=0; i<param.length; i++) {
        
        let newItem = document.createElement("li");
        newItem.classList.add("pokemons__item");
        let newTitle = document.createElement("h3");
        newTitle.classList.add("pokemons__title");
        
        if(titleRegex.source !== "(?:)" && titleRegex){
            
            newTitle.innerHTML = param[i].name.replace(titleRegex, `<mark>${titleRegex.source}</mark>`);
            
        }else {
            
            newTitle.textContent = param[i].name
        }        
        let newImg = document.createElement("img");
        newImg.src = param[i].img;
        
        let newWeightHeightBox = document.createElement("div");
        newWeightHeightBox.classList.add("w-h");
        
        let newHeight = document.createElement("span");
        newHeight.textContent = param[i].height;
        
        let newWeight = document.createElement("span");
        newWeight.textContent = param[i].weight;
        
        let newSpan = document.createElement("span");
        newSpan.classList.add("time");
        newSpan.textContent = param[i].spawn_time;
        
        let newType = document.createElement("span");
        newType.classList.add("types");
        newType.textContent = param[i].type;
        
        let newP = document.createElement("p");
        newP.classList.add("pokemons__subname");
        newP.textContent = param[i].candy;
        
        newItem.appendChild(newTitle);
        newItem.appendChild(newImg);
        newItem.appendChild(newSpan);
        newWeightHeightBox.appendChild(newHeight);
        newWeightHeightBox.appendChild(newWeight);
        newItem.appendChild(newWeightHeightBox);
        newItem.appendChild(newType);
        newItem.appendChild(newP);
        pokemonFragment.appendChild(newItem);          
        elPokemonsList.appendChild(pokemonFragment);
    }
    
}


function showSearchPokemons(param) {
    
    return pokemons.filter(item => {
        const result = item.name.match(param) && (elSortSelectPokemons.value === "All" || item.type.includes(elSortSelectPokemons.value))
        
        return result;
    })
}


function sortingAllPokemos(sortedArray, sortingValue) {
    if (sortingValue === "a-z") {
        sortedArray.sort((a, b) => a.name.localeCompare(b.name));
    }
    else if (sortingValue === "z-a") {
        sortedArray.sort((a, b) => b.name.localeCompare(a.name));
    }
    else if (sortingValue === "heavy") {
        sortedArray.sort((a, b) => parseFloat(b.weight) - parseFloat(a.weight))
    }
    else if (sortingValue === "light") {
        sortedArray.sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight))
    }
    else if (sortingValue === "long") {
        sortedArray.sort((a, b) => parseFloat(b.height) - parseFloat(a.height))
    }
    else if (sortingValue === "short") {
        sortedArray.sort((a, b) => parseFloat(a.height) - parseFloat(b.height))
    }
}


elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const searchElement = new RegExp(elFormInput.value.trim(), 'gi');
    console.log(searchElement);
    const searchPokemonsFiltered = showSearchPokemons(searchElement);
    
    if (searchPokemonsFiltered.length > 0) {
        sortingAllPokemos(searchPokemonsFiltered, elSorting.value)
        rendering(searchPokemonsFiltered, searchElement);
    }else {
        alert("Not found!");
    }
})

pokemonList()

showPokemonsByTypes()
rendering(pokemons.slice(0, 20));

