package models

import (
	"errors"

	"github.com/jinzhu/gorm"
	"lin9.me/db"
)

type Malicious struct {
	Identification string
	OriginalLink   string
	MaliciousType  string
	MaliciousLevel string
}

func (m *Malicious) TableName() string {
	return TablePrefix + "malicious"
}

func (m *Malicious) GetBy(col string, val interface{}) error {
	err := db.Sess().Where(col+" = ?", val).First(&m)

	if err.RecordNotFound() {
		return errors.New("the record does not exists")
	}

	return nil
}

func (m *Malicious) Create() *gorm.DB {

	if err := db.Sess().Create(&m); err != nil {
		return err
	}

	return nil
}

func (m *Malicious) Update() *gorm.DB {

	if err := db.Sess().Save(&m); err != nil {
		return err
	}

	return nil
}
