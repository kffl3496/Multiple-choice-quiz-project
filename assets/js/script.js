// define global variables
var highScoreCounter = document.getElementById('highScoreCounter');
var timeCounter = document.getElementById('timeCounter');
var container = document.getElementById('container');
var startbutton = document.getElementById('startbutton');
var questionNumber = 0;
var numberOfQuestions = 0;
var timerDuration = 60;
var timerSpan = document.getElementById('timerSpan');
var timerId = null;
var timer = 0;

// var questionObject = {
//   question: 'Question1',
//   answers: ['Answer1', '*Answer2', 'Answer3'],
//   correctAnswer: 1
// };

// define our questions and answers
var questionArray = [
  {
    question: 'Question1',
    answers: ['Answer1', '*Answer2', 'Answer3'],
    // we know the answer by the location in the answers array above
    correctAnswer: 1
  },
  {
    question: 'Question2',
    answers: ['Answer1', 'Answer2', '*Answer3'],
    correctAnswer: 2
  },  
  {
    question: 'Question3',
    answers: ['Answer1', 'Answer2', '*Answer3'],
    correctAnswer: 2
  },  
];

// array to hold the high scores
var highScores = [];

// add an eventlistener for the start button
startbutton.addEventListener("click", startQuiz);

// inital function to start the project
function startQuiz() {
  questionNumber = 0;
  endTimer();
  startTimer(timerDuration);
  numberOfQuestions = questionArray.length;
  showQuestion(questionNumber);
}

function showQuestion(questionNumber) {
  container.innerHTML = '<h1>' + questionArray[questionNumber].question + '</h1>';
  container.innerHTML += '<br/>';
  for(var i = 0; i < questionArray[questionNumber].answers.length; i++) {
    var correctAnswer = questionArray[questionNumber].correctAnswer;
    container.innerHTML += '<button type="button" onclick="buttonClick(' + correctAnswer + ', value)" value=' + i + '>' + questionArray[questionNumber].answers[i] + '</button>';
    container.innerHTML += '<br/>';
  }
}

function buttonClick(correctAnswer, value) {
  if (correctAnswer == value) {
    // correct
    alert('right');
  } else {
    // incorrect
    alert('wrong');
    // shortcut for: timer = timer - 10;
    // we can make this dynamic by assigning it to a global variable
    timer-=10;
  }
  questionNumber++;
  if(questionNumber < numberOfQuestions) {
    showQuestion(questionNumber);
  } else {
    endTimer();
    finishQuiz();
  }
}

function finishQuiz() {
  container.innerHTML = 'Quiz Finished your final score is: ' + timer;
  container.innerHTML += '<br/>';
  container.innerHTML += 'Enter initials: ';
  container.innerHTML += '<input id="initials" type="text">';
  container.innerHTML += '<button type="button" onclick="saveHighScore()">Submit</button>';
}

function startTimer(timerDuration) {
  timer = timerDuration;
  timerId = setInterval(function() {
    timerSpan.innerHTML = timer;
    if (timer === 0) {
      endTimer();
    }
    timer--;
  }, 1000);
}

function endTimer() {
  clearInterval(timerId);
}

function saveHighScore() {
  var initials = document.getElementById('initials');
  var score = {
    initials: initials.value,
    score: timer
  };
  highScores.push(score);
  showHighScores();
}

function showHighScores() {
  timerSpan.innerHTML = timer;
  container.innerHTML = 'High Scores';
  container.innerHTML += '<br/>';
  for(var i = 0; i < highScores.length; i++) {
    // console.log('highScores[i]', i,  highScores[i]);
    container.innerHTML += highScores[i].initials + ' ' + highScores[i].score;
    container.innerHTML += '<br/>';
  }
  container.innerHTML += '<br/>';
  container.innerHTML += '<button type="button" onclick="clearHighScores()">Clear High Scores</button>';
}

function clearHighScores() {
  highScores = [];
  showHighScores();
}
