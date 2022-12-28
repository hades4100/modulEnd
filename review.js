import { gun } from "./gun.js";
import { getuserlist, adduser, getcurrentuser, setcurrentuser, userlist } from "./users.js";
import { showwelcome } from "./script.js";
import { editpost, deletepost, getposts, addpost } from "./post.js";
showwelcome();
let box = document.getElementById("mainbox");
let post = document.getElementById("newpost");
post.addEventListener("click", newpost);
//-------------------creating newpost section:
function newpost() {
  clearbox();
  let cuser = getcurrentuser();
  let li = document.createElement("line");
  li.innerHTML = `<b><u>Username:</u></b> ${cuser.username} | <b><u>Gun:</u></b> ${cuser.gun.model} | <b><u>Submodel:</u></b> ${cuser.gun.submodel} `;
  box.appendChild(li);
  let li2 = document.createElement("line");
  li2.innerHTML = `<b><u>Name:</u></b>`;
  box.appendChild(li2);
  let inp = document.createElement("input");
  inp.setAttribute("id", "postname");
  inp.setAttribute("type", "text");
  box.appendChild(inp);
  let li3 = document.createElement("line");
  li3.innerHTML = `<b><u>Your review:</u></b>`;
  box.appendChild(li3);
  let txarea = document.createElement("textarea");
  txarea.setAttribute("id", "txarea");
  txarea.cols = "80";
  txarea.rows = "4";
  box.appendChild(txarea);
  let btndiv = document.getElementById("buttondiv");
  let submitpost = document.createElement("button");
  submitpost.setAttribute("id", "submitpost");
  submitpost.setAttribute("class", "button-30");
  submitpost.innerText = `Submit`;
  box.appendChild(submitpost);
  let submitbtn = document.getElementById("submitpost");
  submitbtn.addEventListener("click", postsubmit);
  function postsubmit() {
    let name = document.getElementById("postname").value;
    let content = document.getElementById("txarea").value;
    addpost(name, content, cuser);
    alert("post submitted");
    showposts();
  }
}
//-------------------displaying posts section:

let publishposts = document.getElementById("publishposts");
publishposts.addEventListener("click", showposts);
function showposts() {
  clearbox();
  let theposts = getposts();
  let cuser = getcurrentuser();
  for (let i = 0; i < theposts.length; i++) {
    let newdiv = document.createElement("div");
    newdiv.setAttribute("class", "postclass");
    newdiv.setAttribute("id", "postclass");
    box.appendChild(newdiv);
    let li = document.createElement("line");
    li.innerHTML = `<b><u>publisher:</u></b> ${theposts[i].name}  | <b><u>Gun:</u></b> ${theposts[i].postinguser.gun.model} | <b><u>Submodel:</u></b> ${theposts[i].postinguser.gun.submodel} | `;
    newdiv.appendChild(li);
    let par = document.createElement("p");
    par.innerHTML = `" ${theposts[i].content} "`;
    newdiv.appendChild(par);
    //check if the current user wrote this post and adds options to delete/edit if so:
    if (theposts[i].postinguser.username == cuser.username) {
      let trash = document.createElement("i");
      trash.setAttribute("class", "fa-solid fa-trash");
      trash.setAttribute("id", "deletepost");
      newdiv.appendChild(trash);
      trash.addEventListener("click", () => {
        deletepost(theposts[i].id);
        showposts();
      });
      //handling edit:
      let edit = document.createElement("i");
      edit.setAttribute("class", "fa-solid fa-pen-to-square");
      newdiv.appendChild(edit);
      edit.addEventListener("click", editcontent);
      function editcontent() {
        let thecontent = theposts[i].content;
        newdiv.removeChild(par);
        let txarea = document.createElement("textarea");
        txarea.setAttribute("id", "txarea");
        txarea.cols = "80";
        txarea.rows = "4";
        txarea.value = thecontent;
        newdiv.appendChild(txarea);
        let submitedit = document.createElement("button");
        submitedit.innerHTML = "submit";
        submitedit.setAttribute("id", "submitedit");
        newdiv.appendChild(submitedit);
        submitedit.addEventListener("click", () => {
          editpost(theposts[i].id, txarea.value);
          showposts();
        });
      }
    }
  }
}

//-------------------general setting

window.onload = console.log(getposts());

function clearbox() {
  box.innerHTML = "";
}
