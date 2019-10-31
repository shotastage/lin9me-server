package models

import (
	"errors"

	"github.com/jinzhu/gorm"
	"lin9.me/db"
)

// User is model type
type MiniProfile struct {
	Identification string `gorm:"primary_key;size:100;unique"`
	Type           string
	Value          string
	Order          int
}

func (u *MiniProfile) TableName() string {
	return TablePrefix + "mini_profile"
}

func (u *MiniProfile) GetBy(col string, val interface{}) error {
	err := db.Sess().Where(col+" = ?", val).First(&u)

	if err.RecordNotFound() {
		return errors.New("the record does not exists")
	}

	return nil
}

func (u *MiniProfile) Create() *gorm.DB {

	if err := db.Sess().Create(&u); err != nil {
		return err
	}

	return nil
}

func (u *MiniProfile) Update() *gorm.DB {

	if err := db.Sess().Save(&u); err != nil {
		return err
	}

	return nil
}
