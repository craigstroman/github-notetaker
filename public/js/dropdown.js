(function() {
  var toggle = document.getElementsByClassName('navbar-dropdown')[0];
  var dropDown = document.getElementsByClassName('dropdown-menu')[0];

  if (toggle !== undefined) {
    toggle.addEventListener('click', function(e) {
      if (dropDown.style.display === 'block') {
        dropDown.style.display = 'none';
      } else if (dropDown.style.display === 'none' || dropDown.style.display === '') {
        dropDown.style.display = 'block';
      }

    });
  }
})();
