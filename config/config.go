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
		Name     string `json:"name"`
		Password string `json:"password"`
		Port     string `json:"port"`
		Ssl      string `json:"ssl"`
		User     string `json:"user"`
	} `json:"database"`
	Host      string `json:"host"`
	JwtConfig struct {
		Sig string `json:"sig"`
	} `json:"jwt_config"`
	Port   string `json:"port"`
	Ssl    string `json:"ssl"`
	Static struct {
		Directory string `json:"directory"`
	} `json:"static"`
}

// Init is a functino  for configuraing and share all modules
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
