library(readr)

#Reading in the Data
airlines <- read_csv("~/Desktop/Flight Data/airlines.csv",
                     col_types = cols(col_character(), col_character(), col_character(), col_character(),
                                      col_character(), col_character(), col_character(), col_character()),
                     col_names = c("airline_id", "name", "alias", "iata", "icao", 
                                   "callsign", "country", "active"))
routes <- read_csv("~/Desktop/Flight Data/routes.csv",
                   col_types = cols(col_character(), col_character(), col_character(), col_character(),
                                    col_character(), col_character(), col_character(), col_integer(),
                                    col_character()),
                   col_names = c("airline", "airline_id", "source_airport", "source_airport_id", 
                                 "dest_airport", "dest_airport_id", "codeshare", "stops", "equipment"),
                   na = "\\N")
airports <- read_csv("~/Desktop/Flight Data/airports.csv",
                   col_types = cols(col_character(), col_character(), col_character(), col_character(),
                                    col_character(), col_character(), col_character(), col_double(),
                                    col_double(), col_character(), col_character(), col_character()),
                   col_names = c("airport_id", "airport_name", "airport_city", "airport_country", 
                                 "iata_faa", "icao", "airport_lat", "airport_lon", "airport_alt",
                                 "airport_tz", "airport_dst", "airport_db_tz"))

for(i in colnames(airlines)) {
  if(class(airlines[[i]]) == "character") { airlines[[i]] <- tolower(airlines[[i]]) }
}

for(i in colnames(airports)) {
  if(class(airlines[[i]]) == "character") { airports[[i]] <- tolower(airports[[i]]) }
}

for(i in colnames(routes)) {
  if(class(routes[[i]]) == "character") { routes[[i]] <- tolower(routes[[i]]) }
}

write.table(airlines, file = "~/Google Drive/Puddle Jumper/Data/airlines.csv", col.names = FALSE, row.names = FALSE, append = FALSE)
write.table(airports, file = "~/Google Drive/Puddle Jumper/Data/airports.csv", col.names = FALSE, row.names = FALSE, append = FALSE)
write.table(routes, file = "~/Google Drive/Puddle Jumper/Data/routes.csv", col.names = FALSE, row.names = FALSE, append = FALSE)




