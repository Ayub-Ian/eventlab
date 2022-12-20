document.addEventListener("DOMContentLoaded", () => {

  loginModal()
  signUpModal()
  eventSuggestions()
  handleLogin()
  handleSignUp()
});

//Login modal pop up functionality
function loginModal() {
  // Get the login modal
  let loginModal = document.getElementById("loginModal");
  //Get login form
  const loginForm = document.querySelector('#login_form')

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
    loginForm.reset()

  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == loginModal) {
      loginModal.style.display = "none";
    }
  };
}

//sign up modal pop up functionality
function signUpModal() {
  // Get the sign up modal
  let signUpModal = document.getElementById("signUpModal");

  //Get sign up form 
  const signUpForm = document.querySelector('#signup_form')

  // Get the button that opens the modal
  let signUpBtn = document.getElementById("signUpBtn");

  // Get the <span> element that closes the modal
  let close = document.getElementsByClassName("close")[1];

  // When the user clicks the button, open the modal
  signUpBtn.onclick = function () {
    signUpModal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  close.onclick = function () {
    signUpModal.style.display = "none";
    signUpForm.reset()
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == signUpModal) {
      signUpModal.style.display = "none";
    }
  };
}

//events suggestions based on radius in km fetch functionality
function eventSuggestions() {
  const apiUrl = 'https://app.ticketmaster.com/discovery/v2/suggest.json?unit=km';
  const apiKey = 'CI1WE32n4l6fgGf5ErtPnGSdEZfcPZAP'
  fetch(`${apiUrl}&apikey=${apiKey}`)
  .then(res => res.json())
  .then(data => {
    let events = []
    events = [...data["_embedded"].events ]
     events.forEach(event => {
      displayEventList(event)
     }); }
  )
}


function displayEventList(event) {
  const list = document.querySelector('#service-grid')
  let item = document.createElement('div')
  item.className = "service-item"
  item.innerHTML = `
  <div class="w-80 h-60 self-center">
  <img
    class="object-cover h-full"
    src=${event.images[1].url}
    alt=""
  />
</div>

<span class="ml-12 my-1 bg-[#5fae67] w-fit px-2 py-1 tag"
  >${event.type}</span
>

<div class="ml-12">
  <h1 class="text-lg font-semibold">${event.name}</h1>
  <p>${event["_embedded"].venues[0].city.name}</p>
  <p>${event["_embedded"].venues[0].timezone}</p>
</div>

<p
  class="absolute bg-black text-white font-semibold text-center w-20 h-20 py-6 uppercase rounded-full top-2"
>
  ${event.dates.status.code}
</p>`

list.appendChild(item)

let btn = document.createElement('button')
btn.classList.add("bg-clifford", "w-fit", "rounded-full", "absolute", "bottom-6" ,"right-16")
btn.innerHTML = ` <svg
width="44"
height="44"
viewBox="0 0 44 44"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
<path
  d="M18.4645 29.0709L18.5087 26.5519H24.7842L14.0451 15.8127L15.8128 14.0449L26.552 24.7841L26.552 18.5085L29.0711 18.4643V29.0709H18.4645Z"
  fill="black"
/>
</svg>`
item.appendChild(btn)

btn.addEventListener('click',()=> {
  const landingPage = document.querySelector("#landing-page")
  const detailPage = document.querySelector('#event-details')

  let title = document.querySelector('#evt_title')
  let img = document.querySelector('#evt_img')
  let date = document.querySelector('#evt_date')
  let descTitle = document.querySelector('#evt_desc_title')
  let desc = document.querySelector('#evt_desc')
  let loc = document.querySelector('#evt_location')
  let dte = document.querySelector('#evt_dte')
  let ticketUrl = document.querySelector('#evt_ticket')

  landingPage.style.display = "none"
  detailPage.style.display = "block"
  let dateStr = new Date(event.dates.start.localDate);
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let convertedDate = dateStr.toLocaleDateString(undefined,options)

  
  title.textContent = event.name
  img.src = event.images[1].url

  date.textContent=convertedDate
  descTitle.textContent = `About ${event.name}`
  desc.textContent = `${event["_embedded"].venues[0].accessibleSeatingDetail} ${event["_embedded"].venues[0].parkingDetail}`
  loc.textContent = event["_embedded"].venues[0].timezone
  dte.textContent = convertedDate
  ticketUrl.href = event["_embedded"].venues[0].url
  ticketUrl.setAttribute('target', '_blank' )

})


}

function toggleDisplay() {
  const landingPage = document.querySelector("#landing-page")
  const detailPage = document.querySelector('#event-details')
  landingPage.style.display = "block"
  detailPage.style.display = "none"
}

function handleLogin() {
  const loginForm = document.querySelector('#login_form')
  loginForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    let name = e.target.username.value
    let password = e.target.password.value
    console.log(password)
    if (name == null || name == ""){
      alert("Name can't be blank")
      e.target.username.style.outline = "1px solid #FF6347"
      return false
    } else if (password.length < 6) {
      alert('Password must be at least 6 characters long')
      e.target.password.style.outline = "1px solid #FF6347"
      return false
    } else {
      alert('Successful login')
      let loginModal = document.getElementById("loginModal");
      loginModal.style.display = "none";
    }
    loginForm.reset()
  })
}

function handleSignUp() {
  const signUpForm = document.querySelector('#signup_form')
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let email = e.target.email.value
    let username = e.target.username.value
    let password = e.target.password.value
    let confirmPass = e.target.confirmPassword.value
    let atposition=email.indexOf("@");  
let dotposition=email.lastIndexOf(".");



    if (username == null || username == ""){
      alert("Username can't be blank")
      e.target.username.style.outline = "1px solid #FF6347"
      return false
    } else if(atposition<1 || dotposition<atposition+2 || dotposition+2>=email.length) {
      alert("Please enter a valid e-mail address")
      e.target.email.style.outline = "1px solid #FF6347"
      return false
    } else if (password.length < 6) {
      alert('Password must be at least 6 characters long')
      e.target.password.style.outline = "1px solid #FF6347"
      return false 
    } else if (password !== confirmPass) {
      alert('Passwords do not match')
      e.target.confirmPassword.style.outline = "1px solid #FF6347"
      return false 
    } else {
      alert('Successfully registered')
      let signUpModal = document.getElementById("signUpModal");
      signUpModal.style.display = "none";
    }
    signUpForm.reset()
  })
}