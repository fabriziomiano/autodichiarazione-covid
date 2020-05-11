# Compilazione Autodichiarazione

#### Aggiornato al 4 maggio 2020 

Web Application per la compilazione dell'autodichiarazione riguardante gli 
spostamenti fornita dal Ministero dell'Interno. 

Usa un server Flask per la compilazione del PDF che avviene lato backend piu' 
JS per salvare i dati anagrafici su browser.

### Developers 

la Web App è stata sviluppata su Ubuntu 18.04 e usa un docker container
costruito a partire dall'immagine alpine con ```pdftk``` per la scrittura su PDF.
L'app è pubblicata su Heroku tramite container registry. 

Per avviare il server in locale è necessario impostare la variabile d'ambiente 
```PORT```, utilizzata anche da Heroku, tramite, ad esempio: 

```export PORT=5000```

eseguire il build dell'immagine dell'app 

```docker build --tag autodichiarazione:latest .```

e per tirarae su il container

```docker run -it -p $PORT:$PORT autodichiarazione:latest```

a questo punto l'app dovrebbe essere raggiungibile all'URL http://127.0.0.1:5000 
