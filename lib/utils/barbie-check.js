module.exports = (barbie) => {
  if (!barbie) {
    const error = new Error('Barbie not found');
    error.status = 404;
    throw error;
  }
};
