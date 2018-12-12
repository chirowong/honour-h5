FROM nginx

COPY dist /usr/share/nginx/html
ADD h5_nginx.conf /etc/nginx/conf.d

EXPOSE 58082
