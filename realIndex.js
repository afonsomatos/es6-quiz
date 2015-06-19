import fs       from 'fs';
import readline from 'readline';
import colors   from 'colors';

// Alias for console.log
function log (...args) {
    console.log(...args);
    // Make it chainable
    return log;
}

const alpha = 'abcdefghijklmnopqrstuvwxyz'

// Version
let version   = '1.0.0',
    questions = [],
    correct   = [],
    wrong     = [],
    next      = [];

// Create input interface
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function loadQuestions (num = 0) {
    // Parse questions as numbers
    num = Number(num);

    // Set some boundaries
    if (!Number.isInteger(num) || num < 0) {
        num = 0;
    }

    // Load the questions
    let list = JSON.parse(
        fs.readFileSync('./plugins/question-list.json')).questions;

    if (num > list.length) num = list.length;

    // Select random questions
    while (num--) {
        let rand = Math.floor( Math.random() * list.length);
        questions.push(list.splice(rand, rand + 1)[0]);
    }

    // Now we have a list of question names
    // retrieve the JSON from each
    questions = questions.map(name => {

        let obj = Object.assign(
            JSON.parse(fs.readFileSync(`./plugins/${name}/plugin.json`)),
            { name });

        return obj;
    });
 
}

function showScore() {

    // Assumes there is something on correct[] and wrong[]
    // The score is just the percentage of entered
    let score = 100 * Math.ceil(correct.length/(correct.length+wrong.length));

    log
        ('')
        (`You have finished the quiz! Total questions: ${questions.length}`)
        ('And your score is: ' + `${score}`.bold.yellow)
        ('Correct: ' + `${correct.length}`.bold.green)
        ('Wrong: ' + `${wrong.length}`.bold.red)
    wrong.forEach(q => {
        log(`${q.name} (${questions.indexOf(q)+1}) - Correct answer was ${alpha[q.correct]})`);
    });

    process.exit();
}

function quizLoop (i = 0, repeat = false) {
    if (i >= questions.length) return showScore();

    let quest = questions[i];

    if (!repeat) {
        // Present the question
        log
            ('')
            (i+1 + ' - ' + quest.intro.bgCyan.black)
            ('');

        log
            (String(fs.readFileSync(`./plugins/${quest.name}/${quest.code}`)))
            ('');

        // Show possible answers
        quest.answers.forEach((a,i) => {
            log (`${alpha[i]}) `.bold.red + a);
        });

    }

    rl.question('Answer: ', answer => {

        // Just close everything
        if (answer === 'quit') return process.exit();
        // Go to the next question
        if (answer === 'next') {
            next.push(quest);
            return quizLoop(i + 1);
        }
        // Get the answer
        answer = alpha.indexOf(answer);
        if (answer > quest.answers.length || answer < 0) {
            log('Invalid answer! Possible answers: ' + Array.from(alpha).slice(0, quest.answers.length).join(' '));
            return quizLoop(i, true);
        }

        if (answer === quest.correct) {
            correct.push(quest);
        } else {
            wrong.push(quest);
        }

        quizLoop(i + 1);
    });
}

function startQuiz () {
    
    // Start questioning
    quizLoop();

}

// Greetings
log
    ('EcmaScript 6 Quiz'.underline + ` (${version}) - you think you know ES6?`)
    ('Visit http://github.com/afonsomatos/es6-quiz.')
    ('Support this app'.bold.yellow + ' by giving us some feedback!')
    ('');

rl.question('Number of questions: ', num => {
    log('Loading questions...')
    loadQuestions(num);
    log('Type the ' + 'letter of the correct answer'.bold.green + ', ' + 
        'next'.bold.yellow + ' or ' + 'quit'.bold.red + '.');

    startQuiz();   
});