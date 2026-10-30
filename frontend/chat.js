// Comportement du chatbot.
// Le navigateur exécute ce fichier grâce à son inclusion dans chat.html.

// 1. L'objet qui décrit le chatbot.
const chatbot = {
  nom: "Hylia-gpt",
  messageAccueil: "Bonjour ! Je suis Hylia-gpt. Écris « aide » pour savoir ce que je comprends.",
  reponseDefaut: "Désolée, je n'ai pas compris ce message. Écris « aide » pour voir les mots-clés.",
  // Adresse complète : fonctionne aussi si la page est ouverte en double-clic ou avec Live Server.
  urlApi: "http://127.0.0.1:5000/api/chat"
};

// 2. Les éléments de l'interface.
const zoneMessages = document.querySelector("#chat-messages");
const formulaire = document.querySelector("#chat-form");
const champSaisie = document.querySelector("#chat-input");
const boutonsSuggestion = document.querySelectorAll(".suggestions button");
const zoneCompteur = document.querySelector("#compteur");
const zoneRetour = document.querySelector("#retour");
const boutonRecommencer = document.querySelector("#btn-recommencer");

// 3. Le nombre de messages valides, conservé entre les clics.
let nombreMessages = 0;

// Reçoit le texte préparé (sans espaces, en minuscules) et renvoie une réponse.
// Cette fonction ne modifie pas la page.
function choisirReponse(texte) {
  if (texte === "bonjour") {
    return "Bonjour ! Je m'appelle " + chatbot.nom + ", ravie de te rencontrer.";
  } else if (texte === "aide") {
    return "Écris un mot-clé puis clique sur « Envoyer ». Mots-clés : bonjour, aide, html, css, javascript.";
  } else if (texte === "html") {
    return "HTML décrit la structure et le contenu d'une page : titres, paragraphes, images, formulaires…";
  } else if (texte === "css") {
    return "CSS gère l'apparence d'une page : couleurs, polices, espacements et mise en page.";
  } else if (texte === "javascript") {
    return "JavaScript rend une page interactive : il réagit aux clics et modifie le contenu affiché.";
  } else {
    return chatbot.reponseDefaut;
  }
}

function ajouterMessage(texte, type) {
  const message = document.createElement("div");
  message.classList.add("message", type);
  message.textContent = texte; // textContent : la saisie n'est jamais interprétée comme du HTML
  zoneMessages.appendChild(message);
  zoneMessages.scrollTop = zoneMessages.scrollHeight;
  return message;
}

// Demande une réponse au serveur pour un message libre (hors mots-clés).
// En cas d'échec (serveur absent, clé manquante…), on garde la réponse de secours.
async function demanderAuServeur(texte) {
  try {
    const reponse = await fetch(chatbot.urlApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: texte })
    });
    const donnees = await reponse.json();
    if (reponse.ok && donnees.reply) {
      return donnees.reply;
    }
    // Le serveur explique ce qui ne va pas (clé manquante, OpenAI indisponible…).
    if (donnees.error) {
      return "Erreur du serveur : " + donnees.error;
    }
  } catch (erreur) {
    // Page ouverte sans le serveur Flask : pas d'API joignable.
    return "Le serveur ne répond pas. Lance-le avec : python backend/server.py";
  }
  return chatbot.reponseDefaut;
}


async function envoyerMessage() {
  const texteOriginal = champSaisie.value;
  const texteCompare = texteOriginal.trim().toLowerCase();

  // Saisie vide : on prévient sans toucher au compteur ni aux messages.
  if (texteCompare === "") {
    zoneRetour.textContent = "Écris un message avant d'envoyer.";
    return;
  }

  ajouterMessage(texteOriginal.trim(), "user-message");

  nombreMessages++;
  zoneCompteur.textContent = "Messages envoyés : " + nombreMessages;

  champSaisie.value = "";
  zoneRetour.textContent = "";

  const reponseLocale = choisirReponse(texteCompare);
  if (reponseLocale !== chatbot.reponseDefaut) {
    ajouterMessage(reponseLocale, "bot-message");
    return;
  }

 
  const bulle = ajouterMessage("…", "bot-message");
  bulle.textContent = await demanderAuServeur(texteOriginal.trim());
  zoneMessages.scrollTop = zoneMessages.scrollHeight;
}


function recommencer() {
  nombreMessages = 0;
  zoneMessages.textContent = "";
  ajouterMessage(chatbot.messageAccueil, "bot-message");
  zoneCompteur.textContent = "Messages envoyés : 0";
  zoneRetour.textContent = "";
  champSaisie.value = "";
  champSaisie.focus();
}

// 4. Les écouteurs (on transmet les fonctions, sans les appeler).
formulaire.addEventListener("submit", function (event) {
  event.preventDefault(); // empêche le rechargement de la page
  envoyerMessage();
});

boutonRecommencer.addEventListener("click", recommencer);

boutonsSuggestion.forEach(function (bouton) {
  bouton.addEventListener("click", function () {
    champSaisie.value = bouton.dataset.message; // lit data-message
    envoyerMessage();
  });
});

// État initial au chargement.
recommencer();
