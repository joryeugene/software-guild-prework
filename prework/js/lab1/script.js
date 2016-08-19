var bet = document.getElementById("bet"),
    playBtn = document.getElementById("play"),
    output = document.getElementById("output"),
    results = document.getElementById("results"),
    rules = document.getElementById("rules"),
    rulesBtn = document.getElementById("rulesBtn"),
    resultsBtn = document.getElementById("resultsBtn"),
    hint = document.getElementById("hint"),
    tds = document.getElementsByTagName("td"),
    count = 0, maxCount = 0, luckyCount = 0, currentMoney, maxMoney, betTest;

// Allow user to press enter from the input field to start the game
bet.addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
        playBtn.click();
    }
});

function playGame() {
  resetContent();
  validateInput();
  // Set initial maxMoney in the case of never making more than the initial bet
  currentMoney = betTest;
  maxMoney =  currentMoney;
  playing();
  populateResults();
  resetGame();
  showHint();
}

// Game helpers
function resetContent () {
  output.innerHTML = "<div class='label'>Game Log</div>";
  results.innerHTML = "<div class='label'>Results</div><table><tr><th>Starting Bet</th><td></td></tr><tr><th>Highest Cash Total</th><td></td></tr><tr><th>Roll Count at Highest Cash Total</th><td></td></tr><tr><th>Total Rolls Before Going Broke</th><td></td></tr></table>";
  hint.style.visibility = "hidden";
  showResults();
}

function validateInput () {
  betTest = parseInt(bet.value);
  while (isNaN(betTest) || betTest < 1 || betTest > 50) {
    betTest = parseInt(prompt("Bet by entering a number from 1 to 50"));
  }
}

function playing () {
  while (currentMoney > 0) {
    var die1 = 1 + Math.floor(Math.random() * 6),
        die2 = 1 + Math.floor(Math.random() * 6),
        win = false;
    if (die1+die2==7) {
      currentMoney+=4;
      luckyCount++;
      win = true;
    } else currentMoney-=1;
    count++;
    if (currentMoney > maxMoney) {
      maxMoney = currentMoney;
      maxCount = count;
    }
    // Game log output
    // This is quite slow for larger numbers, so I have to set a <100 upper limit on the initial bet if included
    if (win) {
      output.innerHTML += "<span class='first'>You rolled " + die1 + " and " + die2 + " and <mark>won $4!</mark></span><br>";
      output.innerHTML += "<span class='second win'>Roll #" + count + " and your cash total is <ins>$" + currentMoney +"</ins></span><br>";
    } else {
      output.innerHTML += "<span class='first'>You rolled " + die1 + " and " + die2 + " and lost $1</span><br>";
      output.innerHTML += "<span class='second lose'>Roll #" + count + " and your cash total is <ins>$" + currentMoney +"</ins></span><br>";
    }
  }
}

function populateResults () {
  // Grammar
  var roll1 = (maxCount==1) ? " roll" : " rolls",
      roll2 = (count==1) ? " roll" : " rolls",
      times = (luckyCount==1) ? " time" : " times";
  // Results table
  tds[0].innerHTML = "$" + betTest;
  tds[1].innerHTML = "$" + maxMoney;
  tds[2].innerHTML = maxCount + roll1;
  tds[3].innerHTML = count + roll2;
  if (luckyCount) results.innerHTML += "<p><mark><b>You rolled a <i>Lucky Seven</i> " +luckyCount+times+ ".</b></mark></p>";
  if (betTest == maxMoney) results.innerHTML += "<p><mark>Dang... you never made more than your starting cash.</mark></p>";
  if (count == betTest) results.innerHTML += "<p><mark><b>And not even one <i>Lucky Seven</i>... it is not your day!</b></mark></p>";
}

function resetGame () {
  count = 0;
  maxCount = 0;
  luckyCount = 0;
  playBtn.innerHTML = "Play Again?";
  bet.value = "";
  bet.focus();
}

// Buttons at the bottom of the page
function showRules () {
  output.style.display = "none";
  results.style.display = "none";
  rules.style.display = "block";
  rulesBtn.style.display = "none";
  resultsBtn.style.display = "block";
}

function showResults () {
  output.style.display = "block";
  results.style.display = "block";
  rules.style.display = "none";
  resultsBtn.style.display = "none";
  rulesBtn.style.display = "block";
}

// Hint on input focus
function showHint () {
    hint.style.visibility = "visible";
}

function hideHint () {
  hint.style.visibility = "hidden";
}
