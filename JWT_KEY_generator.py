import secrets

# Génère une clé secrète de 64 caractères hexadécimaux
secret_key = secrets.token_hex(64)

print(f'JWT_SECRET={secret_key}')
