import PaginationHelper from '../../../../src/shared/helpers/pagination.helper';

const RESULT: [any[], number] = [
  [
    { item: 'item 01' },
    { item: 'item 02' },
    { item: 'item 03' },
    { item: 'item 04' },
    { item: 'item 05' },
  ], 5,
];

test('it should contains the IPagination attributes', () => {
  const resultPaginated = PaginationHelper.paginate(RESULT, 10, 1);

  expect(resultPaginated).toHaveProperty('data');
  expect(resultPaginated).toHaveProperty('totalItems');
  expect(resultPaginated).toHaveProperty('totalPages');
  expect(resultPaginated).toHaveProperty('itemsPerPage');
  expect(resultPaginated).toHaveProperty('page');
});

test('it should have only one page (limit=10, page=1)', () => {
  const resultPaginated = PaginationHelper.paginate(RESULT, 10, 1);

  expect(resultPaginated.data).toEqual(RESULT[0]);
  expect(resultPaginated.totalItems).toBe(5);
  expect(resultPaginated.totalPages).toBe(1);
  expect(resultPaginated.itemsPerPage).toBe(10);
  expect(resultPaginated.page).toBe(1);
});

test('it should have 3 pages with 2 items per page (limit=2, page=1)', () => {
  const resultPaginated = PaginationHelper.paginate(RESULT, 2, 1);

  expect(resultPaginated.totalItems).toBe(5);
  expect(resultPaginated.totalPages).toBe(3);
  expect(resultPaginated.itemsPerPage).toBe(2);
  expect(resultPaginated.page).toBe(1);
});
