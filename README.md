# candidate-test-task4


Техническое задание | ERP.AERO | Node.js dev  
Задача:  
Сделать сервис с REST API.   
* Авторизация по bearer токену (/info, /latency, /logout, /file(все роуты) );  
* Настроить CORS для доступа с любого домена;  
* DB – Mysql;  
* Токен создавать при каждой авторизации, действителен 10 минут. Продлевать по истечению, с помощью refresh токена;  
* Реализовать на основе фреймворка express js;  
* API:  
   * /signin [POST] - запрос bearer токена по id и паролю;  
   * /signin/new_token [POST]  - обновление bearer токена по refresh токену  
   * /signup [POST] - регистрация нового пользователя;  
   * Поля id и password, id это номер телефона или email;  
   * /file/upload [POST] - добавление нового файла в систему и запись параметров файла в базу: название, расширение, MIME type, размер, дата загрузки;  
   * /file/list [GET]  выводит список файлов и их параметров из базы с использованием пагинации с размером страницы, указанного в передаваемом параметре list_size, по       умолчанию 10 записей на страницу, если параметр пустой. Номер страницы указан в параметре page, по умолчанию 1, если не задан;   
   * /file/delete/:id [DELETE] - удаляет документ из базы и локального хранилища;  
   * /file/:id [GET] - вывод информации о выбранном файле;   
   * /file/download/:id [GET] - скачивание конкретного файла;  
   * /file/update/:id [PUT] - обновление текущего документа на новый в базе и локальном хранилище;  
* При удачной регистрации вернуть пару  bearer токен и refresh токен;  
   * /info [GET] - возвращает id пользователя;  
   * /logout [GET] - выйти из системы;  
* После выхода необходимо получить новый токен;  
* Старый должен перестать работать;  
Срок исполнения задания: 3 дня.  


## Описание решения
TypeScript, Express.js, MySQL, Sequelize, JWT.

Авторизация реализована с помощью refresh и access токенов.  
Рефреш токен записывается сервером в Cookie с параметром httpOnly: **true**, при необходимости сервер его считывает.  
И рефреш токен записывается в базу данных.  
Токен доступа (access) должен передаваться в заголовке **Authorization**  

Механизм проверки токенов доступа реализован с помощью созданного Middleware.  
Дополнительно реализован механизм обработки ошибок с помощью другого Middleware.  

Для авторизированных пользователей доступны end-point'ы, которые были описаны в ТЗ.  
После авторизации пользователь:
- видит ВСЕ файлы, загруженные пользователями;
- может скачивать и редактировать ВСЕ файлы.
(тк по этим вопросам не было конкретных требований, такой сценарий был выбран на мое усмотрение)

После того, как пользователь делает logout, рефреш токен удаляется из БД и из Cookie.  
Если пользователь заходит с нового устройства, то у него перезаписывается рефреш токен в БД, предыдущий сеанс становится "unauthorized"









