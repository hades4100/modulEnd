import { adduser, getuserlist } from "./users.js";

export class post {
  constructor(name, content, postinguser) {
    if (posts.length < 1) {
      this.id = 10;
    } else {
      this.id = generateRandomInteger(1000);
    }
    this.name = name;
    this.content = content;
    this.postinguser = postinguser;
  }
}

export let posts = [];
window.onload = loadposts();

function loadposts() {
  let tocheck = JSON.parse(localStorage.getItem("posts"));
  if (tocheck != null) {
    posts = tocheck;
  } else {
    posts = [];
  }
}
//-----------------adding posts:

export function addpost(name, content, postinguser) {
  posts.push(new post(name, content, postinguser));
  localStorage.setItem("posts", JSON.stringify(posts));
}
export function getposts() {
  return JSON.parse(localStorage.getItem("posts"));
}
//-----------------delete posts:

export function deletepost(postid) {
  let theposts = getposts();
  var position = -1;
  if (confirm("Are you sure you want to delete the post?")) {
    for (let i = 0; i < theposts.length; i++) {
      if (theposts[i].id == postid) {
        position = i;
      }
    }
    theposts.splice(position, 1);
    localStorage.setItem("posts", JSON.stringify(theposts));
  } else {
    // Do nothing!
    console.log("delete aborted");
  }
}
//-----------------edit posts:
export function editpost(postid, editedcontent) {
  let theposts = getposts();
  var position = -1;
  for (let i = 0; i < theposts.length; i++) {
    if (theposts[i].id == postid) {
      theposts[i].content = editedcontent;
      localStorage.setItem("posts", JSON.stringify(theposts));
    }
  }
}

//-----------------id handling:
function generateRandomInteger(max) {
  let num = 0;
  let status = false;
  while (status == false) {
    num = Math.floor(Math.random() * max) + 1;
    if (checkifidexist(num) == true) {
      status = false;
    } else {
      status = true;
    }
  }
  return num;
}
function checkifidexist(number) {
  let status = false;
  let posts = JSON.parse(localStorage.getItem("posts"));
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id == number) {
      status = true;
    } else {
      status = false;
    }
  }
  return status;
}
