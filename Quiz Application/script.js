const questions = [
    {
        question:"Which is largest animal in the world?", 
        answers: [
                {text: "Elephant", correct: false},
                {text: "Blue Whale", correct:true},
                {text: "Giraffe", correct: false},
                {text: "camel", correct: false}
        ]
    },
    {
        question:"Which is largest desert in the world?", 
        answers: [
                {text: "kalahari", correct: false},
                {text: "gobi", correct:false},
                {text: "sahara", correct: false},
                {text: "antartica", correct: true}
        ]
    },
    {
        question:"Which is smallest continent in the world?", 
        answers: [
                {text: "Australia", correct: true},
                {text: "Asia", correct:false},
                {text: "Africa", correct: false},
                {text: "Europe", correct: false}
        ]
    },
    {
        question:"Which is smallest country in the world?", 
        answers: [
                {text: "vatican city", correct: true},
                {text: "India", correct:false},
                {text: "china", correct: false},
                {text: "pakistan", correct: false}
        ]
    },
    {
        question:"who invented the bulb?", 
        answers: [
                {text: "Vasco da gama", correct: false},
                {text: "Albert einstein", correct:false},
                {text: "Thomas Alva Edison", correct: true},
                {text: "Newton", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("ans-btn");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.classList.remove("hide");
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Restart';
    nextButton.classList.remove("hide");
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();