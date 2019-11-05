package auth

import (
	"errors"
	"time"

	"github.com/dgrijalva/jwt-go"
	"lin9.me/config"
	"lin9.me/models"
)

func GetJWT(username string, password string, ua string, da string, ip string) (string, error) {

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

	sessToken := createSession(u.Identification, ip, da, ua)

	token, err := createToken(u.Identification, u.Email, sessToken)

	return token, err
}

func createToken(identification string, email string, sessionToken string) (string, error) {

	// Set custom claims
	claims := &config.JwtCustomClaims{
		Identification: identification,
		Email:          email,
		Session:        sessionToken,
		Admin:          true,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
			Issuer:    "https://2oo.pw/auth/login_jwt",
		},
	}

	// Create token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS512, claims)

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte("secret"))

	if err != nil {
		return "", err
	}

	return t, nil
}
