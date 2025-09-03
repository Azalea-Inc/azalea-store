#!/bin/bash

set -e

# Detectar distribución
detect_distro() {
    if [ -f /etc/fedora-release ] || [ -f /etc/redhat-release ]; then
        echo "fedora"
    elif [ -f /etc/debian_version ]; then
        echo "debian"
    else
        echo "unknown"
    fi
}

DISTRO=$(detect_distro)

# Dominios locales
DOMAIN="miapp.local"
API_DOMAIN="api.miapp.local"

echo "⚙️ Configurando $DOMAIN y $API_DOMAIN ..."

# 1. Agregar al /etc/hosts
if ! grep -q "$DOMAIN" /etc/hosts; then
  echo "127.0.0.1 $DOMAIN $API_DOMAIN" | sudo tee -a /etc/hosts
  echo "✅ Entradas añadidas a /etc/hosts"
else
  echo "ℹ️ Ya existe entrada en /etc/hosts"
fi

# 2. Instalar nginx si no está
if ! command -v nginx &> /dev/null; then
  echo "📦 Instalando nginx..."
  if [ "$DISTRO" = "fedora" ]; then
    sudo dnf update -y
    sudo dnf install -y nginx
  else
    sudo apt-get update
    sudo apt-get install -y nginx
  fi
fi

# 3. Crear configuración nginx
if [ "$DISTRO" = "fedora" ]; then
  NGINX_CONF="/etc/nginx/conf.d/miapp.conf"
else
  NGINX_CONF="/etc/nginx/sites-available/miapp"
fi

sudo tee $NGINX_CONF > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:5173;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}

server {
    listen 80;
    server_name $API_DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
EOF

# 4. Habilitar configuración
if [ "$DISTRO" = "fedora" ]; then
  # En Fedora no se usa sites-enabled, la configuración ya está en conf.d
  sudo nginx -t
  sudo systemctl enable nginx
  sudo systemctl restart nginx
else
  sudo ln -sf $NGINX_CONF /etc/nginx/sites-enabled/miapp
  sudo nginx -t
  sudo systemctl restart nginx
fi

echo "🚀 Listo! Ahora abre:"
echo "   👉 http://$DOMAIN   (frontend)"
echo "   👉 http://$API_DOMAIN (backend)"
