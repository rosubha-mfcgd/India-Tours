# Use the official Nginx image as the base
FROM nginx:stable-alpine
# Remove the default config that shows the welcome page
#RUN rm -rf ./*
RUN rm /etc/nginx/conf.d/default.conf
# Copy your custom Nginx configuration file to the container's configuration directory
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for incoming traffic
EXPOSE 80
EXPOSE 81
EXPOSE 8443
EXPOSE 8444
# The default command runs Nginx
CMD ["nginx", "-g", "daemon off;"]