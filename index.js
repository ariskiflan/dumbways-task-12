const express = require("express");
const app = express();
const port = 3000;

const dbPool = require("./src/connection/database");

// sequalize
const { development } = require("./src/config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const SequelizePool = new Sequelize(development);

// test db
dbPool.connect((err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Database Connected");
  }
});

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
app.post("/my-project", handleMyProject);

app.get("/my-testimonials", myTestimonials);
app.get("/detail-project/:id", detailProject);

app.get("/delete/:id", handleDeleteProject);
app.get("/edit-my-project/:id", editMyProject);
app.post("/edit-my-project/:id", editMyProjectForm);

const data = [];

function home(req, res) {
  const titlePage = "Home";
  res.render("index", { titlePage });
}

function contact(req, res) {
  const titlePage = "Contact";
  res.render("contact", { titlePage });
}

async function myProject(req, res) {
  const projectNew = await SequelizePool.query("SELECT * FROM projects");
  const titlePage = "My Project";
  console.log(projectNew[0]);
  res.render("my-project", { data: projectNew[0], titlePage });
}

function myTestimonials(req, res) {
  const titlePage = "My Testimonials";
  res.render("my-testimonials", { titlePage });
}

async function detailProject(req, res) {
  const titlePage = "Detail Project";
  const { id } = req.params;
  const data = await SequelizePool.query(
    "SELECT * FROM projects where id = " + id
  );

  res.render("detail-project", { data: data[0][0], titlePage });
}

async function handleMyProject(req, res) {
  try {
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

    await SequelizePool.query(
      `INSERT INTO projects(project_name, start_date,end_date,description,technologies, "createdAt", "updatedAt",distance) VALUES ('${projectName}','${startDate}','${endDate}' ,'${description}','{${techIcon}}',NOW(), NOW(), '${distance}')`
    );
    res.redirect("/my-project");
  } catch (error) {
    throw error;
  }
}

async function editMyProject(req, res) {
  const { id } = req.params;
  const data = await SequelizePool.query(
    "SELECT * FROM projects where id = " + id
  );

  res.render("edit-my-project", { data: data[0][0] });
}

async function editMyProjectForm(req, res) {
  try {
    const { id } = req.params;
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

    await SequelizePool.query(
      `UPDATE projects SET project_name='${projectName}', start_date='${startDate}', end_date='${endDate}', description='${description}',"updatedAt"=now(), distance='${distance}', technologies='{${techIcon}}' where id = ${id}`
    );
    res.redirect("/my-project");
  } catch (error) {
    throw error;
  }
}

async function handleDeleteProject(req, res) {
  const { id } = req.params;
  const data = await SequelizePool.query(
    "DELETE FROM projects where id = " + id
  );

  res.redirect("/my-project");
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
