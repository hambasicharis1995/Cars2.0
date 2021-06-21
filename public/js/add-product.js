class AddProduct {
    constructor() {
        // const csrfTokenMetaTag = document.querySelector(`.csrfToken`); // this grabs the <input> tag holding the CSRF token
        const csrfFormTag = document.querySelector(`.form`);
        fetch(`/haris/setCSRFToken`)
            .then(data => data.json())
            .then(csrfToken => {
                // csrfTokenMetaTag.value = csrfToken.token;
                csrfFormTag.setAttribute(`action`, `/haris/product-submit?_csrf=${csrfToken.token}`);
                console.log(`\n\nSuccessfull added CSRF token\n\n`);
            })
            .catch(err => {
                console.log(err);
            });

        const descriptionTextarea = document.querySelector(`.descriptionTextarea`);
        const descriptionTextareaSpan= document.querySelector(`.descriptionTextareaSpan`);
        const embeddedVideoTextarea = document.querySelector(`.embeddedVideoTextarea`);
        const originalTextareaHeight = descriptionTextarea.clientHeight;
        descriptionTextarea.addEventListener(`keyup`, (e) => {
            if (descriptionTextarea.scrollHeight > descriptionTextarea.clientHeight) {
                descriptionTextarea.style.height = descriptionTextarea.scrollHeight + "px";
            };
            if (descriptionTextarea.value == "") {
                descriptionTextarea.style.height = originalTextareaHeight + "px";
            };
        });
        descriptionTextarea.addEventListener(`paste`, (e) => {
            if (descriptionTextarea.scrollHeight > descriptionTextarea.clientHeight) {
                descriptionTextarea.style.height = descriptionTextarea.scrollHeight + "px";
            };
            const myEvent = new Event('keyup');
            descriptionTextarea.dispatchEvent(myEvent);
        });

        embeddedVideoTextarea.addEventListener(`keyup`, (e) => {
            if (embeddedVideoTextarea.scrollHeight > embeddedVideoTextarea.clientHeight) {
                embeddedVideoTextarea.style.height = embeddedVideoTextarea.scrollHeight + "px";
            };
            if (embeddedVideoTextarea.value == "") {
                embeddedVideoTextarea.style.height = originalTextareaHeight + "px";
            };
        });
        embeddedVideoTextarea.addEventListener(`paste`, (e) => {
            if (embeddedVideoTextarea.scrollHeight > embeddedVideoTextarea.clientHeight) {
                embeddedVideoTextarea.style.height = embeddedVideoTextarea.scrollHeight + "px";
            };
            const myEvent = new Event('keyup');
            embeddedVideoTextarea.dispatchEvent(myEvent);
        });
    };
};

new AddProduct();
