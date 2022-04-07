(function() {
    const pwvVideos = Array.from(document.querySelectorAll('.video--play-when-visible'));

    handler();
    window.addEventListener('scroll', handler);

    function handler() {
        const viewStart = window.pageYOffset;
        const viewEnd = window.pageYOffset + window.innerHeight;
        const viewHeight = window.innerHeight;
        //console.log(viewStart, viewEnd);

        pwvVideos.forEach(function(v) {
            const rect = v.getBoundingClientRect();
            const topPos = viewHeight - rect.top;
            const bottomPos = viewHeight - (rect.top + rect.height);
            const videoHeight = v.offsetHeight;
            //console.log(topPos, bottomPos, videoHeight);
            if (topPos > 0 && bottomPos < viewHeight) {
                v.play();
            } else {
                v.pause();
            }
        });
    }
})();