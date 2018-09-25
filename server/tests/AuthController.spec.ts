import 'mocha';
import chaiHttp = require('chai-http');
import { use, request, should, expect } from 'chai';
import { UserController } from "../controllers/UserController";
import { UserSchema } from "../schemas/UserSchema"

let server = 'http://localhost:3000';


describe('-- Auth --', () => {

    // Empty database before testing
    // beforeEach((done) => {
    //     UserSchema.remove({}, (err) => {
    //         done();
    //     });
    // });

    describe('POST /v1/auth/signup-local', () => {
        it('it should create a new user', (done) => {
            use(chaiHttp);
            request(server)
                .post('/v1/auth/signup-local')
                .send({
                    email: 'belen@mail.com',
                    password: 'belen1'
                })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res).to.be.a('object')
                    // expect(res).to.have.property('token')
                    done()
                });
        });
    });


});
