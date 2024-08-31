document.addEventListener("DOMContentLoaded", function () {
  const emailRadio = document.getElementById("login-email");
  const phoneRadio = document.getElementById("login-phone");
  const loginInput = document.getElementById("login-input");
  const loginForm = document.getElementById("login-form");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("error-message");

  // Update input placeholder based on selected login method
  function updateInputPlaceholder() {
    if (emailRadio.checked) {
      loginInput.querySelector("label").textContent = "Email:";
      loginInput.querySelector("input").setAttribute("type", "email");
      loginInput
        .querySelector("input")
        .setAttribute("placeholder", "Enter your email");
    } else if (phoneRadio.checked) {
      loginInput.querySelector("label").textContent = "Phone Number:";
      loginInput.querySelector("input").setAttribute("type", "tel");
      loginInput
        .querySelector("input")
        .setAttribute("placeholder", "Enter your phone number");
    }
  }

  // Validate the login form
  function validateForm() {
    const identifier = loginInput.querySelector("input").value.trim();
    const password = passwordInput.value.trim();
    const identifierType = emailRadio.checked ? "Email" : "Phone Number";

    if (!identifier) {
      showErrorMessage(`${identifierType} is required.`);
      return false;
    }

    if (!password) {
      showErrorMessage("Password is required.");
      return false;
    }

    if (emailRadio.checked && !validateEmail(identifier)) {
      showErrorMessage("Please enter a valid email address.");
      return false;
    }

    if (phoneRadio.checked && !validatePhone(identifier)) {
      showErrorMessage("Please enter a valid phone number.");
      return false;
    }

    return true;
  }

  // Validate email format
  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  // Validate phone number format (simple example, adjust as needed)
  function validatePhone(phone) {
    const phonePattern = /^[0-9]{10}$/; // Example: 10-digit phone number
    return phonePattern.test(phone);
  }

  // Show error message
  function showErrorMessage(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
  }

  // Hide error message
  function hideErrorMessage() {
    errorMessage.style.display = "none";
  }

  // Handle form submission
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    hideErrorMessage();

    if (validateForm()) {
      // Proceed with login (e.g., send data to the server)
      console.log("Form is valid. Submitting...");
      loginForm.submit();
    }
  });

  // Update input placeholder when the login method changes
  emailRadio.addEventListener("change", updateInputPlaceholder);
  phoneRadio.addEventListener("change", updateInputPlaceholder);

  // Set initial placeholder
  updateInputPlaceholder();

  // Message to Login Successfully
  document.getElementById("message").textContent = "Login successful!";
  window.open("/Home Page/home.html", "_blank");
});
