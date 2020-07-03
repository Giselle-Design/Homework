
const express = require("express");
const logger = require("morgan");
const path = require("path");
const methodOverride = require("method-override");
const app = express();
const knex = require("./db/connection");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,  "public")));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));

app.use(
  methodOverride((req, res) => {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);



app.get("/", (req, res) => {
  res.render("welcome");
});

app.get("/cohorts/new", (req, res) => {
  res.render("cohorts/new");
});


app.get("/cohorts/:id", (req, res) => {
  const { id } = req.params; // const id : req.params.id
  const { method, quantity} = req.query
  knex("cohorts")
    .where("id", id)
    .first()
    .then((cohort) => {
      let arr = [];
      if (method === "NPT") {
        const namesArr = cohort.members.split(',');
        while (namesArr.length){
          arr.push(namesArr.splice(0,quantity));
        }
        // console.log(arr);
      }
      else if (method === "TC") {
        const namesArr = cohort.members.split(',');
        const memberCount = namesArr.length;
        while (namesArr.length){
          arr.push(namesArr.splice(0,Math.ceil(memberCount/quantity)));
        }
      }
      res.render("cohorts/show", { cohort, arr });
   });

});





app.post("/cohorts", (req, res) => {
  const formData = req.body;
  const { logo, title, members } = formData;
  console.log(logo,title,members);

  knex("cohorts")
    .insert({
      imageUrl:logo,
      title:title,
      members:members
    })

    .returning("*")
    .then(() => {
      res.redirect("/cohorts");
    });
});


app.get("/cohorts", (req, res) => {
  knex("cohorts")
    .orderBy("title", "DESC")
    .then((cohorts) => {
      res.render("cohorts/index", { cohorts });
    });
});


app.delete("/cohorts/:id", (req, res) => {
  knex("cohorts")
    .where("id", req.params.id)
    .del()
    .then(() => {
      //When we delet one item (one event) after that we back to the events page.
      res.redirect("/cohorts");
    });
});




const PORT = 3000;
const ADDRESS = "localhost";

app.listen(PORT, ADDRESS, () => {
  console.log(`Server listening on http://${ADDRESS}:${PORT}`);
});
