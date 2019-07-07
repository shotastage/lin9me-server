package static

import (
	"fmt"

	"lin9.me/config"
)

func Init(static_dir string) string {
	fmt.Println("Initializing static files environment...")
	config := config.Config.Static.Directory

	return config

}

type StaticFIle struct {
}
