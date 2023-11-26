document.addEventListener("DOMContentLoaded", function () {
    // Get the carousel element
    var sortBarCarousel = document.getElementById("sortBarCarousel");

    // Add event listener for the next (right) control button
    document.querySelector(".carousel-control-next").addEventListener("click", function () {
        sortBarCarousel.querySelector('.carousel-item.active').classList.remove("active");
        sortBarCarousel.querySelector('.carousel-item:nth-child(2)').classList.add("active");
    });

    // Add event listener for the previous (left) control button
    document.querySelector(".carousel-control-prev").addEventListener("click", function () {
        sortBarCarousel.querySelector('.carousel-item.active').classList.remove("active");
        sortBarCarousel.querySelector('.carousel-item:nth-child(1)').classList.add("active");
    });
});