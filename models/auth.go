package models

import (
	"errors"

	"github.com/jinzhu/gorm"
	"lin9.me/db"
)

// User is model type
type AuthSession struct {
	Model
	Identification string `gorm:"primary_key;size:100;unique"`
	SessionToken   string `gorm:"size:500;unique"`
	IP             string `gorm:"size:500;unique"`
	Devices        string `gorm:"size:500;unique"`
	Expires        bool   `gorm:"default:true"`
}

// Configure tables
// ------------------------------------------------------------------------------------
// TableName is property for getting table name
func (a *AuthSession) TableName() string {
	return TablePrefix + "auth_session"
}

func (a *AuthSession) GetBy(col string, val interface{}) error {
	err := db.Sess().Where(col+" = ?", val).First(&a)

	if err.RecordNotFound() {
		return errors.New("the record does not exists")
	}

	return nil
}

func (a *AuthSession) Create() *gorm.DB {

	if err := db.Sess().Create(&a); err != nil {
		return err
	}

	return nil
}

func (a *AuthSession) Update() *gorm.DB {

	if err := db.Sess().Save(&a); err != nil {
		return err
	}

	return nil
}
