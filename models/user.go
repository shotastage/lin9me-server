package models

import (
	"errors"
	"log"

	"github.com/jinzhu/gorm"
	"lin9.me/db"
)

// User is model type
type User struct {
	Username       string `gorm:"size:30;unique"`
	Identification string `gorm:"primary_key;size:100;unique"`
	Email          string `gorm:"size:500;unique"`
	CryptPassword  string `gorm:"size:500"`
	IsActivated    bool   `gorm:"default:true"`
	IsDeleted      bool   `gorm:"default:true"`
	IsAgreed       bool
}

func (u *User) TableName() string {
	return TablePrefix + "users"
}

func (u *User) GetBy(col string, val interface{}) error {
	err := db.Sess().Where(col+" = ?", val).First(&u)

	if err.RecordNotFound() {
		return errors.New("the record does not exists")
	}

	return nil
}

// GetByUser is property for getting user information obj
func (u *User) GetByUser(username string) error {
	log.Println("This method will be deprecated!")

	err := db.Sess().Where("username = ?", username).First(&u)

	if err.RecordNotFound() {
		return errors.New("the record does not exists")
	}

	return nil
}

// GetByEmail is property for getting user information by email
func (u *User) GetByEmail(email string) error {
	log.Println("This method will be deprecated!")

	err := db.Sess().Where("email = ?", email).First(&u)

	if err.RecordNotFound() {
		return errors.New("the record does not exists")
	}

	return nil
}

// GetByIdentification is property for getting user information by user identification
func (u *User) GetByIdentification(identification string) error {
	log.Println("This method will be deprecated!")

	err := db.Sess().Where("identification = ?", identification).First(&u)

	if err.RecordNotFound() {
		return errors.New("the record does not exists")
	}

	return nil
}

func (u *User) Create() *gorm.DB {

	if err := db.Sess().Create(&u); err != nil {
		return err
	}

	return nil
}

func (u *User) Update() *gorm.DB {

	if err := db.Sess().Save(&u); err != nil {
		return err
	}

	return nil
}
