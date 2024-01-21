const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const app = express();
const port = 3000;

// const dbPool = require("./src/connection/database");

// sequalize
const { development } = require("./src/config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const SequelizePool = new Sequelize(development);

// test db
// dbPool.connect((err) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log("Database Connected");
//   }
// });

// use hbs for view engine
app.set("view engine", "hbs");
// menambahkan path
app.set("views", "src/views");
app.use("/assets", express.static("src/assets"));
app.use(express.urlencoded({ extended: false })); // body parser
app.use(
  session({
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1 * 60 * 60 * 1000,
    },
    resave: false,
    store: session.MemoryStore(),
    secret: "session-storage",
    saveUninitialized: true,
  })
);
app.use(flash());

// routing
app.get("/", home);
app.get("/contact", contact);
app.get("/my-project", myProject);
app.post("/my-project", handleMyProject);

app.get("/my-testimonials", myTestimonials);
app.get("/detail-project/:id", detailProject);
app.get("/register", register);
app.post("/register", handleRegister);
app.get("/login", login);
app.post("/login", handleLogin);

app.get("/delete/:id", handleDeleteProject);
app.get("/edit-my-project/:id", editMyProject);
app.post("/edit-my-project/:id", editMyProjectForm);

function register(req, res) {
  const titlePage = "Register";
  res.render("register", { titlePage });
}

async function handleRegister(req, res) {
  try {
    const { name, email, password } = req.body;

    console.log(password);
    bcrypt.hash(password, 10, async function (err, hashPass) {
      await SequelizePool.query(
        `INSERT INTO users (name, email, password, "createdAt", "updatedAt")
      VALUES ('${name}','${email}','${hashPass}' ,NOW(), NOW())`
      );
    });

    res.redirect("/login");
  } catch (error) {
    throw error;
  }
}

function login(req, res) {
  const titlePage = "Login";
  res.render("login", { titlePage });
}

async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;
    const checkEmail = await SequelizePool.query(
      `SELECT * FROM users WHERE email = '${email}'`,
      { type: QueryTypes.SELECT }
    );

    if (checkEmail.length === 0) {
      req.flash("failed", "Email is not register!");
      return res.redirect("/login");
    }

    bcrypt.compare(password, checkEmail[0].password, function (err, result) {
      if (!result) {
        return res.redirect("/login");
      } else {
        req.session.handleLogin = true;
        req.session.user = checkEmail[0].name;
        req.flash("success", "Wellcome!");
        return res.redirect("/");
      }
    });
  } catch (error) {
    throw error;
  }
}

async function home(req, res) {
  const projectNew = await SequelizePool.query("SELECT * FROM projects");
  const titlePage = "Home";

  // console.log(projectNew[0]);
  res.render("index", {
    data: projectNew[0],
    titlePage,
    handleLogin: req.session.handleLogin,
    user: req.session.user,
  });
}

function contact(req, res) {
  const titlePage = "Contact";
  res.render("contact", { titlePage });
}

async function myProject(req, res) {
  const titlePage = "My Project";

  res.render("my-project", { data: titlePage });
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
      `INSERT INTO projects(project_name, start_date,end_date,description,technologies, "createdAt", "updatedAt",distance) 
      VALUES ('${projectName}','${startDate}','${endDate}' ,'${description}','{${techIcon}}',NOW(), NOW(), '${distance}')`
    );
    res.redirect("/");
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
      `UPDATE projects SET project_name='${projectName}', start_date='${startDate}', end_date='${endDate}', 
      description='${description}',"updatedAt"=now(), distance='${distance}', technologies='{${techIcon}}' where id = ${id}`
    );
    res.redirect("/");
  } catch (error) {
    throw error;
  }
}

async function handleDeleteProject(req, res) {
  const { id } = req.params;
  const data = await SequelizePool.query(
    "DELETE FROM projects where id = " + id
  );

  res.redirect("/");
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
