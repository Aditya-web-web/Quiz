let btns = document.querySelectorAll(".option-button");
let nextBtn = document.querySelector("#next");
let question = document.querySelector("#question");
let index = 0;
let selectedBtn = null;
let score = 0;

const questions = [
    {
        question: "Which is the largest animal in the world ?",
        options: [
            { option: "Shark", correct: false },
            { option: "Blue Whale", correct: true },
            { option: "Elephant", correct: false },
            { option: "Giraffe", correct: false }
        ]
    },
    {
        question: "Which is the smallest country in the world ?",
        options: [
            { option: "Vatican City", correct: true },
            { option: "Bhutan", correct: false },
            { option: "Nepal", correct: false },
            { option: "Sri Lanka", correct: false }
        ]
    },
    {
        question: "Which is the largest desert in the world ?",
        options: [
            { option: "Kalahari", correct: false },
            { option: "Gobi", correct: false },
            { option: "Sahara", correct: true },
            { option: "Thar", correct: false }
        ]
    },
    {
        question: "Which is the smallest continent in the world ?",
        options: [
            { option: "Asia", correct: false },
            { option: "Australia", correct: true },
            { option: "Africa", correct: false },
            { option: "Arctic", correct: false }
        ]
    }
];

btns.forEach((btn, idx) => {
    btn.addEventListener("click", (e) => {
        selectedBtn = e.currentTarget;
        selectedBtn.selectedIndex = idx;
        btns.forEach((x) => {
            x.classList.remove("select");
        });
        selectedBtn.classList.add("select");
        nextBtn.style.display = "block";
        nextBtn.innerText = "Submit";
    });
});

function chkAnswer() {
    let selectedIndex = selectedBtn.selectedIndex;
    let isCorrect = questions[index].options[selectedIndex].correct;
    if (isCorrect) {
        selectedBtn.classList.add("green");
        score++;
    } else {
        selectedBtn.classList.add("red");
        btns.forEach((btn,idx)=>{
            if(questions[index].options[idx].correct){
                btn.classList.add("green");
            }
        })
    }
    nextBtn.innerText = "Next";
    index++;
};

nextBtn.addEventListener("click", () => {
    if (nextBtn.innerText === "Submit") {
        btns.forEach((btn)=>{
            btn.disabled = true;
        })
        chkAnswer();
    }
    else if (nextBtn.innerText === "Play Again !"){
        index=0;
        btns.forEach((btn)=>{
            btn.classList.remove("select", "red", "green");
            btn.style.display = "block";
        })
        displayQuestion();
    }
    else {
        if (index < questions.length) {
            btns.forEach((btn) => {
                btn.classList.remove("select", "red", "green");
                displayQuestion();
            })
        }
        else {
            question.innerText = `Quiz Completed!  Your score is ${score}`;
            btns.forEach((btn)=>{
                btn.style.display = "none";
            })
            nextBtn.innerText = "Play Again !";
            score = 0;
        }
    }
});

function displayQuestion() {
    question.innerText = questions[index].question;
    btns.forEach((btn, idx) => {
        btn.innerText = questions[index].options[idx].option;
    });
    nextBtn.style.display = "none";
    btns.forEach((btn)=>{
        btn.disabled = false;
    })
};

displayQuestion();