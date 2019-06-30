// +build !appengine,!appenginevm

package main

import (
	"os"

	_ "github.com/jinzhu/gorm/dialects/postgres"

	"lin9.me/config"
	"lin9.me/db"
	"lin9.me/db/migrations"
)

func port() string {

	port := os.Getenv("PORT")

	if len(port) == 0 {
		port = "8080"
	}

	return ":" + port
}

func main() {

	// Configuration
	// ===========================================================================
	err := config.Init("Cloudfile")
	if err != nil {
		panic("E2001: Configuration failure!")
	}

	// Startup database connection
	// ===========================================================================
	db.Init()
	if err != nil {
		panic("E2001: Database connection failure!")
	}

	migrations.Migrate()

	defer db.Sess().Close()

	e := routerMaker()

	e.Logger.Fatal(e.Start(port()))
}
