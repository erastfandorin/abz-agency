export const formatPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/^(\+38)(\d{3})(\d{3})(\d{2})(\d{2})$/, "$1 ($2) $3 $4 $5");
};

// get text width
export const getTextWidth = (text: string, font?: string): number => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (context) {
    context.font = font || getComputedStyle(document.body).font;
    return context.measureText(text).width;
  }
  return 0
};
