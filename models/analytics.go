package models

import (
	"errors"

	"github.com/jinzhu/gorm"
	"lin9.me/db"
)

type Analytics struct {
	gorm.Model
	Origin    string `gorm:"size:2084;unique"`
	Shorten   string `gorm:"primary_key;size:100;unique"`
	ViewCount int
	Disable   bool `gorm:"default:false"`
}

func (a *Analytics) TableName() string {
	return TablePrefix + "analytics"
}

func (a *Analytics) GetBy(col string, val interface{}) error {
	err := db.Sess().Where(col+" = ?", val).First(&a)

	if err.RecordNotFound() {
		return errors.New("the record does not exists")
	}

	return nil
}

func (a *Analytics) Create() *gorm.DB {

	if err := db.Sess().Create(&a); err != nil {
		return err
	}

	return nil
}

func (a *Analytics) Update() *gorm.DB {

	if err := db.Sess().Save(&a); err != nil {
		return err
	}

	return nil
}
