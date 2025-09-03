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

echo "⚙️ Desinstalando configuración de $DOMAIN y $API_DOMAIN ..."

# 1. Eliminar entradas del /etc/hosts
sudo sed -i.bak "/$DOMAIN/d" /etc/hosts
sudo sed -i.bak "/$API_DOMAIN/d" /etc/hosts
echo "✅ Entradas eliminadas del /etc/hosts (respaldo en /etc/hosts.bak)"

# 2. Eliminar configuración nginx
if [ "$DISTRO" = "fedora" ]; then
    NGINX_CONF="/etc/nginx/conf.d/miapp.conf"
    if [ -f "$NGINX_CONF" ]; then
        sudo rm -f "$NGINX_CONF"
        echo "✅ Configuración de Nginx eliminada en conf.d"
    fi
else
    NGINX_CONF="/etc/nginx/sites-available/miapp"
    NGINX_ENABLED="/etc/nginx/sites-enabled/miapp"
    if [ -f "$NGINX_ENABLED" ]; then
        sudo rm -f "$NGINX_ENABLED"
        echo "✅ Configuración deshabilitada en sites-enabled"
    fi
    if [ -f "$NGINX_CONF" ]; then
        sudo rm -f "$NGINX_CONF"
        echo "✅ Configuración eliminada en sites-available"
    fi
fi

# 3. Reiniciar nginx
sudo nginx -t && sudo systemctl restart nginx
echo "🔄 Nginx reiniciado"

echo "🧹 Desinstalación completa. Los dominios locales ya no apuntan a localhost."
