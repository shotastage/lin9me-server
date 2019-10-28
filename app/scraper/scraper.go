package scraper

import (
	"log"
	"net/http"

	"github.com/PuerkitoBio/goquery"
)

// ScrapOgInfo info returns Title, Description, Icatch Image
func ScrapOgInfo(origin string) (string, string, string) {
	res, err := http.Get(origin)

	// Error log
	if err != nil {
		log.Fatal(err)
	}

	defer res.Body.Close()
	if res.StatusCode != 200 {
		log.Fatalf("status code error: %d %s", res.StatusCode, res.Status)
	}

	// Load the HTML document
	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		log.Fatal(err)
	}

	title := origin
	description := "No description"
	icatch := "https://tipstock.net/wp-content/uploads/2019/05/laptop-2838921_1920-1024x609.jpg"

	doc.Find("meta").Each(func(i int, s *goquery.Selection) {
		if ogtag, _ := s.Attr("property"); ogtag == "og:image" {
			icatch, _ = s.Attr("content")
		}

		if ogtag, _ := s.Attr("property"); ogtag == "og:title" {
			title, _ = s.Attr("content")
		}

		if ogtag, _ := s.Attr("property"); ogtag == "og:description" {
			description, _ = s.Attr("content")
		}
	})

	return title, description, icatch
}
