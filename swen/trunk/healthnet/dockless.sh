rm db.sqlite3
python3 ./manage.py makemigrations
python3 ./manage.py migrate
python3 ./manage.py test system
python3 create_admin.py
python3 ./manage.py runserver
