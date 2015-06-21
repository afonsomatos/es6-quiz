import fs       from 'fs';
import readline from 'readline';
import colors   from 'colors';
// polyfill
import './polyfill';

const VERSION = '1.0.0';
const ALPHA   = 'abcdefghijklmnopqrstuvwxyz';

// Map the question-name to its configuration
let plugins = new Map();

let correct = new Map(),
    wrong   = new Map(),
    passed  = new Map();

// Chainable version of console.log
// Logs line for each argument
let log = (...args) => {
    
    for (let s of args)
        console.log(s);

    return log;
};

// Create input interface
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function loadQuestions (num = null) {

    // Load the plugins
    let list = JSON.parse(
        fs.readFileSync('./plugins/plugins.json')
        ).plugins;

    // Set some boundaries
    if (num > list.length || num === null) num = list.length;

    // Let's select n plugins
    while (num--) {
        // Select a random index
        let index = Math.floor( Math.random() * list.length),
            name  = list.splice(index, 1);
        // Let's get the configuration of the question
        let obj = JSON.parse(
            fs.readFileSync(`./plugins/${name}/plugin.json`)
            );
        // Now append it to the plugins list
        plugins.set(name, obj);
    }

    return plugins;
}

function showScore () {

    // The quiz has finished, time to show the score
    log('',
        'You have finished the quiz! Here are your results:',
        'Correct answers: '  + String(correct.size).bold.green,
        'Passed questions: ' + String(passed.size).bold.yellow,
        'Wrong answers: '    + String(wrong.size).bold.red);

    for (let [name, obj] of [...wrong, ...passed]) {
        // Pull some important information
        let num     = [...plugins].findIndex(arr => arr[0] === name) + 1,
            correct = obj.correct;

        log(`${name} (${num}) - Correct answer was ${ALPHA[correct]})`);
    }

    // Show the score which is just the percentage of correct answers
    // Handle division by 0 by checking correct.size
    let score = correct.size 
        ? Math.round(100 * (correct.size / (correct.size + wrong.size)))
        : 0;
    
    log('',
        'FINAL SCORE'.rainbow.bold+ ': ' + `${score}%`.bold.white,
        'Please visit our github page and make plugins of your own!');

    return process.exit();
}

function startQuiz () {

    // Current question index
    let i = 0, currQuestion, name, obj;

    let showQuestion = () => {

        if (i + 1 > plugins.size) return showScore();

        currQuestion = [...plugins][i];
        name         = currQuestion[0];
        obj          = currQuestion[1];

        // Show introduction, question numbers start in 1
        log('',
            `${i + 1} - ` + obj.intro.bgCyan.black,
            '')

        // Show codecase for this question
        let codeCase = String(
            fs.readFileSync(`./plugins/${name}/${obj.code}`));

        // Show it next to the intro
        log(codeCase,
            '      ');
        
        for (let [i, a] of obj.answers.entries()) {

            log (`${ALPHA[i]}) `.yellow + a);

        }

        askAnswer();

    };

    let askAnswer = () => rl.question('Answer: ', answer => {

        // `quit` ends the process
        if (answer === 'quit') return process.exit();
        // `pass` moves to the next question
        // this doesn't count for the score
        if (answer === 'pass') {
            passed.set(name, obj);
            i += 1;
            return showQuestion();
        }
        // Otherwise the answer is the answer itself
        let answersNum = obj.answers.length,
            alphaSet   = new Set(ALPHA.slice(0, answersNum));

        // Check valid answer
        if (!alphaSet.has(answer)) {
            log('Invalid answer! Possible answers: ' + 
                Array.from(alphaSet).join(' '));

            return askAnswer();            
        }

        // If it's a valid answer let's
        // check if it's wrong or right
        if (answer === ALPHA[obj.correct]) {
            correct.set(name, obj);
        } else {
            wrong.set(name, obj);
        }

        i += 1;

        return showQuestion();

    });

    showQuestion();

}

// Greetings given at startup
log('EcmaScript 6 Quiz'.underline + ` (${VERSION}) - You think you know ES6?`,
    'Official github repo: http://github.com/afonsomatos/es6-quiz',
    'Support this app'.bold.yellow + ' by giving us some feedback!',
    '');

// Ask number of plugins to be answered
// Loop till the input is valid
rl.question('Number of questions: ', num => {

    num = Number(num);
    // Check for valid input
    if (!Number.isInteger(num) || num <= 0) {
        // Set no limit (present all the questions available)
        log('No limit was set');
        num = null;
    }

    log('Loading questions...');
    // Load and store n questions
    loadQuestions(num);

    // Give instructions - commands [pass, quit]
    log('Instructions:',
        'Answer'.bold.green + ': type a-z ',
        'Pass'.bold.yellow  + ': type pass',
        'Quit'.bold.red     + ': type quit');

    // Start asking stuff
    startQuiz();   
});