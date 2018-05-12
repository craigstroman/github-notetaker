(function() {
  var toggleMenu = document.getElementsByClassName('navbar-dropdown')[0];
  var toggleIcon = document.getElementsByClassName('icon')[0];
  var dropDownMenu = document.getElementsByClassName('dropdown-menu')[0];


  if (toggleMenu !== undefined) {
    toggleMenu.addEventListener('click', function(e) {
      if (dropDownMenu.style.display === 'block') {
        dropDownMenu.style.display = 'none';
      } else if (dropDownMenu.style.display === 'none' || dropDownMenu.style.display === '') {
        dropDownMenu.style.display = 'block';
      }
    });

      window.addEventListener('click', function(e) {
        if (!toggleMenu.contains(e.target) && !toggleIcon.contains(e.target) && !dropDownMenu.contains(e.target)) {
          dropDownMenu.style.display = 'none';
        }
      });
  }
})();
