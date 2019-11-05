package controllers

import (
	"net/http"

	"github.com/labstack/echo"
)

// health.HealthGET is a function
func DashLinkGET(c echo.Context) error {

	return c.JSON(http.StatusOK, map[string]string{"mmmm": "up"})
}
