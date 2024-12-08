function validateForm() {
  const name = document.getElementById("name").value.trim();
  const birthday = document.getElementById("birthday").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  const terms = document.getElementById("terms").checked;

  const nameError = document.getElementById("nameError");
  const birthdayError = document.getElementById("birthdayError");
  const emailError = document.getElementById("emailError");
  const subjectError = document.getElementById("subjectError");
  const messageError = document.getElementById("messageError");
  const termsError = document.getElementById("termsError");
  const formMessage = document.getElementById("formMessage");

  // Remove false answers
  nameError.textContent = "";
  birthdayError.textContent = "";
  emailError.textContent = "";
  subjectError.textContent = "";
  messageError.textContent = "";
  termsError.textContent = "";
  formMessage.textContent = "";

  let isValid = true;

  // Validtion
  if (name === "") {
      nameError.textContent = "Name is required.";
      isValid = false;
  }

  if (birthday === "") {
      birthdayError.textContent = "Birthday is required.";
      isValid = false;
  }

  if (email === "") {
      emailError.textContent = "Email is required.";
      isValid = false;
  } else if (!email.includes("@")) {
      emailError.textContent = "Email must contain '@'.";
      isValid = false;
  }

  if (subject === "") {
      subjectError.textContent = "Subject is required.";
      isValid = false;
  }

  if (message === "") {
      messageError.textContent = "Message is required.";
      isValid = false;
  }

  if (!terms) {
      termsError.textContent = "You must agree to the privacy policy.";
      isValid = false;
  }

  if (isValid) {
      formMessage.textContent = "Form successfully sent!";
      formMessage.style.color = "green";

      document.getElementById("name").value = "";
      document.getElementById("birthday").value = "";
      document.getElementById("email").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("message").value = "";
      document.getElementById("terms").checked = false;

  } else {
      formMessage.textContent = "Please correct the errors above.";
      formMessage.style.color = "red";
  }
}

  // change mode
  function setTheme(mode) {
    if (mode === 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  }
//Default mode
window.onload = function() {
    setTheme('light'); 
};