const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Markup Language"],
        answer: 0
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<js>", "<script>", "<javascript>", "<code>"],
        answer: 1
    },
    {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets", "Creative Style Sheets"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question").innerText = question.question;
    const options = document.getElementById("options-container");
    options.innerHTML = "";

    question.options.forEach((option, index) => {
        const optionHTML = `<input type="radio" name="option" value="${index}"> ${option}<br>`;
        options.innerHTML += optionHTML;
    });

    document.getElementById("prev-btn").style.display = currentQuestionIndex > 0 ? "inline" : "none";
    document.getElementById("next-btn").style.display = currentQuestionIndex < questions.length - 1 ? "inline" : "none";
    document.getElementById("submit-btn").style.display = currentQuestionIndex === questions.length - 1 ? "inline" : "none";
}

function getSelectedAnswer() {
    const selectedOption = document.querySelector("input[name='option']:checked");
    return selectedOption ? parseInt(selectedOption.value) : null;
}

function nextQuestion() {
    const selectedAnswer = getSelectedAnswer();
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
        score += 10;
    }
    currentQuestionIndex++;
    loadQuestion();
}

function prevQuestion() {
    if (getSelectedAnswer() === questions[currentQuestionIndex].answer) {
        score -= 10;
    }
    currentQuestionIndex--;
    loadQuestion();
}

function submitQuiz() {
    const selectedAnswer = getSelectedAnswer();
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
        score += 10;
    }
    const totalScore = questions.length * 10;
    const resultMessage = score >= totalScore * 0.7 ? "Congratulations! You passed." : "Better luck next time.";
    document.getElementById("quiz").innerHTML = `Your score: ${score} / ${totalScore}<br>${resultMessage}`;
}

loadQuestion();
