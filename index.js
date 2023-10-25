import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

let welcome = false;
let newList = false;
let listName = "";
let listsArr = [];
let tasksList = [];

function List (name, tasks =[]){
    this.name = name;
    this.tasks = tasks;
}



app.get("/", (req, res) => {
    welcome = true;  
    newList = false;
    listsArr = [];
    tasksList = [];
    res.render(__dirname + "/views/index.ejs", {
    welcome,
    newList,
    listsArr,
    tasksList
})
})


app.post("/", (req, res) => {
    welcome = false;
    newList = true;
        
    res.render(__dirname + "/views/index.ejs", {
        welcome,
        newList,
        listsArr,
        tasksList
})
    });


app.post("/submit", (req, res) => {
    const list = new List (req.body.userInput);
    tasksList = [];
    if (req.body.userInput) {
    listsArr.push(list);
    newList = false;

    res.render(__dirname + "/views/index.ejs", {
        welcome,
        listsArr,
        newList,
        tasksList
        
}) }
    });
   
    app.post("/task", (req, res) => {
        let indexList = req.body.list
        if (!tasksList.includes(indexList)) {
        tasksList.push(indexList); 
        };  

    
        res.render(__dirname + "/views/index.ejs", {
            welcome,
            listsArr,
            newList,
            tasksList
        })
    
    })

    app.post("/taskname", (req, res) => {
        let indexList = req.body.list;

        if (req.body.taskname){
       
        listsArr[indexList].tasks.push(req.body.taskname);      
      
        let toDelete = (e) => e == indexList;
        let deleteTaskI = tasksList.findIndex(toDelete);

        tasksList.splice(deleteTaskI, 1);
        res.render(__dirname + "/views/index.ejs", {
            welcome,
            listsArr,
            newList,
            tasksList
        });    };   });

    app.post("/delete", (req, res) => {
            let indexList = req.body.list;
            listsArr.splice(indexList,1);
            if (listsArr.length == 0) {
                welcome = true;  
            };        
            res.render(__dirname + "/views/index.ejs", {
                welcome,
                listsArr,
                newList,
                tasksList
            });   });

            app.post("/deleteT", (req, res) => {

                listsArr[req.body.list].tasks.splice(req.body.task, 1);
                
                res.render(__dirname + "/views/index.ejs", {
                    welcome,
                    listsArr,
                    newList,
                    tasksList
                });
            });

    
           
    

app.listen(port, () => {
    console.log(`On port ${port}`);
});


