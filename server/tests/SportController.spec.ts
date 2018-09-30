// import { expect } from 'chai';
// import * as chai from 'chai';
// import chaiHttp = require('chai-http');
// import 'mocha';

// let server = 'http://localhost:3000';


// describe('-- Sport --', () => {

//     describe('POST /v1/sports', () => {
//         it('it should create a new sport', (done) => {
//             chai.use(chaiHttp);
//             chai.request(server)
//                 .post('/v1/sports')
//                 .send({
//                     code: 'ERU',
//                     name: {
//                         en: 'Sport',
//                         es: 'Deporte'
//                     },
//                     description: {
//                         en: 'Sport',
//                         es: 'Deporte'
//                     }
//                 })
//                 .end((err, res) => {
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(201);
//                     done();
//                 });
//         });
//     });

//     // describe('GET /v1/sports', () => {
//     //     it('it should return all sports', (done) => {
//     //         chai.use(chaiHttp);
//     //         chai.request(server)
//     //             .get('/v1/sports')
//     //             .end((err, res) => {
//     //                 expect(err).to.be.null;
//     //                 expect(res).to.have.status(200);
//     //                 done();
//     //             });
//     //     });
//     // });

//     // describe('GET /v1/sports/:id', () => {
//     //     it('it should return a single sport', (done) => {
//     //         chai.use(chaiHttp);
//     //         chai.request(server)
//     //             .get('/v1/sports/5b9099128ce119a6446d197c')
//     //             .end((err, res) => {
//     //                 expect(err).to.be.null;
//     //                 expect(res).to.have.status(200);
//     //                 done();
//     //             });
//     //     });
//     // });

//     // describe('PUT /v1/sports/:id', () => {
//     //     it('it should update an sport', (done) => {
//     //         chai.use(chaiHttp);
//     //         chai.request(server)
//     //             .put('/v1/sports/5b9099128ce119a6446d197c')
//     //             .send({
//     //                 code: 'ERH',
//     //                 name: {
//     //                     en: 'Sport',
//     //                     es: 'Deporte'
//     //                 },
//     //                 description: {
//     //                     en: 'Sport',
//     //                     es: 'Deporte'
//     //                 }
//     //             })
//     //             .end((err, res) => {
//     //                 expect(err).to.be.null;
//     //                 expect(res).to.have.status(204);
//     //                 done();
//     //             });
//     //     });
//     // });

//     // describe('DELETE /v1/sports/:id', () => {
//     //     it('it should delete a single sport', (done) => {
//     //         chai.use(chaiHttp);
//     //         chai.request(server)
//     //             .del('/v1/sports/5b9099128ce119a6446d197c')
//     //             .end((err, res) => {
//     //                 expect(err).to.be.null;
//     //                 expect(res).to.have.status(204);
//     //                 done();
//     //             });
//     //     });
//     // });

// });
