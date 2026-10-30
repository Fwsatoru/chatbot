# Réaliser votre premier chatbot

## 01 Votre mission

Vous avez **2 heures** pour construire un chatbot d’accueil qui explique les bases du développement Web. Il reçoit un message, applique les règles que vous programmez et affiche une réponse. Vous devez réaliser son HTML, son CSS et son JavaScript.

La version obligatoire affiche uniquement **le dernier message envoyé et la dernière réponse**. Un historique complet n’est pas demandé. Vous pouvez choisir le nom, les textes et l’apparence de votre chatbot.

Le squelette inclut les liens vers CSS et JavaScript ainsi qu’un serveur prêt à lancer. Le contenu de la page, les styles et le comportement restent à écrire. Aucun corrigé n’est fourni.

## 02 Prévoir votre interface

Votre page doit contenir :

- Un titre principal présentant le chatbot et une courte consigne.
- La liste visible des mots-clés reconnus.
- Un champ de saisie possédant un label explicitement associé.              
- Un bouton natif « Envoyer » et un bouton natif « Recommencer ».
- Une zone pour le dernier message envoyé.
- Une zone pour la réponse du chatbot, présente dès le chargement avec un accueil.
- Un compteur affichant le nombre de messages valides envoyés.
- Une zone de retour utilisateur pour indiquer une saisie vide.

Utilisez des éléments HTML adaptés, des id uniques et des classes utiles pour vos styles. Vous pouvez utiliser des boutons type="button" pour rester sur les événements click étudiés. Un formulaire et l’événement submit ne sont pas obligatoires.

Gardez un ordre de lecture clair. Le champ doit être repérable par son label, pas seulement par un texte indicatif dans le champ. Prévoir une zone de réponse avec aria-live="polite" permet de signaler ses mises à jour aux technologies d’assistance sans déplacer le focus.

## 03 Programmer les règles de réponse

Le contenu exact des phrases est libre, mais chaque réponse doit respecter le tableau suivant.

| Message reconnu | Réponse attendue |
| --- | --- |
| bonjour | Saluer et annoncer le nom du chatbot |
| aide | Expliquer comment l’utiliser et rappeler les mots-clés |
| html | Expliquer le rôle de HTML dans une phrase compréhensible |
| css | Expliquer le rôle de CSS dans une phrase compréhensible |
| javascript | Expliquer le rôle de JavaScript dans une phrase compréhensible |
| Tout autre texte non vide | Signaler que ce message n’est pas reconnu et proposer aide |

La reconnaissance obligatoire porte sur **le message entier**, pas sur un mot dans une phrase. « html » correspond ; « explique html » utilise la réponse de secours. Les espaces aux extrémités et les majuscules doivent être ignorés : «   HTML   » doit obtenir la même réponse que « html ».

Un message vide ou composé uniquement d’espaces doit produire une indication utile. Il ne doit modifier ni le compteur, ni le dernier échange valide.

Après chaque message valide, reconnu ou non : afficher le message envoyé, afficher la réponse, augmenter le compteur de 1, vider le champ de saisie et retirer l’éventuelle indication de saisie vide. Garder la casse du message original dans son affichage ; seule la version utilisée pour la comparaison doit être en minuscules.

Au chargement : compteur à 0, aucun dernier message, réponse d’accueil et aucune erreur. « Recommencer » rétablit ces mêmes valeurs, vide aussi le champ et permet un nouvel échange. Le premier message valide suivant doit compter pour 1.

## 04 Organiser votre JavaScript

Mettez en pratique les notions du workshop :

- Un objet décrivant le chatbot, avec au minimum son nom et son message d’accueil. Utiliser ces propriétés dans votre programme, pas seulement les déclarer.
- Des const pour les références aux éléments et les informations non réaffectées.
- Un let pour l’état du compteur, déclaré à un endroit qui conserve sa valeur entre les clics.
- Des comparaisons strictes et des conditions if, else if et else pour les réponses.
- Une fonction choisirReponse qui reçoit le texte préparé et renvoie une réponse. Elle ne modifie pas le document.
- Une fonction envoyerMessage pour relier lecture, validation, réponse, compteur et affichage.
- Une fonction recommencer pour rétablir l’état initial.
- Des écouteurs click enregistrés avec addEventListener.
- Des mises à jour du DOM avec textContent.

Choisissez vos noms de variables et commentez les intentions qui ne sont pas évidentes. Utilisez textContent pour afficher la saisie comme du texte, sans l’interpréter comme du HTML. Aucun tableau, aucune boucle et aucun paquet supplémentaire ne sont nécessaires pour la version obligatoire.

## 05 Réaliser la présentation CSS

Votre interface doit être personnelle et lisible : une police confortable, un contraste suffisant, des espacements cohérents, une largeur de contenu maîtrisée et des boutons identifiables. Distinguez visuellement le message envoyé et la réponse.

Réutilisez les sélecteurs, les couleurs, font-family, line-height, margin, padding, border et max-width. Vérifiez que votre page reste utilisable dans une fenêtre étroite. Gardez un indicateur de focus visible sur les contrôles ; ne retirez pas leur contour sans remplacement.

Une présentation simple et fonctionnelle est préférable à une décoration inachevée. La mise en page peut être réalisée avec le flux normal du document ; aucune technique de disposition supplémentaire n’est imposée.

## 06 Gérer vos deux heures

| Temps | Travail à réaliser |
| --- | --- |
| 0 à 10 min | Lire les règles, lancer le projet et prévoir les zones de la page |
| 10 à 30 min | Construire le HTML complet et vérifier les contrôles |
| 30 à 50 min | Réaliser une première présentation CSS lisible |
| 50 à 95 min | Programmer et tester les interactions JavaScript progressivement |
| 95 à 110 min | Vérifier les cas limites, le clavier et la fenêtre étroite |
| 110 à 120 min | Corriger, compléter REPONSES.md et préparer la démonstration |

Pour progresser : faire fonctionner un premier envoi, puis les règles, le compteur et la remise à zéro. Après chaque modification, enregistrer, recharger et expliquer le résultat observé. Ne passez aux bonus qu’après avoir validé le fonctionnement obligatoire.

## 07 Quelques outils de lecture de la saisie

Le champ HTML possède une propriété value : elle permet de lire ou de remplacer son texte saisi. Une chaîne de caractères possède notamment les méthodes trim et toLowerCase.

| Expression isolée | Ce qu’elle produit |
| --- | --- |
| element.value | Le contenu courant d’un champ de saisie |
| "  SALUT  ".trim() | Le texte "SALUT", sans espaces aux extrémités |
| "SALUT".toLowerCase() | Le texte "salut" |
| element.value = "" | Vide un champ de saisie |

trim et toLowerCase renvoient un nouveau texte ; elles ne modifient pas automatiquement la valeur du champ. Gardez distincts le texte à afficher et celui à comparer. Une fonction peut utiliser return pour transmettre son résultat ou terminer son exécution après un cas invalide.

Pour afficher des étapes de diagnostic, utilisez console.log puis ouvrez la console du navigateur. Placez un point d’arrêt pour vérifier une variable si nécessaire. Retirez les affichages de diagnostic inutiles avant de rendre le projet.

## 08 Vérifier votre travail

Effectuez les essais dans cet ordre. Notez un éventuel problème puis corrigez-le avant de poursuivre.

| Essai | Résultat à vérifier |
| --- | --- |
| Charger la page | Accueil visible, compteur à 0 et contrôles présents |
| Envoyer bonjour | Salutation avec le nom choisi, compteur à 1 |
| Envoyer successivement aide, html, css et javascript | Réponse adaptée à chacun ; compteur à 5 après ces cinq messages au total |
| Envoyer "   HTML   " | Réponse HTML ; message affiché avec sa casse d’origine ; compteur augmenté |
| Envoyer un texte inconnu | Réponse de secours et compteur augmenté |
| Envoyer un champ vide puis uniquement des espaces | Indication visible ; dernier échange et compteur conservés |
| Envoyer ensuite css | Indication retirée, réponse correcte, champ vidé |
| Activer Recommencer | Retour à l’accueil, compteur 0, saisie et dernier message vidés |
| Envoyer bonjour après la remise à zéro | Compteur à 1 et chatbot encore utilisable |
| Recharger la page | Retour à l’état initial ; aucune sauvegarde n’est demandée |
| Naviguer avec Tab et activer les boutons avec le clavier | Contrôles accessibles et focus visible |
| Réduire la largeur de la fenêtre | Contenu lisible sans défilement horizontal gênant |
| Ouvrir la console | Aucune erreur pendant les actions précédentes |

## 09 Rendre votre projet

Rendez le dossier du projet sans node_modules, avec les trois fichiers complétés dans public et REPONSES.md renseigné. Conservez package.json et infrastructure pour que le projet puisse être lancé avec npm run dev. Une capture ne remplace pas les fichiers source.

Préparez une démonstration de deux minutes : démarrage, message reconnu, saisie vide, réponse de secours et remise à zéro. Chaque membre d’un binôme doit pouvoir expliquer une fonction et le chemin suivi entre le clic et l’affichage.

## 10 Critères de réussite sur vingt points

| Critère | Points |
| --- | --- |
| HTML structuré, label associé, zones et contrôles complets | 4 |
| CSS lisible, cohérent, focus visible et fenêtre étroite utilisable | 4 |
| Les cinq règles, la réponse de secours et la préparation du texte fonctionnent | 4 |
| Validation, compteur et remise à zéro respectent les consignes | 4 |
| Organisation du JS, objet utilisé, fonctions expliquées et réponses écrites | 4 |

Les bonus ne remplacent aucun point du fonctionnement obligatoire.

## 11 Bonus si le travail obligatoire est terminé

Choisissez au maximum un bonus : envoyer aussi avec Entrée ; ajouter deux nouveaux mots-clés ; ou conserver un historique des échanges. Un historique demande de découvrir comment créer et ajouter des éléments au DOM : ne le commencez pas avant d’avoir terminé les autres essais.

## 12 Documentation autorisée

- [MDN éléments HTML](https://developer.mozilla.org/fr/docs/Web/HTML/Reference/Elements)
- [MDN label](https://developer.mozilla.org/fr/docs/Web/HTML/Reference/Elements/label)
- [MDN bases CSS](https://developer.mozilla.org/fr/docs/Learn_web_development/Core/Styling_basics)
- [MDN querySelector](https://developer.mozilla.org/fr/docs/Web/API/Document/querySelector)
- [MDN textContent](https://developer.mozilla.org/fr/docs/Web/API/Node/textContent)
- [MDN valeur d’un champ](https://developer.mozilla.org/fr/docs/Web/API/HTMLInputElement/value)
- [MDN trim](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/trim)
- [MDN toLowerCase](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)
- [MDN fonctions](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Functions)
- [MDN addEventListener](https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener)

Cherchez une notion précise, lisez sa définition, testez une petite modification et expliquez son effet.
