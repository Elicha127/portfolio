# 🚀 Portfolio Elicha — Déploiement Vercel + Gemini (100% GRATUIT)

## Structure du projet
```
portfolio/
├── api/
│   └── chat.js          ← Fonction serverless (proxy API Gemini)
├── public/
│   └── index.html       ← Portfolio complet
├── vercel.json          ← Config Vercel
├── .gitignore
└── README.md
```

---

## ✅ ÉTAPE 1 — Obtenir ta clé API Gemini GRATUITE

1. Va sur **https://aistudio.google.com/apikey**
2. Connecte-toi avec ton compte Google
3. Clique **"Create API Key"**
4. Copie la clé (commence par `AIza...`)
5. Garde-la précieusement, tu en auras besoin à l'étape 4

> 💡 **Gemini 2.0 Flash = 100% gratuit** avec 15 requêtes/minute et 1 500 requêtes/jour
> C'est largement suffisant pour un portfolio personnel !

---

## ✅ ÉTAPE 2 — Pousser sur ton dépôt GitHub existant

Tu as déjà un dossier `portfolio/` sur ton PC et un dépôt GitHub `portfolio`.
Copie les fichiers dedans et depuis le terminal :

```bash
# Dans ton dossier portfolio sur ton PC :
git add .
git commit -m "Portfolio avec assistant Gemini AI"
git push origin main
```

Si ton dépôt s'appelle différemment ou si tu veux vérifier :
```bash
git remote -v   # affiche l'URL de ton dépôt
```

---

## ✅ ÉTAPE 3 — Déployer sur Vercel

1. Va sur **https://vercel.com** → connecte-toi avec GitHub
2. Clique **"Add New... → Project"**
3. Sélectionne ton repo **portfolio**
4. Laisse tous les paramètres par défaut
5. Clique **"Deploy"** ← ~1 minute

---

## ✅ ÉTAPE 4 — Ajouter ta clé Gemini dans Vercel (CRUCIAL)

1. Dans Vercel → ton projet → onglet **"Settings"**
2. Dans le menu gauche → **"Environment Variables"**
3. Clique **"Add New"** et remplis :
   - **Name** : `GEMINI_API_KEY`
   - **Value** : `AIzaXXXXXXXXXXXXXXXX` (ta clé copiée à l'étape 1)
   - **Environments** : ✅ Production ✅ Preview ✅ Development
4. Clique **"Save"**
5. Va dans **"Deployments"** → clique les **3 points** → **"Redeploy"**

---

## ✅ ÉTAPE 5 — C'est en ligne ! 🎉

Ton portfolio est accessible à :
```
https://portfolio-[ton-username].vercel.app
```
(ou le nom de ton repo)

---

## 🔄 Mettre à jour le portfolio

```bash
# Modifie tes fichiers, puis :
git add .
git commit -m "Mise à jour"
git push
```
Vercel redéploie automatiquement ! ✨

---

## 🐛 Résolution de problèmes

| Problème | Solution |
|----------|----------|
| Assistant répond "erreur" | Vérifie `GEMINI_API_KEY` dans Vercel → Settings → Env Variables |
| Page blanche | Vérifie que `public/index.html` existe bien |
| Erreur 404 sur /api/chat | Vérifie `vercel.json` et `api/chat.js` |
| Voir les logs | Vercel → projet → Functions → chat → logs |

---

## 💰 Coût total : 0 FCFA

- **Vercel Hobby** : Gratuit pour toujours pour les projets personnels
- **Google Gemini 2.0 Flash** : Gratuit (15 req/min, 1 500/jour)
- Domaine vercel.app : Gratuit

> Pour un domaine personnalisé (ex: elicha.tg), Vercel le permet gratuitement
> si tu possèdes déjà le domaine.
