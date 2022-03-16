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
let ansContainEl = $("#answer-buttons");
let startButton = $("#start-btn");
let previousButton = $("#prev-btn");
let nextButton = $("#next-btn");
let submitButton = $("#submit-btn");

$(ansContainEl).on("click", selectAnswer);
$(startButton).on("click", Start);
$(nextButton).on("click", nextQuestion);
$(previousButton).on("click", prevQuest);
$(submitButton).on("click", results);

function Start() {
  startTimer = 1;
  randomizeQuest = shuffle(questions);
  $(startButton).addClass("hide");
  pt;
  $(questionPrompt).text(randomizeQuest[questionInd].question);
  questions[questionInd].options.forEach((ans) => {
    let button = $("<button>");
    let buttonID = uniqueId(ans);
    $(button).addClass("btn btn-primary btn-block chosen");
    $(button).attr("id", buttonID);
    $(button).text(ans);
    $("#answer-buttons").append(button);
  });
  $(ansContainEl).removeClass("hide");
  $(nextButton).removeClass("hide");
}

function selectAnswer(e) {
  if (userAnswers[questionInd] === "") {
    if (e.target !== e.currentTarget) {
      userAnswers.splice(questionInd, 1, e.target.textContent);
      let answerID = uniqueId(questions[questionInd].answer);
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

function nextQuestion() {
  resetQuestions();
  let qi = 1;
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
  prevAnsStyle();
  if (questionInd == 1) {
    $(previousButton).removeClass("hide");
  }
  if (questionInd > 3) {
    $(nextButton).addClass("hide");
    $(submitButton).removeClass("hide");
  }
}