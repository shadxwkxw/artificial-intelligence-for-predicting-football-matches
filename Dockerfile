# Use official Python image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Create requirements.txt with necessary packages
RUN echo "flask>=2.0.0\n\
numpy>=1.21.0\n\
tensorflow>=2.8.0\n\
scikit-learn>=1.0.0\n\
pandas>=1.3.0" > requirements.txt

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY . .

# Expose port for Flask
EXPOSE 5000

# Command to run the application
CMD [ "flask", "run", "--host=0.0.0.0" ]
