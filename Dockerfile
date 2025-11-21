FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code
COPY . .

# Exposer le port Next.js
EXPOSE 5000

RUN npm run build

# Lancer le serveur de développement
CMD ["npm", "run", "start", "--", "-p", "5000", "-H", "0.0.0.0"]
