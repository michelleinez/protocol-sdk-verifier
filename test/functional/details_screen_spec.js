let kycData, initial;

describe('The User Details screen...', function() {
    before(function() {
        cy.window().then(win => {
            win.parent.addEventListener('message', (event) => {
                kycData = event.data.detail;
                kycData.stamp = Date.now();
            });
        });
        cy.fixture('kiva_agent.json').then(info => {
            let common = info.common,
                establish = info.establishConnection,
                connection = info.getConnection,
                send = info.sendVerification,
                verification = info.checkVerification;

            cy.route2(establish.method, establish.endpoint, {
                ...common,
                body: establish.success
            });
            cy.route2(connection.method, connection.endpoint, {
                ...common,
                body: connection.active
            });
            cy.route2(send.method, send.endpoint, {
                ...common,
                body: send.success
            });
            cy.route2(verification.method, verification.endpoint, {
                ...common,
                body: verification.verified
            });
            cy.visit('/');
            cy.get('.accept').click();
            cy.wait(200);
            cy.get('[data-cy="qr-scan-next"]').click();
            cy.wait(500);
        });
    });

    it('should render all the data from the credential', function() {
        let credentialData = [
            {
                title: "National ID",
                data: "CALLI0PE"
            },
            {
                title: "First Name",
                data: "Calliope"
            },
            {
                title: "Last Name",
                data: "Gata"
            },
            {
                title: "Birth Date",
                data: "2019-06-17"
            }
        ];
        cy.get('.ProfileItemContainer').should(el => {
            el.children('.FieldCard').each((idx, child) => {
                let title = child.querySelector('.FieldCardTitle').innerText,
                    data = child.querySelector('.FieldCardValue').innerText;

                expect(credentialData[idx].title).to.eql(title);
                expect(credentialData[idx].data).to.eql(data);
            });
        });
    });

    it('should have a photo', function() {
        cy.get('.PictureProfile').should(el => {
            expect(el.attr('src').indexOf('undefined')).to.eql(-1);
        });
        // getting stuff prepped for the next test
        initial = kycData;
        cy.get('.export-profile').click();
    });

    it('should export the user data correctly', function() {
        // Make sure the data IS different
        expect(initial.stamp === kycData.stamp).to.eql(false);

        // Delete the stamps
        delete initial.stamp;
        delete kycData.stamp;

        // Verify everything else is as expected
        for (let k in kycData) {
            expect(initial.hasOwnProperty(k)).to.eql(true);
            expect(initial[k] === kycData[k]).to.eql(true);
        }
    });
});
