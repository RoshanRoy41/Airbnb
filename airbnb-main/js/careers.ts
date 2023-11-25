interface JQuery {
  modal(action: string): void;
}

interface JQueryStatic {
  modal(options?: any): void;
}

// Your existing TypeScript code follows...

const scriptURL: string =
  "https://script.google.com/macros/s/AKfycbzKEPrJ_gg0FaEpNBFrMBO3mVSwy4V8pgDnDMBfYudpRWqAvzfbgd2fKLGkHl1POz7e/exec";

const form = document.getElementById("applicationForm") as HTMLFormElement;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (form.checkValidity()) {
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        alert("Submit Successfull");
      })
      .then(() => {
        // window.location.reload();
      })
      .catch((error) => console.error("Error!", error.message));
    form.reset();
    $("#applicationModal").modal("hide");
  } else {
    form.classList.add("was-validated");
  }
});

async function fetchData() {
  try {
    const response = await fetch(
      "https://api-generator.retool.com/Z4W4JZ/data"
    );
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    const course: any[] = data;
    let randomId: number[] = [];
    const coursesContainer = document.getElementById(
      "coursesContainer"
    ) as HTMLDivElement;

    const row = document.createElement("div");
    row.className = "row justify-content-center";

    for (let i = 0; i < 12; i++) {
      if (i % 2 === 0) {
        const newRow = document.createElement("div");
        newRow.className = "row justify-content-center";
      }

      randomId[i] = Math.floor(Math.random() * course.length);
      const courseElement = document.createElement("div");
      courseElement.className = "courseElement col-xl-3 col-lg-3 m-3";

      const jobTitle = document.createElement("h2");
      jobTitle.textContent = `${course[randomId[i]].Jobs}`;
      const jobDesc = document.createElement("p");
      jobDesc.textContent = `${course[randomId[i]].Description}`;
      const jobText = document.createElement("div");
      jobText.className = "jobText";
      const applyNow = document.createElement("button");
      if (applyNow) {
        applyNow.className =
          "applyNow section-btn btn btn-primary btn-block";
        applyNow.setAttribute("data-toggle", "modal");
        applyNow.setAttribute("data-target", "#applicationModal");
        applyNow.textContent = "Apply Now";
        

        applyNow.addEventListener("click", () => {
          $("#applicationModal").modal("show");
        });
      }

      applyNow.textContent = "Apply Now";
      jobText.appendChild(jobTitle);
      jobText.appendChild(jobDesc);
      courseElement.appendChild(jobText);
      courseElement.appendChild(applyNow);

      row.appendChild(courseElement);

      if (i === 9 || i % 2 !== 0) {
        coursesContainer.appendChild(row);
      }
    }
  } catch (error) {
    console.error("error:", error);
  }
}

fetchData();
