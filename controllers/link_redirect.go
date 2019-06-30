package controllers

import (
	"net/http"

	"github.com/labstack/echo"
	"lin9.me/models"
)

func LinkRedirectController(c echo.Context) error {

	urlID := c.Param("shotenID")

	originalLink := fetchOriginLink(urlID)

	if originalLink == "" {
		return c.String(http.StatusNotFound, "Requested link does not exist!")
	}

	return c.Redirect(301, originalLink)
}

func fetchOriginLink(urlID string) string {

	var l models.Link

	if l.GetBy("shorten", urlID) != nil {
		return ""
	}

	originUri := l.Origin

	l.ViewCount = l.ViewCount + 1

	l.Update()

	return originUri

}
