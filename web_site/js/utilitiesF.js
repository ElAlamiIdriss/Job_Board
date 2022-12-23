const header = document.querySelector('.header');
const formConnectionInscription = document.querySelector(
  '.form-connection_inscription'
);
const BrowserAccessToken = localStorage.getItem('accessToken');
let connectPerson;

console.log(header);

export function createHeader() {
  if (!BrowserAccessToken) return;
  connectPerson = JSON.parse(localStorage.getItem('connectPerson'));
  console.log(connectPerson);

  formConnectionInscription.remove();
  const navBarHtml = `
    <h3 class="header_title">Welcome ${connectPerson.firstname}</h3>
    <i class="fa-solid fa-user menu-icon"></i>
    <nav class="navbar hidden">
      <ul class="navbar_list">
        <li><a href="index.html">home</a></li>
        <li><a href="#">Profil</a></li>
        <li>${
          connectPerson.stat === 'admin'
            ? '<a href="admin.html">Data Base Clients</a>'
            : connectPerson.stat === 'society'
            ? '<a href="society.html">Add new Post</a>'
            : '<a href="user.html">Check your Condidats</a>'
        }</li>
        <li><a href="#" class='log_out'>Log Out</a></li>
    </nav>
`;

  header.insertAdjacentHTML('beforeend', navBarHtml);
  const menuIcon = document.querySelector('.menu-icon');
  const navBar = document.querySelector('.navbar');
  const logOut = document.querySelector('.log_out');

  menuIcon.addEventListener('click', function () {
    navBar.classList.toggle('hidden');
  });

  logOut.addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('connectPerson');
    location.assign('index.html');
  });
}

/* <ul class="navbar_list">
        <li></i></li>
      </ul> */
// <nav class="navbar">

// <i class="fa-solid fa-user">

// </nav>
