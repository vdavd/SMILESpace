## Production depolyment

Clone the repository on the server:

```
git clone https://github.com/vdavd/SMILESpace.git
cd smilespace
```

Create backend .env file:

```
touch backend/.env
```

Edit `backend/.env` to include `FRONTEND_ORIGIN`:

```
FRONTEND_ORIGIN=frontend_url_here
```

Create frontend .env file:

```
touch frontend/.env.production
```

Edit `frontend/.env.production` to include `VITE_API_BASE_URL`:

```
VITE_API_BASE_URL=backend_url_here
```

Frontend environment variables are baked into the build.
If this value changes, the frontend image must be rebuilt.

If ports need to be changed, they can be edited in `docker-compose.yml`

From the project root, build images and start both services:

```
docker compose up --build -d
```
