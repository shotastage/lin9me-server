// +build !appengine,!appenginevm

package main

import (
	"html/template"
	"io"
	"os"

	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/labstack/echo"

	"lin9.me/config"
	"lin9.me/db"
	"lin9.me/db/migrations"
)

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func port() string {

	port := os.Getenv("PORT")

	if len(port) == 0 {
		port = "8080"
	}

	return ":" + port
}

func main() {

	// Configuration
	// ===========================================================================
	err := config.Init("Cloudfile")
	if err != nil {
		panic("E2001: Configuration failure!")
	}

	// Startup database connection
	// ===========================================================================
	db.Init()
	if err != nil {
		panic("E2001: Database connection failure!")
	}

	migrations.Migrate()

	defer db.Sess().Close()

	t := &Template{
		templates: template.Must(template.ParseGlob("views/errors/*.html")),
	}

	e := routerMaker()

	e.Renderer = t

	e.Logger.Fatal(e.Start(port()))
}
