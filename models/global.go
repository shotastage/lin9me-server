package models

import "time"

var TablePrefix = "lin9_"

// Model is base model
type Model struct {
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	DeletedAt *time.Time `sql:index json:"deleted_at`
}

type modelError struct {
	message string
	err     error
}

func (e *modelError) Error() string {
	return e.message
}
