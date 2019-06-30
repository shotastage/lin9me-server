package config

import (
	"encoding/json"
	"io/ioutil"
)

// Config is global variables for sharing a configuration value
var Config *AppConfig

var err error

// AppConfig is struct that define configuration file structure
type AppConfig struct {
	Database struct {
		Host     string `json:"host"`
		Port     string `json:"port"`
		Name     string `json:"name"`
		User     string `json:"user"`
		Password string `json:"password"`
		Ssl      string `json:"ssl"`
	} `json:"database"`
	JWTConfig struct {
	} `json:"jwt_config"`
	Host string `json:"host"`
	Port string `json:"port"`
	Ssl  string `json:"ssl"`
}

func Init(fname string) error {

	c := new(AppConfig)

	jsonString, err := ioutil.ReadFile(fname)

	// File load error
	if err != nil {
		return err
	}

	err = json.Unmarshal(jsonString, c)

	// JSON mapping error
	if err != nil {
		return err
	}

	Config = c

	return nil
}
