auth0.createAuth0Client({
    domain: "geografite-testing.us.auth0.com",
    clientId: "E4ljdqLoXH9Rp4cXmWrooK7wMnzOLdxE",
    authorizationParams: {
        redirect_uri: window.location.origin
    }
}).then(async (auth0Client) => {
    // Assumes a button with id "login" in the DOM
    const loginButton = document.getElementById("login");

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        auth0Client.loginWithRedirect();
    });
});