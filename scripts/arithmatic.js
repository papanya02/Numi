
const settingsCard = document.getElementById('settingsCard');
const questionCard = document.getElementById('questionCard');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const answerValueEl = document.getElementById('answerValue');
const timerBar = document.getElementById('timerBar');
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const progressEl = document.getElementById('progress');
const currentQuestionEl = document.getElementById('currentQuestion');
const totalQuestionsEl = document.getElementById('totalQuestions');
const scoreEl = document.getElementById('score');
const digitButtons = document.querySelectorAll('.digit-btn');


const digitSelection = document.getElementById('digitSelection');
const timerDurationInput = document.getElementById('timerDuration');
const operationsSelect = document.getElementById('operations');
const questionCountInput = document.getElementById('questionCount');


let currentQuestion = 0;
let totalQuestions = 10;
let score = 0;
let timerDuration = 10;
let currentAnswer = 0;
let timerInterval;
let selectedDigits = 3; 


startBtn.addEventListener('click', startPractice);
nextBtn.addEventListener('click', nextQuestion);


digitButtons.forEach(button => {
    button.addEventListener('click', function () {

        digitButtons.forEach(btn => btn.classList.remove('selected'));

        this.classList.add('selected');


        selectedDigits = parseInt(this.dataset.value);
    });
});


function initializeApp() {
    
    questionCard.style.display = 'none';
    nextBtn.style.display = 'none';


    currentQuestion = 0;
    score = 0;
    updateProgress();
}

function startPractice() {
 
    timerDuration = parseInt(timerDurationInput.value);
    const operations = operationsSelect.value;
    totalQuestions = parseInt(questionCountInput.value);

    if (timerDuration < 3 || timerDuration > 60) {
        alert('Timer duration must be between 3 and 60 seconds');
        return;
    }

    if (totalQuestions < 5 || totalQuestions > 50) {
        alert('Number of questions must be between 5 and 50');
        return;
    }

    settingsCard.style.display = 'none';
    questionCard.style.display = 'block';
    questionCard.style.animation = 'fadeIn 0.5s forwards';

    
    currentQuestion = 0;
    score = 0;
    updateProgress();

    
    generateQuestion();
}


function generateQuestion() {

    answerEl.classList.remove('show');
    nextBtn.style.display = 'none';

    currentQuestion++;
    updateProgress();

 
    const numberLength = selectedDigits;
    const operations = operationsSelect.value;

   
    const minNum = Math.pow(10, numberLength - 1);
    const maxNum = Math.pow(10, numberLength) - 1;

    let num1, num2, operation, operationSymbol;

 
    switch (operations) {
        case 'add':
            operation = 'addition';
            operationSymbol = '+';

            
            if (numberLength >= 5) {
                num1 = getRandomInt(minNum, maxNum);
                num2 = getRandomInt(minNum / 10, minNum * 2);
            } else {
                num1 = getRandomInt(minNum, maxNum);
                num2 = getRandomInt(minNum, maxNum);
            }

            currentAnswer = num1 + num2;
            break;

        case 'subtract':
            operation = 'subtraction';
            operationSymbol = '-';

            num1 = getRandomInt(minNum, maxNum);

            if (numberLength >= 5) {
                num2 = getRandomInt(minNum / 10, num1 / 2);
            } else {
                num2 = getRandomInt(minNum / 2, num1);
            }

            currentAnswer = num1 - num2;
            break;

        case 'multiply':
            operation = 'multiplication';
            operationSymbol = '×';

            if (numberLength >= 5) {
              
                num1 = getRandomInt(minNum / 10, maxNum / 5);
                num2 = getRandomInt(2, 20);
            } else if (numberLength == 4) {
                num1 = getRandomInt(minNum / 5, maxNum / 2);
                num2 = getRandomInt(2, 50);
            } else if (numberLength == 3) {
                num1 = getRandomInt(minNum / 2, maxNum);
                num2 = getRandomInt(2, 100);
            } else {
                num1 = getRandomInt(minNum, maxNum);
                num2 = getRandomInt(2, minNum / 2);
            }

            currentAnswer = num1 * num2;
            break;

        case 'divide':
            operation = 'division';
            operationSymbol = '÷';

        
            if (numberLength >= 5) {
                currentAnswer = getRandomInt(minNum / 100, minNum / 10);
                num2 = getRandomInt(2, 15);
            } else if (numberLength >= 4) {
                currentAnswer = getRandomInt(minNum / 50, minNum / 5);
                num2 = getRandomInt(2, 20);
            } else {
                currentAnswer = getRandomInt(10, minNum / 2);
                num2 = getRandomInt(2, Math.min(50, minNum / 10));
            }

            num1 = currentAnswer * num2;
            break;

        case 'add-subtract':
            operation = Math.random() > 0.5 ? 'addition' : 'subtraction';
            operationSymbol = operation === 'addition' ? '+' : '-';

            if (operation === 'addition') {
               
                if (numberLength >= 5) {
                    num1 = getRandomInt(minNum, maxNum);
                    num2 = getRandomInt(minNum / 10, minNum * 2);
                } else {
                    num1 = getRandomInt(minNum, maxNum);
                    num2 = getRandomInt(minNum, maxNum);
                }
                currentAnswer = num1 + num2;
            } else {
                num1 = getRandomInt(minNum, maxNum);
                
                if (numberLength >= 5) {
                    num2 = getRandomInt(minNum / 10, num1 / 2);
                } else {
                    num2 = getRandomInt(minNum / 2, num1);
                }
                currentAnswer = num1 - num2;
            }
            break;

        case 'multiply-divide':
            operation = Math.random() > 0.5 ? 'multiplication' : 'division';
            operationSymbol = operation === 'multiplication' ? '×' : '÷';

            if (operation === 'multiplication') {
      
                if (numberLength >= 5) {
                    num1 = getRandomInt(minNum / 10, maxNum / 5);
                    num2 = getRandomInt(2, 20);
                } else if (numberLength == 4) {
                    num1 = getRandomInt(minNum / 5, maxNum / 2);
                    num2 = getRandomInt(2, 50);
                } else if (numberLength == 3) {
                    num1 = getRandomInt(minNum / 2, maxNum);
                    num2 = getRandomInt(2, 100);
                } else {
                    num1 = getRandomInt(minNum, maxNum);
                    num2 = getRandomInt(2, minNum / 2);
                }
                currentAnswer = num1 * num2;
            } else {
              
                if (numberLength >= 5) {
                    currentAnswer = getRandomInt(minNum / 100, minNum / 10);
                    num2 = getRandomInt(2, 15);
                } else if (numberLength >= 4) {
                    currentAnswer = getRandomInt(minNum / 50, minNum / 5);
                    num2 = getRandomInt(2, 20);
                } else {
                    currentAnswer = getRandomInt(10, minNum / 2);
                    num2 = getRandomInt(2, Math.min(50, minNum / 10));
                }
                num1 = currentAnswer * num2;
            }
            break;

        default: 
            const ops = ['addition', 'subtraction', 'multiplication', 'division'];
            operation = ops[Math.floor(Math.random() * ops.length)];

            if (operation === 'addition') {
                operationSymbol = '+';
                if (numberLength >= 5) {
                    num1 = getRandomInt(minNum, maxNum);
                    num2 = getRandomInt(minNum / 10, minNum * 2);
                } else {
                    num1 = getRandomInt(minNum, maxNum);
                    num2 = getRandomInt(minNum, maxNum);
                }
                currentAnswer = num1 + num2;
            } else if (operation === 'subtraction') {
                operationSymbol = '-';
                num1 = getRandomInt(minNum, maxNum);
                if (numberLength >= 5) {
                    num2 = getRandomInt(minNum / 10, num1 / 2);
                } else {
                    num2 = getRandomInt(minNum / 2, num1);
                }
                currentAnswer = num1 - num2;
            } else if (operation === 'multiplication') {
                operationSymbol = '×';
                if (numberLength >= 5) {
                    num1 = getRandomInt(minNum / 10, maxNum / 5);
                    num2 = getRandomInt(2, 20);
                } else if (numberLength == 4) {
                    num1 = getRandomInt(minNum / 5, maxNum / 2);
                    num2 = getRandomInt(2, 50);
                } else if (numberLength == 3) {
                    num1 = getRandomInt(minNum / 2, maxNum);
                    num2 = getRandomInt(2, 100);
                } else {
                    num1 = getRandomInt(minNum, maxNum);
                    num2 = getRandomInt(2, minNum / 2);
                }
                currentAnswer = num1 * num2;
            } else { 
                operationSymbol = '÷';
                if (numberLength >= 5) {
                    currentAnswer = getRandomInt(minNum / 100, minNum / 10);
                    num2 = getRandomInt(2, 15);
                } else if (numberLength >= 4) {
                    currentAnswer = getRandomInt(minNum / 50, minNum / 5);
                    num2 = getRandomInt(2, 20);
                } else {
                    currentAnswer = getRandomInt(10, minNum / 2);
                    num2 = getRandomInt(2, Math.min(50, minNum / 10));
                }
                num1 = currentAnswer * num2;
            }
    }

 
    questionEl.textContent = `${num1} ${operationSymbol} ${num2}`;
    answerValueEl.textContent = currentAnswer;

   
    startTimer();
}

function startTimer() {

    timerBar.style.transition = 'none';
    timerBar.style.transform = 'scaleX(1)';

   
    void timerBar.offsetWidth;

  
    timerBar.style.transition = `transform ${timerDuration}s linear`;
    timerBar.style.transform = 'scaleX(0)';

    
    if (timerInterval) clearTimeout(timerInterval);

    timerInterval = setTimeout(showAnswer, timerDuration * 1000);
}

function showAnswer() {
    answerEl.classList.add('show');
    nextBtn.style.display = 'block';

   
    if (currentQuestion >= totalQuestions) {
        nextBtn.textContent = 'See Final Score';
    }

    
    setTimeout(nextQuestion, 2000);
}


function nextQuestion() {
    if (currentQuestion >= totalQuestions) {
        
        showFinalScore();
    } else {
        
        generateQuestion();
    }
}

function showFinalScore() {
    alert(`Practice complete!\nYour score: ${score} out of ${totalQuestions}`);

   
    settingsCard.style.display = 'block';
    questionCard.style.display = 'none';
    nextBtn.textContent = 'Next Question';

   
    currentQuestion = 0;
    score = 0;
    updateProgress();
}


function updateProgress() {
    currentQuestionEl.textContent = currentQuestion;
    totalQuestionsEl.textContent = totalQuestions;
    scoreEl.textContent = score;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

initializeApp();