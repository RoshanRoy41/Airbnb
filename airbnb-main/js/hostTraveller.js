const request = fetch("https://dummyjson.com/users");
console.log(request);
request
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const elements = document.getElementById("container");
    for (let i = 0; i < 6; i++) {
      const inspirationContainer = document.createElement("div");
      inspirationContainer.classList.add("inspiration");
      const p1 = document.createElement("p");
      const p2 = document.createElement("p");
      const p3 = document.createElement("p");
      p1.textContent = data.users[i].firstName;
      p2.textContent = data.users[i + 1].firstName;
      p3.textContent = data.users[i + 2].firstName;
      inspirationContainer.appendChild(p1);
      inspirationContainer.appendChild(p2);
      inspirationContainer.appendChild(p3);
      inspirationContainer.style.display = "block";
      inspirationContainer.style.padding = "20px";
      inspirationContainer.style.marginRight = "150px";
      elements.append(inspirationContainer);
    }
    elements.style.display = "flex";
  })
  .catch((error) => console.log(error.message));
