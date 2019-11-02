package controllers

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/labstack/echo"
	"lin9.me/app/qrcode"
)

func QRCodeControllerGET(c echo.Context) error {

	urlID := c.Param("shortenID")

	qrlink := "https://2oo.pw/" + urlID

	if strings.Contains(urlID, "WIFI:") {
		qrlink = urlID
	}

	fpath := qrcode.GenerateQRByString(qrlink)

	f, err := os.Open(fpath)

	if err != nil {
		return err
	}

	if err := os.Remove(fpath); err != nil {
		fmt.Println(err)
	}

	return c.Stream(http.StatusOK, "image/png", f)
}
