import { gun } from "./gun.js";
import { getcurrentuser, setcurrentuser, user, userlist } from "./users.js";
export function showwelcome() {
  let cuser = getcurrentuser();
  let welcome = document.getElementById("welcome");
  let ln = document.createElement("line");
  ln.innerHTML = "welcome, " + cuser.username;
  welcome.appendChild(ln);
}
window.onload = showwelcome;

//--------------------------carousel photo settings:-----------------------------------------------

const swiper = new Swiper(".swiper", {
  // Optional parameters
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  direction: "horizontal",
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
