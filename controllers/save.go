package controllers

import (
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
	"lin9.me/app/flake"
	"lin9.me/config"
	"lin9.me/interfaces"
	"lin9.me/models"
)

func LinkSaveController(c echo.Context) error {

	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(*config.JwtCustomClaims)
	name := claims.Identification

	r := new(interfaces.LinkSaveRequest)
	if err := c.Bind(r); err != nil {
		return err
	}

	var u models.User
	u.GetBy("identification", name)

	// User does not exist error
	if u.Identification == "" {
		res := &interfaces.LinkSaveResponse{
			Message: "Requested user does not exist!",
		}

		return c.JSON(http.StatusOK, res)
	}

	var ls models.LinkSave
	ls.GetBy("link", r.Link)
	if ls.Link == r.Link {
		res := &interfaces.LinkSaveResponse{
			Message: "Requested link already exist!",
		}

		return c.JSON(http.StatusOK, res)
	}

	l := models.LinkSave{
		Identification: flake.CreateUniqueID(),
		Link:           r.Link,
		ViewCount:      0,
		BlockedReason:  "",
		Owned:          u.Identification,
		Folder:         r.Folder,
	}

	l.Create()

	res := &interfaces.LinkSaveResponse{
		Message: "",
	}

	return c.JSON(http.StatusOK, res)
}

func LinkSaveListController(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(*config.JwtCustomClaims)
	name := claims.Identification
}
