package controllers

import (
	"net/http"

	"github.com/labstack/echo"
	"github.com/rs/xid"
	"lin9.me/models"
)

func LinkRedirectController(c echo.Context) error {

	urlID := c.Param("shotenID")

	ua := c.Request().Header.Get("User-Agent")
	ref := c.Request().Header.Get("Referer")
	ip := c.RealIP()
	lang := c.Request().Header.Get("Accept-Language")

	recordAnalytics(urlID, ua, ref, ip, lang)

	originalLink := fetchOriginLink(urlID)

	if originalLink == "" {
		doc := `
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title>2ooU! Error</title>
	<style>
		body {
			font-family: 'Arial',YuGothic,'Yu Gothic','Hiragino Kaku Gothic ProN','ヒラギノ角ゴ ProN W3','メイリオ', Meiryo,'ＭＳ ゴシック',sans-serif;
		}
	</style>
</head>
<body>
	<h1>Requested link does not exist!</h1>
</body>
</html>
	`
		return c.HTML(http.StatusOK, doc)
	}

	blockedCheck, reason := checkBlockedPage(urlID)

	if blockedCheck != "none" {
		data := struct {
			ReasonDescription string
			RedirectURL       string
		}{
			ReasonDescription: reason,
			RedirectURL:       originalLink,
		}

		return c.Render(http.StatusOK, "blocked", data)
	}

	return c.Redirect(301, originalLink)
}

func recordAnalytics(shorten string, ua string, ref string, ip string, lang string) {

	var l models.Link

	l.GetBy("shorten", shorten)

	if l.Identification == "" {
		l.Identification = xid.New().String()
		l.Update()
	}

	a := models.Analytics{
		Identification: l.Identification,
		UserAgent:      ua,
		Referer:        ref,
		IP:             ip,
		Language:       lang,
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

func getLocationFromIP(ip string) {

}

func checkBlockedPage(urlID string) (string, string) {

	var l models.Link

	l.GetBy("shorten", urlID)

	if l.BlockedReason != "" {
		if l.BlockedReason == "Sexual" {
			return l.BlockedReason, "This site might include sexual content."
		} else {
			return l.BlockedReason, "This site might include suspicious content."
		}

	}

	return "none", "none"
}
