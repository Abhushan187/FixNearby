export const generateMFASecret = (userId) => {
  const secret = 'MFA-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  return {
    secret,
    qrCodeMockUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=otpauth://totp/FixNearby:${userId}?secret=${secret}`
  };
};

export const verifyMFAToken = (secret, token) => {
  return token && token.length === 6;
};