FROM ubuntu:18.04

LABEL mantainer="fabriziomiano@gmail.com"

COPY . /app

WORKDIR /app

RUN apt-get update && apt-get install -y python3-pip && apt-get -y install wkhtmltopdf && \
    pip3 install --upgrade pip && pip3 install -r requirements.txt

ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

EXPOSE 5000

ENTRYPOINT ["gunicorn", "--bind", "0.0.0.0:5000", "wsgi:app"]
