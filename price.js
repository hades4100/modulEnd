import { togunstring, gun } from "./gun.js";
import { getuserlist, adduser, getcurrentuser, setcurrentuser, userlist } from "./users.js";
import { showwelcome } from "./script.js";
import { editpost, deletepost, getposts, addpost } from "./post.js";
import { gunhandle } from "./login.js";
export const sellers = ["LHB", "Rot", "Caliber", "Hill", "North"];
export let pricelist = [];
//---------------price basic:
function loadprices() {
  let tocheck = JSON.parse(localStorage.getItem("pricelist"));
  if (tocheck != null) {
    pricelist = tocheck;
  } else {
    pricelist = [];
  }
}

class price {
  constructor(user, gun, seller, amount) {
    this.user = user;
    this.gun = gun;
    this.seller = seller;
    this.amount = amount;
  }
}

export function getpricelist() {
  return pricelist;
}

export function addprice(user, gun, seller, amount) {
  pricelist.push(new price(user, gun, seller, amount));
  localStorage.setItem("pricelist", JSON.stringify(pricelist));
  alert("price submitted successfully");
}
//--------------adding new price:

function submitprice() {
  let cuser = getcurrentuser();
  let model = document.getElementById("weapon").value;
  let submodel = document.getElementById("submodel").value;
  let theseller = document.getElementById("seller").value;
  console.log(theseller);
  let temp = new gun(model, submodel);
  let pricevalue = document.getElementById("price").value;
  addprice(cuser, temp, theseller, pricevalue);
}
function listentosubmitprice() {
  let submitpricebutton = document.getElementById("submitprice");
  submitpricebutton.addEventListener("click", submitprice);
}

//--------populating seller option
function populateseller(id) {
  let slist = document.getElementById(id);
  sellers.forEach((element) => {
    let opt = document.createElement("option");
    opt.value = element;
    opt.text = element;
    slist.add(opt);
  });
}

//--------------------------------chart handling:------------------------------------
var crt;
function listentochartvendor() {
  //show chart by clicking on seller
  populateseller("chartseller");
  let choice = document.getElementById("chartseller");
  choice.addEventListener("change", () => {
    if (crt != null) {
      crt.destroy();
      pricebyseller(document.getElementById("chartseller").value);
    } else {
      pricebyseller(document.getElementById("chartseller").value);
    }
  });
}

function pricebyseller(vendor) {
  // forwards data to createchart
  let organizedprices = [];
  let organizedguns = [];
  let plist = getpricelist();
  for (let i = 0; i < plist.length; i++) {
    if (plist[i].seller == vendor) {
      organizedprices.push(plist[i].amount);
      organizedguns.push(togunstring(plist[i].gun));
    }
  }
  createchart(organizedguns, organizedprices);
}

function createchart(guns, prices) {
  Chart.defaults.font.size = 35;
  const ctx = document.getElementById("myChart");
  crt = new Chart(ctx, {
    type: "bar",
    data: {
      labels: guns,
      datasets: [
        {
          label: "price in ₪",
          data: prices,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// ---------------onload settings:
(window.onload = listentochartvendor()), showwelcome();
(window.onload = loadprices()), populateseller("seller"), gunhandle(), listentosubmitprice();
