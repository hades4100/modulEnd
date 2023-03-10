import { gun } from "./gun.js";
import { getcurrentuser, setcurrentuser, user, userlist } from "./users.js";
export function showwelcome() {
  if (getcurrentuser() == null) {
    location.href = "login.html";
  } else {
    let cuser = getcurrentuser();
    let welcome = document.getElementById("welcome");
    let ln = document.createElement("line");
    ln.innerHTML = "welcome, " + cuser.username;
    welcome.appendChild(ln);
  }
}

//--------------------------carousel photo settings:-----------------------------------------------

function listentoswiper() {
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
}

window.onload = () => {
  if (window.location.href.match("index.html") != null) {
    listentoswiper();
    showwelcome();
  }
};
