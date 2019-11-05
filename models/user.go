package models

import (
	"errors"

	"github.com/jinzhu/gorm"
	"lin9.me/db"
)

// User is model type
type User struct {
	Model
	Username       string `gorm:"size:30;unique"`
	Identification string `gorm:"primary_key;size:100;unique"`
	Email          string `gorm:"size:500;unique"`
	Phone          string `gorm:"size:20"`
	Password       string `gorm:"size:500"`
	IsActivated    bool   `gorm:"default:true"`
	IsDeleted      bool   `gorm:"default:true"`
	IsAgreed       bool
	Devices        []UserDevice `gorm:"foreignkey:Identification"`
}

// UserDevice is model type
type UserDevice struct {
	Identification string `gorm:"primary_key;size:100"`
	IP             string `gorm:"size:30"`
	DeviceAgent    string `gorm:"size:300"`
	UserAgent      string `gorm:"size:300"`
}

// Configure tables
// ------------------------------------------------------------------------------------
// TableName is property for getting table name
func (u *User) TableName() string {
	return TablePrefix + "users"
}

// TableName is property for getting table name
func (ud *UserDevice) TableName() string {
	return TablePrefix + "user_devices"
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
