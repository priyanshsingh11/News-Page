const apiKeys = {
    tesla: "https://newsapi.org/v2/everything?q=tesla&from=2025-02-28&sortBy=publishedAt&apiKey=7699e2c0f4224e9380114315e5e44812",
    apple: "https://newsapi.org/v2/everything?q=apple&from=2025-03-29&to=2025-03-29&sortBy=popularity&apiKey=7699e2c0f4224e9380114315e5e44812",
    us: "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7699e2c0f4224e9380114315e5e44812",
    techcrunch: "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=7699e2c0f4224e9380114315e5e44812"
};

async function fetchNews(category) {
    document.getElementById("backButton").style.display = "block"; // Show back button
    const newsContainer = document.getElementById("news");
    newsContainer.innerHTML = `<div class="loading-spinner"></div>`;
    
    try {
        const response = await fetch(apiKeys[category]);
        const data = await response.json();

        let html = "";
        data.articles.forEach(article => {
            html += `
                <div class="news-card">
                    <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="News Image">
                    <h3>${article.title}</h3>
                    <p>${article.description || 'No description available.'}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                </div>
            `;
        });
        newsContainer.innerHTML = html;
    } catch (error) {
        newsContainer.innerHTML = `<p class="loading-text">Error loading news. Try again.</p>`;
    }
}

function goBack() {
    document.getElementById("news").innerHTML = `<p class="loading-text">Click on a category to load news...</p>`;
    document.getElementById("backButton").style.display = "none";
}
