# poc-api-to-api-auth

This application is the POC for Authentication between microservices. 


## Approach

This PoC uses self-signed certificate to authenticate.



### StudentService

A microservice running on `NodeJS` and `Express` Framework.



### EmployeeService

A microservice running on `Python` and `Flask` Framework.



## Generate Self-signed Certificate

`openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365`

