const app = require("../app");
const readline = require("readline");

describe('App', () => {
    xit('math sum works correctly', () => {
        expect(2 + 2).toBe(45235);
    });

    it('complete log', () => {
        let spy = spyOn(console, 'info');

        app.complete(3, 4);

        expect(spy).toHaveBeenCalledWith('Completed', `3 of 4`);
    });

    it('waitForAnswer', (done) => {
        let spy = spyOn(readline, 'createInterface').and.callFake(() => {
            return {
                question: (text, cb) => cb(text)
            }
        });

        app.waitForAnswer('questionText').then(
            (result) => {
                expect(result).toBe('questionText: ');
                done();
            }
        );
    });

    describe('ask', () => {
        let spy;
        beforeEach(() => {
            spy = spyOn(readline, 'createInterface').and.callFake(() => {
                return {
                    question: (text, cb) => cb('it works')
                }
            });
        })

        it('empty', (done) => {
            app.ask([]).then(
                (result) => {
                    expect(result).toBe(0);
                    done();
                }
            )
        });

        fit('ask for correct answer', (done) => {
            app.ask([
                {
                    text: '1',
                    answer: 'it works',
                },
                {
                    text: '2',
                    answer: 'it works',
                },
                {
                    text: '3',
                    answer: 'doesn\'t work',
                }
            ]).then(
                (result) => {
                    expect(result).toBe(2);
                    done();
                }
            )
        })
    });
})
