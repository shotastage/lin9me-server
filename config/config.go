package config

import (
	"encoding/json"
	"io/ioutil"
	"os"
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
	Static struct {
		Directory string `json:"directory"`
	} `json:"static"`
	JWTConfig struct {
	} `json:"jwt_config"`
	Host string `json:"host"`
	Port string `json:"port"`
	Ssl  string `json:"ssl"`
}

// Init is a functino  for configuraing and share all modules
func Init(fname string) error {

	c := new(AppConfig)

	jsonString, err := ioutil.ReadFile(fname)

	// Priority for environmental value
	configPriority := os.Getenv("CONFIG_PRIORITY")

	if configPriority == "String::EnvironmentalValue" {
		c.Database.Host = os.Getenv("DATABASE_HOST")
		c.Database.Port = os.Getenv("DATABASE_PORT")
		c.Database.Name = os.Getenv("DATABASE_NAME")
		c.Database.User = os.Getenv("DATABASE_USER")
		c.Database.Password = os.Getenv("DATABASE_PASS")

		return nil
	}

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
