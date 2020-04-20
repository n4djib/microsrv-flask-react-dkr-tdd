#!/bin/sh

echo " "
echo " "
echo "Waiting for postgres..."
echo " "
echo " "

while ! nc -z users-db 5432; do
    sleep 0.1
done

echo " "
echo " "
echo "PostgreSQL started"
echo " "
echo " "

python manage.py run -h 0.0.0.0
