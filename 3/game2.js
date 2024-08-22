// game2.js

document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('card-container');

    // Fetch articles from data.json
    fetch('data.json')
      .then(response => response.json())
      .then(articles => {
        articles.forEach(article => {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerText = article.article;
          card.addEventListener('click', () => {
            showArticleDetails(article);
          });
          cardContainer.appendChild(card);
        });
      })
      .catch(error => console.error('Error fetching JSON:', error));
  });

  function showArticleDetails(article) {
    alert(`Article: ${article.article}\nTitle: ${article.title}\nDescription: ${article.description}`);
  }
