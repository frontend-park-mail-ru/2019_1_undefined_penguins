# Ссылка на поиграть

https://penguin-wars.sytes.pro

# API

| URL               | Метод | Действие                              | Тело запроса                                                                                                                                                              | Тело ответа                                                                                                                                                               |
| ----------------- | ----- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | 
| /signin           | POST  | Зарегистрироваться                    | {"email":"user@mail.ru", «login":"user", "password":"12345"} |                                                                                                            |                                                                                                                                                                           |
| /signup           | POST  | Войти                                 | {«login":"user", «password":"12345"} |                                                                                                                                    |                                                                                                                                                                           |
| /signout          | GET   | Выйти                                 |                                                                                                                                                                           |  {«status»: «successfully signed out»}                                                                                                                                    |
| /leaders          | GET   | Получить лучшие результаты            |                                                                                                                                                                           | {«results»:[\{\"login": "user",«score»: 777,\},\{\"login": "user2",«score»: 228,\}\]}                                                                          |
| /me               | GET   | Получить пользователя текущей сессии  |                                                                                                                                                                           | {\"login": «Penguin1",\"email": "a.penguin1@corp.mail.ru",\"password": "password", \"name": "Пингвин Северного Полюса",\"lastVisit": "25.02.2019",\"score": "0",\} |
| /change_profile   | POST  | Изменить профиль                      | {\"login": «Penguin1",\"email": "a.penguin1@corp.mail.ru",\"password": "password", \"name": "Пингвин Северного Полюса",\"lastVisit": "25.02.2019",\"score": "0",\} |                                                                                                                                                                           |
# Ссылочки

Фронт: https://penguin-wars.hackallcode.ru
Бэк: https://api.penguin-wars.hackallcode.ru

# ESLint

ESLint позволяет проводить анализ качества вашего кода, написанного на любом выбранном стандарте JavaScript.

Установка пакета ```npm install --save-dev eslint```

Запуск для всего проекта ```npm run linter```

Запуск для отдельного файла ```./node_modules/.bin/eslint <filename>.js```

Запуск с исправлением некоторых багов ```npm run linter-fix```

Для отображения ошибок "на лету" в VSCode рекомендуется установить расширение ESLint (Вкладка Extentions слева в редакторе)