(function(){
  'use strict';

  document.addEventListener('DOMContentLoaded', function(){
    // Objet pour stocker tous les sons
    const sounds = {};

    // Liste des fichiers sons disponibles
    const soundFiles = [
      'alerte-au-gogole',
      'c-nul-homer',
      'cest-qui-le-patron',
      'la-femme-nest-pas-a-la-cuisine',
      'la-place-de-la-femme-cest-a-la-cuisine'
    ];

    // Initialisation des sons
    soundFiles.forEach(soundFile => {
      sounds[soundFile] = new Howl({
        src: [
          `sounds/${soundFile}.mp3`
        ],
        html5: true
      });
    });

    // Sélectionner tous les boutons
    const buttons = Array.from(document.querySelectorAll('button[data-sound]'));

    // Ajouter les écouteurs d'événements à chaque bouton
    buttons.forEach(button => {
      const soundName = button.getAttribute('data-sound');
      if (soundName && sounds[soundName]) {
        button.addEventListener('click', function() {
          playSound(soundName, this);
        });
      }
    });

    // Fonction pour jouer un son et mettre à jour l'état du bouton
    function playSound(soundName, buttonElement) {
      const sound = sounds[soundName];
      if (!sound) return;

      // Réinitialiser la classe sur tous les boutons
      buttons.forEach(btn => {
        btn.classList.remove('is-playing');
      });

      // Arrêter tous les sons en cours
      Object.values(sounds).forEach(s => s.stop());

      // Jouer le nouveau son
      sound.play();
      buttonElement.classList.add('is-playing');

      // Retirer la classe quand le son est terminé
      sound.once('end', function() {
        buttonElement.classList.remove('is-playing');
      });
    }

    // Initialiser le sélecteur de thèmes
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
      const themes = ['Tous', 'Homer Simpson', 'Cuisine', 'Divers'];

      themes.forEach(theme => {
        const option = document.createElement('option');
        option.value = theme.toLowerCase();
        option.textContent = theme;
        themeSelect.appendChild(option);
      });

      // Filtre par thème
      themeSelect.addEventListener('change', function() {
        const selectedTheme = String(this.value || '').toLowerCase();

        buttons.forEach(button => {
          const soundName = button.getAttribute('data-sound') || '';
          const parentItem = button.closest('.grid-item');
          if (!parentItem) return;

          if (!selectedTheme || selectedTheme === 'tous') {
            parentItem.style.display = 'block';
            return;
          }

          let showButton = false;
          if (selectedTheme === 'homer simpson' && soundName.includes('homer')) {
            showButton = true;
          } else if (selectedTheme === 'cuisine' && soundName.includes('cuisine')) {
            showButton = true;
          } else if (selectedTheme === 'divers' && !soundName.includes('homer') && !soundName.includes('cuisine')) {
            showButton = true;
          }

          parentItem.style.display = showButton ? 'block' : 'none';
        });
      });
    }
  });
})();