// game1.js

document.addEventListener('DOMContentLoaded', () => {
    const spinButton = document.getElementById('spin-button');
    const resultDiv = document.getElementById('result');

    spinButton.addEventListener('click', () => {
      // Simulate spinning logic
      const articles = [
        'Article 371B: Special provision with respect to the State of Assam',
        // Add more articles as needed
      ];
      const randomIndex = Math.floor(Math.random() * articles.length);
      const selectedArticle = articles[randomIndex];

      // Show result
      resultDiv.innerText = `You landed on: ${selectedArticle}`;
    });
  });
