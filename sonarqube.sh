docker run \
  --rm \
  --network=host \
  -v "$(pwd):/usr/src" \
  sonarsource/sonar-scanner-cli \
  -Dsonar.projectKey=Testing \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://127.0.0.1:9000 \
  -Dsonar.token=sqp_7c8758107a68d1c1676a0275cc12cf155f31fcd3