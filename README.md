# Простейший калькуляттор на стеке React-Redux

Для запуска проекта :

В директории с проектом выполнить docker-compose up --build -d

После поднятия контейнеров :
couchdb по адресу - http://127.0.0.1:5984/
бандл фронтенда прокинут с ./frontend/dist в корнтейнер с апачем(в целом достаточно поднять дев сервер вместе с базой и все заработает)
адрес - http://127.0.0.1:8080/ 
управление базой localhost:5984/_utils/

запуск дев сервера cd /frontend/ npm run dev, дев сервер по адресу http://127.0.0.1:9000
сборка бандла cd /frontend/ npm run build
