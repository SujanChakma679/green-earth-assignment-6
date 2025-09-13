


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

const manageSpinner = (status) =>{
    if(status == true){
      document.getElementById('spinner').classList.remove('hidden')
      document.getElementById('cart-container').classList.add('hidden')
    }else{
      document.getElementById('spinner').classList.add('hidden')
      document.getElementById('cart-container').classList.remove('hidden')
    }
    
}


const loadTreesCard = (id) =>{

    manageSpinner(true);

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
            <div class="bg-white rounded-lg p-2">
            <div class="space-y-2">
              <img class="md:h-[150px] w-auto" src="${card.image}" alt="" />
              <h1 onclick="loadPlantsDetails(${card.id})" class="font-bold">${card.name}</h1>
              <p class="md:text-[10px] md:h-[100px]">
                ${card.description}
              </p>
            </div>
            <div class="flex justify-between items-center pb-2">
              <h3 onclick="my_modal_5.showModal()"  class="font-semibold bg-green-200 text-green-600 text-[10px] rounded-3xl p-2">
                ${card.category}
              </h3>
              <p class="font-semibold text-[12px]">$<span>${card.price}</span></p>
            </div>
            <button class="add-btn btn w-full bg-green-600 text-white rounded-3xl ">
              Add to Cart
            </button>
            </div>
          
        `;
        cardContainer.appendChild(treeCard);
    });
    manageSpinner(false);
};

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

const loadAllPlants = () => {
    
    manageSpinner(true); 

    fetch('https://openapi.programming-hero.com/api/plants')
        .then((res) => res.json())
        .then((json) => {

        removeActive();
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

        plant.innerHTML = `
        
            <div class="p-2 mb-4 bg-white rounded-lg space-y-2">
                  <div class="space-y-2">
              <img class="md:h-[150px] w-auto" src="${tree.image}" alt="" />
              <h1 onclick="loadPlantsDetails(${tree.id})" class="font-bold">${tree.name}</h1>
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
            <button class="add-btn btn w-full bg-green-600 text-white rounded-3xl ">
              Add to Cart
            </button>
            
            </div>
          
        `;
        // Append to container 
        allPlants.appendChild(plant);
        };
        manageSpinner(false); 
    };

const loadPlantsDetails =async (id) =>{
  const url = `https://openapi.programming-hero.com/api/plant/${id}`
  // console.log(url);
  const res = await fetch(url);
  const details = await res.json();
  displayPlantsDetails(details.plants);
}


const displayPlantsDetails = (plant) => {
  console.log(plant);
  const detailsBox = document.getElementById('details-container')
  detailsBox.innerHTML = `
    <div class="space-y-2">
        <h1 class="font-bold text-xl" >${plant.name}</h1>
        <img class="h-[200px] w-auto" src="${plant.image}" alt="">
        <p> <span class="font-bold">Category:</span> ${plant.category}</p>
        <p> <span class="font-bold">Price:</span> $${plant.price}</p>
        <p><span class="font-bold">Description:</span> ${plant.description}</p>
    </div>
  `;
  document.getElementById('my_modal_5').showModal();
}





//  add event listener to the button
allPlantsBtn.addEventListener('click', () => {
    loadAllPlants();
});


// // add cart button function



loadAllCategories();

loadAllPlants();