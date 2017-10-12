# Manga com Leite API


### Stack

| Responsability  | What |
|---|---|
| JS Spec  | ES6  |
| Process Managament  | PM2  |
| Code Standard  | ESLint  |  
| Logs  | Winston |   
| HTTP Headers  | Helmet |
| Test Runner | Ava |
| DB | knex |
| CORS  | CORS |   
| Body Parsing  | Body Parser |   
| Versioning  | SemVer |

### Installing and running the app with PM2

```sh
$ npm install
$ npm install -g pm2
$ npm start
```

### Running in dev with nodemon

```sh
$ npm install
$ npm install -g nodemon
$ npm run dev
```

### PM2

#### Running PM2 on server boots

```sh
$ pm2 startup systemd
```

#### PM2 Cheat Sheet

```sh
$ systemctl status pm2 (pm2 status)
$ pm2 stop app_name_or_id (stop app)
$ pm2 restart app_name_or_id (restart app)
$ pm2 list (list apps)
$ pm2 info example (specific info about an app)
$ pm2 monit (open pm2 monitor)
$ pm2 logs -h (display option for pm2 logs command)
$ pm2 logs (display all apps logs)
$ pm2 logs api (display only api app logs)
$ pm2 logs big-api --lines 1000 (display X lines of api log file)
```

Logs

```sh
$ cd $HOME/.pm2/logs
```

### ESLint

```sh
$ npm install eslint --save-dev
$ ./node_modules/.bin/eslint src/
```
### NSP

Command-line tool that checks the Node Security Project vulnerability database to determine if your application uses packages with known vulnerabilities. Install it as follows:

```sh
$ npm i nsp -g
$ nsp check
```

#### Additional security considerations

Here are some further recommendations from the excellent Node.js Security Checklist. Refer to that blog post for all the details on these recommendations:

* Implement rate-limiting to prevent brute-force attacks against authentication.
* Use csurf middleware to protect against cross-site request forgery (CSRF).
* Always filter and sanitize user input to protect against cross-site scripting (XSS) and command injection attacks.
* Defend against SQL injection attacks by using parameterized queries or prepared statements.
* Use the open-source sqlmap tool to detect SQL injection vulnerabilities in your app.
* Use the nmap and sslyze tools to test the configuration of your SSL ciphers, keys, and renegotiation as well as the validity of your certificate.
* Use safe-regex to ensure your regular expressions are not susceptible to regular expression denial of service attacks.
