package controllers

import (
	"net/http"
	"os"

	"github.com/labstack/echo"
)

// health.HealthGET is a function
func HealthGET(c echo.Context) error {

	status := os.Getenv("SERVER_RUNNING_STATUS")

	if status == "down" {
		return c.JSON(http.StatusOK, map[string]string{"status": "down"})
	}

	return c.JSON(http.StatusOK, map[string]string{"status": "up"})
}

func PingPongGET(c echo.Context) error {

	return c.JSON(http.StatusOK, map[string]string{"message": "pong"})
}
