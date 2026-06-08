const cacheStore = new Map();

export const cacheMiddleware = (durationSec = 60) => {
  return (req, res, next) => {
    const key = req.originalUrl || req.url;
    const cached = cacheStore.get(key);
    
    if (cached && cached.expiry > Date.now()) {
      return res.status(200).json(cached.data);
    }
    
    res.sendResponse = res.json;
    res.json = (body) => {
      cacheStore.set(key, {
        expiry: Date.now() + durationSec * 1000,
        data: body
      });
      res.sendResponse(body);
    };
    next();
  };
};