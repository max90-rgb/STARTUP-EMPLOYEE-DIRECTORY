let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
var indexCards = 0;

//fetch data from API

fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))

    function displayEmployees(employeeData) {
        employees = employeeData;
        gridContainer.innerHTML = '';
        
        employees.forEach((employee, index) => {
            let name = employee.name;
            let email = employee.email;
            let street = employee.location.street;
            let city = employee.location.city;
            let picture = employee.picture;
            console.log(employee.location.street);
            gridContainer.innerHTML += `
            <div class= "card" data-index="${index}">
                <img class= "avatar" src="${picture.large}" />
                <div class="text-container">
                    <h2 class ="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
            `;  
        });
    }

function displayModal(index) { 
    let { name, dob, phone, email, location: { city, street, state, postcode}, picture } = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
            <p>Birthday: 
            ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
        `;
    
        overlay.classList.remove("hidden");
        modalContainer.innerHTML = modalHTML;
    }

gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {
            
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        indexCards = index;

        displayModal(index);
        }
     });

    modalClose.addEventListener('click', () => {
        overlay.classList.add("hidden");
    });
    const varNext = document.querySelector(".modal-forward");
    const varBack = document.querySelector(".modal-back");

    function cardNext() {
        if (indexCards == elements.length -1)
        indexCards = 0;
        else
        indexCards++;
        setTimeout(function(){ displayModal(indexCards); }, 500);
    }

    function cardBack() {
        if (indexCards == 0)
        indexCards = elements.length - 1;
        else 
        indexCards--;
        setTimeout(function(){ displayModal(indexCards); }, 500);
    }
    varNext.addEventListener('click', () => {
      cardNext();
    });

    varBack.addEventListener('click', () => {
        cardBack();
      });

    var input = document.getElementById('searchbar');
    var names = document.getElementsByClassName('name');
    var elements = document.getElementsByClassName('card');

    function searchFilter() {
      var x = input.value.toLowerCase();
      gridContainer.classList.add("cardContainer-column");
      if (x === "")
      {
        gridContainer.classList.remove("cardContainer-column");    
        gridContainer.classList.add("grid-container");
      }
       for (var i = 0; i < names.length; i++ ){
       var caption = names[i].textContent.toLowerCase();

       if (x === "") 
       resetCards();
       else {
         if (caption.includes(x)) {
             elements[i].style.display = 'block';
             elements[i].style.display = "flex";
             elements[i].style.justifyContent = "space-between";
             elements[i].style.padding = "3%";
         } else {
             elements[i].style.display = "none";
         }
       }
      }
    };
    function resetCards()  {
        for (var i = 0; i < elements.length; i++ ){
            elements[i].style.display = 'block';
            elements[i].style.display = "flex";
            elements[i].style.justifyContent = "flex-start";
            elements[i].style.padding = "1%";
        } 
    }
    input.addEventListener('keyup', searchFilter);     