docker rm --force skills-mysql 

docker run -d -p 13306:3306 --name skills-mysql1 \
-e MYSQL_ROOT_PASSWORD=pass \
-e MYSQL_DATABASE=skills \
-e MYSQL_USER=user \
-e MYSQL_PASSWORD=pass \
mysql:5.6

docker exec -it skills-mysql sh  #-c "mysql -uroot -psupersecret"
