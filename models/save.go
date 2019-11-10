package models

import (
	"errors"

	"github.com/jinzhu/gorm"
	"lin9.me/db"
)

type LinkSave struct {
	gorm.Model
	Identification string `gorm:"size:100;unique"`
	Origin         string `gorm:"size:2084;unique"`
	Shorten        string `gorm:"primary_key;size:100;unique"`
	ViewCount      int
	BlockedReason  string `gorm:"size:100"`
	Disable        *bool  `gorm:"default:false"`
	Owned          string `gorm:"size:100"`
}

func (l *LinkSave) TableName() string {
	return "lin9_link_save"
}

func (l *LinkSave) GetBy(col string, val interface{}) error {
	err := db.Sess().Where(col+" = ?", val).First(&l)

	if err.RecordNotFound() {
		return errors.New("the record does not exists")
	}

	return nil
}

func (l *LinkSave) GetByOrigin(origin string) error {
	err := db.Sess().Where("origin = ?", origin).First(&l)

	if err.RecordNotFound() {
		return errors.New("the record does not exists")
	}

	return nil
}

func (l *LinkSave) GetByID(shorten string) error {
	err := db.Sess().Where("shorten = ?", shorten).First(&l)

	if err.RecordNotFound() {
		return errors.New("the record does not exists")
	}

	return nil
}

func (l *LinkSave) Create() *gorm.DB {

	if err := db.Sess().Create(&l); err != nil {
		return err
	}

	return nil
}

func (l *LinkSave) Update() *gorm.DB {

	if err := db.Sess().Save(&l); err != nil {
		return err
	}

	return nil
}
