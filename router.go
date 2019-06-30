package main

import (
	"lin9.me/controllers"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

// Bhaa Cloud routing
// MARK: Do not change router object instantiate process
func routerMaker() *echo.Echo {
	router := echo.New()

	router.Use(middleware.CORS())

	router.Use(middleware.Static("views/build"))

	router.File("/", "views/build/index.html")

	router.GET("/:shotenID", controllers.LinkRedirectController)

	router.POST("/shorten_link", controllers.CreateNewLinkController)

	return router
}
