FROM mongo 

COPY Data /Data

# CMD mongoimport --host mantis-mongo:7331 --db equivalencia --collection users --type json --file Data/users.json --jsonArray

CMD mongoimport --host mantis-mongo:7331 --db equivalencia --collection universidades --type json --file Data/universidades.json --jsonArray

# CMD mongoimport --host mantis-mongo:7331 --db equivalencia --collection processos --type json --file Data/processos.json --jsonArray