"use strict";

function processForm(e) {
  if (e.preventDefault) e.preventDefault();
  let form_div = document.getElementById("form");
  let summoner_id = document.getElementById("summoner-id").value;
  
  if (summoner_id === "" || summoner_id == null) {
    alert("Please enter a summoner ID.")
  } else {
    formdiv.className = "go-away"
  }

  return false;
}

window.addEventListener("load", function() {
  let butt = getElementById("submit-button");
  if (butt.attachEvent) {
    butt.attachEvent("click", processForm);
  } else {
    butt.addEventListener("click", processForm);
  }
}, false)
