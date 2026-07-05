function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function () {
    var dropdown = document.querySelector('.dropdown > a');
    dropdown.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            this.parentElement.classList.toggle('open');
        }
    });

    var timelines = document.querySelectorAll('.timeline');

    function updateVehicles() {
        var viewCenter = window.scrollY + window.innerHeight / 2;
        timelines.forEach(function (timeline) {
            var vehicle = timeline.querySelector('.timeline-vehicle');
            if (!vehicle) return;
            var rectTop = timeline.getBoundingClientRect().top + window.scrollY;
            var height = timeline.offsetHeight;
            var progress = (viewCenter - rectTop) / height;
            progress = Math.min(1, Math.max(0, progress));
            vehicle.style.top = (progress * 100) + '%';
        });
    }

    var ticking = false;
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                updateVehicles();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);
    updateVehicles();
});
