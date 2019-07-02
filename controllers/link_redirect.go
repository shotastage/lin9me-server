package controllers

import (
	"net/http"

	"github.com/labstack/echo"
	"lin9.me/models"
)

func LinkRedirectController(c echo.Context) error {

	urlID := c.Param("shotenID")

	ua := c.Request().Header.Get("User-Agent")
	ref := c.Request().Header.Get("Referer")
	ip := c.RealIP()

	recordAnalytics(urlID, ua, ref, ip)

	originalLink := fetchOriginLink(urlID)

	if originalLink == "" {
		return c.String(http.StatusNotFound, "Requested link does not exist!")
	}

	return c.Redirect(301, originalLink)
}

func recordAnalytics(shorten string, ua string, ref string, ip string) {

	var l models.Link

	l.GetBy("shorten", shorten)

	a := models.Analytics{
		Identification: l.Identification,
		UserAgent:      ua,
		Referer:        ref,
		IP:             ip,
	}

	a.Create()
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
