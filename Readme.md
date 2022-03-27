install: yarn
dev-mode: yarn watch

Test local server validation:

```
curl -d '{ "username": "admin", "password":"adminadmin"}' -H "Content-Type: application/json" -X POST http://localhost:4444
```
