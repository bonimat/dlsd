# dlsd
Digital Learning Systems - Dashboard
## Overview
Approcciare lo sviluppo di un tool per la gestione di informazioni contenute su sistemi digitali a supporto della didattica inteconnessi.
1. Autenticazione semplice (https://www.youtube.com/watch?v=vxu1RrR0vbw).
Database : dlsd_f
username : dlsdu
password : dlsdp

```
create table users (id BIGSERIAL PRIMARY KEY NOT NULL, 
firstname VARCHAR(200) NOT NULL,
email VARCHAR(200) NOT NULL,
password VARCHAR(200) NOT NULL,
UNIQUE (email));
```
