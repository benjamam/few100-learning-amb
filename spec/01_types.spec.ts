describe('declaring variables', () => {
    it('implicit declaration', () => {
        let name = 'Joe';

        name = 'Joseph';
        // name = 1137;

        let x;
        x = 'Joe';
        x = 1137;
    });

    it('union types', () => {
        let x: string | number;

        x = 'Joe';

        x = 1137;

        // x = ['dog'];
        // x = () => 2 + 2;

        let seatType: 'middle' | 'aisle' | 'window';
        seatType = 'middle';
    });

    it('a bit about const', () => {
        const PI = 3.14;

        // PI = 3;

        const friends = ['sean', 'ed', 'billy'];
        // friends = [];

        friends[2] = 'william';

        const movie = {
            title: 'Rise of Skywalker',
            director: 'Abrams'
        };

        movie.director = 'JJ Abrams';
    });

    it('has a var keyword but you shouldnt use it', () => {
        const age = 22;

        if (age > 21) {
            // tslint:disable-next-line: no-var-keyword
            var message = 'Old enough';
        }

        expect(message).toBe('Old enough'); // this works but is BAD
    });
});
describe('type literals', () => {
    describe('string literals', () => {
        it('can be a single quote', () => {
            const name = 'joe';
            expect(typeof (name)).toBe('string');
            // tslint:disable-next-line: quotemark
            expect(name).toEqual("joe");

            const quote = 'One of my favorite authors is Flanner O\'Conner';
        });
        it('template strings', () => {
            const story = `Chapter 1
it was a dark and stormy night.

the end.`;
            // console.log(story);

            const customer = 'Bob';
            const creditLimit = 3000;

            const s1 = 'The customer is ' + customer + ' and the credit limit is ' + creditLimit + ' dollars';
            const s2 = `The customer is ${customer} and the credit limit is ${creditLimit} dollars`;

            expect(s1).toEqual(s2);
        });
    });
    describe('number literals', () => {
        it('has them', () => {
            const n1 = 10;
            const n2 = 3.4;
            const n3 = 1_000_000;
            const n4 = 0b10101;
            const n5 = 0xfff;
            const n6 = 0o123;
        });
    });
    describe('array literals', () => {
        it('initializing an array', () => {
            const numbers = [1, 2, 3, 4, 5];
            // numbers[0] = 'dog';
            const empty = [];
            empty[0] = 1;
            empty[2] = 'tacos';
            empty[3] = empty;
            empty[999] = 'more tacos';
            expect(empty[2]).toBe('tacos');
            // expect(empty[3][2]).toBe('tacos');

            const friends: string[] = [];
            const workFriends: Array<string> = [];

            friends[0] = 'Zosia';
            expect(friends[3]).toBeUndefined();
        });
        it('type unions on arrays', () => {
            const v1: (string | number)[] = [];
            const v2: Array<string | number> = [];

            v2[0] = 'dog';
            v2[1] = 'cat';
            v2[2] = 99;

            const first = v2[1];
        });
        describe('tuples', () => {
            it('basic syntax', () => {
                type Person = [string, string, number];
                const friend: Person = ['Warren', 'Ellis', 58];
                const age = friend[2];
                const friends2: Person = ['Nick', 'Cave', 62];
                // side hike.
                type ThingyWithLetters = string;

                const name: ThingyWithLetters = 'Jeff';
            });
            it('array/tuple destructuring', () => {
                type Age = number;
                type Person = [string, string, Age];
                const blixa: Person = ['Blixa', 'Bargelt', 58];

                // const lastName = blixa[1];
                // const age = blixa[2];
                const [, lastName, age] = blixa;

                expect(lastName).toBe('Bargelt');
                expect(age).toBe(58);

                const [first, , herbert] = [1974, 3, 20];
                expect(first).toBe(1974);
                expect(herbert).toBe(20);
            });
            it('an example - using a tuple', () => {
                function formatName(first: string, last: string): [string, number] {
                    const name = `${last}, ${first}`;
                    return [name, name.length];
                }

                const [fullName] = formatName('Han', 'Solo');
                expect(fullName).toBe('Solo, Han');
                // expect(len).toBe(9);

                function formatName2(first: string, last: string) {
                    const name = `${last}, ${first}`;
                    return {
                        fullName: name,
                        length: name.length
                    };
                }

                const { fullName: fname } = formatName2('Luke', 'Skywalker');
                expect(fname).toBe('Skywalker, Luke');
            });
        });
    });
    describe('object literal', () => {
        it('creating them', () => {
            interface Movie {
                title: string;
                director: string;
                yearReleased: number;
                cast: {
                    role: string;
                    actor: string;
                }[];
            }

            const movie: Movie = {
                title: 'Thor Ragnarok',
                director: 'Taika Waitit',
                yearReleased: 2017,
                cast: [
                    { role: 'Thor', actor: 'Chris Hemsworth' },
                    { role: 'Loki', actor: 'Tom Hiddleston' }
                ]
            };

            expect(movie.title).toBe('Thor Ragnarok');
            expect(movie.cast[0].actor).toBe('Chris Hemsworth');
            // movie.yearreleased = 2018;
            movie.cast = [...movie.cast, { role: 'Valkrie', actor: 'Tessa Thompson' }];

        });
        it('duck typing', () => {
            // TypeScript calls this "structural typing"

            interface ThingWithAMessage {
                message: string;
            }
            function logIt(thingy: ThingWithAMessage): void {

                console.log(`At ${new Date().toString()} this happened: ${thingy.message}`);
            }

            // logIt();
            // logIt("dog");
            logIt({ message: 'Get Milk' });

            const phoneCall = { from: 'Yer Mom', message: 'Call Me' };
            logIt(phoneCall);

            class Meeting {
                message: string;
                fromtime: string;
                toTime: string;

            }
            const s = new Meeting();
            s.fromtime = 'Noon';
            s.message = 'Getting sales inline!';
            s.toTime = 'Dinner';

            logIt(s);
        });
        it('a couple little random details of interfaces', () => {
            interface Point {
                x: number;
                y: number;
                z?: number;
            }

            const middle: Point = { x: 20, y: 30, z: 30 };
            const left: Point = { x: 12, y: 38.5 };
            plotIt(middle);
            plotIt(left);

            function plotIt(p: Point) {

            }

            expect(middle.x).toBe(20);
            // tslint:disable-next-line: no-string-literal
            expect(middle['x']).toBe(20);

            interface Actor {
                firstName: string;
                lastName: string;
                role: string;
                [key: string]: any;
            }

            const gena: Actor = {
                firstName: 'Gena',
                lastName: 'Rowlands',
                role: 'Mararot',
                husband: 'John Cassavetes',
                location: 'Hollywood'
            };
        });
    });
});
