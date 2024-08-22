// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('card-container');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close');
    const articleEl = document.getElementById('article');
    const titleEl = document.getElementById('title');
    const descriptionEl = document.getElementById('description');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resumeBtn = document.getElementById('resume-btn');
    const stopBtn = document.getElementById('stop-btn');

    let speechSynthesisUtterance = null;

    // Fetch JSON data
    fetch('data.json')
      .then(response => response.json())
      .then(articles => {
        // Generate cards dynamically based on fetched JSON data
        articles.forEach(article => {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerText = article.article;
          card.addEventListener('click', () => openModal(article));
          cardContainer.appendChild(card);
        });
      })
      .catch(error => console.error('Error fetching JSON:', error));

    // Open modal
    function openModal(article) {
      articleEl.innerText = article.article;
      titleEl.innerText = article.title;
      descriptionEl.innerText = article.description;
      modal.style.display = 'flex';

      // Initialize speech synthesis
      if (speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      speechSynthesisUtterance = new SpeechSynthesisUtterance(descriptionEl.innerText);
    }

    // Close modal
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
      if (speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    });

    // Text-to-Speech Controls
    playBtn.addEventListener('click', () => {
      if (speechSynthesisUtterance) {
        window.speechSynthesis.speak(speechSynthesisUtterance);
      }
    });

    pauseBtn.addEventListener('click', () => {
      if (speechSynthesis.speaking) {
        window.speechSynthesis.pause();
      }
    });

    resumeBtn.addEventListener('click', () => {
      if (speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    });

    stopBtn.addEventListener('click', () => {
      if (speechSynthesis.speaking || speechSynthesis.paused) {
        window.speechSynthesis.cancel();
      }
    });
  });
