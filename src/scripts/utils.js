function nextAnimationFrame() {
    return new Promise(function(resolve, reject) {
        window.requestAnimationFrame(function() {
            window.requestAnimationFrame(resolve);
        });
    });
}

function transitionEnd(target) {
    return new Promise(function(resolve, reject) {
        target.addEventListener('transitionend', resolve, {
            once: true
        });
    });
}