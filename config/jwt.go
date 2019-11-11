package config

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/middleware"
)

type JwtCustomClaims struct {
	Identification string `json:"identification"`
	Email          string `json:"email"`
	Session        string `json:"session"`
	Admin          bool   `json:"admin"`
	jwt.StandardClaims
}

func signingKey() []byte {
	// signingKey := []byte(os.Getenv("SECRET_KEY"))
	signingKey := []byte("03umYk80zmeIpepkjS9upahPKPqtJHFlz6iWy4uuUSnJ3V6d1XUdGK0XsHS8CFXYANbs2FTFL5j/ti15fuamwBGXwlUpVa6LbXEFz52aMvyL7PL+Jgyi4meX5SEnh6Xe2t1GaDPIfTkdy8m2xVEKgmfu+XA8sxVb3fH1bpnv/1cfXJ/xvqI9fsOV3JKcI3tMu9SUIC6j2gyIXHRRI5kn9foalWxk3vhmswty3yMFuVBNo/GPay0SO0vTtH48/Yk4B+57Jz1UUB1DlbDJaClug9FDrxt2YkKbW4RDg7/sLvGlAGAlY6bBAuXcqanuis0/e5+veUeyGOA/IySk34bpiMppNpZfNLMqOgyXhVR54ozbP+zsrgqnxw6sZQ4356lPhzGif57RD7tDLIRIjFVYxy41q1/VcJN3YajGXFkUgLnhQNFqUm60Wu5+3deVjrs/A94vl/wFw8CaTmuUXFGYm3E0G5Q7Eoc2IH5/3GJ9WHwLOdCIqfjQS4MgRzeMUuoXpMjC9YSu7tYQCxkrfc4hYQ==")

	return signingKey
}

var JWTConfig = middleware.JWTConfig{
	Claims:        &JwtCustomClaims{},
	SigningKey:    signingKey(),
	SigningMethod: "HS512",
}
