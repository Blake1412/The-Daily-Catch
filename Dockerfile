FROM mongo:latest

WORKDIR /data/db

COPY seed-data.js /docker-entrypoint-initdb.d/

EXPOSE 27017

CMD ["mongod"]