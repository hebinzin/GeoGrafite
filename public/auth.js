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

    if (location.search.includes("state=") &&
        (location.search.includes("code=") ||
            location.search.includes("error="))) {
        await auth0Client.handleRedirectCallback();
        window.history.replaceState({}, document.title, "/");
    }

    // Assumes a button with id "logout" in the DOM
    const logoutButton = document.getElementById("logout");

    logoutButton.addEventListener("click", (e) => {
        e.preventDefault();
        auth0Client.logout();
    });

    const isAuthenticated = await auth0Client.isAuthenticated();
    const userProfile = await auth0Client.getUser();

    // Assumes an element with id "profile" in the DOM
    const profileElement = document.getElementById("profile");

    //TODO: hide login button if authenticated
    if (isAuthenticated) {
        loginButton.style.display = "none";
        logoutButton.style.display = "block";
        profileElement.style.display = "inline-block";
        profileElement.innerHTML = `
            ${userProfile.name}
            <!--img src="${userProfile.picture}" /-->
          `;
    } else {
        /*profileElement.style.display = "none";*/
        loginButton.style.display = "block";
        logoutButton.style.display = "none";
        profileElement.style.display = "none";
    }
});