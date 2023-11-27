const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question:
        'Mature is a quality which means...',
        choice1: 'Showing great courage',
        choice2: 'Someone or something can be dependable or trusted',
        choice3: 'Acting like an adult, not a child',
        choice4: 'Sure to do things well',
        answer: 3,
    },
    {
        question:
        "I can not stand...loud parties again.",
        choice1: "Attend",
        choice2: "To attend",
        choice3: "Attending",
        choice4: "Attended",
        answer: 3,
    },
    {
        question: 
        "It is important...the rules.",
        choice1: "To know",
        choice2: "Knowing",
        choice3: "Known",
        choice4: "Know",
        answer: 1,
    },
    {

        question:
        "…is a title of a book published by Barack Obama for his PhD.",
        choice1: "Audacious",
        choice2: "Audacity",
        choice3: "Of audacity",
        choice4: "At Audacity",
        answer: 2,
    },
    {
        question:
        "Jacqueline feels...that she would receive a nice grade.",
        choice1: "In optimism",
        choice2: "By optimism",
        choice3: "Optimism",
        choice4: "Optimistic",
        answer: 4,
    },
    {
        question:
        "Self-confidence is a personality feature which stands for:",
        choice1: "Feeling or showing a lot of interest about something.",
        choice2: "Being sure to do things well.",
        choice3: "Having a trait of trust and being dependable",
        choice4: "Adapting easily to different situations.",
        answer: 2,
    },
    {
        question:
        "I can not afford…this outfit.",
        choice1: "Purchasing",
        choice2: "To purchase",
        choice3: "Purchased",
        choice4: "For purchasing",
        answer: 1,
    },
    {
        question:
        "If a person is reliable, it means...",
        choice1: "Being able to multi-task",
        choice2: "Having a capacity to be dependable or trusted",
        choice3: "Always telling the truth and does not cheat or steal",
        choice4: "Showing a great deal of courage",
        answer: 2,
    },
    {
        question:
        "I managed …the place with the help of a map.",
        choice1: "Finding",
        choice2: "Found",
        choice3: "At finding",
        choice4: "To find",
        answer: 4,
    },
    {
        question:
        "That young boy knows how...a drone.",
        choice1: "To operate",
        choice2: "Operated",
        choice3: "Operating",
        choice3: "In operating",
        answer: 1,
    }
       
];


//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};
startGame ()