# Page de Vue d'ensemble - DivBrainers

## Description

Cette page fournit une vue d'ensemble complète des statistiques et de l'activité de l'utilisateur sur la plateforme DivBrainers. Elle s'inspire du style de MissionHunter tout en conservant l'identité visuelle de DivBrainers.

## Fonctionnalités

### 📊 Cartes de Statistiques
- **Entretiens** : Nombre total d'entretiens effectués
- **Quiz** : Nombre de quiz complétés
- **Analyses CV** : Nombre de CVs analysés
- **Score moyen** : Performance globale de l'utilisateur

### 🎯 Actions Rapides
- Boutons pour créer rapidement un nouvel entretien, quiz ou analyser un CV
- Navigation directe vers les différentes sections de l'application

### 📈 Activités Récentes
- Liste des dernières activités de l'utilisateur
- Affichage du type d'activité, du score et du statut
- Possibilité de voir toutes les activités

### 🚀 Progression des Compétences
- Barres de progression pour chaque technologie
- Niveau actuel vs niveau maximum
- Couleurs différentes selon le niveau de maîtrise

### 📅 Activité Hebdomadaire
- Graphique des 7 derniers jours
- Visualisation de l'activité par jour
- Focus sur les entretiens (extensible pour quiz et scans)

## Composants Utilisés

### StatsCard
```tsx
<StatsCard
  title="Entretiens"
  value={stats.totalInterviews}
  description="Total des entretiens"
  icon={User}
  trend={{ value: 12, isPositive: true }}
/>
```

### ActivityCard
```tsx
<ActivityCard
  title="Activités récentes"
  description="Vos dernières activités"
  activities={stats.recentActivities}
  onViewAll={() => router.push('/activities')}
/>
```

### ProgressCard
```tsx
<ProgressCard
  title="Progression des compétences"
  description="Votre niveau dans chaque technologie"
  progressData={skillProgressData}
/>
```

## API Endpoints

### GET /api/user/stats
Récupère les statistiques de l'utilisateur connecté.

**Réponse :**
```json
{
  "totalInterviews": 12,
  "totalQuizzes": 8,
  "totalScans": 5,
  "averageScore": 78,
  "completedActivities": 20,
  "inProgressActivities": 3,
  "recentActivities": [...],
  "weeklyProgress": [...],
  "skillProgress": [...]
}
```

## Hook Personnalisé

### useUserStats
Hook personnalisé pour gérer les statistiques utilisateur avec :
- État de chargement
- Gestion des erreurs
- Fonction de rafraîchissement
- Données mockées en cas d'erreur

## Traductions

Les traductions sont disponibles en français et en anglais dans :
- `/public/locales/fr/common.json`
- `/public/locales/en/common.json`

Clé principale : `overview.*`

## Animations

La page utilise Framer Motion pour :
- Animations d'entrée des composants
- Transitions fluides
- États de chargement animés
- Progression des barres de compétences

## Responsive Design

- **Mobile** : Layout en colonne unique
- **Tablet** : Grille 2 colonnes pour les cartes
- **Desktop** : Grille 4 colonnes pour les statistiques, 2 colonnes pour le contenu principal

## États de la Page

1. **Chargement** : Squelettes animés
2. **Erreur** : Message d'erreur avec bouton de retry
3. **Aucune donnée** : Message d'encouragement avec actions
4. **Données disponibles** : Affichage complet des statistiques

## Styles

Utilise le système de couleurs de DivBrainers :
- **Primaire** : Bleu (`blue-800`, `blue-600`, `blue-500`)
- **Secondaire** : Gris (`gray-50`, `gray-200`, `gray-600`)
- **Succès** : Vert (`green-500`, `green-100`)
- **Attention** : Jaune (`yellow-500`, `yellow-100`)
- **Erreur** : Rouge (`red-500`, `red-100`)

## Dépendances

- `framer-motion` : Animations
- `lucide-react` : Icônes
- `next/navigation` : Navigation
- `next-auth` : Authentification
- `@/hooks/i18n/useClientTranslation` : Internationalisation
