import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { error, log } from "console";
import methodOverride from "method-override";


const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const api_key = "FZYGi6wwWJ+LBRmsMkYeug==hygvyQCFzhPhxXcn";
const quoteURL = "https://api.api-ninjas.com/v2/randomquotes";
const weatherURL = "https://api.api-ninjas.com/v1/weather"

app.use(express.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));




const config = {
    headers: {
      "X-Api-Key": api_key
  }
}

app.get("/", async (req, res) => {
  res.locals.posts = posts;
  const result = await getQuote();

  if (result["error"]) {
    res.render(`index.ejs`, { error: result["error"] });
  }
  res.render(`index.ejs`, {
    quote: result["quote"],
    author: result["author"]    
  });
});

app.post("/submit",(req, res) => {
    addPost(req.body.title,req.body.content);
    res.redirect("/");
});

app.post("/api/location", async (req, res) => {
  const { latitude, longitude } = req.body;
  console.log("Client location:", latitude, longitude); 
  
  const weatherData = await getWeatherData(latitude,longitude);
  if (weatherData["error"]) {
    res.json({ error: weatherData["error"] });
  }
   res.json({ temp: weatherData.temp });
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

async function getQuote() {
  try {
    const result = await axios.get(quoteURL, config);
    let [{ quote, author }] = result.data;
    return { quote, author };
  } catch (error) {
    return {error:error.message};
  }
}

async function getWeatherData(lt,ln) {
    try {
      const result = await axios.get(`${weatherURL}?lat=${lt}&lon=${ln}`,config)
      let {temp} = result.data;
      return {temp};
    } catch (error) {
        return {error:error.message };
    }
}









