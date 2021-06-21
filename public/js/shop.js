class Shop {
    constructor() {
        let currentPageNumber = 1;

        const products = [];
        const prods = document.querySelector(".prods");
        const pageButton = document.querySelector(".pageNumberButton");
        const nextButton = document.querySelector(".nextButton");

        pageButton.innerText = `Haris Hambasic`

        fetch("/haris/get-products")
            .then(response => response.json())
            .then(data => {
                const mainContainer = document.querySelector(`.main-container`);
                const mainHeadingSpecs = document.createElement(`p`);
                mainHeadingSpecs.innerHTML =
                    `
                        ${data.length} total vehicles available
                    `;
                mainHeadingSpecs.classList.add(`.mainHeadingSpecs`);
                const mainHeading = document.querySelector(`.main-heading`);
                mainHeading.innerHTML =
                    `
                        <h1 class='thep p1'>Available Vehicles</h1>
                        <p class='thep p2'>(${data.length} total)</p>
                    `;
                let d = [];

                data.forEach(car => {
                    console.log('/' + car.vehicleImage);
                    const _html = `
                        <div class='carListItem'>
                            <div class='image-container'>
                                <img class='image' src='${car.vehicleImage ? "/" + car.vehicleImage : "/images/ferrari.jpg"}'/>
                                <a href='/haris/delete/:${car._id}'>
                                    <div class='delete-container'>
                                        <p class='delete-btn'>X</p>
                                    </div>
                                </a>
                                <div class='more'>
                                    <a class='more-_btn' href='/haris/learn-more/${car._id}'><p class='more-btn learn-more-btn'>Learn more</p></a>
                                    <a class='more-_btn' href='/haris/purchase/${car._id}'><p class='more-btn purchase-btn'>Purchase</p></a>
                                </div>
                            </div>
                            <div class='specs'>
                                <div class='specs-left'>
                                    <p>${car.name}</p>
                                </div>
                                <div class='specs-right'>
                                    <p class='price'>$${car.price}</p>
                                </div>
                            </div>
                        </div>
                    `

                    d.push(_html);
                });
                d = d.join('').toString();
                mainContainer.innerHTML = d;
                const deleteBtns = document.querySelectorAll(`.delete-container`);
                const aw = document.querySelectorAll(`.image-container`);
                aw.forEach(el => {
                    const deleteBtn = el.querySelector(`.delete-container`);
                    el.addEventListener(`mouseover`, () => {
                        let _el = el.querySelector('.more');
                        _el.style.display = "flex";
                        _el.style.justifyContent = "center";
                        deleteBtn.style.display = `flex`;
                    });
                    el.addEventListener(`mouseleave`, () => {
                        let _el = el.querySelector('.more');
                        _el.style.display = "none";
                        deleteBtn.style.display = `none`;
                    });
                });
                const learnMoreBtn = document.querySelectorAll(`.learn-more-btn`);
                learnMoreBtn.forEach(el => {
                    el.style.marginRight = `.75rem`;
                    el.addEventListener(`click`, (e) => {
                        e.stopImmediatePropagation();
                    });
                });
                const purchaseBtn = document.querySelectorAll(`.purchase-btn`);
                purchaseBtn.forEach(el => {
                    el.style.marginLeft = `.75rem`;
                    el.addEventListener(`click`, (e) => {
                        e.stopImmediatePropagation();
                    });
                });
                deleteBtns.forEach(btn => {
                    btn.addEventListener(`click`, (e) => {

                        console.log('works');
                    });
                });
                });
    };
};

new Shop();
