const should = require("should");

const requiredNodes = [
  require("@node-red/nodes/core/function/10-function.js"),
  require("@node-red/nodes/core/network/21-httpin.js"),
  require("@node-red/nodes/core/common/25-catch.js"),
];

describe("Function Unit Test", () => {

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

  describe("Function Name req entry", () => {

    it("required fields when invalid", (done) => {
      
      helper.load(requiredNodes, flow, () => {

        const n1 = helper.getNode("6906468.d35c9b8");
        n1.on("input", (msg) => {
          try {
            should(msg.payload.error).have.equal(true)
            done();
          }
          catch (err) {
            done(err);
          }
        });
        n1.receive({ payload: { name: "jose" } });

      });
    });

    it("required fields when valid", (done) => {
      
      helper.load(requiredNodes, flow, () => {

        const n1 = helper.getNode("6906468.d35c9b8");
        n1.on("input", (msg) => {
          try {
            should(msg.payload).have.keys('name', 'email')
            done();
          }
          catch (err) {
            done(err);
          }
        });
        n1.receive({ payload: { name: "jose", email: "jose" } });

      });
    });

  })


  describe("Function Name check email", () => {

    it("check if the email is invalid", (done) => {
      
      helper.load(requiredNodes, flow, () => {

        const n1 = helper.getNode("439fcf6d.eb5d1");
        n1.on("input", (msg) => {
          try {
            should(msg.payload.error).have.equal(true)
            done();
          }
          catch (err) {
            done(err);
          }
        });
        n1.receive({ payload: { email: "jose" } });

      });
    });

    it("check if the email is valid", (done) => {
      
      helper.load(requiredNodes, flow, () => {

        const n1 = helper.getNode("439fcf6d.eb5d1");
        n1.on("input", (msg) => {
          try {
            should(msg.payload).have.keys('email')
            done();
          }
          catch (err) {
            done(err);
          }
        });
        n1.receive({ payload: { email: "jose@email.com" } });

      });
    })

  });


});
