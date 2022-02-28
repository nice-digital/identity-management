type getPaginationRangeType = (pageNumber: number, itemsPerPage: string | number, dataLength: number) => { start: number, finish: number };

export const getPaginationRange: getPaginationRangeType  = (pageNumber, itemsPerPage, dataLength) => {
    const showAllItemsPerPage = itemsPerPage === "all";
    let paginationStart = 1;
    let paginationFinish = dataLength;

    if (!showAllItemsPerPage) {
        const itemsPerPageNumerical = Number(itemsPerPage);
        paginationStart = pageNumber * itemsPerPageNumerical - (itemsPerPageNumerical - 1);
        paginationFinish = dataLength < pageNumber * itemsPerPageNumerical ? dataLength : pageNumber * itemsPerPageNumerical;		
    }

    return { start: paginationStart, finish: paginationFinish };
};