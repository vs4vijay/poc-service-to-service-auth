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

## Generate Root-signed Certificate

### CA Cert

`openssl req -new -x509 -days 9999 -newkey rsa:4096 -keyout ca-key.pem -out ca-cert.pem`
- Common Name should be different from both client and server


### Server Cert

`openssl genrsa -out server-key.pem 4096`

`openssl req -new -key server-key.pem -out server-csr.pem`
- Command Name should be different, and client will verify this
- no password

`openssl x509 -req -days 9999 -in server-csr.pem -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -out server-cert.pem`
- it will ask for CA password

`openssl verify -CAfile ca-cert.pem server-cert.pem`


### Client Cert

`openssl genrsa -out client-key.pem 4096`

`openssl req -new -key client-key.pem -out client-csr.pem`
- Command Name should be different, and server will NOT verify this
- no password

`openssl x509 -req -days 9999 -in client-csr.pem -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -out client-cert.pem`
- it will ask for CA password


`openssl verify -CAfile ca-cert.pem client-cert.pem`

---

## Connect to Server

### Check from curl

`curl -v --cert certs/local-cert.pem --key certs/local-key.pem https://0.0.0.0:4000`

`curl -v --cert client-cert.pem --key client-key.pem https://localhost:4000/`

`curl -v -k --cacert ca-cert.pem https://0.0.0.0:4000/`
- works when rejectUnauthorized: false