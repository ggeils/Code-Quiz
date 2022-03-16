const questions = [
    {question: "Commonly used data types DO NOT include:", 
    options: ["strings", "booleans", "alerts", "numbers"], 
    answer: "alerts"},

    {question: "The condition in an if / else statement is enclosed within _____.", 
    options: ["quotes", "curly brackets", "parentheses", "square brackets"], 
    answer: "parentheses"},

    {question: "Arrays in Javascript can be used to store _____.", 
    options: ["numbers & strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above"},

    {question: "String values must be enclosed within _____ when being assigned to letiables.", 
    options: ["commas", "curly brackets", "quotes", "parantheses"], 
    answer: "quotes"},

    {question: "A very useful tool used during development and debugging for printing content to the debugger is:", 
    options: ["Javascript", "terminal/bash", "for loops", "console.log"], 
    answer: "terminal/bash"}
];

let userAnswers = ["","","","",""];
let correctAnswers = 0;
let score = "";
let questionInd = 0;
let startTimer = 0;
let secondsLeft = 120;
let questionPrompt = $('#question-prompt');
let ansContainEl = $('#answer-buttons');
let startButton = $('#start-btn');
let previousButton = $('#prev-btn');
let nextButton = $('#next-btn');
let submitButton = $('#submit-btn');

$(ansContainEl).on('click',selectAns)
$(startButton).on('click',startQuiz)
$(nextButton).on('click',nextQuest)
$(previousButton).on('click',prevQuest)
$(submitButton).on('click',results)


