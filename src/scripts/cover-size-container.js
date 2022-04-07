(function() {
    const containers = Array.from(document.querySelectorAll('.cover-size-container'));
    containers.forEach(function(c) {
        scaleContainer(c);
        document.addEventListener('DOMContentLoaded', function() {
            scaleContainer(c);
        });

        window.addEventListener('resize', () => scaleContainer(c));
    });

    function scaleContainer(container) {
        const videoSize = {
            x: parseInt(container.getAttribute('prop-width')),
            y: parseInt(container.getAttribute('prop-height'))
        };
        const windowWidth = container.parentNode.offsetWidth;
        const windowHeight = container.parentNode.offsetHeight;

        let scaledWidth = videoSize.x * (windowHeight / videoSize.y);
        let scaledHeight = windowHeight;
        if (scaledWidth < windowWidth) {
            scaledWidth = windowWidth;
            scaledHeight = videoSize.y * (windowWidth / videoSize.x);
        }

        container.style.width = scaledWidth + 'px';
        container.style.height = scaledHeight + 'px';
    }
})();