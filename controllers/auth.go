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

	type Response struct {
		Token   string `json:"token"`
		Message string `json:"message"`
	}

	r := new(interfaces.LoginJWTRequest)
	if err := c.Bind(r); err != nil {
		return err
	}

	t, err := auth.GetJWT(r.Username, r.Password)

	res := &Response{
		Token:   t,
		Message: "ok",
	}

	if err != nil {
		res = &Response{
			Token:   "none",
			Message: "username or password is wrong",
		}
		return c.JSON(http.StatusUnauthorized, res)
	}

	return c.JSON(http.StatusOK, res)
}
