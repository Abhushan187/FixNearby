export const sanitizeInput = (req, res, next) => {
  const cleanData = (data) => {
    if (typeof data === 'string') {
      return data.replace(/[<>]/g, '').replace(/\$/g, '');
    }
    if (typeof data === 'object' && data !== null) {
      for (const key in data) {
        data[key] = cleanData(data[key]);
      }
    }
    return data;
  };

  req.body = cleanData(req.body);
  req.query = cleanData(req.query);
  req.params = cleanData(req.params);
  next();
};