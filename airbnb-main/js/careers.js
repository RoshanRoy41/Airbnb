var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Your existing TypeScript code follows...
const scriptURL = "https://script.google.com/macros/s/AKfycbzKEPrJ_gg0FaEpNBFrMBO3mVSwy4V8pgDnDMBfYudpRWqAvzfbgd2fKLGkHl1POz7e/exec";
const form = document.getElementById("applicationForm");
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
    }
    else {
        form.classList.add("was-validated");
    }
});
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://api-generator.retool.com/Z4W4JZ/data");
            if (!response.ok) {
                throw new Error(`API request failed with status: ${response.status}`);
            }
            const data = yield response.json();
            console.log(data);
            const course = data;
            let randomId = [];
            const coursesContainer = document.getElementById("coursesContainer");
            const row = document.createElement("div");
            row.className = "row justify-content-center";
            for (let i = 0; i < 12; i++) {
                if (i % 2 === 0) {
                    const newRow = document.createElement("div");
                    newRow.className = "row justify-content-center";
                }
                randomId[i] = Math.floor(Math.random() * course.length);
                const courseElement = document.createElement("div");
                courseElement.className = "courseElement col-xl-3 col-lg-3 m-3 card";
                const div1 = document.createElement("div");
                div1.className = "first-content";
                const jobTitle = document.createElement("h2");
                jobTitle.textContent = `${course[randomId[i]].Jobs}`;
                const jobTitle2 = document.createElement("h2");
                jobTitle2.textContent = `${course[randomId[i]].Jobs}`;
                jobTitle2.className = "small-title";
                const div2 = document.createElement("div");
                div2.className = "second-content";
                const jobDesc = document.createElement("p");
                jobDesc.textContent = `${course[randomId[i]].Description}`;
                // const jobText = document.createElement("div");
                // jobText.className = "jobText";
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
                div1.appendChild(jobTitle);
                div2.appendChild(jobTitle2);
                div2.appendChild(jobDesc);
                div2.appendChild(applyNow);
                courseElement.appendChild(div1);
                courseElement.appendChild(div2);
                row.appendChild(courseElement);
                if (i === 9 || i % 2 !== 0) {
                    coursesContainer.appendChild(row);
                }
            }
        }
        catch (error) {
            console.error("error:", error);
        }
    });
}
fetchData();
