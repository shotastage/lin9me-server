package controllers

import (
	"net/http"
	"strings"

	"github.com/labstack/echo"
	"github.com/rs/xid"
	"lin9.me/app/lin9shortID"
	"lin9.me/app/scraper"
	"lin9.me/interfaces"
	"lin9.me/models"
)

type ShortenResponse struct {
	Shorten     string `json:"shorten"`
	Count       int    `json:"count"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Image       string `json:"image"`
}

func CreateNewLinkController(c echo.Context) error {

	r := new(interfaces.CreateNewLinkRequest)
	if err := c.Bind(r); err != nil {
		return err
	}

	if strings.Contains(r.Origin, "wifi://") {

		cc := strings.Split(r.Origin, "://")[1]
		ssid := strings.Split(cc, ":")[0]
		pass := strings.Split(cc, ":")[1]

		res := &ShortenResponse{
			"WIFI:T:WPA;S:" + ssid + ";P:" + pass + ";;",
			0, "", "", "",
		}

		return c.JSON(http.StatusOK, res)
	}

	shortenURL, viewCount := createAndStoreLink(r.Origin)
	title, desc, image := scraper.ScrapOgInfo(r.Origin)

	res := &ShortenResponse{
		shortenURL, viewCount, title, desc, image,
	}

	return c.JSON(http.StatusOK, res)
}

func createAndStoreLink(origin string) (string, int) {

	var l models.Link

	// Avoid link9 link duplication
	if strings.Contains(origin, "2oo.pw") {

		shortID := strings.Replace(origin, "http://2oo.pw", "", -0)
		shortID = strings.Replace(origin, "https://2oo.pw", "", -0)

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
		}

		l.Create()

		return BaseURL + randID, l.ViewCount
	}

	return BaseURL + l.Shorten, l.ViewCount
}
