/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

const header = document.querySelector('.header');
const searchBar = `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `
header.insertAdjacentHTML("beforeend", searchBar);

const input = document.querySelector('#search');
input.addEventListener('change', (e) => {
   console.log(e.target.value);
});

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage (list, page){
   let endIndex = page * 9;
   let startIndex = endIndex - 9;
   if (endIndex > list.length){
      endIndex = list.length;
   }
   const studentList = document.querySelector(".student-list");
   studentList.innerHTML = '';
   for (let i = startIndex; i<endIndex; i++){
      let studentItem = `  
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src=${list[i].picture.medium} alt="Profile Picture">
               <h3>${list[i].name.title} ${list[i].name.first} ${list[i].name.last}</h3>
               <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
            </div>
         </li>
      `
      studentList.insertAdjacentHTML("beforeend", studentItem);
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   let pagesNeeded = Math.ceil(list.length/9);
   const linkList = document.querySelector(".link-list");
   linkList.innerHTML = '';
   for (let i=1; i<=pagesNeeded; i++){
      const li = document.createElement('li');
      linkList.appendChild(li);
      const pageButon = document.createElement('button');
      pageButon.textContent = i;
      li.appendChild(pageButon);
   }
   linkList.firstElementChild.firstElementChild.className = 'active';

   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         const button = e.target;
         document.querySelector('.active').className = '';
         button.className = 'active';
         showPage(list, button.textContent);
      }
   });
}



// Call functions
showPage(data, 1);
addPagination(data);