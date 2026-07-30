const buttons = document.querySelectorAll(".report-table button");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        alert("Downloading Report...");

    });

});