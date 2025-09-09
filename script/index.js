


const loadAllCategories = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then((res) => res.json())
        .then((json) => displayAllCategories(json.categories)); 
};

const removeActive = () =>{
   const categoryBtn = document.querySelectorAll('.category-btn')
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


loadAllCategories();
