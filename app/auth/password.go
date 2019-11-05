package auth

import (
	"errors"

	"golang.org/x/crypto/bcrypt"
)

func cryptPassword(plain string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(plain), bcrypt.DefaultCost)
	if err != nil {
		return "", errors.New("failed to crypt password")
	}

	return string(hash), nil
}

func comparePassword(hash string, provided string) error {

	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(provided))
	if err != nil {
		return errors.New("the provided password does not match")
	}

	return nil
}
