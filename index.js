const wordType = document.querySelector('.type'); 
const input = document.querySelector('input'); 
const form = document.querySelector('form');
const score = document.querySelector('.score');
const time = document.querySelector('.time');
const endgame = document.querySelector('.endgame');
const button = document.querySelector('button');
const header = document.querySelector('header');
const diff = document.querySelector('select');
let t = 10;
let s=0;

const words = ['sigh','tense','airplane','ball','pies','juice','warlike','bad','north','dependent','steer','silver','highfalutin','superficial','quince','eight','feeble','admit','drag','loving'
];

const generateRandomWord = () => {
    return words[(Math.floor(Math.random()*words.length))];
};

const addWord = word => {
    wordType.textContent = word;
};

const word = generateRandomWord();
addWord(word);

const updateScore = () => {
    s++;
    score.textContent = s;
};

const check = () =>{
    if(diff.value === 'easy'){
        t += 6;
        updateTime();
    } else if(diff.value === 'medium'){
        t += 4;
        updateTime();
    } else{
        t += 2;
        updateTime();
    }
};

input.addEventListener('input', e => { 
    if(e.target.value.trim() === wordType.textContent ){
        wordType.textContent = generateRandomWord();
        form.reset();
        updateScore();
        check();
    }
});

const gameOver = () => {
    endgame.innerHTML = `<h1>Time Ran Out</h1>
    <p>Your score is ${s}</p><button onclick="location.reload()">Reload</button>`;
    endgame.style.display = 'flex';
};

const updateTime = () => {
    t--;
    time.textContent = t;
    if(t === 0){
        clearInterval(timer);
        gameOver();
    }
};

const timer = setInterval(updateTime,1000);

button.addEventListener('click', e => {
    header.classList.toggle('hide');
});

diff.addEventListener('change', e => {
    localStorage.setItem('difficulty',e.target.value);
    location.reload();
});

if(localStorage.getItem('difficulty')){
    diff.value =localStorage.getItem('difficulty');
}