
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var phoneInput = document.getElementById("phone");
var reasonInput = document.getElementById("reason");
var additionalInput = document.getElementById("addInfo");
var numChecked = document.querySelectorAll('input[type="checkbox"]:checked').length;

function validate () {

  // Name and one form of contact information (Email or Phone) should be filled in
  if (!(nameInput.value && (emailInput.value || phoneInput.value))) {
    if (nameInput.value) alert("Please include at least one way to contact you (either an email or phone number)");
    else if (emailInput.value || phoneInput.value) alert("Please enter your name");
    else alert("Make sure you have entered your name and atleast one way to contact you");
    return false;
  }

  // If Reason for Inquiry's dropdown is selected to Other, make sure that the Additional Information is filled in.
  if (reasonInput.value == "other" && !additionalInput.value) {
    alert("Please explain your reason for inquiring in the Additional Information section");
    return false;
  }

  // Best days to contact you must have at least one day checked
  if (numChecked < 1) {
    alert("Please select at least one day that is convenient to contact you");
    return false;
  }
}

// TODO: alert("Line 1\nLine 2");   build up to one alert msg at the end?   and return false if alertMsg true
