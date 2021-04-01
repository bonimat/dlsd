# dlsd
Digital Learning Systems - Dashboard
## Overview

## Link
For starting 
(https://www.youtube.com/watch?v=vxu1RrR0vbw)

Fo sequelize
https://sequelize.org/
https://www.youtube.com/watch?v=bOHysWYMZM0

For 'Reset password'
https://www.youtube.com/watch?v=UV9FvlTySGg&t=273s
http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/

### Versione 1.2.0-0
* ristrutturazione dell'architettura modello MVC
* utilizzo dei TDD
* Introduzione di Sequelize e Sequelize-CLI per la modellazione.
* unificazione dell'utilizzo di configurazione e variabili di ambiente con dotenv. 

#### File .env:
DEV_DBUSER=
DEV_DBPASS=
DEV_DBHOST=
DEV_DBPORT=
TEST_DBUSER=
TEST_DBPASS=
TEST_DBHOST=
TEST_DBPORT=
PROD_DBNAME=
DEV_DBNAME=
TEST_DBNAME=

### Versione 1.1.0-0
Approcciare lo sviluppo di un tool per la gestione di informazioni contenute su sistemi digitali a supporto della didattica inteconnessi.
1. Autenticazione semplice (https://www.youtube.com/watch?v=vxu1RrR0vbw).
Database : dlsdb_1
username : dlsdu
password : dlsdp

```
create table users (id BIGSERIAL PRIMARY KEY NOT NULL, 
username VARCHAR(200) NOT NULL UNIQUE,
firstname VARCHAR(200) NOT NULL,
lastname VARCHAR(200) NOT NULL,
email VARCHAR(200) NOT NULL,
password VARCHAR(200) NOT NULL UNIQUE,
role INT NOT NULL DEFAULT 1)


```
# Update
- Modificata la struttura delle cartelle del progetto utilizzando la cartella router in cui inserire le rotte delle pagine.  
# Versione 1.1.0-0 (Bozza)
Introduzione dei ruoli. Si può ipotizzare 4 ruoli: amministratori, operatori, utenti e un quarto di sospeso o non autorizzato (Assegnazione del ruolo). Amministratore, operatori e utenti possonono utilizzare le visualizzazioni , il ruolo "operatore" ha la possibilità di effettuare anche operazioni che modificano i dati, l'amministratore gestisce il cambiamento di ruolo.
## Caso s'uso 1 per i ruoli
Un utente effettua la registrazione, il suo ruolo iniziale è "non autorizzato" e l'amministratore inseguito
assegna al suo account un altro fra i restanti 3 ruoli. Diciamo che l'utente è profilato quando gli viene assegnato un ruolo diverso dal default e più attivo, inizialmente accede alla dashboard ma non vede nessun menu o visualizzazione. Quando l'account è profilato, l'utente puo' accedere alle varie funzionalità presenti nella dashboard (ad esempio visualizza stato delle piattaforme).
L'account Admin è basilare e oltre ad accedere alla dashboard puo' accedere alla pagina di gestionde degli utenti. Nella pagina di gestione degli utenti l'Amministratore puo' creare e cancellare gli utenti oppure modificare e assegnare loro un ruolo.
  