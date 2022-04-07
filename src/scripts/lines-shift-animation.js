(function() {
    //if('fonts' in document) {
    //    document.fonts.ready.then(() => document.body.classList.add('page--loaded'));
    //} else {
    //    window.addEventListener('DOMContentLoaded', e => document.body.classList.add('page--loaded'));
    //}
    if ('fonts' in document) {
        document.fonts.ready.then(async function() {
            processShiftLineContainers();
            await nextAnimationFrame();
            document.body.classList.add('page--loaded');
        });
    } else {
        window.addEventListener('DOMContentLoaded', async function() {
            processShiftLineContainers();
            await nextAnimationFrame();
            document.body.classList.add('page--loaded');
        });
    }

    let resizeTimeout = null;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(processShiftLineContainers, 1000);
    });
})();

function processShiftLineContainers() {
    const shiftContaners = Array.from(document.querySelectorAll('.lines-shift-container'));
    shiftContaners.forEach(c => wrapLines(c, '<span class="shift-line"><span>', '</span></span>'));
}

function wrapLines(target, before, after) {
    let lines = detectLines(target);
    lines = lines.map(l => before + l + after);
    let html = lines.join(' ');
    //html = html.replace('™', '<sup>™</sup>');
    target.innerHTML = html;
}

function detectLines(target) {
    const text = target.textContent;
    const words = text.split(' ');
    const div = document.createElement('div');

    // Creating copy of text container with text affecting properties
    const tstyle = window.getComputedStyle(target);
    const rect = target.getBoundingClientRect();
    div.style.width = rect.width + 'px'; //tstyle.getPropertyValue('width');
    div.style.fontFamily = tstyle.getPropertyValue('font-family');
    div.style.fontSize = tstyle.getPropertyValue('font-size');
    div.style.fontWeight = tstyle.getPropertyValue('font-weight');
    div.style.letterSpacing = tstyle.getPropertyValue('letter-spacing');
    div.style.lineHeight = tstyle.getPropertyValue('line-height');
    div.style.boxSizing = tstyle.getPropertyValue('box-sizing');
    div.style.padding = tstyle.getPropertyValue('padding');
    div.style.wordSpacing = tstyle.getPropertyValue('word-spacing');
    div.style.textTransform = tstyle.getPropertyValue('text-transform');
    // making it hidden from user, just in case
    div.style.visibility = 'hidden';
    div.style.position = 'absolute';
    div.style.top = 0;
    // identifying line height for calculations
    const lineHeight = parseInt(div.style.lineHeight);
    document.body.appendChild(div);

    // adding text content to the container word by word
    const lines = [];
    let prevText = "";
    let currLine = "";
    words.forEach(function(w) {
        let clb = currLine; // backup of the line without new word
        if (currLine != "") currLine += " ";
        currLine += w;
        div.textContent = prevText + currLine;
        // if latest word expanded container height by one line
        if (div.offsetHeight > (lineHeight * (lines.length + 1))) {
            prevText += clb + " "; // adding new found line to text
            currLine = w; // preserving the word for next line search
            // saving this current line minus this word
            lines.push(clb.trim());
        }
    });
    lines.push(currLine.trim()); // adding left over line to lines
    div.remove();
    return lines;
}