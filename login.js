import { gun } from "./gun.js";
import { getuserlist, adduser, getcurrentuser, setcurrentuser, userlist } from "./users.js";

function listentoregbutton() {
  let regbutton = document.getElementById("register");
  if (regbutton != null) {
    regbutton.addEventListener("click", () => {
      registeruser();
      eye2();
    });
  }
}

function registeruser() {
  //redirect to register box
  let box = document.getElementById("box");
  box.style.display = "none";
  box.innerHTML = "";
  let regbox = document.getElementById("regbox");
  regbox.style.display = "flex";
  gunhandle();
}

export function gunhandle() {
  //populate gun options
  let submodel = document.getElementById("submodel");
  function addglockinfo() {
    let opt = document.createElement("option");
    opt.value = "17";
    opt.text = "17";
    submodel.add(opt);
    let opt2 = document.createElement("option");
    opt2.value = "19";
    opt2.text = "19";
    submodel.add(opt2);
    let opt3 = document.createElement("option");
    opt3.value = "43X";
    opt3.text = "43X";
    submodel.add(opt3);
  }
  function addswinfo() {
    let opt = document.createElement("option");
    opt.value = "mp";
    opt.text = "M&P";
    submodel.add(opt);
    let opt2 = document.createElement("option");
    opt2.value = "shield";
    opt2.text = "SHIELD";
    submodel.add(opt2);
    let opt3 = document.createElement("option");
    opt3.value = "sigma";
    opt3.text = "Sigma";
    submodel.add(opt3);
  }
  function addsiginfo() {
    let opt = document.createElement("option");
    opt.value = "p365";
    opt.text = "P365";
    submodel.add(opt);
    let opt2 = document.createElement("option");
    opt2.value = "p365x";
    opt2.text = "P365X";
    submodel.add(opt2);
    let opt3 = document.createElement("option");
    opt3.value = "p938";
    opt3.text = "P938";
    submodel.add(opt3);
  }
  let gun = document.getElementById("weapon");
  gun.addEventListener("change", () => {
    if (gun.value == "glock") {
      clearlist();
      addglockinfo();
    } else if (gun.value == "sw") {
      clearlist();
      addswinfo();
    } else if (gun.value == "sigsauer") {
      clearlist();
      addsiginfo();
    }
  });
  function clearlist() {
    while (submodel.options.length > 0) {
      submodel.remove(0);
    }
  }
}
//-------------------------- new user registration click:
function listentoconfirmregister() {
  let confirmreg = document.getElementById("confirmregister");
  if (confirmreg != null) {
    confirmreg.addEventListener("click", () => {
      let username = document.getElementById("regusername").value;
      let password = document.getElementById("regpassword").value;
      let model = document.getElementById("weapon").value;
      let submodel = document.getElementById("submodel").value;
      let temp = new gun(model, submodel);
      adduser(username, password, temp);
      alert("user successfully registered");
      location.href = "login.html";
    });
  }
}
//--------------------------password eye setting:
function eye() {
  var togglePassword = document.querySelector("#togglePassword");
  var password = document.querySelector("#password");
  var type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  togglePassword.addEventListener("click", function () {
    this.classList.toggle("fa-eye-slash");
    var type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
  });
}

function eye2() {
  var togglePassword = document.querySelector("#togglePassword");
  var password = document.querySelector("#regpassword");
  var type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  togglePassword.addEventListener("click", function () {
    this.classList.toggle("fa-eye-slash");
    var type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
  });
}

//--------------------------on load and general setting:

// window.onload = localStorage.clear();
function hidereg() {
  let regbox = document.getElementById("regbox");
  regbox.style.display = "none";
}
//--------------------------login authentication:
function auth() {
  let restored = JSON.parse(localStorage.getItem("userlist"));
  let uname = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  let status = true;
  for (let i = 0; i < restored.length; i++) {
    if (restored[i].username == uname && restored[i].password == pass) {
      setcurrentuser(restored[i]);
      alert("sucess");
      location.href = "index.html";
      status = true;
      break;
    } else {
      status = false;
    }
  }
  if (status == false) {
    alert("Incorrect details, try again");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  }
}
//--------------------------login authentication -- allowing Enter to be used:
function listentosubmit() {
  let submit = document.getElementById("submit");
  if (submit != null) {
    submit.addEventListener("click", auth);
    let passinput = document.getElementById("password");
    passinput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        submit.click();
      }
    });
  }
}

//-------------------------- onLoad settings ---will rum only if login.html is loaded

window.onload = () => {
  if (window.location.href.match("login.html") != null) {
    window.onload = eye();
    window.onload = hidereg();
    window.onload = listentoconfirmregister();
    window.onload = listentoregbutton();
    window.onload = listentosubmit();
  }
};
// window.onload = console.log("users list: " + localStorage.getItem("userlist"));
// window.onload = console.log(getuserlist());
// window.onload = localStorage.clear();
