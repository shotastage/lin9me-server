package models

import (
	"errors"

	"github.com/jinzhu/gorm"
	"lin9.me/db"
)

type Analytics struct {
	gorm.Model
	Identification string `gorm:"primary_key;size:100"`
	Referer        string `gorm:"size:2048"`
	UserAgent      string `gorm:"size:1000"`
	IP             string `gorm:"size:100"`
	Language       string `gorm:"size:50;default:'Not_Set'"`
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
