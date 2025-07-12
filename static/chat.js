
// const chatForm = document.getElementById("chat-form");
// const userInput = document.getElementById("user-input");
// const chatWindow = document.getElementById("chat-window");
// const welcomeScreen = document.getElementById("welcome-screen");
// const messagesContainer = document.getElementById("messages-container");

// function fillSuggestion(text) {
//   userInput.value = text;
//   userInput.focus();
// }

// function hideWelcomeScreen() {
//   welcomeScreen.classList.add("hidden");
//   messagesContainer.classList.remove("hidden");
// }

// // ✨ Sanitize and format AI message content
// function sanitizeMessage(message) {
//   if (!message) return "";

//   // Remove extra newlines, preserve basic bullets and headers
//   return message
//     .replace(/\r/g, "")                                // Remove carriage returns
//     .replace(/\n{3,}/g, "\n\n")                        // Max two line breaks
//     .replace(/---+/g, "<hr />")                        // Convert dividers to <hr>
//     .replace(/^### (.*$)/gm, "<strong>$1</strong>")    // Convert h3 to bold
//     .replace(/^[-*] (.*$)/gm, "• $1")                  // Bullets
//     .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")  // Bold markdown
//     .replace(/(\n)/g, "<br />")                        // Convert newlines to <br>
//     .trim();
// }

// // 💬 Add chat bubble
// function addMessage(message, isUser = false) {
//   const cleanedMessage = sanitizeMessage(message);
//   const messageDiv = document.createElement("div");

// messageDiv.className = `chat-bubble flex items-start gap-1 ${
//   isUser ? "justify-start" : "justify-end"
// }`;

// const bubbleClass = isUser
//   ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
//   : "bg-white border border-gray-200 text-gray-800";


//   messageDiv.innerHTML = `
//     <div class="max-w-xs lg:max-w-md px-3 py-2.5 rounded-lg ${bubbleClass} shadow text-sm leading-snug whitespace-normal">
//       ${cleanedMessage}
//     </div>
//   `;

//   messagesContainer.appendChild(messageDiv);
//   chatWindow.scrollTop = chatWindow.scrollHeight;
// }

// // ⏳ Show typing indicator
// function showTypingIndicator() {
//   const typingDiv = document.createElement("div");
//   typingDiv.className = "flex justify-end";
//   typingDiv.id = "typing-indicator";

//   typingDiv.innerHTML = `
//     <div class="bg-white border border-gray-200 text-gray-800 px-3 py-1 rounded-lg shadow-sm">
//       <div class="flex space-x-1 items-center h-3">
//         <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
//         <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
//         <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
//       </div>
//     </div>
//   `;

//   messagesContainer.appendChild(typingDiv);
//   chatWindow.scrollTop = chatWindow.scrollHeight;
// }

// // ❌ Remove typing indicator
// function removeTypingIndicator() {
//   const typingIndicator = document.getElementById("typing-indicator");
//   if (typingIndicator) typingIndicator.remove();
// }

// // 🚀 Handle form submit
// chatForm.addEventListener("submit", async function (e) {
//   e.preventDefault();

//   const message = userInput.value.trim();
//   if (!message) return;

//   if (!welcomeScreen.classList.contains("hidden")) {
//     hideWelcomeScreen();
//   }

//   addMessage(message, true);
//   userInput.value = "";
//   showTypingIndicator();

//   try {
//     const response = await fetch("/chat", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ message }),
//     });

//     const data = await response.json();
//     removeTypingIndicator();
//     addMessage(data.response, false);
//   } catch (error) {
//     console.error("Error:", error);
//     removeTypingIndicator();
//     addMessage("❌ Something went wrong. Please try again.", false);
//   }
// });

// // Autofocus input on page load
// userInput.focus();



const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const chatWindow = document.getElementById("chat-window");
const welcomeScreen = document.getElementById("welcome-screen");
const messagesContainer = document.getElementById("messages-container");

function fillSuggestion(text) {
  userInput.value = text;
  userInput.focus();
}

function hideWelcomeScreen() {
  welcomeScreen.classList.add("hidden");
  messagesContainer.classList.remove("hidden");
}

// ✨ Sanitize and format AI message content
function sanitizeMessage(message) {
  if (!message) return "";

  return message
    .replace(/\r/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/---+/g, "<hr />")
    .replace(/^### (.*$)/gm, "<strong>$1</strong>")
    .replace(/^[-*] (.*$)/gm, "• $1")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/(\n)/g, "<br />")
    .trim();
}

// 💬 Add chat bubble with animation
function addMessage(message, isUser = false) {
  const cleanedMessage = sanitizeMessage(message);
  const messageDiv = document.createElement("div");

  messageDiv.className = `chat-bubble flex items-start gap-1 ${
    isUser ? "justify-start" : "justify-end"
  }`;

  const bubbleClass = isUser
    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
    : "bg-white border border-gray-200 text-gray-800";

  messageDiv.innerHTML = `
    <div class="max-w-xs lg:max-w-md px-3 py-2.5 rounded-lg ${bubbleClass} shadow text-sm leading-snug whitespace-normal animate-fade-in">
      ${cleanedMessage}
    </div>
  `;

  messagesContainer.appendChild(messageDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// ⏳ Show typing indicator
function showTypingIndicator() {
  const typingDiv = document.createElement("div");
  typingDiv.className = "flex justify-end";
  typingDiv.id = "typing-indicator";

  typingDiv.innerHTML = `
    <div class="bg-white border border-gray-200 text-gray-800 px-3 py-1 rounded-lg shadow-sm">
      <div class="flex space-x-1 items-center h-3">
        <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
        <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
        <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
      </div>
    </div>
  `;

  messagesContainer.appendChild(typingDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// ❌ Remove typing indicator
function removeTypingIndicator() {
  const typingIndicator = document.getElementById("typing-indicator");
  if (typingIndicator) typingIndicator.remove();
}

// 🚀 Handle form submit
chatForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const message = userInput.value.trim();
  if (!message) return;

  if (!welcomeScreen.classList.contains("hidden")) {
    hideWelcomeScreen();
  }

  addMessage(message, true); // User message
  userInput.value = "";
  showTypingIndicator();

  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    removeTypingIndicator();
    addMessage(data.response, false); // AI message
  } catch (error) {
    console.error("Error:", error);
    removeTypingIndicator();
    addMessage("❌ Something went wrong. Please try again.", false);
  }
});

// Autofocus input on load
userInput.focus();
