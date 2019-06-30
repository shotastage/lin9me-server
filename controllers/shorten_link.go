package controllers

import (
	"net/http"
	"strings"

	"github.com/labstack/echo"
	"lin9.me/interfaces"
	"lin9.me/models"
)

func CreateNewLinkController(c echo.Context) error {

	r := new(interfaces.CreateNewLinkRequest)
	if err := c.Bind(r); err != nil {
		return err
	}

	shortenURL := createAndStoreLink(r.Origin)

	return c.JSON(http.StatusOK, map[string]string{"shorten": shortenURL})
}

func createAndStoreLink(origin string) string {

	// Avoid link9 link duplication
	if strings.Contains(origin, "lin9.me") {
		return origin
	}

	var l models.Link

	if l.GetBy("origin", origin) != nil {
		randID := CreateRondomID()

		l := models.Link{
			Origin:  origin,
			Shorten: randID,
			Disable: false,
		}

		l.Create()
		return BaseURL + randID

	} else {
		return BaseURL + l.Shorten
	}
}
