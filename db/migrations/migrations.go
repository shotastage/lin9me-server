package migrations

import (
	"log"

	"lin9.me/db"
	"lin9.me/models"
)

// Migrate is the function for make migration for debugging
func Migrate() {
	log.Println("WARNING: This operation might causes critical changes.")
	db.Sess().AutoMigrate(&models.Link{}, &models.User{}, &models.Analytics{}, &models.Malicious{}, &models.Profile{})
}
