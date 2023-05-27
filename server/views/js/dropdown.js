(function () {
  var navbarDropdown = document.querySelector('.navbar-dropdown');

  if (navbarDropdown) {
    navbarDropdown.addEventListener('click', function (event) {
      event.preventDefault();

      var dropdownMenu = document.querySelector('.dropdown-menu');

      dropdownMenu.classList.toggle('visible');
    });
  }
})();
