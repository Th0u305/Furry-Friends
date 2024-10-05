const petCategory = () =>{
    fetch ('https://openapi.programming-hero.com/api/peddy/categories')
    .then (res => res.json())
    .then(data => displayCategory(data.categories))
    .catch((error) => console.log(error));
}


const displayCategory = (categories) =>{
    const petsCategoryContainer = document.getElementById('petsCategoryContainer');
    categories.forEach((item) => {
        console.log(item);
        //create a button
        const button = document.createElement("button");
        button.innerHTML = `
      <button id="btn" onclick="loadCategoryVideos()" class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg h-[5em] w-[14.5em]  rounded-3xl border-2 border-[#0e7a8126] text-2xl bg-white shadow-none"> <img class = "w-14" src="${item.category_icon}" alt="">  ${item.category}</button>
    `;
        petsCategoryContainer.append(button)
        
        //add button to catagory container
      });
}

petCategory();

