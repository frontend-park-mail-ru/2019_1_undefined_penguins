# Penguins Wars

## Описание
Ты самый голодный пингвин и сделаешь всё, чтобы съесть как можно больше рыбок. 
Но ты такой не один, у тебя есть конкурент! И он хочет от тебя избавиться! 
Покажи, на что ты способен ради своей цели! Уничтожь врага и забери заслуженную награду!

## Как поиграть
Можно поиграть [туть](https://penguin-wars.sytes.pro)
Или запустить проект локально (об этом ниже)

## Программные решения
***Frontend:*** JavaScript, node.js, npm
***Backend:*** Golang, PosgreSQL
***Плюшки:*** 
- webpack - для сборки проекта 
- Service Worker - для организации работы приложения в режиме offline
- ESlint - линтер для создания красивого кода на js
- Babel - для поддержки разных версий js
- Изображения в webp - поддерживаем "легкие" картинки

## Запуск локальной версии
***Important!*** Для полноценного запуска локальной версии ***пока*** нужно установить Golang и node :(

Для работы со стороны Frontend'a:
1. Склонируйте этот репозиторий (Зеленая кнопка git clone)
1. Выполните команды
    - ```npm i```
    - ```npm start```
1. После сборки приложение будет доступно по 'localhost:3000'

## API

| URL  |  Метод | Действие  |  Тело запроса |  Тело ответа |
|---|---|---|---|---|
| /login   | POST  | Зарегистрироваться  |  {"email":"user@mail.ru", "login":"user", "password":"12345"} |   |
|  /signup   |  POST | Войти  | {"login":"user", "password":"12345"}  |   |
|  /signout |  GET |  Выйти |   | {"status": "successfully signed out"}    |
|  /leaders/1 | GET | Получить лучшие результаты |   | {"results":[\{\"login": "user","score": 777,\},\{\"login": "user2","score": 228,\}\]} |
|  /me | GET | Получить пользователя текущей сессии |   |  {"login":"regregreg","email":"reg@reg.com","lastVisit":"","score":0,"avatarUrl":"http://localhost:8081/data/Default.png","count":0}  |
|/leaders/info| GET|Получить информацию о пользователях||{"count":5,"usersOnPage":3}|
|/me| PUT| Изменить профиль | {email: "reg@reg.com", login: "regregre"}|{"login":"regregre","email":"reg@reg.com","score":0,"avatarUrl":"http://localhost:8081/data/Default.png","count":0}|
|/upload  | POST| Изменить аватар| бинарник||

## Разработчики
- [Виталий Малахов](https://github.com/iamfrommoscow)
- [Екатерина Кириллова](https://github.com/K1ola)
- [Елизавета Добрянская](https://github.com/Betchika99)
- [Евгения Невтриносова](https://github.com/EvgeniaNevtrinosova) - ментор <3