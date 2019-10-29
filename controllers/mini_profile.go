package controllers

import (
	"net/http"

	"github.com/labstack/echo"
)

type ProfileResponse struct {
	Shorten     string `json:"shorten"`
	Count       int    `json:"count"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Image       string `json:"image"`
}

func ProfileGET(c echo.Context) error {

	res := &ProfileResponse{
		"", 0, "", "", "",
	}

	return c.JSON(http.StatusOK, res)
}
