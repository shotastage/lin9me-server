package controllers

import (
	"net/http"

	"lin9.me/app/auth"
	"lin9.me/interfaces"
	"lin9.me/models"

	"github.com/labstack/echo"
)

// RegisterAccountPOST is an application method for user registering handler
func RegisterAccountPOST(c echo.Context) error {
	r := new(interfaces.RegisterAccountRequest)
	if err := c.Bind(r); err != nil {
		return err
	}

	ra := auth.RegisterAccount(r.Email, r.Password)

	u := models.User{
		Identification: ra.Identification,
		Username:       ra.Username,
		Email:          ra.Email,
		Password:       ra.Password,
		IsAgreed:       true,
	}

	u.Create()

	return c.JSON(http.StatusOK, map[string]string{"message": "ok"})
}

// LoginJWTPOST is an application method for login handler
func LoginJWTPOST(c echo.Context) error {

	// Request Information
	ua := c.Request().Header.Get("User-Agent")
	da := c.Request().Header.Get("Device-Agent")
	ip := c.RealIP()

	// Bind request
	r := new(interfaces.LoginJWTRequest)
	if err := c.Bind(r); err != nil {
		return err
	}

	// Create token
	t, err := auth.GetJWT(r.Username, r.Password, ua, da, ip)

	res := &interfaces.LoginJWTResponse{
		Token:   t,
		Message: "ok",
	}

	if err != nil {
		res = &interfaces.LoginJWTResponse{
			Token:   "none",
			Message: "username or password is wrong",
		}
		return c.JSON(http.StatusUnauthorized, res)
	}

	return c.JSON(http.StatusOK, res)
}
