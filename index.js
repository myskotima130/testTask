"use strict";
const form = document.getElementById("form");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(this);

  fetch(
    "http://codeit.pro/codeitCandidates/serverFrontendTest/user/registration",
    {
      method: "post",
      body: formData
    }
  )
    .then(res => res.json())
    .then(json => {
      if (json.status != "OK") {
        alert(json.message);
      } else {
        window.location.replace("company.html");
      }
    })
    .catch(error => console.log(error));
});
