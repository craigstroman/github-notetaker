(function () {
  var navbarDropdown = document.querySelector('.navbar-dropdown');
  console.log('navbarDropdown: ', navbarDropdown);

  if (navbarDropdown) {
    navbarDropdown.addEventListener('click', function (event) {
      event.preventDefault();

      var dropdownMenu = document.querySelector('.dropdown-menu');

      dropdownMenu.classList.toggle('visible');
    });
  }
})();
