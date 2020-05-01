#Grab the latest alpine image
FROM alpine:3.8

# Install python and pip
RUN apk update && apk add --no-cache --update python3 py3-pip bash pdftk
ADD ./requirements.txt /tmp/requirements.txt

# Install dependencies
RUN pip3 install --no-cache-dir -q -r /tmp/requirements.txt

# Add our code
ADD . /opt/app/
WORKDIR /opt/app

# Expose is NOT supported by Heroku
# EXPOSE 5000

# Run the image as a non-root user
RUN adduser -D user
USER user

# Run the app.  CMD is required to run on Heroku
# $PORT is set by Heroku
#ENV PORT 5000 # only for local dev
CMD gunicorn --bind 0.0.0.0:$PORT wsgi:app