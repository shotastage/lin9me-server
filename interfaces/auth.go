package interfaces

type RegisterAccountRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	IsAgreed bool   `json:"agreeStatus"`
}

type RegisterAdditionalAccountRequest struct {
	Gender string
	Age    string
	Live   string
}

type LoginJWTRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type LoginJWTResponse struct {
	Token   string `json:"token"`
	Message string `json:"message"`
}

type ExistenceCheckRequest struct {
	Email string `json:"email"`
}

type CreateSessionRequest struct {
	Username    string `json:"username"`
	IP          string `json:"ip"`
	UserAgent   string `json:"useragent"`
	DeviceAgent string `json:"deviceagent"`
}
