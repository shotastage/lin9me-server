package controllers

import (
	"net/http"
	"strings"

	"github.com/labstack/echo"
	"github.com/rs/xid"
	"lin9.me/app/lin9shortID"
	"lin9.me/interfaces"
	"lin9.me/models"
)

type ShortenResponse struct {
	Shorten string `json:"shorten"`
	Count   int    `json:"count"`
}

func CreateNewLinkController(c echo.Context) error {

	r := new(interfaces.CreateNewLinkRequest)
	if err := c.Bind(r); err != nil {
		return err
	}

	shortenURL, viewCount := createAndStoreLink(r.Origin)

	res := &ShortenResponse{
		shortenURL, viewCount,
	}

	return c.JSON(http.StatusOK, res)
}

func createAndStoreLink(origin string) (string, int) {

	var l models.Link

	// Avoid link9 link duplication
	if strings.Contains(origin, "lin9.me") {

		shortID := strings.Replace(origin, "http://lin9.me", "", -0)
		shortID = strings.Replace(origin, "https://lin9.me", "", -0)

		l.GetBy("shorten", shortID)

		return origin, l.ViewCount
	}

	if l.GetBy("origin", origin) != nil {

		randID := lin9shortID.CreateRondomID()

		identification := xid.New().String()

		l := models.Link{
			Origin:         origin,
			Identification: identification,
			Shorten:        randID,
			Disable:        false,
		}

		l.Create()

		return BaseURL + randID, l.ViewCount
	}

	return BaseURL + l.Shorten, l.ViewCount
}
