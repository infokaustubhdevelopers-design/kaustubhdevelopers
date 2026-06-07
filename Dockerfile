# --- Stage 1: Build the React Frontend ---
FROM node:20-alpine AS frontend-builder
WORKDIR /app

# Copy root package files
COPY package.json package-lock.json ./

# Copy frontend package file for workspace installation
COPY frontend/package.json ./frontend/

# Install dependencies
RUN npm ci

# Copy frontend source files
COPY frontend/ ./frontend/

# Run frontend build (outputs static files to frontend/dist/public)
RUN npm run build --workspace=frontend

# --- Stage 2: Create the Python Backend Server ---
FROM python:3.11-slim
WORKDIR /app

# Install system utilities
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy backend dependencies file
COPY backend/requirements.txt ./backend/

# Install python dependencies
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy backend application source
COPY backend/src/ ./backend/src/

# Copy the built static assets from Stage 1 into the same relative path
COPY --from=frontend-builder /app/frontend/dist/ ./frontend/dist/

# Set environment variables
ENV PORT=5001
ENV ENV=production

# Expose the server port
EXPOSE 5001

# Command to start the application
CMD ["python", "-m", "uvicorn", "app:app", "--app-dir", "backend/src", "--host", "0.0.0.0", "--port", "5001"]
