


const loadAllCategories = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then((res) => res.json())
        .then((json) => displayAllCategories(json.categories)); 
};

const removeActive = () =>{
   const categoryBtn = document.querySelectorAll('.category-btn, #all-plants-btn')
//    console.log(categoryBtn)
categoryBtn.forEach(btn => btn.classList.remove('active'));
}


const loadTreesCard = (id) =>{
    const url = `https://openapi.programming-hero.com/api/category/${id}` 
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data=> {

        removeActive();
        const activeBtn = document.getElementById(`category-${id}`);
       
        activeBtn.classList.add('active');

        displayTreesCard(data.plants)
    })
};

const displayTreesCard = (cards) =>{
    const cardContainer = document.getElementById('cart-container');
    cardContainer.innerHTML = "";

    cards.forEach(card =>{
        console.log(card);
        const treeCard = document.createElement('div');
        treeCard.innerHTML = `
        <div class="bg-slate-100 p-2">
            <div class="space-y-2">
              <img class="md:h-[150px] w-full" src="${card.image}" alt="" />
              <h1 class="font-bold">${card.name}</h1>
              <p class="md:text-[10px] md:h-[100px]">
                ${card.description}
              </p>
            </div>
            <div class="flex justify-between items-center pb-2">
              <h3 class="font-semibold bg-green-200 text-green-600 text-[10px] rounded-3xl p-2">
                ${card.category}
              </h3>
              <p class="font-semibold text-[12px]">$<span>${card.price}</span></p>
            </div>
            <button class="btn w-full bg-green-600 text-white rounded-3xl ">
              Add to Cart
            </button>
          </div>
        `;
        cardContainer.appendChild(treeCard);
    }) 
}

const displayAllCategories = (categories) => {
    const categoryContainer = document.getElementById('categories-container');
    categoryContainer.innerHTML = ""; 

    for (let category of categories) {
        // console.log(category);

        // create element <li>
        const categoryItem = document.createElement('li');
        categoryItem.className = " p-2 category-btn";
        categoryItem.id = `category-${category.id}`;

        categoryItem.textContent = category.category_name;

        // add click event
        categoryItem.addEventListener('click', () => {
            loadTreesCard(category.id); 
        });

        // append to container
        categoryContainer.appendChild(categoryItem);
    }
};

// All plants function

//  all plants button
 const allPlantsBtn = document.getElementById('all-plants-btn');

//  cart container div
 const allPlants = document.getElementById('cart-container');

// const activeRemove = () =>{
//    const btn = document.getElementById('all-plants-btn')
// //    console.log(categoryBtn)
// btn.classList.remove('active');
// }

const loadAllPlants = () => {
    fetch('https://openapi.programming-hero.com/api/plants')
        .then((res) => res.json())
        .then((json) => {

        removeActive()
         //  const activeBtn = document.getElementById('all-plants-btn')
          allPlantsBtn.classList.add('active');
           displayAllPlants(json.plants);
        }); 
};


const displayAllPlants = (trees) => {
 
    allPlants.innerHTML = ""; 

    for (let tree of trees) {
        // console.log(category);

        // create element <li>
        const plant = document.createElement('div');
        // plant.className = "grid grid-cols-3 gap-4 mt-4";
        // categoryItem.id = `category-${category.id}`;

        plant.innerHTML = `
        <div class="bg-slate-100 p-2">
            <div class="space-y-2">
              <img class="md:h-[150px] w-full" src="${tree.image}" alt="" />
              <h1 class="font-bold">${tree.name}</h1>
              <p class="md:text-[10px] md:h-[100px]">
                ${tree.description}
              </p>
            </div>
            <div class="flex justify-between items-center pb-2">
              <h3 class="font-semibold bg-green-200 text-green-600 text-[10px] rounded-3xl p-2">
                ${tree.category}
              </h3>
              <p class="">$<span>${tree.price}</span></p>
            </div>
            <button class="btn w-full bg-green-600 text-white rounded-3xl ">
              Add to Cart
            </button>
          </div>
        `;
        // Append to container 
        allPlants.appendChild(plant);
        }
    }


//  add event listener to the button
allPlantsBtn.addEventListener('click', () => {
    loadAllPlants();
});

// loadAllPlants();





loadAllCategories();
