package scraper

import (
	"fmt"
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

	var title string
	var description string
	var icatch string
	// Find the review items
	doc.Find("meta").Each(func(i int, s *goquery.Selection) {
		// For each item

		if ogtag, _ := s.Attr("property"); ogtag == "og:image" {
			icatch, _ = s.Attr("content")
			fmt.Printf("Description field: %s\n", icatch)
		}

		if ogtag, _ := s.Attr("property"); ogtag == "og:title" {
			title, _ = s.Attr("content")
			fmt.Printf("Description field: %s\n", title)
		}

		if ogtag, _ := s.Attr("property"); ogtag == "og:description" {
			description, _ = s.Attr("content")
			fmt.Printf("Description field: %s\n", description)
		}
	})

	return title, description, icatch
}
