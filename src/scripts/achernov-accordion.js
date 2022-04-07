(async function() {
    await nextAnimationFrame();
    const accordions = document.querySelectorAll('.achernov-accordion');
    const windowWidth = window.innerWidth;
    accordions.forEach(function(acc) {
        if (windowWidth > 568 && acc.classList.contains('achernov-accordion--sm-only')) return;
        if (windowWidth > 1024 && acc.classList.contains('achernov-accordion--md-only')) return;

        var items = acc.querySelectorAll('.achernov-accordion__item');
        items.forEach(function(item) {
            // Calculate content height
            var title = item.querySelector('.achernov-accordion__title');
            var content = item.querySelector('.achernov-accordion__content');
            item.style.height = (title.offsetHeight + content.offsetHeight) + 'px';

            // Handle toggle click
            title.addEventListener('click', function(e) {
                e.preventDefault();
                for (var i in Array.from(items)) {
                    if (items[i].isSameNode(item))
                        items[i].classList.toggle('achernov-accordion__item--active');
                    else
                        items[i].classList.remove('achernov-accordion__item--active');
                }
            })
        })
    });
})();