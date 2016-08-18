var bet = document.getElementById("bet");
var playBtn = document.getElementById("play");
var output = document.getElementById("output");
var results = document.getElementById("results");
var rules = document.getElementById("rules");
var rulesBtn = document.getElementById("rulesBtn");
var resultsBtn = document.getElementById("resultsBtn");
var tds = document.getElementsByTagName("td");
var count = 0, maxCount = 0, luckyCount = 0, currentMoney, maxMoney, betTest;

// Allow user to press enter from the input field to start the game
bet.addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
        playBtn.click();
    }
});

function playGame() {
  // Reset content if playing again and make sure hidden content is displayed
  resetContent();
  output.style.display = "block";
  results.style.display = "block";
  rules.style.display = "none";
  resultsBtn.style.display = "none";
  rulesBtn.style.display = "block";

  // Convert and test input
  betTest = parseInt(bet.value);
  while (isNaN(betTest) || betTest < 1 || betTest > 50) {
    betTest = parseInt(prompt("Bet by entering a number from 1 to 50"));
  }

  // Set initial maxMoney in the case of never making more than the initial bet
  currentMoney = betTest;
  maxMoney =  currentMoney;

  // Play the game until there is no more money to play with
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
    // This is quite slow for larger numbers, so I have to set an upper limit on the initial bet if included
    var outcome = (win) ? "won $4!" : "lost $1";
    output.innerHTML += "<span id='first'>You rolled " + die1 + " and " + die2 + " and " + outcome + "</span><br>";
    output.innerHTML += "<span id='second'>Roll #" + count + " and your cash total is <ins>$" + currentMoney +"</ins></span><br>";
  }

  // Grammar
  var roll1 = (maxCount==1) ? " roll" : " rolls";
  var roll2 = (count==1) ? " roll" : " rolls";
  var times = (luckyCount==1) ? " time" : " times";

  // Results table outcome
  tds[0].innerHTML = "$" + betTest;
  tds[1].innerHTML = "$" + maxMoney;
  tds[2].innerHTML = maxCount + roll1;
  tds[3].innerHTML = count + roll2;
  if (luckyCount) results.innerHTML += "<p><mark><b>You rolled a <i>Lucky Seven</i> " +luckyCount+times+ ".</b></mark></p>";
  if (betTest == maxMoney) results.innerHTML += "<p><mark>Dang... you never made more than your starting cash.</mark></p>";
  if (count == betTest) results.innerHTML += "<p><mark><b>And not even one <i>Lucky Seven</i>... it is not your day!</b></mark></p>";

  // Reset to play again quickly
  count = 0;
  maxCount = 0;
  luckyCount = 0;
  playBtn.innerHTML = "Play Again?";
  bet.value = "";
  bet.focus();
}

function resetContent () {
  output.innerHTML = "<div class='label'>Game Log</div>";
  results.innerHTML = "<div class='label'>Results</div><table><tr><th>Starting Bet</th><td></td></tr><tr><th>Highest Cash Total</th><td></td></tr><tr><th>Roll Count at Highest Cash Total</th><td></td></tr><tr><th>Total Rolls Before Going Broke</th><td></td></tr></table>";
}

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
