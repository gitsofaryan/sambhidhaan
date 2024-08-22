const cardContainer = document.querySelector('.card-container');
const modal = document.getElementById('articleModal');
const closeButton = document.querySelector('.close');
const articleTitleElement = document.getElementById('articleTitle');
const articleDescriptionElement = document.getElementById('articleDescription');
const articleAudioElement = document.getElementById('articleAudio');
const translationContainer = document.getElementById('translationContainer');

async function fetchAndCreateCards() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();

    data.forEach(article => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <h2>${article.article}</h2>
        <h3>${article.title}</h3>
        <p>${article.description}</p>
        <button class="read-more-button">Read More</button>
      `;

      card.querySelector('.read-more-button').addEventListener('click', () => {
        displayArticleDetails(article);
      });

      cardContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}

function displayArticleDetails(article) {
  articleTitleElement.textContent = article.title;
  articleDescriptionElement.textContent = article.description;
  articleAudioElement.src = article.audioUrl; // Replace with actual audio URL

  // Fetch and display translations (using a translation API)
  fetchTranslation(article.description, 'target_language')
    .then(translation => {
      translationContainer.innerHTML = `<p>Translation: ${translation}</p>`;
    })
    .catch(error => {
      console.error('Error fetching translation:', error);
    });

  modal.style.display = 'block';
}

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Replace 'target_language' with the desired target language code
async function fetchTranslation(text, targetLanguage) {
  // Implement your translation API logic here
  // Example using Google Translate API:
  const apiKey = 'YOUR_GOOGLE_TRANSLATE_API_KEY';
  const url = `https://translation.googleapis.com/translate/v2?key=${apiKey}&q=${encodeURIComponent(text)}&target=${targetLanguage}`;

  const response = await fetch(url);
  const data = await response.json();
  return data.data.translations[0].translatedText;
}

fetchAndCreateCards();
