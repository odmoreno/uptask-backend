# Usa una imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto (ajusta si tu app usa otro)
EXPOSE 4000

# Comando para iniciar la app
CMD ["npm", "run", "dev"]