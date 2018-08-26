import { expect } from 'chai';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

let server = 'http://localhost:3000';


describe('-- Contact --', () => {

    describe('GET /contact', () => {
        it('it should return all users', (done) => {
            chai.use(chaiHttp);
            chai.request(server)
                .get('/contact')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('POST /contact', () => {
        it('it should create a new user', (done) => {
            chai.use(chaiHttp);
            chai.request(server)
                .post('/contact')
                .send({
                    firstName: 'mariano',
                    lastName: 'sabatu',
                    email: 'mamaaa@sabsaba.com',
                    phone: '70707007077',
                    company: 'lalalal'
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('GET /contact/:id', () => {
        it('it should return a single user', (done) => {
            chai.use(chaiHttp);
            chai.request(server)
                .get('/contact/5b6ccad7dd1a303e1543c2d6')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('PUT /contact/:id', () => {
        it('it should update an user', (done) => {
            chai.use(chaiHttp);
            chai.request(server)
                .put('/contact/5b6ccad7dd1a303e1543c2d6')
                .send({
                    email: '--',
                    phone: '11',
                    company: 'XX'
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('DELETE /contact/:id', () => {
        it('it should delete a single user', (done) => {
            chai.use(chaiHttp);
            chai.request(server)
                .del('/contact/5b6ccad7dd1a303e1543c2d6')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

});
