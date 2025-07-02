const questions = [
    { question: "Quel est le vrai nom d'Iron Man ?",
        answers: ["Steve Rogers", "Tony Stark", "Bruce Banner", "Clint Barton"],
        correct: 2,
        about: "Le vrai nom d'Iron Man est Anthony Edward 'Tony' Stark, le célébre industriel milliardaire PDG de Stark Industrie."
    },
    { question: "Qui est le premier Avenger dans l’ordre chronologique des films du MCU ?",
        answers: ["Captain America", "Iron Man", "Black Widow", "Hulk"],
        correct: 1,
        about: "Dans l'ordre chronologiques, le premier Avengers à été 'Captain America: First Avenger' sortie en 2011."
    },
    { question: "Quel est le nom de la sœur de Wanda Maximoff ?",
        answers: ["Natasha", "Agatha", "Elle n’a pas de sœur", "Monica"],
        correct: 3,
        about: "Wanda Maximoff n'a pas de soeur mais un frère jumaux qui ce nomme 'Pietro Maximoff'."
    },
    { question: "Quelle pierre de l’infini est située dans le front de Vision ?",
        answers: ["Pierre du Temps", "Pierre de l’Âme", "Pierre de l’Esprit", "Pierre du Pouvoir"],
        correct: 3,
        about: "La pierre de l'infini dans le front de vision est la Pierre de l'Esprit, il a fait son apparition dans 'Avengers: Age of Ultron' en 2015."
    },
    { question: "Quel est le nom du soldat devenu le Faucon ?",
        answers: ["James Rhodes", "Nick Fury", "Scott Lang", "Sam Wilson"],
        correct: 4,
        about: "Le soldat Faucon est 'Sam Wilson'. Introduit dans la suite en 2014 dans 'Captain America : Le Soldat de l'hiver'."
    },
];

// DEBUT
const startContainer = document.querySelector("#start-container");
const startButton = document.querySelector("#start-button");

// QUESTIONS
const questionContainer = document.querySelector("#question-container");
const questionText = document.querySelector("#question-text");
const answer1 = document.querySelector("#answer1");
const answer2 = document.querySelector("#answer2");
const answer3 = document.querySelector("#answer3");
const answer4 = document.querySelector("#answer4");
const validateButton = document.querySelector("#validate-button");

// REPONSES
const aboutContainer = document.querySelector("#about-container");
const answerResult = document.querySelector("#answer-result");
const answerText = document.querySelector("#about-answer");
const nextButton = document.querySelector("#next-button");

// TIMER
const timerContainer = document.querySelector("#timer-container");
const timerText = document.querySelector("#timer-text");

let timer;
let timeLeft = 20;

// SCORE
const scoreContainer = document.querySelector("#score-container");
const scoreTitle = document.querySelector("#score-title");
const scoreText = document.querySelector("#score");
const restartButton = document.querySelector("#restart-button");

let selectedAnswerIndex = null;
let currentQuestionIndex = 0;
let score = 0;


startButton.addEventListener("click", startGame);
function startGame() {
    startButton.style.display = "none";
    startContainer.style.display = "none";
    aboutContainer.style.display = "none";
    questionContainer.style.display = "block";
    questionText.style.display = "block";
    answer1.style.display = "block";
    answer2.style.display = "block";
    answer3.style.display = "block";
    answer4.style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    answer1.textContent = currentQuestion.answers[0];
    answer2.textContent = currentQuestion.answers[1];
    answer3.textContent = currentQuestion.answers[2];
    answer4.textContent = currentQuestion.answers[3];

    selectedAnswerIndex = null;
    validateButton.disabled = true;
    answerButtons.forEach(btn => {
        btn.classList.remove("selected");
        btn.disabled = false;
    });

    questionText.classList.remove("animate-question");
    void questionText.offsetWidth;
    questionText.classList.add("animate-question");

    clearInterval(timer);
    startTimer();
}

function startTimer() {
    timeLeft = 20;
    timerText.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerText.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    answerButtons.forEach(btn => btn.disabled = true);
    questionText.textContent = "Temps écoulé !";

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showScore();
        }
    }, 2000);
}

const answerButtons = [answer1, answer2, answer3, answer4];
answerButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        selectedAnswerIndex = index +1;
        validateButton.disabled = false;
        answerButtons.forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
    });
});

function checkAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.style.display = "none";
    aboutContainer.style.display = "block";
    if (selectedAnswer === currentQuestion.correct) {
        score++;
        answerResult.textContent = "Correct !";
        answerResult.style.color = "#2ecc71";
        answerText.textContent = currentQuestion.about;
    } else if (selectedAnswer !== currentQuestion.correct) {
        answerResult.textContent = "Incorrect !";
        answerResult.style.color = "#e74c3c";
        answerText.textContent = currentQuestion.about;
    }
}

validateButton.addEventListener("click", () => {
    if (selectedAnswerIndex !== null) {
        clearInterval(timer);
        checkAnswer(selectedAnswerIndex);
    }
});

nextButton.addEventListener("click", () => {
    aboutContainer.style.display = "none";
    questionContainer.style.display = "block";
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    questionContainer.style.display = "none";
    scoreContainer.style.display = "block";
    scoreTitle.textContent = "Le quiz est terminé !";
    scoreText.textContent = ` ${score} sur ${questions.length}`;
    restartButton.style.display = "block";
}

function restartGame() {
    score = 0;
    currentQuestionIndex = 0;
    scoreContainer.style.display = "none";
    startContainer.style.display = "block";
    startButton.style.display = "block";
    restartButton.style.display = "none";
}
restartButton.addEventListener("click", restartGame);
