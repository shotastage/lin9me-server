package qrcode

import (
	"image/png"
	"os"

	"github.com/boombuler/barcode"
	"github.com/boombuler/barcode/qr"
	"github.com/rs/xid"
)

func GenerateQRByString(str string) string {

	qrCode, _ := qr.Encode(str, qr.M, qr.Auto)

	// Resize barcode
	qrCode, _ = barcode.Scale(qrCode, 600, 600)

	fname := xid.New().String() + "qrcode.png"
	// Set output files
	file, _ := os.Create("static_files/" + fname)
	defer file.Close()

	// Encode images to ong
	png.Encode(file, qrCode)

	return "static_files/" + fname
}
