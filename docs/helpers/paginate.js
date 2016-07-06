export default function paginate({ page, perPage }) {
  return (data = []) => {
    // adapt to zero indexed logic
    const p = page - 1 || 0;

    const amountOfPages = Math.ceil(data.length / perPage);
    const startPage = p < amountOfPages ? p : 0;

    return {
      amount: amountOfPages,
      data: data.slice(startPage * perPage, startPage * perPage + perPage),
      page: startPage
    };
  };
}
