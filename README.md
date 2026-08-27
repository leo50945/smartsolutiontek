# SmartSolutionTek — landing WhatsApp

Mini landing page mobile-first destinée aux publicités Facebook et Instagram pour la création de sites web en Haïti. Elle rassure le visiteur et le mène vers une unique conversation WhatsApp.

## Lancer localement

Ouvrez simplement `index.html` dans un navigateur. Pour émuler un hébergement statique, servez le dossier avec n'importe quel serveur local, par exemple `npx serve .`.

## Personnaliser WhatsApp

Dans `script.js`, modifiez :

- `whatsappNumber` : numéro au format international, sans `+` ni espaces ;
- `whatsappMessage` : message qui sera prérempli dans WhatsApp.

L'URL est construite automatiquement avec `encodeURIComponent`.

## Déploiement

Ce dossier peut être déployé tel quel sur Vercel, Netlify ou GitHub Pages. Aucune étape de build ni dépendance installée n'est requise. Tailwind CSS, Lucide et Anime.js sont chargés depuis leurs CDN ; cela garde le projet très simple pour une landing statique.

## Suivi analytics

Google Tag Manager (`GTM-P75F7ZGN`) est installé dans `index.html`. Le clic appelle déjà `trackEvent("whatsapp_redirect_click")` dans `script.js` et envoie cet événement à `dataLayer`.

Dans Google Tag Manager, publiez ensuite :

1. une balise de configuration Google Analytics 4 déclenchée sur toutes les pages ;
2. une balise d'événement GA4 nommée `whatsapp_redirect_click`, avec un déclencheur **Événement personnalisé** du même nom.

Google Analytics affichera alors les visites (`page_view`) et les clics WhatsApp. Utilisez le mode Aperçu de GTM avant de publier pour vérifier les deux événements.

## Tableau de statistiques

Les pages `login.html` et `stats.html` existent sans lien depuis la landing. Le mot de passe demandé est `leo1111`.

Important : cette protection et les chiffres actuels sont locaux au navigateur ; avec un site statique, ils ne peuvent ni sécuriser réellement l'accès ni mesurer tous les visiteurs. Pour un tableau fiable accessible depuis n'importe quel appareil, connectez Google Analytics, Meta Pixel ou un backend (Firebase, par exemple).
