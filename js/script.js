/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// Create Search bar insert into header section
const header = document.querySelector('.header');
const searchBar = `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `
header.insertAdjacentHTML("beforeend", searchBar);

const studentList = document.querySelector(".student-list");

const input = document.querySelector('#search');
// sevent listener for search bar adds search results to searchlist array calls showPage() and addPagination()
input.addEventListener('input', (e) => {
   const paginationDiv = document.querySelector(".pagination");
   let searchList = [];
   for (let i = 0; i<data.length; i++){
      let firstName = data[i].name.first.toUpperCase();
      let lastName = data[i].name.last.toUpperCase();
      let searchName = e.target.value.toUpperCase();
      if(firstName.includes(searchName) || lastName.includes(searchName)){
         searchList.push(data[i]);
      }    
   } 
   // tests for search results creates no results item and hides pagination or lists search results
   if (searchList.length === 0){
      studentList.innerHTML = '';
      let studentItem = `  
         <li class="student-item cf">
            <h1>No Results Found</h2>
         </li>
      `
      studentList.insertAdjacentHTML("beforeend", studentItem);
      paginationDiv.style.display="none";
   } else {
      paginationDiv.style.display="block";
      showPage(searchList, 1);
      addPagination(searchList);
   }
});

/*
Create the `showPage` function
accepts list array and page parameters
sets number of students to diplay per page dynamicly inserts student list items 
*/
function showPage (list, page){
   let endIndex = page * 9;
   let startIndex = endIndex - 9;
   if (endIndex > list.length){
      endIndex = list.length;
   }
   studentList.innerHTML = '';
   let studentItem =''
   
   for (let i = startIndex; i<endIndex; i++){
      studentItem = `  
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
accepts list array parameter 
determines number of pages needed inserts page buttins to navigate between pages 
adds active class to current button
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

   //adds event listener for page buttons calls showpage to create selected page
   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         const button = e.target;
         document.querySelector('.active').className = '';
         button.className = 'active';
         showPage(list, button.textContent);
      }
   });
}



// Call functions to initiate page
showPage(data, 1);
addPagination(data);