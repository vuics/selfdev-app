FROM node:18.17.1-slim

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN echo REACT_APP_API_URL=$REACT_APP_API_URL

WORKDIR /opt/app/
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# RUN mkdir -p /opt/ssl/ && openssl req -x509 -newkey rsa:4096 -keyout /opt/ssl/tls.key -out /opt/ssl/tls.crt -days 9999 -nodes -subj "/CN=localhost"

EXPOSE 3000
# ARG BUILD_VERSION=0.0.1
# RUN npx json -I -f package.json -e "this.version='$BUILD_VERSION'"
CMD ["npm", "run", "serve"]
# CMD ["npm", "start"]
