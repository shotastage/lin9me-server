package controllers

import (
	"net/http"

	"lin9.me/interfaces"
	"lin9.me/models"

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

		// Username check
		u.GetBy("username", r.Email)
		if u.Username != "" {
			res = &Response{
				Exists: true,
			}
		} else {
			res = &Response{
				Exists: false,
			}
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

	/*
		if err := CreateSession(r.Username, r.IP, r.DeviceAgent, r.UserAgent); err != nil {
			res := &Response{
				Message: "Failed to create session.",
			}
			return c.JSON(http.StatusInternalServerError, res)
		}
	*/

	res := &Response{
		Message: "Successful creating a new session.",
	}

	return c.JSON(http.StatusOK, res)
}
