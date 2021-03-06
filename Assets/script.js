const questions = [
  {
    question: "Commonly used data types DO NOT include:",
    options: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within _____.",
    options: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    question: "Arrays in Javascript can be used to store _____.",
    options: [
      "numbers & strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    question:
      "String values must be enclosed within _____ when being assigned to letiables.",
    options: ["commas", "curly brackets", "quotes", "parantheses"],
    answer: "quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: ["Javascript", "terminal/bash", "for loops", "console.log"],
    answer: "terminal/bash",
  },
];

let userAnswers = ["", "", "", "", ""];
let correctAnswers = 0;
let score = "";
let questionInd = 0;
let startTimer = 0;
let secondsLeft = 120;
let questionPrompt = $("#question-prompt");
let ansContainEl = $("#answers");
let startButton = $("#start-btn");
let previousButton = $("#previous-btn");
let nextButton = $("#next-btn");
let submitButton = $("#submit-btn");

$(ansContainEl).on("click", selectAnswer);
$(startButton).on("click", Start);
$(nextButton).on("click", nextQuestion);
$(previousButton).on("click", previousQuest);
$(submitButton).on("click", Results);

function Start() {
  startTimer = 1;
  randomizeQuest = shuffleArray(questions);
  $(startButton).addClass("hide");
  $(questionPrompt).text(randomizeQuest[questionInd].question);
  questions[questionInd].options.forEach((ans) => {
    let button = $("<button>");
    let buttonID = uniqueID(ans);
    $(button).addClass("btn btn-primary btn-block chosen");
    $(button).attr("id", buttonID);
    $(button).text(ans);
    $("#answers").append(button);
  });
  $(ansContainEl).removeClass("hide");
  $(nextButton).removeClass("hide");
}

function selectAnswer(e) {
  if (userAnswers[questionInd] === "") {
    if (e.target !== e.currentTarget) {
      userAnswers.splice(questionInd, 1, e.target.textContent);
      let answerID = uniqueID(questions[questionInd].answer);
      if (e.target.id == answerID) {
        $("#" + e.target.id).addClass("btn-success");
        $("#" + e.target.id).removeClass("btn-primary");
        correctAnswers++;
      } else {
        $("#" + e.target.id).addClass("btn-danger");
        $("#" + e.target.id).removeClass("btn-primary");
        secondsLeft -= 30;
      }
    }
    e.stopPropagation();
  }
}

function prevAnswerStyle() {
  if (userAnswers[questionIndex] != "") {
    let prevAnswerID = uniqueID(userAnswers[questionIndex]);
    let answerID = uniqueID(questions[questionInd].answer);
    if (prevAnswerID == answerID) {
      $("#" + prevAnswerID).addClass("btn-success");
    } else {
      $("#" + prevAnswerID).addClass("btn-danger");
    }
  }
}

function nextQuestion() {
  Reset();
  let qi = 1;
  questionState(qi);

  $(questionPrompt).text(randomizeQuest[questionInd].question);
  questions[questionInd].options.forEach((ans) => {
    let button = $("<button>");
    let buttonID = uniqueID(ans);
    $(button).addClass("btn btn-primary btn-block chosen");
    $(button).attr("id", buttonID);
    $(button).text(ans);
    $("#answers").append(button);
  });
  prevAnswerStyle();
  if (questionInd == 1) {
    $(previousButton).removeClass("hide");
  }
  if (questionInd > 3) {
    $(nextButton).addClass("hide");
    $(submitButton).removeClass("hide");
  }
}

function Reset() {
  if (score == "") {
    $("#answers").empty();
  } else {
    startTimer = 0;
    $("#quiz-card").empty();
  }
}

function Results() {
  score = ((correctAnswers / userAnswers.length) * 100).toFixed(1);
  Reset();

  let saveForm = $("<div>");
  let saveFormBtn = $("<button>");
  let formButtons = $("<div>");
  let formRetryBtn = $("<button>");
  let formClearBtn = $("<button>");
  let formLabel = $("<label>");
  let formInput = $("<input>");
  let formSmall = $("<small>");
  let resultStyle = $("<div>");
  let line = $("<div>");
  let space = $("<br/>");
  let scoreHistory = $("<ul>");

  $(resultStyle).addClass("card-title");
  $(scoreHistory).addClass("list-group list-group-flush hide");
  $(saveForm).addClass("form-group");
  $(line).addClass("line");
  $(scoreHistory).attr("id", "score-hist");
  $(scoreHistory).text("Score History:");
  $(resultStyle).text("Your score: " + score + "%");

  $("#quiz-card").append(
    resultStyle,
    line,
    space,
    scoreHistory,
    saveForm,
    formButtons
  );

  $(saveForm).attr("id", "form-save-score");
  $(formInput).addClass("form-control");
  $(formSmall).addClass("form-text text-muted");
  $(formButtons).addClass("form-grp-btns");
  $(formInput).attr("placeholder", "Your initials");
  $(formButtons).attr("id", "form-control-btn");
  $(formInput).attr("id", "form-input-init");
  $(formLabel).text("Enter your initials");
  $(formSmall).text("Click save to register your score!");

  $("#form-save-score").append(formLabel, formInput, formSmall);

  $(saveFormBtn).attr("type", "submit");
  $(formRetryBtn).attr("type", "button");
  $(formClearBtn).attr("type", "button");
  $(saveFormBtn).addClass("btn btn-primary");
  $(formRetryBtn).addClass("btn btn-primary");
  $(formClearBtn).addClass("btn btn-danger hide");
  $(saveFormBtn).attr("id", "save-btn");
  $(formRetryBtn).attr("id", "retry-btn");
  $(formClearBtn).attr("id", "clear-btn");
  $(saveFormBtn).text("Save");
  $(formRetryBtn).text("Retry");
  $(formClearBtn).text("Clear");

  $("#form-control-btn").append(saveFormBtn, formRetryBtn, formClearBtn);
  $("#form-control-btn").on("click", formControl);
}

function previousQuest() {
  Reset();
  let qi = -1;
  questionState(qi);
  $(questionPrompt).text(randomizeQuest[questionInd].question);
  questions[questionInd].options.forEach((ans) => {
    let button = $("<button>");
    let buttonID = uniqueId(ans);
    $(button).addClass("btn btn-primary btn-block chosen");
    $(button).attr("id", buttonID);
    $(button).text(ans);
    $("#answer-buttons").append(button);
  });
  prevAnswerStyle();
  if (questionInd == 0) {
    $(previousButton).addClass("hide");
  }
  if (questionInd < 4) {
    $(nextButton).removeClass("hide");
    $(submitButton).addClass("hide");
  }
}

function formControl(e) {
  if (e.target !== e.currentTarget) {
    if (e.target.id == "save-btn") {
      $("#clear-btn").removeClass("hide");
      $("#form-save-score").addClass("hide");
      $("#" + e.target.id).addClass("hide");

      let userResult = [];
      let userInput = $("#form-input-init").val();
      let results = [];
      let previousResults = [];

      userResult.push(score);
      userResult.push(secondsLeft);
      results.push(userResult);

      if (localStorage.getItem(userInput) == null) {
        localStorage.setItem(userInput, JSON.stringify(results));
      } else {
        for (let i = 0; i < localStorage.length; i++) {
          if (localStorage.key(i) == userInput) {
            previousResults = JSON.parse(localStorage.getItem(userInput));
            previousResults.push(results[0]);
            results = previousResults;
            localStorage.setItem(userInput, JSON.stringify(results));
          }
        }
      }
      $("#score-hist").removeClass("hide");

      for (let i = 0; i < localStorage.length; i++) {
        previousResults = JSON.parse(localStorage.getItem(localStorage.key(i)));
        for (let j = 0; j < previousResults.length; j++) {
          resultText =
            localStorage.key(i) +
            " -    Score: " +
            previousResults[j][0] +
            " -    Time taken: " +
            (120 - previousResults[j][1]) +
            " seconds.";
          let list = $("<li>");
          $(list).addClass("list-group-item");
          $(list).attr("id", "list-item");
          $(list).text(resultText);
          $("#score-hist").append(list);
        }
      }
    } else if (e.target.id == "retry-btn") {
      location.reload();
    } else if (e.target.id == "clear-btn") {
      localStorage.clear();
      $("#clear-btn").addClass("hide");
      $("#score-hist").text("Score History: Cleared!");
    }
  }
  e.stopPropagation();
}

function questionState(qi) {
  if (qi > 0) {
    questionInd++;
  } else if (qi < 0) {
    questionInd--;
  }
}

function uniqueID(str) {
  let uid = "";
  for (let i = 0; i < 3; i++) {
    uid += str.charAt(i);
  }
  return uid;
}

function Timer() {
  let timerInterval = setInterval(function () {
    if (startTimer > 0) {
      secondsLeft--;
    }
    document.getElementById("display").value = "" + secondsLeft + " sec";
    if (secondsLeft <= 0) {
      if (secondsLeft < 0) {
        document.getElementById("display").value = "";
      }
      clearInterval(timerInterval);
      Results();
    }
  },
  1000);
}

function shuffleArray(array) {
  let m = array.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

Timer();
