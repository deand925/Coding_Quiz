const buttonStart = document.querySelector('.button');
const questPage = document.querySelector('.quiz-quest');
const timer = document.querySelector('.timer');
const displayScore = document.querySelector('.score');
const displayHighScore = document.querySelector('.high-score');
const resultsPage = document.querySelector('.quiz-results');
const tryAgainEl = document.querySelector('.try-again');
const tryAgainButton = document.querySelector('.try-again-button');
const startPage = document.querySelector('.starter-page')
let timeInterval;
let globalIndex = 0;
let score = 0;
let time = 90;
// Begin of questions list
const questions = [
    {
        "title": "Which of the following keywords is used to define a variable in Javascript?",
        "options": ["var", "let", "both var and let", "none of the above"],
        "answer": "both var and let"
    },
    {
        "title": "Javascript is an _______ language?",
        "options": ["object-oriented", "object-based", "procedural", "none of the above"],
        "answer": "object-oriented"
    },
    {
        "title": "Upon encountering empty statements, what does the Javascript Interpreter do?",
        "options": ["throws an error", "ignores the statements", "gives a warning", "none of the above"],
        "answer": "ignores the statements"
    },
    {
        "title": "What keyword is used to check whether a given property is valid or not?",
        "options": ["in", "is in", "exists", "lies"],
        "answer": "in"
    },
    {
        "title": "When an operator’s value is NULL, the type of returned by the unary operator is:",
        "options": ["boolean", "unidefined", "object", "integer"],
        "answer": "object"
    },
    {
        "title": "What does the Javascript “debugger” statement do?",
        "options": ["it will debug the errors in the program at runtime", "it will act as a breakpoint in a program", "it will debug error in the current statement if any", "all the above"],
        "answer": "it will act as a breakpoint in a program"
    },
    {
        "title": "Which function is used to serialize an object into a JSON string in Javascript?",
        "options": ["stringify()", "parse()", "convert()", "none of the above"],
        "answer": "stringify()"
    },
    {
        "title": "Which of the following are closures in Javascript?",
        "options": ["variables", "functions", "objects", "all the above"],
        "answer": "all the above"
    },
    {
        "title": "Which of the following is not a Javascript framework?",
        "options": ["node", "vue", "react", "cassandra"],
        "answer": "cassandra"
    },
    {
        "title": "Which of the following keywords is used to define a variable in Javascript?",
        "options": ["var", "let", "both var and let", "none of the above"],
        "answer": "both var and let"
    },
]


// Start of starter Function 
buttonStart.addEventListener('click', () => {
    timer.textContent = time;
    displayScore.textContent = score;
    // hide starter page 
    startPage.style.display = 'none';
    // hide try again page 
    tryAgainEl.style.display = 'none';
     // hide try again button
    questPage.style.display = 'block';
    // set timer
    timeInterval = setInterval(function () {
        timer.innerHTML = time;
        if (time === 0) {
            clearInterval(timeInterval);
        }
        time--;
    }, 1000);
    displayQuest();
})

function displayQuest() {
    questPage.innerHTML = '';
    let titleQuest = document.createElement('h2');
    titleQuest.classList.add('title-h2')
    // adding question to h2 element //
    titleQuest.textContent = questions[globalIndex].title;
    // adding h2 element to parent div //
    questPage.appendChild(titleQuest);
    let optionsQuest = document.createElement('div');
    optionsQuest.classList.add('options-div');
    for (let i = 0; i < questions[globalIndex].options.length; i++) {
        let answerButton = document.createElement('button');
        answerButton.classList.add('options-button');
        answerButton.textContent = questions[globalIndex].options[i];
        optionsQuest.appendChild(answerButton);
        answerButton.addEventListener('click', checkAnswer);
    }
    questPage.appendChild(optionsQuest);
    console.log(questions[globalIndex].answer)
}

// traditionally put e as an evvent
function checkAnswer(event) {
    if (event.target.textContent === questions[globalIndex].answer) {
        resultsPage.textContent = 'Correct!';
        // add to score
        score = score + 1;
        displayScore.textContent = score;
    } else {
        resultsPage.textContent = 'Incorrect';
        //subtract time
        time -= 5;
    }

    // give a 1 second pause showing the results before moving onto the next question
    setTimeout(() => {
        resultsPage.textContent = '';
        // increase the index by 1 each time a question is answered
        globalIndex++;
        // check if all questions have been answered or if time has run out
        if (globalIndex === 10 || time === 0) {
            globalIndex = 0;
            // display the high score div
            displayHighScore.style.display = 'block';
            // stop the time
            clearInterval(timeInterval);
            // hide the questions page
            questPage.style.display = 'none';
            checkHighScore();
        } else {
            displayQuest();
        }
    }, 1000)

}

function checkHighScore() {
    // get high score from local storage
    let highScore = Number(localStorage.getItem('high-score'));
    // get initials from local storage
    let pastInitals = localStorage.getItem('initials');
    // check if user score is greater then high score stored in local storage
    if (score > highScore) {
        highScore = score;
        // user is asked to input initials if they have the new high score
        let initials = prompt('Congratulations, you achieved the new high score!!! Please enter your initails to let everyone know what you achieved.')
        // users initials are saved 
        pastInitals = initials;
        // save user initials to local storage
        localStorage.setItem("initials", initials);
        // save new high score to local storage
        localStorage.setItem("high-score", highScore);
    }

    // display new high score with user's initials
    const highScoreTitle = document.createElement('p');
    highScoreTitle.classList.add('.high-score-title')
    highScoreTitle.textContent = 'High Score';
    displayHighScore.appendChild(highScoreTitle);
    const highScoreNumber = document.createElement('p');
    highScoreNumber.textContent = pastInitals + " - " + highScore;
    displayHighScore.appendChild(highScoreNumber);
    tryAgainEl.style.display = 'flex';
}

tryAgainButton.addEventListener('click', () => {
    // hide the high score div
    displayHighScore.style.display = 'none';
    // hide try again button
    tryAgainEl.style.display = 'none';
    // display starter page 
    startPage.style.display = 'flex';
    resetTimerScore();
})

function resetTimerScore() {
    time = 90;
    timer.textContent = time;
    score = 0;
    displayScore.textContent = score;
    highScoreTitle.remove();
    highScoreNumber.remove();
}