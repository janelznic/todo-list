#!/bin/bash
#
# Run script
# ----------
#

echo ".-------------------------------------------------."
echo "|                                                 |"
echo "|         To Do list - Installation script        |"
echo "|                                                 |"
echo "'-------------------------------------------------'"
echo "> easyadmin-system"
echo ""

echo " → Building Docker containers with Compose..."
docker-compose build

echo " → Starting all services..."
docker-compose up -d

echo " → Done."
echo ""
echo "# List running services:"
echo "docker ps --all"
echo ""
echo "# Stop service:"
echo "docker stop <service-name>"
echo ""
echo "# Start service:"
echo "docker start <service-name>"
echo ""
echo "# Available services:"
echo "api | frontend | mysql | phpmyadmin"
echo ""
