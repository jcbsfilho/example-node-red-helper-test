const should = require("should");

const requiredNodes = [
    require("@node-red/nodes/core/network/21-httpin.js"),
    require("@node-red/nodes/core/function/10-function.js"),
    require("@node-red/nodes/core/common/25-catch.js"),
];

describe("HTTP in Test Integration", () => {

    const helper = require("node-red-node-test-helper");

    function loadFlowFile() {
        const flow = require("../../flows/flows.json");

        // remove comment, link, debug
        flow.forEach((node) => {
            if (node.type === "comment") {
                node.type = "helper";
            }
            if (node.type === "debug") {
                node.type = "helper";
            }

        });
        return flow;
    }

    before(function (done) {
        helper.startServer(done);
    });

    afterEach(function () {
        helper.unload();
    });

    after(function (done) {
        helper.stopServer(done);
    });

    const flow = loadFlowFile();

    describe("POST /users", () => {

        it("missing payload in request expect 400 bad request", (done) => {


            helper.load(requiredNodes, flow, () => {
                helper.request("httpNode")
                    .post('/users')
                    .send({ name: 'jose' })
                    .set('Accept', 'application/json')
                    .expect(400)
                    .end(done)
            })


        });


        it("success creating the user 201 create", (done) => {


            helper.load(requiredNodes, flow, () => {
                helper.request("httpNode")
                    .post('/users')
                    .send({ name: 'jose', email: "jose@email.com"})
                    .set('Accept', 'application/json')
                    .expect(201)
                    .end(done)
            })

            
        });

    });


});