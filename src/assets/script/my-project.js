const projects = [];

function addProject(e) {
  e.preventDefault();

  const projectName = document.getElementById("exampleInputName").value;
  const startDate = document.getElementById("exampleInputStartDate").value;
  const endDate = document.getElementById("exampleInputEndDate").value;
  const description = document.getElementById("floatingTextarea2").value;
  const nodeJs = document.getElementById("flexCheckDefaultNode").checked;
  const reactJs = document.getElementById("flexCheckDefaultReact").checked;
  const angularJs = document.getElementById("flexCheckDefaultAngular").checked;
  const java = document.getElementById("flexCheckDefaultJava").checked;

  let image = document.getElementById("formFile").files;
  image = URL.createObjectURL(image[0]);

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

  const project = {
    projectName,
    startDate,
    endDate,
    description,
    nodeJs,
    reactJs,
    angularJs,
    java,
    distance,
    image,
  };

  // const localProject = JSON.stringify(project);
  // window.localStorage.setItem("projects", localProject);

  projects.unshift(project);
  // renderMyProject();

  document.querySelector("form").reset();

  let html = "";

  for (let i = 0; i < projects.length; i++) {
    let renderIcon = "";
    if (projects[i].nodeJs) {
      renderIcon += `<i class="fa-brands fa-node"></i>`;
    }
    if (projects[i].reactJs) {
      renderIcon += `<i class="fa-brands fa-react"></i>`;
    }
    if (projects[i].angularJs) {
      renderIcon += `<i class="fa-brands fa-angular"></i>`;
    }
    if (projects[i].java) {
      renderIcon += `<i class="fa-brands fa-java"></i>`;
    }

    html += `
        <div class="box">
          <a href="/detail-project/1">
            <img src="${projects[i].image}" alt="" class="list-img" />
          </a>
          <h3 class="list-project-title">${projects[i].projectName}</h3>
          <p class="list-project-duration">
            Duration: ${projects[i].distance}
          </p>
          <p class="list-project-description">${projects[i].description} </p>

          <div class="list-icon">
            ${renderIcon}
          </div>

          <div class="button-box">
            <button type="submit" class="list-btn">Edit</button>
            <button type="submit" class="list-btn">Delete</button>
          </div>
        </div>
    `;
  }

  document.querySelector(".list-box").innerHTML = html;
}
