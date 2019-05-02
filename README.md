# Ссылка на поиграть

https://penguin-wars.sytes.pro

# API

| URL               | Метод | Действие                              | Тело запроса                                                                                                                                                              | Тело ответа                                                                                                                                                               |
| ----------------- | ----- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | 

| /login            | POST  | Зарегистрироваться                    | {"email":"user@mail.ru", "login":"user", "password":"12345"} |                                                                                                            |                                                                                                                                                                           |
| /signup           | POST  | Войти                                 | {"login":"user", "password":"12345"} |                                                                                                                                    |                                                                                                                                                                           |
| /signout          | GET   | Выйти                                 |                                                                                                                                                                           |  {"status": "successfully signed out"}                                                                                                                                    |
| /leaders/1        | GET   | Получить лучшие результаты            |                                                                                                                                                                           | {"results":[\{\"login": "user","score": 777,\},\{\"login": "user2","score": 228,\}\]}                                                                                     |
| /me               | GET   | Получить пользователя текущей сессии  |                                                                                                                                                                           | {"login":"regregreg","email":"reg@reg.com","lastVisit":"","score":0,"avatarUrl":"http://localhost:8081/data/Default.png","count":0} |
| /leaders/info     | GET   | Получить информацию о пользователях   |                                                                                                                                                                           | {"count":5,"usersOnPage":3}                                                                                                                                               |
| /me               | PUT   | Изменить профиль                      | {email: "reg@reg.com", login: "regregre"}                                                                                                                                 |        {"login":"regregre","email":"reg@reg.com","score":0,"avatarUrl":"http://localhost:8081/data/Default.png","count":0}                                                |
| /upload           | POST  | Изменить аватар                       | бинарник                                                                                                                                                                       |                                                   |




# ESLint

ESLint позволяет проводить анализ качества вашего кода, написанного на любом выбранном стандарте JavaScript.

Установка пакета ```npm install --save-dev eslint```

Запуск для всего проекта ```npm run linter```

Запуск для отдельного файла ```./node_modules/.bin/eslint <filename>.js```

Запуск с исправлением некоторых багов ```npm run linter-fix```

Для отображения ошибок "на лету" в VSCode рекомендуется установить расширение ESLint (Вкладка Extentions слева в редакторе)

