document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results-container');

    // Mock data with 10 entries
    const mockData = [
        { id: 1, title: "Thistlesticks PDF", content: "Thistlesticks.png", category: "book", date: "$5", exactMatch: false },
        { id: 2, title: "The 16th Furl", content: "16cover.png", category: "book", date: "$20.00", exactMatch: false },
        { id: 3, title: "GM Services", content: "gmposter.png", category: "services", date: "Varies, see above graphic", exactMatch: false },
        { id: 4, title: "Battle Map Commission", content: "astralnest.jpg", category: "artwork", date: "$50.00", exactMatch: false },
        { id: 5, title: "Region Map Commission", content: "aelderkilkra.jpg", category: "artwork", date: "$70.00", exactMatch: false },
        { id: 6, title: "Freelance Coding Services", content: "astralnest.jpg", category: "services", date: "$50.00 / hour", exactMatch: false },
        { id: 7, title: "Poem Commission", content: "astralnest.jpg", category: "services", date: "$5.00 / verse", exactMatch: false },
        { id: 8, title: "TTRPG Consulting Services", content: "astralnest.jpg", category: "services", date: "$50.00 / hour", exactMatch: true },
        { id: 9, title: "Thistlesticks Sticker Pack", content: "astralnest.jpg", category: "artwork", date: "$5.00", exactMatch: false },
        { id: 10, title: "Supporter Subscription", content: "astralnest.jpg", category: "subscription", date: "$5.00 / month", exactMatch: false },
    ];

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.toLowerCase();
        const category = document.getElementById('category').value;
        const dateRange = document.getElementById('date-range').value;
        const exactMatch = document.getElementById('exact-match').checked;

        const results = searchData(query, category, dateRange, exactMatch);
        displayResults(results);
    });

    function searchData(query, category, dateRange, exactMatch) {
        return mockData.filter(item => {
            const matchesQuery = exactMatch
                ? (item.title.toLowerCase() === query || item.content.toLowerCase() === query)
                : (item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query));

            const matchesCategory = category === '' || item.category === category;

            const matchesDate = checkDateRange(item.date, dateRange);

            const matchesExactMatch = !exactMatch || item.exactMatch;

            return matchesQuery && matchesCategory && matchesDate && matchesExactMatch;
        });
    }

    function checkDateRange(itemDate, dateRange) {
        if (dateRange === '') return true;

        const currentDate = new Date();
        const itemDateTime = new Date(itemDate).getTime();

        switch (dateRange) {
            case 'day':
                return itemDateTime > currentDate.getTime() - 86400000; // 24 hours in milliseconds
            case 'week':
                return itemDateTime > currentDate.getTime() - 604800000; // 7 days in milliseconds
            case 'month':
                return itemDateTime > currentDate.getTime() - 2592000000; // 30 days in milliseconds
            default:
                return true;
        }
    }

    function displayResults(results) {
        const resultsContainer = document.getElementById('results-container');
        resultsContainer.innerHTML = '';

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p class="no-results">No results found.</p>';
            return;
        }

        const resultList = document.createElement('ul');
        results.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <a href="#" class="result-link">
                    <h3>${item.title}</h3>
                    <img src="${item.content}" alt="${item.title}" height="500"/>
<!--                    <p>${item.content}</p>-->
                    <small>Category: ${item.category} | Date: ${item.date}</small>
                    <span class="url">https://example.com/result/${item.id}</span>
                </a>
            `;
            resultList.appendChild(listItem);
        });

        resultsContainer.appendChild(resultList);
    }
});