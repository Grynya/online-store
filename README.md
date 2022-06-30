# Team members list
1. > Амброзяк Христина, ІА-93
2. > Гриненко Анастасія, ІА-93
3. > Михайлова Ілона, ІА-93

# The site name - Online-Store

### The purpose of project <br>
Create an online store website where you can buy goods.

### Features already added <br>
>Authorization/registration <br>
>Add product <br>
>Delete the product <br>
>Display a list of products  <br>
>View products sorted by name or price <br>
>Make an order <br>
>Send feedback messages <br>
>Get all sent messages divided by its languages <br>

### Technologies <br>
> - <b>NestJS</b> <br>
> - <b>Docker & docker-compose</b> (Docker-compose file describes backend and database Postgres) <br>
> - <b>CI/CD</b> (using Jenkins and git hooks): create WebHook on Github. Run Jenkins in container from Dockerfile. created a 
> - <b>Jenkins Job</b> that runs the application with docker-compose and destroys the previous container if it exists. <br>
> - <b>RabbitMQ</b>, amqplib module (to connect to RabbitMQ) - was used to send messages from users to the queue, as well as to read messages and process them.
> Messages from this queue are read, then the service determines the language and returns messages divided by language 
> (ENG or UKR).


This is how Jenkins Job looks:
![Jenkins Job](img/jenkinsJob1.png)
![Jenkins Job](img/jenkinsJob2.png)

Database diagram:
![Jenkins Job](img/db_schema.png)
