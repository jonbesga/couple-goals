FROM nginx:latest
WORKDIR /var/www
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./dist /var/www
RUN nginx