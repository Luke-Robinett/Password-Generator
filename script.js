// Global variable definitions

var passLengthField = document.querySelector("#passLengthField");
var charTypeCheckBoxes = document.querySelectorAll("[type=checkbox]");
var passwordTextArea = document.querySelector("#password");
var generateButton = document.querySelector("#generate");
var copyButton = document.querySelector("#copy");

// Function definitions

function getRandomInt(min, max) {
  // Taken from example at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function validateInput() {
  // Returns true if all form fields are valid, otherwise notifies user of field in error and returns false

  // Password length must be a number between 8 and 128
  var passLength = parseInt(passLengthField.value);
  if (isNaN(passLength)
    || passLength < 8
    || passLength > 128) {
    alert("Password length must be a number between 8 and 128");
    passLengthField.select();
    return false;
  }

  // At least one character type  checkbox must be selected
  var atLeastOneChecked = false;
  charTypeCheckBoxes.forEach(function(chkbox) {
    if (chkbox.checked) {
      atLeastOneChecked = true;
    }
  });
  if (!atLeastOneChecked) {
    alert("At least one of the character types must be chosen.");
    charTypeCheckBoxes[0].focus();
    return false;
  }

  return true;
}

function generatePassword() {
  // Generates a password based on the criteria specified on the form and returns it as a string

  var newPassword = "";

  if (validateInput()) {
    var availableChars = ["abcdefghijklmnopqrstuvwxyz",
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      "0123456789",
      " !\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~"];
    var chosenChars = "";

    // Build a string containing the types of characters the user wants based on their checkbox selections
    for (var i = 0; i < charTypeCheckBoxes.length; i++) {
      if (charTypeCheckBoxes[i].checked) {
        chosenChars += availableChars[i];
      }
    }

    // Create a password based on the character length and types of characters the user chose
    var passLength = parseInt(passLengthField.value);
    for (var i = 1; i <= passLength; i++) {
      var newChar = chosenChars[getRandomInt(0, chosenChars.length)];
      newPassword += newChar;
    }
  }
  return newPassword;
}

// Event handler for generate button
generateButton.addEventListener("click", function (event) {
  event.preventDefault();

  passwordTextArea.textContent = generatePassword();
});

// Event handler for copy button
copyButton.addEventListener("click", function (event) {
  event.preventDefault();
  
  // Code adapted from https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
  passwordTextArea.select();
  passwordTextArea.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");
});