# NextJS performance test

-   with Redis session

```sh
docker compose up -d

docker compose run k6 run ./scripts/test.js

docker compose down
```
