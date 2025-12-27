import express from "express";
import bodyParser from "body-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { log } from "console";
import methodOverride from "method-override";


const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.get("/",(req, res) => {
    res.locals.posts = posts;    
    res.render(`${__dirname}/views/index.ejs`);
});

app.post("/submit",(req, res) => {
    addPost(req.body.title,req.body.content);
    res.redirect("/");
});

app.put("/update", (req, res) => {
    editPost(req.body.pid,req.body.title,req.body.content);
    res.redirect("/");
});

app.delete("/delete", (req, res) => {
    deletePost(req.body.pid);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

const posts = [];

function generateRandomID(){
    return Math.floor(Math.random() * 500000);
}

function getArrIndex(pid) {
  for (let index = 0; index < posts.length; index++) {
    if (posts[index].pid === pid) {
      return index;
    }
  }
  return -1;
}

function addPost(title,content){
    let postID = generateRandomID();
    const postStr = {pid: postID, title:title, content:content};
    posts.push(postStr);
    console.log(posts);
}

function editPost(strPid,title,content){
    const pid = parseInt(strPid, 10);
    let arrIdx = getArrIndex(pid);
    const updatedPost = {pid, title, content };
    // get the actual arr index via pid
    posts[arrIdx] = updatedPost;
    console.log(posts);
}

function deletePost(strPid){
    const pid = parseInt(strPid, 10);
    let arrIdx = getArrIndex(pid);
    // get the actual arr index via pid
    posts.splice(arrIdx , 1);
    console.log(posts);
}











