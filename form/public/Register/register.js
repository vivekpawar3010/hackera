// document.getElementById('registration-form').addEventListener('submit', function(event) {
//     event.preventDefault();

//     // Get form values
//     const name = document.getElementById('name').value.trim();
//     const email = document.getElementById('email').value.trim();
//     const password = document.getElementById('password').value.trim();

//     // Basic validation
//     if (name === '' || email === '' || password === '') {
//         document.getElementById('message').textContent = 'All fields are required!';
//         return;
//     }

//     // Simple email validation
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(email)) {
//         document.getElementById('message').textContent = 'Please enter a valid email address!';
//         return;
//     }

//     document.getElementById('message').textContent = 'Registration successful!';
//     window.open('/Home Page/home.html', '_blank');
//     // Reset form
//     document.getElementById('registration-form').reset();
// });
document
  .getElementById("registration-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Basic validation
    if (name === "" || email === "" || password === "") {
      document.getElementById("message").textContent =
        "All fields are required!";
      return;
    }

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      document.getElementById("message").textContent =
        "Please enter a valid email address!";
      return;
    }

    document.getElementById("message").textContent = "Registration successful!";
    window.open("/Home Page/home.html", "_blank");

    // Reset form
    document.getElementById("registration-form").reset();
  });
