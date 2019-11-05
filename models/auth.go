package models

import (
	"errors"

	"github.com/jinzhu/gorm"
	"lin9.me/db"
)

// User is model type
type AuthSession struct {
	Model
	Identification string `gorm:"size:100"`
	SessionToken   string `gorm:"size:500;unique"`
	IP             string `gorm:"size:500"`
	UserAgent      string `gorm:"size:500"`
	DeviceAgent    string `gorm:"size:500"`
	Expires        bool   `gorm:"default:false"`
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
