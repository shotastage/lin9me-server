package auth

import (
	"errors"

	"lin9.me/models"
)

func GetJWT(username string, password string) (string, error) {

	var u models.User

	// Check Username & Email existence
	if err := u.GetBy("username", username); err != nil {
		if err = u.GetBy("email", username); err != nil {
			return "", errors.New("user does not exist")
		}
	}

	if err := comparePassword(u.Password, password); err != nil {
		return "", errors.New("password does not match")
	}

	token, err := createToken(username, password)

	return token, err
}
