# Workion Web - Version Web avec Nuxt 3

Version web de l'application Workion développée avec Nuxt 3 pour un meilleur référencement SEO et une expérience utilisateur optimisée.

## 🚀 Fonctionnalités

### Pages principales
- **Accueil** : Page d'accueil avec hero section, services populaires, prestataires certifiés
- **Services** : Liste complète des services avec filtres et recherche
- **Prestataires** : Annuaire des prestataires avec filtres avancés
- **Demandes** : Liste des demandes de services avec filtres
- **Poster une demande** : Formulaire complet pour créer une demande de service

### Fonctionnalités SEO
- **SSR/SSG** : Rendu côté serveur pour un meilleur référencement
- **Meta tags dynamiques** : Optimisation SEO pour chaque page
- **Sitemap automatique** : Génération automatique du sitemap
- **Structured data** : Données structurées pour les moteurs de recherche
- **Performance optimisée** : Lazy loading, code splitting, optimisation des images

### Architecture technique
- **Nuxt 3** : Framework Vue.js avec SSR/SSG
- **TypeScript** : Typage statique pour une meilleure maintenabilité
- **Tailwind CSS** : Framework CSS utilitaire pour le design
- **Pinia** : Store management pour Vue 3
- **API Integration** : Intégration complète avec l'API backend NestJS

## 🛠️ Installation et développement

### Prérequis
- Node.js 18+ (recommandé Node.js 20+)
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone <repository-url>
cd workion-web

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
```

### Variables d'environnement
```bash
# .env
API_BASE_URL=http://localhost:3000
APP_URL=http://localhost:3001
API_SECRET=your-api-secret
```

### Développement
```bash
# Démarrer le serveur de développement
npm run dev

# Accéder à l'application
# http://localhost:3001
```

### Build et déploiement
```bash
# Build pour la production
npm run build

# Prévisualiser le build
npm run preview

# Générer les fichiers statiques (SSG)
npm run generate
```

## 📁 Structure du projet

```
workion-web/
├── assets/              # Assets statiques (CSS, images)
│   └── css/
├── components/          # Composants Vue réutilisables
│   ├── AppHeader.vue
│   ├── AppFooter.vue
│   ├── ServiceCard.vue
│   ├── ProviderCard.vue
│   └── ServiceRequestCard.vue
├── layouts/             # Layouts Nuxt
│   └── default.vue
├── pages/               # Pages de l'application
│   ├── index.vue        # Page d'accueil
│   ├── services/        # Pages services
│   ├── prestataires/    # Pages prestataires
│   ├── demandes/        # Pages demandes
│   └── poster-demande.vue
├── plugins/             # Plugins Nuxt
├── server/              # API routes côté serveur
├── stores/              # Stores Pinia
│   └── api.ts
├── types/               # Types TypeScript
│   └── index.ts
├── utils/               # Utilitaires
└── nuxt.config.ts       # Configuration Nuxt
```

## 🎨 Design System

### Couleurs principales
- **Primary** : Blue 600 (#2563eb)
- **Secondary** : Amber 500 (#f59e0b)
- **Success** : Green 600 (#059669)
- **Error** : Red 600 (#dc2626)

### Composants CSS
- **btn-primary** : Bouton principal
- **btn-secondary** : Bouton secondaire
- **card** : Carte avec ombre
- **input-field** : Champ de saisie

## 🔌 Intégration API

### Store API (Pinia)
Le store `useApiStore` centralise tous les appels API :

```typescript
// Exemples d'utilisation
const apiStore = useApiStore()

// Services
const services = await apiStore.getServices()
const service = await apiStore.getServiceById(id)

// Prestataires
const providers = await apiStore.getProviders()
const provider = await apiStore.getProviderById(id)

// Demandes de service
const requests = await apiStore.getServiceRequests()
await apiStore.createServiceRequest(data)
```

### Endpoints intégrés
- **Services** : GET /services, GET /services/:id
- **Users/Prestataires** : GET /users/providers, GET /users/:id
- **Service Requests** : GET /service-request, POST /service-request
- **Adverts** : GET /adverts, GET /adverts/:id
- **Prices** : GET /prices, GET /prices/by-service/:serviceId

## 📱 Responsive Design

L'application est entièrement responsive avec des breakpoints Tailwind :
- **Mobile** : < 768px
- **Tablet** : 768px - 1024px
- **Desktop** : > 1024px

## 🔍 SEO et Performance

### Optimisations SEO
- Meta tags dynamiques pour chaque page
- Open Graph et Twitter Cards
- Structured data (JSON-LD)
- Sitemap XML automatique
- Robots.txt optimisé

### Optimisations Performance
- Lazy loading des images
- Code splitting automatique
- Compression des assets
- Cache optimisé
- Preload des ressources critiques

## 🚀 Déploiement

### Netlify (recommandé)
```bash
# Build command
npm run build

# Publish directory
.output/public
```

### Vercel
```bash
# Le projet est automatiquement détecté comme Nuxt 3
# Aucune configuration supplémentaire nécessaire
```

### Serveur traditionnel
```bash
# Build pour SSR
npm run build

# Démarrer le serveur
node .output/server/index.mjs
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Contacter l'équipe de développement
- Consulter la documentation Nuxt 3 : https://nuxt.com/

---

**Workion Web** - Connecter les clients aux meilleurs prestataires de services à domicile au Sénégal.
