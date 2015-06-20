// ES5
const fs       = require('fs');
const readline = require('readline');

var log = function( /* lines */ ) {

    for (var i = 0; i < arguments.length; i++)
        console.log(arguments[i]);

    return log;
};

// Make input interface
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var pluginName = "plugin-" + Math.round(Math.random() * 99999);

var config = {
    intro: "",
    answers: [""],
    correct: 0,
    code: "code.js",
    readme: "README.md"
};

var list = [
    askPluginName,
    askIntro,
    askAnswers,
    askCorrect];

function next () {
    if(!list.length) return;
    list[0]();
    list.shift();
}

function finish () {
    // Create new folder and put files in it
    var folder = './' + pluginName;

    log('Creating folder');
    fs.mkdirSync(folder);

    log('Creating plugin.json');
    fs.writeFileSync(folder + '/plugin.json', JSON.stringify(config));

    log('Creating codecase');
    fs.writeFileSync(folder + '/code.js', '');

    log('Creating readme');
    fs.writeFileSync(folder + '/readme.md', '');

    log('Finished, exiting');

    return process.exit();
}

function askPluginName () {
    // Name, just for the folder directory name
    rl.question('Name: ', function (name) {
        pluginName = name || pluginName;
        next();
    });
}

function askIntro () {
    // Introduction to be displayed at first => N - Introduction
    // i.e 1 - What does the following output?
    rl.question('Introduction: ', function (intro) {
        config.intro = intro || config.intro;
        next();
    });
}

function askAnswers () {
    // Array of answers that will display after the code
    rl.question('Answers (separate by commas): ', function(answers) {
        config.answers = answers.split(',');
        next();
    });
}

function askCorrect () {
    // The correct answer
    rl.question('Correct answer: ', function (answer) {
        var index = answer 
            ? config.answers.indexOf(answer) 
            : config.answers[0];

        if (index === -1) {
            log('Invalid correct answer. ' +
                'The answer is not on the answer list');
            return askCorrect();
        }

        config.correct = index;
        finish();
    });
}

// Start the process
next();