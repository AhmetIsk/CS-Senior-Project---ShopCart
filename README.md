# Installation guide

First,
1. Change "<YOUR_IP_ADDRESS>" to your actual IP address from [backend/backend/settings.py](backend/backend/settings.py) and [frontend/api/index.js](frontend/api/index.js).

#Setup Backend
1. cd backend
2. pip install -r requirements.txt
3. python manage.py createsuperuser
4. python manage.py makemigrations
5. python manage.py migrate
6. python manage.py runserver

#Setup Frontend
first open an android emulator from android studio
1. cd frontend
2. npm install
3. npm start
4. press a to open android
