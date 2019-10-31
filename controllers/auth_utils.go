package controllers

import (
	"lin9.me/app/auth"
	"lin9.me/interfaces"
	"lin9.me/models"
	"net/http"

	"github.com/labstack/echo"
)

func ExistencePOST(c echo.Context) error {

	type Response struct {
		Exists bool `json:"exists"`
	}

	r := new(interfaces.ExistenceCheckRequest)
	if err := c.Bind(r); err != nil {
		return err
	}

	var u models.User
	u.GetBy("email", r.Email)

	res := &Response{
		Exists: true,
	}

	if u.Email == "" {
		res = &Response{
			Exists: false,
		}
	}

	return c.JSON(http.StatusOK, res)
}

func CreateDeviceSession(c echo.Context) error {

	type Response struct {
		Message string `json:"message"`
	}

	r := new(interfaces.CreateSessionRequest)
	if err := c.Bind(r); err != nil {
		return err
	}

	if err := auth.CreateSession(r.Username, r.IP, r.DeviceAgent, r.UserAgent); err != nil {
		res := &Response{
			Message: "Failed to create session.",
		}
		return c.JSON(http.StatusInternalServerError, res)
	}

	res := &Response{
		Message: "Successful creating a new session.",
	}

	return c.JSON(http.StatusOK, res)
}
