document.addEventListener("DOMContentLoaded", () => {

  loginModal()
});

//Login modal pop up functionality
function loginModal() {
  // Get the login modal
  let loginModal = document.getElementById("loginModal");

  // Get the button that opens the modal
  let loginBtn = document.getElementById("loginBtn");

  // Get the <span> element that closes the modal
  let close = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  loginBtn.onclick = function () {
    loginModal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  close.onclick = function () {
    loginModal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == loginModal) {
      loginModal.style.display = "none";
    }
  };
}
