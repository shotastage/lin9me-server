package interfaces

import "lin9.me/models"

type LinkSaveRequest struct {
	Link   string `json:"link"`
	Folder string `json:"folder"`
}

type LinkSaveResponse struct {
	Message string `json:"message"`
}

type LinkSaveListRequest struct {
	Link   string `json:"link"`
	Folder string `json:"folder"`
}

type LinkSaveListResponse struct {
	Links []models.LinkSave `json:"links"`
}
