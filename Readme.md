First start: `yarn && yarn start`

Build: `yarn build`

Start: `yarn start`

Dev: `yarn dev`

server: `localhost:4444`

---
Test local server validation via curl:

```
curl -d '{ "email": "admin@gmail.com", "password":"adminadmin"}' -H "Content-Type: application/json" -X POST http://localhost:4444
```


API: https://nomics.com/docs/#tag/Currencies
