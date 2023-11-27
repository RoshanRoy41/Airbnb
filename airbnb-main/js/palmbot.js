function toggleChat() {
  document.querySelector(".main-container").style.display =
    document.querySelector(".main-container").style.display === "none"
      ? "block"
      : "none";
  document.getElementById("numberCard").style.display = "none";

  document.getElementById("mainCard").style.display = "none";
}
const chatInput = document.querySelector(".chat-input");
const sendButton = document.querySelector(".send-btn");
const chatContainer = document.querySelector(".chat-container");
const deleteButton = document.querySelector(".delete-btn");
const themeButton = document.querySelector(".theme-btn");

const API_KEY = "AIzaSyCWWhEYotFwZX1_PDCytVTw2dh3QxHkVnw";
let UserText = null;

const loadDataFromLocalStorage = () => {
  // Set theme color
  const themeColor = localStorage.getItem("themeColor");
  document.body.classList.toggle("light-mode", themeColor === "light_mode");
  themeButton.innerText = document.body.classList.contains("light-mode")
    ? "dark_mode"
    : "light_mode";

  // Set initial chat history
  const defaultText = `<div class="default-text">
                            <h1>Airbnb Query Bot</h1>
                            <h3>Chat Bot powered by PalmAPI.</h3>
                        </div>`;
  chatContainer.innerHTML = defaultText;

  // Scroll to the bottom
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

const createChatElement = (content, className) => {
  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat", className);
  chatDiv.innerHTML = content;
  return chatDiv;
};

const getChatResponse = async (inChatDiv) => {
  const API_ENDPOINT =
    "https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=" +
    API_KEY;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: {
        context: "Act like an Airbnb chatbot",
        examples: [],
        messages: [
          {
            content: UserText,
          },
        ],
      },
      temperature: 0.25,
      top_k: 40,
      top_p: 0.95,
      candidate_count: 1,
    }),
  };

  try {
    const response = await fetch(API_ENDPOINT, requestOptions);
    const data = await response.json();
    if (
      data.filters &&
      data.filters.length > 0 &&
      data.filters[0].reason === "OTHER"
    ) {
      inChatDiv.querySelector(".typing-animation").remove();
      const errorMessage = "Sorry, I can't assist you with this.";
      const errorElement = document.createElement("p");
      errorElement.textContent = errorMessage;
      inChatDiv.querySelector(".chat-details").appendChild(errorElement);
    } else if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content
    ) {
      inChatDiv.querySelector(".typing-animation").remove();
      const message = data.candidates[0].content;
      const messageElement = document.createElement("p");
      messageElement.textContent = message;
      inChatDiv.querySelector(".chat-details").appendChild(messageElement);
    } else {
      throw new Error("API call failed");
    }
  } catch (error) {
    inChatDiv.querySelector(".typing-animation").remove();
    const errorElement = document.createElement("p");
    errorElement.classList.add("error");
    errorElement.textContent =
      "Oops! Something went wrong while retrieving the response. Please try again.";
    inChatDiv.querySelector(".chat-details").appendChild(errorElement);
  }

  localStorage.setItem("all-chats", chatContainer.innerHTML);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

const copyResponse = (copyBtn) => {
  const responseTextElement = copyBtn.parentElement.querySelector("p");
  navigator.clipboard.writeText(responseTextElement.textContent);
  copyBtn.textContent = "done";
  setTimeout(() => (copyBtn.textContent = "content_copy"), 1000);
};

const showTypingAnimation = () => {
  const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="./images/robot.png" alt="chatbot-img">
                        <div class="typing-animation">
                            <div class="typing-dot" style="--delay: 0.2s"></div>
                            <div class="typing-dot" style="--delay: 0.3s"></div>
                            <div class="typing-dot" style="--delay: 0.4s"></div>
                        </div>
                    </div>
                    <span onclick="copyResponse(this)" class="material-symbols-rounded">content_copy</span>
                </div>`;
  const inChatDiv = createChatElement(html, "incoming");
  chatContainer.appendChild(inChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
  getChatResponse(inChatDiv);
};

const handleOutgoingChat = () => {
  UserText = chatInput.value.trim();
  if (!UserText) return;

  chatInput.value = "";
  chatInput.style.height = `${initialInputHeight}px`;

  const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="./images/user.png" alt="user-img">
                        <p>${UserText}</p>
                    </div>
                </div>`;

  const outChatDiv = createChatElement(html, "outgoing");
  chatContainer.querySelector(".default-text")?.remove();
  chatContainer.appendChild(outChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
  setTimeout(showTypingAnimation, 500);
  getChatResponse(outChatDiv);
};

deleteButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all the chats?")) {
    localStorage.removeItem("all-chats");
    loadDataFromLocalStorage();
  }
});

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  localStorage.setItem("themeColor", themeButton.innerText);
  // themeButton.innerText = document.body.classList.contains("light-mode")
  //   ? "dark_mode"
  //   : "light_mode";
});

const initialInputHeight = chatInput.scrollHeight;

chatInput.addEventListener("input", () => {
  chatInput.style.height = `${initialInputHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleOutgoingChat();
  }
});

loadDataFromLocalStorage();
sendButton.addEventListener("click", handleOutgoingChat);
function showNumber() {
  document.getElementById("numberCard").style.display =
    document.getElementById("numberCard").style.display === "none"
      ? "block"
      : "none";
  document.querySelector(".main-container").style.display = "none";

  document.getElementById("mainCard").style.display = "none";
}
function showMenu() {
  document.getElementById("mainCard").style.display =
    document.getElementById("mainCard").style.display === "none"
      ? "block"
      : "none";
  document.querySelector(".main-container").style.display = "none";

  document.getElementById("numberCard").style.display = "none";
}
