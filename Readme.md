install: yarn
build: yarn build
start: yarn start
dev: yarn watch

Test local server validation via curl:

```
curl -d '{ "username": "admin", "password":"adminadmin"}' -H "Content-Type: application/json" -X POST http://localhost:4444
```
