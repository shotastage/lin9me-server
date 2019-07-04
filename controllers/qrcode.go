package controllers

import (
	"fmt"
	"net/http"
	"os"

	"github.com/labstack/echo"
	"lin9.me/app/qrcode"
)

func QRCodeControllerGET(c echo.Context) error {

	urlID := c.Param("shortenID")

	fpath := qrcode.GenerateQRByString("https://lin9.me" + urlID)

	f, err := os.Open(fpath)

	if err != nil {
		return err
	}

	if err := os.Remove(fpath); err != nil {
		fmt.Println(err)
	}

	return c.Stream(http.StatusOK, "image/png", f)
}
