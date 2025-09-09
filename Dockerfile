# Use official nginx lightweight image
FROM nginx:alpine

# Copy your static website files into nginx html folder
COPY . /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
