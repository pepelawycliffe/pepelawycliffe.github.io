(function() {
    const localTimes = Array.from(document.querySelectorAll('.local-time-container'));
    localTimes.forEach(function(lt) {
        const timezone = lt.getAttribute('data-timezone');
        renderLocalTime(lt, timezone);
        setInterval(() => renderLocalTime(lt, timezone), 60 * 1000);
    });
})();

function renderLocalTime(target, timezone) {
    target.textContent = luxon.DateTime.local().setZone(timezone).toFormat('hh:mm a');
}