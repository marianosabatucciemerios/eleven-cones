import { expect } from 'chai';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import { ITeamDocument } from 'interfaces/ITeamDocument';

let server = 'http://localhost:3000';
let jwt: String;
let team: ITeamDocument;

describe('-- Team --', () => {

    describe('LOGIN', () => {
        it('it should login', (done) => {
            chai.use(chaiHttp);
            chai.request(server)
                .post('/v1/auth/login')
                .send({
                    "email": "chai_test@mail.com",
                    "password": "chai_test_123"
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    jwt = res.body.token;
                    done();
                })
        })
    });

    describe('POST /v1/teams', () => {
        it('it should create a new team', (done) => {
            chai.use(chaiHttp);
            chai.request(server)
                .post('/v1/teams')
                .set('Content-Type', 'application/json')
                .set('Authorization', <string>jwt)
                .send({
                    "code": randomTeamCode(10),
                    "name": "Test Team",
                    "manager": "5ba84ac89ba1b9444bc75fb7",
                    "homeColor": "#fff",
                    "awayColor": "#000"
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    team = res.body;
                    done();
                });
        });
    });

    describe('GET /v1/teams', () => {
        it('it should return all teams', (done) => {
            chai.use(chaiHttp);
            chai.request(server)
                .get('/v1/teams')
                .set('Content-Type', 'application/json')
                .set('Authorization', <string>jwt)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('GET /v1/teams/:id', () => {
        it('it should return a single team', (done) => {
            chai.use(chaiHttp);
            chai.request(server)
                .get('/v1/teams/'+team._id)
                .set('Content-Type', 'application/json')
                .set('Authorization', <string>jwt)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('PATCH /v1/teams/:id', () => {
        it('it should update an team', (done) => {
            chai.use(chaiHttp);
            chai.request(server)
                .patch('/v1/teams/'+team._id)
                .set('Content-Type', 'application/json')
                .set('Authorization', <string>jwt)
                .send({
                    "homeColor": "#aaa",
                    "awayColor": "#cecece"
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('DELETE /v1/teams/:id', () => {
        it('it should delete a single team', (done) => {
            chai.use(chaiHttp);
            chai.request(server)
                .del('/v1/teams/'+team._id)
                .set('Content-Type', 'application/json')
                .set('Authorization', <string>jwt)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

});

function randomTeamCode(long: Number): String {
    let text: String = "";
    let possible: String = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < long; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
