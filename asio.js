const formTitle = document.getElementById("formTitle");
const authForm = document.getElementById("authForm");
const message = document.getElementById("message");
const actionBtn = document.getElementById("actionBtn");
const switchToSignup = document.getElementById("switchToSignup");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

let isLogin = true; // toggle between login and signup

// 🔄 Toggle password visibility
togglePassword.addEventListener("click", () => {
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  togglePassword.textContent = type === "password" ? "👁️" : "🙈";
});

// 🔁 Switch between Login and Signup
switchToSignup.addEventListener("click", (e) => {
  e.preventDefault();
  isLogin = !isLogin;

  if (isLogin) {
    formTitle.textContent = "Login";
    actionBtn.textContent = "Login";
    switchToSignup.textContent = "Sign Up";
    document.querySelector(".switch-text").innerHTML = `Don’t have an account? <a href="#" id="switchToSignup">Sign Up</a>`;
  } else {
    formTitle.textContent = "Sign Up";
    actionBtn.textContent = "Sign Up";
    document.querySelector(".switch-text").innerHTML = `Already have an account? <a href="#" id="switchToSignup">Login</a>`;
  }

  // reattach the event to the new link
  document.getElementById("switchToSignup").addEventListener("click", switchToSignupClick);
  message.textContent = "";
});

function switchToSignupClick(e) {
  e.preventDefault();
  switchToSignup.click();
}

// 🧠 Handle form submit
authForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    message.textContent = "Please fill out all fields!";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (isLogin) {
    // LOGIN MODE
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      message.style.color = "rgb(40, 233, 40)";
      message.textContent = `Welcome back, ${username}!`;
      localStorage.setItem("loggedUser", username);
      setTimeout(() => {
        alert(`Logged in as ${username}`);
        // redirect to dashboard.html (optional)
      }, 1000);
    } else {
      message.style.color = "rgb(233, 40, 40)";
      message.textContent = "Invalid username or password!";
    }
  } else {
    // SIGNUP MODE
    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      message.textContent = "Username already taken!";
    } else {
      users.push({ username, password });
      localStorage.setItem("users", JSON.stringify(users));
      message.style.color = "rgb(40, 233, 40)";
      message.textContent = "Account created! You can now log in.";
      isLogin = true;
      formTitle.textContent = "Login";
      actionBtn.textContent = "Login";
    }
  }
});
