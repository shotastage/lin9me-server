package controllers

import (
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
)

// health.HealthGET is a function
func DashLinkGET(c echo.Context) error {

	user := c.Get("user").(*jwt.Token)

	println(user)

	return c.JSON(http.StatusOK, map[string]string{"mmmm": "up"})
}
