const express = require("express");
const app = express();
const port = 3000;

// use hbs for view engine
app.set("view engine", "hbs");
// menambahkan path
app.set("views", "src/views");
app.use("/assets", express.static("src/assets"));
app.use(express.urlencoded({ extended: false })); // body parser

// routing
app.get("/", home);
app.get("/contact", contact);
app.get("/my-project", myProject);
app.get("/my-testimonials", myTestimonials);
app.get("/detail-project/:id", detailProject);
app.post("/my-project", handleMyProject);
app.get("/delete/:id", handleDeleteProject);
app.get("/edit-my-project/:id", editMyProject);

const data = [];

function home(req, res) {
  res.render("index");
}

function contact(req, res) {
  res.render("contact");
}

function myProject(req, res) {
  res.render("my-project", { data });
}

function myTestimonials(req, res) {
  res.render("my-testimonials");
}

function detailProject(req, res) {
  const { id } = req.params;
  const dataDetailProject = data[id];

  res.render("detail-project", { data: dataDetailProject });
}

function handleMyProject(req, res) {
  const { projectName, startDate, endDate, description, techIcon } = req.body;

  const dateOne = new Date(startDate);
  const dateTwo = new Date(endDate);
  const time = Math.abs(dateTwo - dateOne);
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const months = Math.floor(time / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(time / (1000 * 60 * 60 * 24) / 365);

  let distance = [];

  if (days < 24) {
    distance += days + " Days";
  } else if (months < 12) {
    distance += months + " Month";
  } else if (years < 365) {
    distance += years + " Years";
  }

  data.unshift({
    projectName,
    startDate,
    endDate,
    description,
    distance,
    techIcon: Array.isArray(techIcon) ? techIcon : [techIcon],
  });

  res.redirect("/my-project");
}

function handleDeleteProject(req, res) {
  const { id } = req.params;
  data.splice(id, 1);

  res.redirect("/my-project");
}

function editMyProject(req, res) {
  const { id } = req.params;
  const dataEditProject = data[id];
  res.render("edit-my-project", { data: dataEditProject });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
