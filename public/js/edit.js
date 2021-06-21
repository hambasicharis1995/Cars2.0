class Edit {
    constructor() {
        this.productName = document.querySelector(".productName");
        this.id = document.querySelector(".id");
        let id = window.location.pathname.split("/")[3];
        fetch(`/haris/get-product/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log("data", data);
                this.productName.setAttribute("value", data.productName);
                this.id.setAttribute("value", data.id);
            });
    };
};

new Edit();
