# Keycloak

1 - http://localhost:3000/auth/login

http://localhost:8080/realms/auth-code-flow/protocol/openid-connect/auth
?client_id=nestjs-auth-code-flow
&response_type=code
&scope=profile
&redirect_uri=http://localhost:3000/auth/callback

