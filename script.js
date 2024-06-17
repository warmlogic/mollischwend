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
    var tabLink = document.querySelector(`nav ul.tabs li a[href="/${tabId}"]`);
    if (tabLink) {
        tabLink.classList.add('active');
    }
}

function highlightActiveTab() {
    const path = location.pathname.substring(1) || 'home';
    const tabs = document.querySelectorAll('nav ul.tabs li a');
    tabs.forEach(tab => {
        if (tab.getAttribute('href').substring(1) === path) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}

// Handle tab clicks
document.querySelectorAll('nav ul.tabs li a').forEach(function(tab) {
    tab.addEventListener('click', function(event) {
        const tabId = this.getAttribute('href').substring(1);
        showTab(event, tabId);
        history.pushState(null, null, '/' + tabId);
        highlightActiveTab();
    });
});

// Show the home tab when the page is loaded or if the path ends with index.html
window.onload = function() {
    let path = location.pathname.substring(1);
    if (path === '' || path === 'index.html') {
        path = 'home';
        history.replaceState(null, null, '/home');
    } else {
        // Check if redirected from 404.html
        const query = window.location.search.substring(1);
        if (query) {
            path = query;
            history.replaceState(null, null, '/' + path);
        }
    }
    showTab(null, path);
    highlightActiveTab();
};

window.onpopstate = function() {
    highlightActiveTab();
    const path = location.pathname.substring(1) || 'home';
    showTab(null, path);
};
