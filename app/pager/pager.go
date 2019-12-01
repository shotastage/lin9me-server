package pager

func PagingIndex(page int, perPage int) (int, int) {

	startIndex := 1 + (perPage * (page - 1))
	endIndex := startIndex + perPage

	return startIndex, endIndex
}
