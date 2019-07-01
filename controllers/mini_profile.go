package controllers

import (
	"net/http"

	"github.com/labstack/echo"
)

func MiniProfileGET(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]string{"message": "This page is now under construction."})
}
