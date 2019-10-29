package models

import (
	"errors"

	"github.com/jinzhu/gorm"
	"lin9.me/db"
)

// User is model type
type Profile struct {
	Identification string `gorm:"primary_key;size:100;unique"`
	Type           string
	Value          string
	Order          int
}

func (u *Profile) TableName() string {
	return TablePrefix + "profile"
}

func (u *Profile) GetBy(col string, val interface{}) error {
	err := db.Sess().Where(col+" = ?", val).First(&u)

	if err.RecordNotFound() {
		return errors.New("the record does not exists")
	}

	return nil
}

func (u *Profile) Create() *gorm.DB {

	if err := db.Sess().Create(&u); err != nil {
		return err
	}

	return nil
}

func (u *Profile) Update() *gorm.DB {

	if err := db.Sess().Save(&u); err != nil {
		return err
	}

	return nil
}
