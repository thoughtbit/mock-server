var username = "admin";
var password = "admin";
var loggedIn = false;
document.getElementById("login").addEventListener("click", (e) => {
  e.target.disabled = true;
  fetch("/auth/" + (loggedIn ? "logout" : "login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      loggedIn = !loggedIn;
      e.target.disabled = false;
      e.target.innerText = loggedIn ? "Logout" : "Login";
      document.getElementById("response").innerText = JSON.stringify(data, null, 2);
    });
});
