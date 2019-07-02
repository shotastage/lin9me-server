package controllers

import (
	"net/http"

	"github.com/labstack/echo"
	"github.com/rs/xid"
)

// health.HealthGET is a function
func IDGenGET(c echo.Context) error {
	guid := xid.New()

	return c.JSON(http.StatusOK, map[string]string{"new_id": guid.String()})
}
