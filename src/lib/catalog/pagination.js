// Pagination helpers

export function paginate(items, page, pageSize) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  return {
    total,
    totalPages,
    currentPage,
    pageItems: items.slice(start, end),
    start,
    end,
  };
}

export function getPageNumbers(totalPages) {
  return Array.from({ length: totalPages }, (_, i) => i + 1);
}
