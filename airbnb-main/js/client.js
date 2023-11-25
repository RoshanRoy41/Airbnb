document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("button");
  
    button.addEventListener("click", async () => {
      try {
        const response = await fetch("http://localhost:3000/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: [
              { id: 1, quantity: 3 },
              { id: 2, quantity: 1 },
            ],
          }),
        });
  
        if (response.ok) {
          const { url } = await response.json();
          window.location.href = url;
        } else {
          const { error } = await response.json();
          console.error("Error:", error);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    });
  });
  