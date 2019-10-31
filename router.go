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
	router.File("/warning/:path", "views/build/index.html")
	router.File("/m/:function", "views/build/index.html")
	router.File("/p/:user", "views/build/index.html")
	router.File("/pg/:path", "views/build/index.html")

	router.GET("/:shotenID", controllers.LinkRedirectController)

	router.POST("/shorten_link", controllers.CreateNewLinkController)

	// Web Entry Point that recieve QR image
	webview := router.Group("/web")
	{
		webview.GET("/qr/:shortenID", controllers.QRCodeControllerGET)
	}

	// Health Check
	status := router.Group("/status")
	{
		status.GET("/ping", controllers.PingPongGET)
		status.GET("/health", controllers.HealthGET)
	}

	// Official Open API
	api := router.Group("/api/v1")
	{
		api.POST("/shorten_link", controllers.CreateNewLinkController)
	}

	// API for Web or Smartphone application
	app := router.Group("/app")
	{
		profile := app.Group("/p")
		{
			profile.GET("/:username", controllers.ProfileGET)
		}
	}

	// Authorization
	auth := router.Group("/auth")
	{
		auth.POST("/existence", controllers.ExistencePOST)
		auth.POST("/device_session", controllers.CreateDeviceSession)
		auth.POST("/register", controllers.RegisterAccountPOST)
		auth.POST("/login_jwt", controllers.LoginJWTPOST)
	}

	return router
}
