/**
 * Basic checks that our JWT authentication
 * from the API is working.
 */
describe("Basic Authentication checks", function () {
    it("Can login", function () {
        cy.fixture('users').then((userFixture) => {
            const { email, password } = userFixture.testAccount;

            cy.login(email, password, true);
        });
    })
})