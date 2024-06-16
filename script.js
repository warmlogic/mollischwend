function showTab(event, tabId) {
    if (event) event.preventDefault();

    // Hide all tab contents
    var tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(function(content) {
        content.style.display = 'none';
        content.classList.remove('active');
    });

    // Remove active class from all tabs
    var tabs = document.querySelectorAll('nav ul.tabs li a');
    tabs.forEach(function(tab) {
        tab.classList.remove('active');
    });

    // Show the selected tab content
    var tabContent = document.getElementById(tabId);
    if (tabContent) {
        tabContent.style.display = 'block';
        tabContent.classList.add('active');
    }

    // Add active class to the selected tab
    var tabLink = document.querySelector(`nav ul.tabs li a[href="${tabId}"]`);
    if (tabLink) {
        tabLink.classList.add('active');
    }
}

// Handle tab clicks
document.querySelectorAll('nav ul.tabs li a').forEach(function(tab) {
    tab.addEventListener('click', function(event) {
        var tabId = this.getAttribute('href');
        showTab(event, tabId);
        // Update the URL without reloading the page
        history.pushState(null, null, tabId);
    });
});

// Show the home tab when the page is loaded or if the path ends with index.html
window.onload = function() {
    var path = location.pathname.substring(1);
    if (path === '' || path.endsWith('index.html')) {
        showTab(null, 'home');
    } else {
        showTab(null, path);
    }

    // Highlight the active tab based on the current URL
    var tabs = document.querySelectorAll('nav ul.tabs li a');
    tabs.forEach(function(tab) {
        if (tab.getAttribute('href') === '/' + path) {
            tab.classList.add('active');
        }
    });
};
