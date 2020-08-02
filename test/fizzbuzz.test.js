process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

chai.use(chaiHttp);

describe('FizzBuzz', () => {
    /**
     * Test /GET print-pattern api, both success and failure
     */
    describe('/GET print-pattern', () => {
        it('it should PRINT fizzbuzz pattern', (done) => {
            chai.request(server)
                .get('/fizzbuzz-api-v1/fizzbuzz/print-pattern')
                .query({ count: 15 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('fizzBuzzPattern').eql('1,2,Fizz,4,Buzz,Fizz,7,8,Fizz,Buzz,11,Fizz,13,14,FizzBuzz');
                    res.body.should.have.property('fizzBuzzPatternArray').eql([
                        1,
                        2,
                        "Fizz",
                        4,
                        "Buzz",
                        "Fizz",
                        7,
                        8,
                        "Fizz",
                        "Buzz",
                        11,
                        "Fizz",
                        13,
                        14,
                        "FizzBuzz"
                    ]);
                    done();
                });
        });
        it('it should not PRINT fizzbuzz pattern with bad request', (done) => {
            chai.request(server)
                .get('/fizzbuzz-api-v1/fizzbuzz/print-pattern')
                .query({ count: 'abc' })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('userMessage').eql('Bad Request: Invalid Request Body');
                    res.body.should.have.property('code').eql(400);
                    res.body.should.have.property('errors');
                    done();
                });
        });
    });
});
