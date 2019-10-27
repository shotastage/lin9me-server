package models

import (
	"errors"

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
