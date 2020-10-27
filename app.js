const readline = require("readline");

const questionStore = require('./db.json').questions;

function ask(questions, correctTotal = 0, index = 0) {
    const question = questions[index];
    if (!question) {
        return Promise.resolve(correctTotal);
    }

    return waitForAnswer(question.text).then((userAnswer) => {
        const newCorrectTotal = userAnswer === question.answer
            ? correctTotal + 1
            : correctTotal;

        return ask(questions, newCorrectTotal, ++index);
    });
}

function waitForAnswer(questionText) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve, reject) => {
        rl.question(`${questionText}: `, (answer) => {
            resolve(answer);
            rl.close();
        });
    })
}

function complete(correctTotal, total) {
    console.info('Completed', `${correctTotal} of ${total}`);
}

ask(questionStore).then(
    (result) => complete(result, questionStore.length)
);

module.exports = {
    complete,
    waitForAnswer,
    ask
}
