First start: `yarn && yarn start`

Build: `yarn build`

Start: `yarn start`

Dev: `yarn watch`

server: `localhost:4444`

Test local server validation via curl:

```
curl -d '{ "email": "admin@gmail.com", "password":"adminadmin"}' -H "Content-Type: application/json" -X POST http://localhost:4444
```
