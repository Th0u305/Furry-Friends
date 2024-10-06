const petCategory = () =>{
    fetch ('https://openapi.programming-hero.com/api/peddy/categories')
    .then (res => res.json())
    .then(data => displayCategory(data.categories))
    .catch((error) => console.log(error));
}


const loadAll = (id) =>{

    fetch (`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then (res => res.json())
    .then(data => petContainer(data.data))
    .catch((error) => console.log(error));  
    document.getElementById('pets-cards').style.display = "grid"
    document.getElementById('pet-like-pic').style.display = "grid"
    document.getElementById('spinner').style.display="none";

}

const loadCategoryImages = (id) =>{
    document.getElementById('pets-cards').style.display = "none"
    document.getElementById('pet-like-pic').style.display = "none"
    document.getElementById('spinner').style.display="block";

    setTimeout(function ()  {
        loadAll(id);
    }, 2000);
}

const displayCategory = (categories) =>{
    const petsCategoryContainer = document.getElementById('petsCategoryContainer');
    categories.forEach((item) => {
        document.getElementById('spinner').style.display="none";
        //create a button
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = 
        `
            <button id = "btn-load" onclick = "loadCategoryImages('${item.category}'); "  
                class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg h-[5em] w-[14.5em]  rounded-3xl border-2 border-[#0e7a8126] text-2xl bg-white shadow-none"> <img class = "w-14" 
                src="${item.category_icon}" alt=""> ${item.category}</button>
        `;
        petsCategoryContainer.append(buttonContainer)
      });
}


const petImages = () =>{
    fetch (`https://openapi.programming-hero.com/api/peddy/pets`)
    .then (res => res.json())
    .then (data => petContainer(data.pets))
    .catch((error) => console.log(error));
}

const likedImages = (id) =>{
    const petsLikePic = document.getElementById('pet-like-pic');
    const petsLikePicContainer = document.createElement('div')
    petsLikePicContainer.innerHTML = 

        ` 
            <img class = "object-cover rounded-2xl" src="${id}" alt="">
        `;
    petsLikePic.append(petsLikePicContainer)
    
}


const petContainer = (petContents) => {
    const petCards = document.getElementById("pets-cards")
    petCards.innerHTML = "" ;
    if(petContents.length == 0){
        document.getElementById('pets-cards').style.display = "flex"
        petCards.innerHTML = 

            `
                <div  class = "flex flex-col items-center justify-center text-center gap-5 rounded-2xl bg-gray-200">
                    <img src="images/error.webp" alt="">
                    <h1 class = "text-3xl font-bold"> No Information Available </h1>
                    <p class = "w-1/2 font-semibold">
                       It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
                       its layout. The point of using Lorem Ipsum is that it has a.
                    <p/>
                </div>
            `
        return ;
    }
    
    petContents.forEach((content) => {
        const card = document.createElement('div')
        card.classList = "card card-compact border-2 p-6 space-y-5"
        card.innerHTML = 
    
        `
            <figure>
                <img src=${content.image} class="h-full w-full object-cover rounded-xl"/>
            </figure>
            
            <div id = "destination" class="space-y-5">
                <div class = "space-y-5">

                    <div>
                        <h1 class = "text-3xl font-semibold"> ${content.pet_name}
                    </div>
                    
                    <div class = "">  
                        <div class = "flex flex-row justify-start items-center space-x-2">
                            <img src="images/menu.png" alt="" class = "w-7">
                            <p class = "">Breed: ${content.breed == null || content.breed.length === 0 ? "Data Not Found" : content.breed}</p> 
                        </div>
                        <div class = "flex flex-row justify-start items-center space-x-2">
                            <img src="images/calender.png" alt="" class = "w-8">
                            <p class = "">Date: ${content.date_of_birth == null || content.date_of_birth.length === 0 ? "Data Not Found" : content.date_of_birth}</p> 
                        </div>
                        <div class = "flex flex-row justify-start items-center space-x-2">
                            <img src="images/gender.png" alt="" class = "w-7">
                            <p class = "">Gender: ${content.gender == null || content.gender.length === 0 ? "Data Not Found" : content.gender}</p> 
                        </div>
                        <div class = "flex flex-row justify-start items-center space-x-2">
                            <img src="images/money.png" alt="" class = "w-7">
                            <p class = "">Price: ${content.price == null || content.price.length === 0 ? "Data Not Found" : content.price}</p> 
                        </div>
                        
                    </div>

                </div>
                <div class = "border-[1px]  ">
                    </div>
                <div class = "flex flex-row justify-between items-center">
                
                    <button onclick = "likedImages('${content.image}')" class = "btn border-2 border-[#0e7a8126] rounded-2xl w-[5em] h-12"><img src="images/like.png" alt="" class = "w-8"></Button>
                    <button onclick="showTimeModal()" class = "btn border-2 border-[#0e7a8126] rounded-2xl w-[5em] h-12 text-xl font-semibold">Adopt</Button>
                    <button onclick = "petDetails(${content.petId})" class = " btn border-2 border-[#0e7a8126] rounded-2xl w-[5em] h-12 text-xl font-semibold">Details</Button>
                </div>
            </div>
        `;
        petCards.append(card);
    } );

}

const petDetails =  async (petId) =>{

    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
    const res = await fetch(uri)
    const data = await res.json()
    displayDetails(data.petData)
}

const displayDetails = (petData) =>{
  
    const detailsContainer = document.getElementById('modal-content');
    detailsContainer.innerHTML = 

        `
            <div class = "space-y-5">

                <div>
                    <img src=${petData.image} class="h-full w-full object-cover rounded-xl"/>
                </div>
                <div>
                    <h1 class = "text-3xl font-semibold"> ${petData.pet_name}
                </div>
                
                <div class = "grid grid-cols-2">
                    <div class = "flex flex-row justify-start items-center space-x-2">
                        <img src="images/menu.png" alt="" class = "w-7">
                        <p class = "">Breed: ${petData.breed == null || petData.breed.length === 0 ? "Data Not Found" : petData.breed}</p> 
                    </div>
                    <div class = "flex flex-row justify-start items-center space-x-2">
                        <img src="images/calender.png" alt="" class = "w-8">
                        <p class = "">Date: ${petData.date_of_birth == null || petData.date_of_birth.length === 0 ? "Data Not Found" : petData.date_of_birth}</p> 
                    </div>
                    <div class = "flex flex-row justify-start items-center space-x-2">
                        <img src="images/gender.png" alt="" class = "w-7">
                        <p class = "">Gender: ${petData.gender == null || petData.gender.length === 0 ? "Data Not Found" : petData.gender}</p> 
                    </div>
                    <div class = "flex flex-row justify-start items-center space-x-2">
                        <img src="images/money.png" alt="" class = "w-7">
                        <p  class = "">Price: ${petData.price == null || petData.price.length === 0 ? "Data Not Found" : petData.price}</p> 
                    </div>
                    <div class = "flex flex-row justify-start items-center space-x-2">
                        <img src="images/vacc.png" alt="" class = "w-7">
                        <p class = "">Vaccinated status: ${petData.vaccinated_status == null || petData.vaccinated_status.length === 0 ? "Data Not Found" : petData.vaccinated_status}</p> 
                    </div>
                </div>
                <div class = "border-[1px]"></div>
                <div class = "text-left space-y-3">
                    <h1 class = "text-xl font-semibold text-center">Details Information</h1>
                    <p class = "">Price: ${petData.pet_details == null || petData.pet_details.length === 0 ? "Data Not Found" : petData.pet_details}</p> 
                </div>
                    
            </div>
        `
    document.getElementById('petModal').showModal();
}


// Scroll to the pets 
function scrollToPets() {
    document.getElementById("pets-shop").scrollIntoView({ behavior: 'smooth' });
}



// Timer 

let countdownInterval;  

const showTimeModal = () => {
  resetCountdown(); 
  document.getElementById('timer').showModal();
  startCountdown(); 
}

// Countdown
function startCountdown() {
    let countdownTime = 3; 
    
    document.getElementById('countdown').innerHTML = countdownTime;
    
    countdownInterval = setInterval(() => {
    
    countdownTime--;

    // Update the countdown display
    document.getElementById('countdown').innerHTML = countdownTime;
    
    if (countdownTime < 0) {
      clearInterval(countdownInterval);  // Stop the countdown
      closeModal();  
    }
    
  }, 1000);
}

// close the modal
const closeModal = () => {
  document.getElementById('timer').close();  
  clearInterval(countdownInterval); 
  
}

// Reset countdown 
const resetCountdown = () => {
  clearInterval(countdownInterval);
  document.getElementById('countdown').innerHTML = 3;  
}







const  sortPrice = async () => {
    const petsContainer = document.getElementById('pets-cards');
    petsContainer.innerHTML = '';

    try {
    
      const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets'); // Replace with your API URL
      const data = await response.json();
    

      const sortedPets = data.pets.sort((a, b) => b.price - a.price);

      sortedPets.forEach(pets => {
        const petsCard = document.createElement('div');
        petsCard.className = 'p-8 border-2 rounded-2xl';
        
        petsCard.innerHTML = `

            <figure>
                <img src=${pets.image} class="h-full w-full object-cover rounded-xl"/>
            </figure>
            
            <div id = "destination" class="space-y-5">
                <div class = "space-y-5">

                    <div>
                        <h1 class = "text-3xl font-semibold"> ${pets.pet_name}
                    </div>
                    
                    <div class = "">  
                        <div class = "flex flex-row justify-start items-center space-x-2">
                            <img src="images/menu.png" alt="" class = "w-7">
                            <p class = "">Breed: ${pets.breed == null || pets.breed.length === 0 ? "Data Not Found" : pets.breed}</p> 
                        </div>
                        <div class = "flex flex-row justify-start items-center space-x-2">
                            <img src="images/calender.png" alt="" class = "w-8">
                            <p class = "">Date: ${pets.date_of_birth == null || pets.date_of_birth.length === 0 ? "Data Not Found" : pets.date_of_birth}</p> 
                        </div>
                        <div class = "flex flex-row justify-start items-center space-x-2">
                            <img src="images/gender.png" alt="" class = "w-7">
                            <p class = "">Gender: ${pets.gender == null || pets.gender.length === 0 ? "Data Not Found" : pets.gender}</p> 
                        </div>
                        <div class = "flex flex-row justify-start items-center space-x-2">
                            <img src="images/money.png" alt="" class = "w-7">
                            <p class = "">Price: ${pets.price == null || pets.price.length === 0 ? "Data Not Found" : pets.price}</p> 
                        </div>
                        
                    </div>

                </div>
                <div class = "border-[1px]  ">
                    </div>
                <div class = "flex flex-row justify-between items-center">
                
                    <button onclick = "likedImages('${pets.image}')" class = "btn border-2 border-[#0e7a8126] rounded-2xl w-[5em] h-12"><img src="images/like.png" alt="" class = "w-8"></Button>
                    <button onclick="showTimeModal()" class = "btn border-2 border-[#0e7a8126] rounded-2xl w-[5em] h-12 text-xl font-semibold">Adopt</Button>
                    <button onclick = "petDetails(${pets.petId})" class = " btn border-2 border-[#0e7a8126] rounded-2xl w-[5em] h-12 text-xl font-semibold">Details</Button>
                </div>
            </div>
    
        `;
        petsContainer.appendChild(petsCard);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      petsContainer.innerHTML = '<p>Error loading data. Please try again.</p>';
    }
}


scrollToPets();
petCategory();
petImages();
