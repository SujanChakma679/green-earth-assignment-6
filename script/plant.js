const loadAllPlants = () => {
    fetch('https://openapi.programming-hero.com/api/plants')
        .then((res) => res.json())
        .then((json) => displayAllCategories(json.categories)); 
};