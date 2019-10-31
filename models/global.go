package models

import "time"

var TablePrefix = "lin9_"

// Model is base model
type Model struct {
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time `sql:index`
}

type modelError struct {
	message string
	err     error
}

func (e *modelError) Error() string {
	return e.message
}
