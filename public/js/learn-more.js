class LearnMore {
    constructor() {
        const id = window.location.pathname.split(`/`)[3];
        fetch(`/haris/get/learn-more/${id}`)
            .then(data => data.json())
            .then(vehicleInformation => {
                vehicleInformation = vehicleInformation[0];
                const vehicleName = vehicleInformation.name;
                const vehicleCountry = vehicleInformation.country;
                const vehicleYearFounded = vehicleInformation.yearFounded;
                const vehicleDescription = vehicleInformation.description;
                const mainHeading = document.querySelector(`.main-heading`);
                const subHeadingYearFounded = document.querySelector(`.sub-heading-year-founded`);
                const description = document.querySelector(`.description`);
                const video = document.querySelector(`.video`);
                mainHeading.textContent = vehicleName;
                subHeadingYearFounded.textContent = vehicleYearFounded;
                description.textContent = vehicleDescription;
                video.innerHTML = vehicleInformation.link;
            });
    };
}

new LearnMore();
