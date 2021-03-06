// Beware: route2() is experimental (https://docs.cypress.io/api/commands/route2.html)

let conf;
let common;

describe('QR Code Scan screen should...', function() {

    before(function() {
        cy.fixture("kiva_agent.json").then(config => {
            conf = config;
            common = config.common;
        });
    });

    it('should show an error message when the connection attempt fails', function() {
        let testConf = conf.establishConnection,
            response = {
                statusCode: 418,
                ...common
            };

        cy.route2(testConf.method, testConf.endpoint, response);
        cy.visit('/');
        cy.get('.accept').click();
        cy.get('.dialog-icon.error').should('be.visible');
    });

    it('should clear the error message when clicking "Reset"', function() {
        let delayMs = 400,
            testConf = conf.establishConnection,
            response = {
                statusCode: 418,
                delayMs,
                ...common
            };
        cy.route2(testConf.method, testConf.endpoint, response);
        cy.get('[data-cy="reset-flow"]').click();
        cy.get('#qr-loader').should('be.visible');
        cy.wait(delayMs + 100);
    });

    it('should go back to the Confirmation screen when "Back" is clicked', function() {
        cy.get('[data-cy="qr-back"]').click();
        cy.get('#Kiva_QR').should('not.be.visible');
    });

    it('should load a QR code when the request is successful', function() {
        let establishConf = conf.establishConnection,
            getConf = conf.getConnection,
            establishResponseBody = establishConf.success,
            connectResponseBody = getConf.inactive;

        cy.route2(establishConf.method, establishConf.endpoint, {
            ...common,
            body: establishResponseBody
        });
        cy.route2(getConf.method, getConf.endpoint, {
            ...common,
            body: connectResponseBody
        });
        cy.get('.accept').click();
        cy.get('#qr-code').should('be.visible');
    });

    // The inner workings of route2() remain somewhat opaque, but this seems to work for clearing a stub from the previous test
    it('does nothing', function() {});

    it('should show an error message when there\'s an error in the status check', function() {
        let establishConf = conf.establishConnection,
            getConf = conf.getConnection,
            establishResponseBody = establishConf.success,
            connectResponseBody = getConf.inactive;

        cy.route2(establishConf.method, establishConf.endpoint, {
            ...common,
            body: establishResponseBody
        });
        cy.route2(getConf.method, getConf.endpoint, {
            ...common,
            delayMs: 400,
            statusCode: 418,
            body: connectResponseBody
        });

        cy.get('[data-cy="reset-flow"]').click();
        cy.get('.dialog-icon.error').should('be.visible');
    });

    it('should signal that the connection has been established', function() {
        let establishConf = conf.establishConnection,
            getConf = conf.getConnection,
            establishResponseBody = establishConf.success,
            connectResponseBody = getConf.active;

        cy.route2(establishConf.method, establishConf.endpoint, {
            ...common,
            body: establishResponseBody
        });
        cy.route2(getConf.method, getConf.endpoint, {
            ...common,
            delayMs: 200,
            body: connectResponseBody
        });

        cy.get('[data-cy="reset-flow"]').click();
        cy.get('.dialog-icon.verified').should('be.visible');
        cy.wait(500);
    });

    it('should begin verification when you click "Verify"', function() {
        let verifyConf = conf.sendVerification,
            checkConf = conf.checkVerification;

        cy.route2(verifyConf.method, verifyConf.endpoint, {
            ...common,
            body: verifyConf.success
        });
        cy.route2(checkConf.method, checkConf.endpoint, {
            ...common,
            delayMs: 1000,
            body: checkConf.unverified
        });
        cy.get('.next').click();
        cy.get('#qr-loader').should('be.visible');
    });

    it('should should show an error if there\'s an error sending the proof request', function() {
        cy.get('.dialog-icon.error').should('be.visible');
    });

    it('should show an error if the proof status check fails', function() {
        let verifyConf = conf.sendVerification,
            checkConf = conf.checkVerification;

        cy.route2(verifyConf.method, verifyConf.endpoint, {
            ...common,
            body: verifyConf.success
        });
        cy.route2(checkConf.method, checkConf.endpoint, {
            ...common,
            statusCode: 418
        });

        cy.get('[data-cy="qr-scan-next"]').click();
        cy.get('.dialog-icon.error').should('be.visible');
    });

    it('does nothing', function() {});

    it('should render user details if the proof is sucessful', function() {
        let verifyConf = conf.sendVerification,
            checkConf = conf.checkVerification;

        cy.route2(verifyConf.method, verifyConf.endpoint, {
            ...common,
            body: verifyConf.success
        });
        cy.route2(checkConf.method, checkConf.endpoint, {
            ...common,
            body: checkConf.verified
        });
        cy.get('[data-cy="qr-scan-next"]').click();
        cy.get('.ProfileCard').should('be.visible');
    });
});