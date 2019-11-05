package flake

import (
	"crypto/rand"
	"math/big"

	"github.com/rs/xid"
)

func CreateUniqueID() string {
	return xid.New().String()
}

func CreateRandomID() string {

	const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"

	const letterSize = 10

	buf := make([]byte, letterSize)
	max := new(big.Int)
	max.SetInt64(int64(len(letterBytes)))
	for i := range buf {
		r, err := rand.Int(rand.Reader, max)
		if err != nil {
			panic(err)
		}
		buf[i] = letterBytes[r.Int64()]
	}
	return string(buf)
}

func CreateRandomNext(size int) string {
	const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!#$%&()=~^?/<>"

	buf := make([]byte, size)
	max := new(big.Int)
	max.SetInt64(int64(len(letterBytes)))
	for i := range buf {
		r, err := rand.Int(rand.Reader, max)
		if err != nil {
			panic(err)
		}
		buf[i] = letterBytes[r.Int64()]
	}
	return string(buf)
}
