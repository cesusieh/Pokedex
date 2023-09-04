const pokemonName = document.querySelectorAll(".pokemon_name, .info_name");
const pokemonNumber = document.querySelector('.pokemon_number');
const defFrontSprite = document.querySelector('.pokemon_image');
const defBackSprite = document.querySelector('.backsprite');
const shinyFrontSprite = document.querySelector('.pokemon_image_shiny')
const shinyBackSprite = document.querySelector('.backsprite_shiny')
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const pokeDesc = document.querySelector('.info_desc');
const type1 = document.querySelector('.tipo1');
const type2 = document.querySelector('.tipo2');
const hp = document.querySelector('.hp');
const attack = document.querySelector('.attack');
const defense = document.querySelector('.defense');
const spattack = document.querySelector('.spattack');
const spdefense = document.querySelector('.spdefense');
const speed = document.querySelector('.speed');
const shinycheck = document.querySelector('.shinycheckbox');
let verify = 0;
let searchPokemon = 1;
let ntype = 0;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
} 

const fetchInfo = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
    if (APIResponse.status === 200){
        const info = await APIResponse.json();
        return info;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.forEach(function(element){
        element.textContent = 'Loading...';
    })
    defFrontSprite.style.display = 'none';
    defBackSprite.style.display = 'none';
    shinyFrontSprite.style.display = 'none';
    shinyBackSprite.style.display = 'none';
    pokemonNumber.innerHTML = '';
    pokeDesc.innerHTML = '...'
    type1.innerHTML = '';
    type2.innerHTML = '';
    hp.innerHTML = '';
    attack.innerHTML = '';
    defense.innerHTML = '';
    spattack.innerHTML = '';
    spdefense.innerHTML = '';
    speed.innerHTML = '';   
    shinycheck.checked = false;

    const data = await fetchPokemon(pokemon);
    const info = await fetchInfo(pokemon);

    if (data){
        input.value = '';
        ntype = data.types.length;
        pokemonName.forEach(function(element){
            element.textContent = data.name;
        })
        defFrontSprite.style.display = 'inline';
        defBackSprite.style.display = 'inline';
        defFrontSprite.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        defBackSprite.src = data['sprites']['versions']['generation-v']['black-white']['animated']['back_default'];
        shinyFrontSprite.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
        shinyBackSprite.src = data['sprites']['versions']['generation-v']['black-white']['animated']['back_shiny'];

        shinycheck.addEventListener('change', function(){
            if (this.checked){
                shinyFrontSprite.style.display = 'inline';
                shinyBackSprite.style.display = 'inline';
                defFrontSprite.style.display = 'none';
                defBackSprite.style.display = 'none';
            } else {
                defFrontSprite.style.display = 'inline';
                defBackSprite.style.display = 'inline';
                shinyFrontSprite.style.display = 'none';
                shinyBackSprite.style.display = 'none';
            }
        })
        pokemonNumber.innerHTML = data.id;
        pokeDesc.innerHTML = info['flavor_text_entries']['0']['flavor_text'];
        type1.innerHTML = data['types']['0']['type']['name'];
        if (ntype === 2){
            type2.innerHTML = data['types']['1']['type']['name'];
        }
        hp.innerHTML = data['stats']['0']['base_stat'];
        attack.innerHTML = data['stats']['1']['base_stat'];
        defense.innerHTML = data['stats']['2']['base_stat'];
        spattack.innerHTML = data['stats']['3']['base_stat'];
        spdefense.innerHTML = data['stats']['4']['base_stat'];
        speed.innerHTML = data['stats']['5']['base_stat'];
        searchPokemon = data.id;
    } else {
        pokemonName.forEach(function(element){
            element.textContent = 'Not found :c';
        })
        pokemonNumber.innerHTML = '';
        defFrontSprite.src = '';
        defBackSprite.src = '';
        shinyFrontSprite.src = '';
        shinyBackSprite.src = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon); 
    }
} )

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
} )

console.log("Oi");

renderPokemon(searchPokemon);