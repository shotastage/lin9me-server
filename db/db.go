package db

import (
	"log"
	"os"

	"github.com/jinzhu/gorm"
	"github.com/lib/pq"
	"lin9.me/config"
)

var db *gorm.DB

var err error

func loadConfig() string {

	c := config.Config.Database

	ssl := ""

	if c.Ssl == "false" {
		ssl = " sslmode=disable"
	} else {
		ssl = ""
	}

	envDbUri := os.Getenv("DATABASE_URL")
	connection := ""
	if len(envDbUri) == 0 {
		connection = "host=" + c.Host + " port=" + c.Port + " user=" + c.User + " dbname=" + c.Name + ssl + " password=" + c.Password
	} else {
		url := os.Getenv("DATABASE_URL")
		connection, err = pq.ParseURL(url)
		if err != nil {
			panic(err.Error())
		}
		connection += " sslmode=require"
	}

	return connection
}

// Init is a initializer function that setup database connection
func Init() error {
	db, err = gorm.Open("postgres", loadConfig())
	db.LogMode(true)

	if err != nil {
		log.Println(err)
		panic("E2001: failed to connect database")
	}

	//db.LogMode(true)

	return nil
}

// Sess is a getter of database connection
func Sess() *gorm.DB {
	return db
}
