# Shop Items Frontend (React)

## Project Description
This is the frontend service for managing shop items. It is built with React and communicates with the backend API.

## Requirements
- Docker

## Setup and Deployment

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/shop-items-frontend-react
cd shop-items-frontend-react
```

### 2. Build the Docker Image
Pass the `REACT_APP_API_URL` as a build argument to point to the backend API.
```bash
docker build -t shop-frontend . --build-arg REACT_APP_API_URL=http://<YOUR_SERVER_IP>:8080/api
```

### 3. Stop and Remove Existing Container (if running)
```bash
docker stop shop_frontend
docker rm shop_frontend
```

### 4. Run the Frontend Docker Container
```bash
docker run -d -p 3000:80 --name shop_frontend shop-frontend
```

### 5. Access the Application
Open your browser and navigate to:
```
http://<YOUR_SERVER_IP>:3000
```

## Notes
- Replace `<YOUR_SERVER_IP>` with the IP address or domain of your server.
- Ensure the backend (`shop_backend`) is running before accessing the frontend.
- If you encounter CORS issues, configure the backend to allow the frontend's domain/IP
