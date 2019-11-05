package config

import (
	"os"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/middleware"
)

type JwtCustomClaims struct {
	Identification string `json:"identification"`
	Session        string `json:"session"`
	Admin          bool   `json:"admin"`
	jwt.StandardClaims
}

func signingKey() []byte {
	signingKey := []byte(os.Getenv("SECRET_KEY"))

	return signingKey
}

var JWTConfig = middleware.JWTConfig{
	Claims:     &JwtCustomClaims{},
	SigningKey: signingKey(),
}
