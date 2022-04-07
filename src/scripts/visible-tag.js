(function() {
    const tags = Array.from(document.querySelectorAll('.visible-tag'));

    handler();
    window.addEventListener('scroll', handler);

    function handler() {
        const viewStart = window.pageYOffset;
        const viewEnd = window.pageYOffset + window.innerHeight;
        const viewHeight = window.innerHeight;
        //console.log(viewStart, viewEnd);

        tags.forEach(function(t) {
            const rect = t.getBoundingClientRect();
            const topPos = viewHeight - rect.top;
            const bottomPos = viewHeight - (rect.top + rect.height);
            //console.log(topPos, bottomPos, videoHeight);
            if (topPos > viewHeight / 3) {
                t.classList.add('visible-tag--visible');
            }
        });
    }
})();