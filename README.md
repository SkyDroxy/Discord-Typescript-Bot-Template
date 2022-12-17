<div align="center">
  <img src="https://i.imgur.com/XOqAELg.png" alt="Logo" width="708" height="370">
  <h3 align="center">TypeScript Discord Bot Template</h3>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table des Matières</summary>
  <ol>
    <li><a href="#informations">Informations</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#prérequis">Prérequis</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#prettier">Prettier</a></li>
  </ol>
</details>

<!-- INFOS -->

## Informations

Ce template contient tout ce qu'il vous faut pour commencer rapidement à créer votre propre bot discord.

<!-- GETTING STARTED -->

## Getting Started

Voici la configuration requise pour installer ce projet localement.
Pour obtenir une copie locale opérationnelle, suivez ces étapes d'exemple simples.

### Prérequis

- Node.js
  <a href="https://nodejs.org/fr/">Node.js Downloads</a>

- npm

  ```sh
  npm install typescript --location=global
  npm install dotenv --save
  ```

- yarn
  ```sh
  npm install yarn -g
  yarn global add typescript
  yarn add dotenv --save
  ```

### Installation

1. Créer un nouveau bot sur [Discord Developper Applications](https://discord.com/developers/applications)
2. Cloner le repo
   ```sh
   git clone https://github.com/Kalddeon/TypeScript-Discord-Bot-Template.git
   ```
3. Modifier le package.json
   ```sh
    npm init
   ```
4. Installer les packages

   ```sh
   yarn

   OU

   npm install
   ```

5. Variables d'environnement .env
   ```env
   BOT_TOKEN="YOUR BOT TOKEN"
   DEV_ID="YOUR DISCORD ID"
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

```sh
npm run start:dev
npm run start:dev:watch

OU

yarn start:dev
yarn start:dev:watch
```

## Prettier

```sh
npm run prettier-code

OU

yarn prettier-code
```

<p align="right">(<a href="#top">back to top</a>)</p>
