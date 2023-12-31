# К прочтению!

## Способы реализация взаимодействия между микросервисами по `rabbitMQ`

- m1 принимает запрос (например: http, ws) --> m1 по раббиту отправляет задачу в сервис m2 --> m1 ожидает выполнения задачи в m2, чтобы получить результат выполненной задачи
- m1 принимает запрос (например: http, ws) --> m1 по раббиту отправляет задачу в сервис m2 --> m1 не ожидает выполнения задачи в сервисе m2
- m1 принимает запрос (например: http, ws) --> m1 по раббиту отправляет задачу в сервис m2 --> m1 не ожидает выполнения задачи в сервисе m2 --> m2 после завершения задачи добавляет результат выполнения в другую очередь --> m1 подписывается на эту очередь и отсюда получает результат выполнения задачи

Тут реализовано по первому способу

## О проекте.

Проект состоит из 4 сервисов:

- Бд (postgres)
- RabbitMQ
- Api
- Auth

Описание назначений первых двух сервисов опускаю, так как это понятно почти интуитивно.  
Сервис api имеет три роута:

- POST /auth/register - тело запроса `{ email: string, password: string }`, возвращает новосозданного пользователя.
- POST /auth/login - тело запроса `{ email: string, password: string }`, возвращает токен `{ accessToken: string }`.
- GET /users - возвращает всех зарегистрированных пользователей.

Данный сервис делегирует выполнение этих запросов сервису `auth` посредством `RabbitMQ`.

Также логируются входящие запросы и ошибки

Само приложение сделано простым примитивным образом, так как его усложнение не требовалось в т/з

## Запуск проекта

- В первую очередь нужно создать файл `.env` в папке `infrastructure` и добавить в него переменные из файла `.env.example`, который находится в папке `infrastructure`
- Запустить докер-композ следующей командой `docker-compose up --build` ` (-d)` находясь в папке `infrastructure`

После запуска проекта в самом начале вы скорее всего увидите ошибку в подключении к `rabbitMQ`, ничего не делаем ждем (это связано с тем что сервис `rabbitMQ` запускается позже сервисов `api`, `auth`, хотя в них указано `depends_on: 'rabbitMQ'`)
