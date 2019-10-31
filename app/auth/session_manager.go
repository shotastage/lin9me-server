package auth

import (
	"lin9.me/models"
	"errors"
)

func CreateSession(username string, ip string, da string, ua string) error {

	var u models.User

	if err := u.GetBy("username", username); err != nil {
		if err = u.GetBy("email", username); err != nil {
			return errors.New("user does not exist")
		}
	}

	u.Devices = []models.UserDevice{
		{
			IP:          ip,
			DeviceAgent: da,
			UserAgent:   ua,
		},
	}

	u.Update()

	return nil
}
