class Login {
    constructor() {
        const csrfInputTag = document.querySelector(".csrf");
        fetch(`/haris/setCSRFToken`)
            .then(data => data.json())
            .then(csrfToken => {
                csrfInputTag.value = csrfToken.token;
            })
            .catch(err => {
                console.log(err);
            });
    };
};

new Login();
