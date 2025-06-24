FROM node:22-alpine

# Définit le répertoire de travail
WORKDIR /app

# Installe les dépendances nécessaires pour Alpine, y compris curl
# curl est nécessaire pour le healthcheck Docker
RUN apk add --no-cache bash git curl

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances Node.js
RUN npm i

# Copie tout le reste des fichiers de l'application
COPY . .

# Expose le port sur lequel l'application va tourner
EXPOSE ${API_FOOD_PORT}

# Commande pour démarrer l'application
CMD ["npm", "run", "start"]
