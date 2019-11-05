package auth

import (
	"time"

	"github.com/dgrijalva/jwt-go"
	"lin9.me/config"
)

type jwtCustomClaims struct {
	Name         string `json:"name"`
	SessionToken string `json:"session"`
	Admin        bool   `json:"admin"`
	jwt.StandardClaims
}

func createToken(identification string, password string) (string, error) {

	// Set custom claims
	claims := &config.JwtCustomClaims{
		identification,
		"sessionTokenEx",
		true,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
		},
	}

	// Create token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte("secret"))

	if err != nil {
		return "", err
	}

	return t, nil
}
