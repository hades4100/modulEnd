export let userlist = [];
export let currentuser = {};

function loadusers() {
  let tocheck = JSON.parse(localStorage.getItem("userlist"));
  if (tocheck != null) {
    userlist = tocheck;
  } else {
    userlist = [];
  }
}
export function setcurrentuser(input) {
  window.localStorage.removeItem("cuser");
  currentuser = input;
  localStorage.setItem("cuser", JSON.stringify(currentuser));
}
export function getcurrentuser() {
  let temp = JSON.parse(localStorage.getItem("cuser"));
  return temp;
}
export class user {
  constructor(username, password, gun) {
    this.username = username;
    this.password = password;
    this.gun = gun;
  }
}

export function getuserlist() {
  return userlist;
}
export function adduser(username, password, gun) {
  userlist.push(new user(username, password, gun));
  localStorage.setItem("userlist", JSON.stringify(userlist));
}
window.onload = loadusers();
