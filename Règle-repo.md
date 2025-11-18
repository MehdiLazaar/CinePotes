# Règles pour le Repository

## 1. Langue des commits
Tous les commits doivent être **rédigés en français**.

## 2. Convention des commits
Respecter la norme **Conventional Commits** :

><type>[scope optionnel] : <description>
>[corps optionnel]
>[pied(s) de page optionnel(s)]

### 2.1 Types possibles
- `build:` → modifications liées à la compilation ou aux dépendances externes  
- `chore:` → tâches diverses (nettoyage, mise à jour, scripts, etc.)  
- `ci:` → modifications du pipeline CI/CD  
- `docs:` → documentation  
- `style:` → style du code (indentation, espaces, etc.)  
- `refactor:` → refactorisation du code  
- `perf:` → amélioration des performances  
- `test:` → ajout ou modification de tests  
- `fix:` → correction de bugs  
- `feat:` → ajout de nouvelles fonctionnalités  

### 2.2 Exemples de scopes
- `(ui)` → modifications liées à l’interface utilisateur  
- `(auth)` → modifications liées à l’authentification  
- `(api)` → modifications liées à l’API  
- `(db)` → modifications liées à la base de données  
- `(deps)` → mise à jour des dépendances  
- `(ci)` → modifications du pipeline CI/CD  
- `(config)` → fichiers de configuration  
- `(repo)` → ajout ou suppression de branches  
### 2.3 Exemple de commit

> chore(repo) création de la branche develop

## 3. Bonnes pratiques
- Rédiger des messages clairs et concis.  
- Utiliser des verbes à l’infinitif : *ajouter*, *corriger*, *mettre à jour*, etc.  
- Si nécessaire, détailler le changement dans le corps du commit.  
- Mentionner les tickets ou issues correspondants dans le pied de page si pertinent.  

---

## 4. Résumé rapide
| Type   | Scope       | Exemple de commit                  |
|--------|------------|----------------------------------|
| feat   | api        | feat(api) : ajout de l’endpoint login |
| fix    | auth       | fix(auth) : correction du token expiré |
| chore  | repo       | chore(repo) : création du repository |
| docs   | config     | docs(config) : mise à jour du README |
| style  | ui         | style(ui) : correction de l’alignement CSS |
| refactor | db       | refactor(db) : optimisation des requêtes SQL |
| perf   | api        | perf(api) : amélioration des performances de l’API |
| test   | auth       | test(auth) : ajout de tests unitaires |

---

**Conseil final :** respecter cette convention rend l’historique Git lisible, facilite le suivi des changements et simplifie l’intégration continue.



