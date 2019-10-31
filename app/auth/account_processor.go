package auth

type Accountinfo struct {
	Identification string
	Username       string
	Email          string
	Password       string
	IsAgreed       bool
}

func RegisterAccount(email string, password string) *Accountinfo {

	cryptedPass, err := cryptPassword(password)
	if err != nil {
		panic("Failed to crypt password")
	}

	userIdentification := CreateUniqueID()

	username := CreateRandomID()

	obj := &Accountinfo{
		userIdentification,
		username,
		email,
		cryptedPass,
		true,
	}

	return obj
}
