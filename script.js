// Highlight the active tab
document.querySelectorAll('.tabs a').forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

function adjustBodyPadding() {
    const body = document.body;
    const bodyHeight = body.scrollHeight;
    const viewportHeight = window.innerHeight;

    // Only add padding if the content height exceeds the viewport height
    if (bodyHeight > viewportHeight) {
        body.style.paddingBottom = '5vh';
    } else {
        body.style.paddingBottom = '0';
    }
}

window.addEventListener('load', adjustBodyPadding);
window.addEventListener('resize', adjustBodyPadding);
