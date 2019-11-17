package models

import (
	"errors"
	"fmt"

	"github.com/jinzhu/gorm"
	"lin9.me/db"
)

type LinkSave struct {
	Model
	Identification string `gorm:"size:100;unique" json:"identification"`
	Link           string `gorm:"size:2084;unique" json:"link"`
	Title          string `gorm:"size:1000" json:"title"`
	Author         string `gorm:"size:1000" json:"author"`
	Description    string `gorm:"size:2048" json:"description"`
	ViewCount      int    `json:"count"`
	BlockedReason  string `gorm:"size:100" json:"blocked"`
	Disable        *bool  `gorm:"default:false" json:"disable"`
	Owned          string `gorm:"size:100" json:"owned"`
	Folder         string `gorm:"size:100" json:"folder"`
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

func (l *LinkSave) GetMutipleBy(col string, val interface{}) []LinkSave {

	rows, err := db.Sess().Table(l.TableName()).Where(col+" = ?", val).Rows()
	var results []LinkSave

	if err != nil {
		fmt.Println("ERROR HAS BEEN OCCURED")
	}

	for rows.Next() {
		var result LinkSave

		db.Sess().ScanRows(rows, &result)

		results = append(results, result)
	}

	return results
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
