package qrcode

import (
	"image/png"
	"os"

	"github.com/boombuler/barcode"
	"github.com/boombuler/barcode/qr"
)

func GenerateQRByString(str string) {

	qrCode, _ := qr.Encode(str, qr.M, qr.Auto)

	// Resize barcode
	qrCode, _ = barcode.Scale(qrCode, 200, 200)

	// Set output files
	file, _ := os.Create("qrcode.png")
	defer file.Close()

	// Encode images to ong
	png.Encode(file, qrCode)
}
