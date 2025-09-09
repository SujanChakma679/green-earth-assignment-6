// //  all plants button
//  const allPlantsBtn = document.getElementById('all-plants-btn');

// //  card container div
//  const allPlants = document.getElementById('cart-container');


// const loadAllPlants = () => {
//     fetch('https://openapi.programming-hero.com/api/plants')
//         .then((res) => res.json())
//         .then((json) => displayAllPlants(json.plants)); 
// };


// const displayAllPlants = (trees) => {
 
//     allPlants.innerHTML = ""; 

//     for (let tree of trees) {
//         // console.log(category);

//         // create element <li>
//         const plant = document.createElement('div');
//         // plant.className = "grid grid-cols-3 gap-4 mt-4";
//         // categoryItem.id = `category-${category.id}`;

//         plant.innerHTML = `
//         <div class="bg-slate-100 p-2">
//             <div class="space-y-2">
//               <img class="md:h-[150px] w-full" src="${tree.image}" alt="" />
//               <h1 class="font-bold">${tree.name}</h1>
//               <p class="md:text-[10px] md:h-[100px]">
//                 ${tree.description}
//               </p>
//             </div>
//             <div class="flex justify-between items-center pb-2">
//               <h3 class="font-semibold bg-green-200 text-green-600 text-[10px] rounded-3xl p-2">
//                 ${tree.category}
//               </h3>
//               <p class="">$<span>${tree.price}</span></p>
//             </div>
//             <button class="btn w-full bg-green-600 text-white rounded-3xl ">
//               Add to Cart
//             </button>
//           </div>
//         `;
//         // Append to container 
//         allPlants.appendChild(plant);
//         }
//     }


// //  add event listener to the button
// allPlantsBtn.addEventListener('click', () => {
//     loadAllPlants();
// });

// // loadAllPlants();


