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

Le clic appelle déjà `trackEvent("whatsapp_redirect_click")` dans `script.js`. Pour ajouter Meta Pixel ou Google Analytics plus tard, installez le script officiel du fournisseur puis adaptez le contenu de cette fonction, sans toucher au CTA.
