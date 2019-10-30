# Service to Service Authentication

This application is the POC for Authentication between microservices. 

---

## Approach

This PoC uses self-signed certificate to authenticate.

---

### StudentService

A microservice running on `NodeJS` and `Express` Framework.



### EmployeeService

A microservice running on `Python` and `Flask` Framework.

---

## Generate Self-signed Certificate

`openssl req -x509 -days 365 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem`

`openssl req -x509 -days 1000 -newkey rsa:2048 -out local-cert.pem -keyout local-key.pem -subj "/CN=0.0.0.0"`

---

## Connect to Server

### Check from curl

`curl -v --cert certs/local-cert.pem --key certs/local-key.pem https://0.0.0.0:4000`