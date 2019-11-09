// Global variable definitions

var passLengthField = document.querySelector("#passLengthField");
var charTypeFlags = document.querySelectorAll("[type=checkbox]");
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

function generatePassword(passLength, hasLowers, hasUppers, hasNums, hasSpecials) {
 // Generates a password based on the criteria specified
 // Parameters:
 //  passLength - Length of the password in the range 8 through 128
 //  hasLowers, hasUppers, hasNums and hasSpecials - Boolean arguments indicating which of each type of character to include in the password. At least one value must be true
 // Returns: A string representing the newly generated password

 // Validate input parameters

 // Must have four parameters
 if (generatePassword.length !== arguments.length) {
  throw "Wrong number of arguments passed to generatePassword() function.";
 }

 // Password length must be a number between 8 and 128
 if (isNaN(passLength)
  || passLength < 8
  || passLength > 128) {
  throw "Password length must be a number between 8 and 128";
 }

 // At least one character type boolean must be true
 // Following line adapted from https://www.hacksparrow.com/javascript/convert-arguments-to-array.html
 argumentsArray = Array.prototype.slice.call(arguments);
 if (!argumentsArray.includes(true, 1)) {
  throw "At least one of the character types must be chosen.";
 }

 // If we made it this far, all input is good. Proceed to generating  password

 var newPassword = "";
 var availableChars = "";

 if (hasLowers) {
  availableChars += "abcdefghijklmnopqrstuvwxyz";
 }
 if (hasUppers) {
  availableChars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
 }
 if (hasNums) {
  availableChars += "0123456789";
 }
 if (hasSpecials) {
  availableChars += " !\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~";
 }

 for (var i = 1; i <= passLength; i++) {
  var newChar = availableChars[getRandomInt(0, availableChars.length)];
  newPassword += newChar;
 }

 return newPassword;
}

// Event handler for generate button
generateButton.addEventListener("click", function(event) {
 event.preventDefault();

 try {
  passwordTextArea.textContent = generatePassword(
    parseInt(passLengthField.value),
    charTypeFlags[0].checked, // has lowercase
    charTypeFlags[1].checked, // has uppercase
    charTypeFlags[2].checked, // has numbers
    charTypeFlags[3].checked // has special chars
  );
 }
 catch (ex) {
  alert(ex);
 }
});

// Event handler for copy button
copyButton.addEventListener("click", function(event) {
 event.preventDefault();
 // Code adapted from https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
 passwordTextArea.select();
 passwordTextArea.setSelectionRange(0, 99999); /*For mobile devices*/
 
 /* Copy the text inside the text field */
 document.execCommand("copy");
});