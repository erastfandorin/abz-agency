export const getResolutionFileImg = (
  file: File,
): { width: number; height: number } => {
  const promise = new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function (e) {
      const image = new Image();

      if( e && e.target) {
        image.src = e.target.result;

        image.onload = function () {
          resolve({ width: this.width, height: this.height });
        };
      }
    };
  });
  return promise;
};

export const formatPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/^(\+38)(\d{3})(\d{3})(\d{2})(\d{2})$/, "$1 ($2) $3 $4 $5");
};

export const getTextWidth = (text: string, font?: string): number => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (context) {
    context.font = font || getComputedStyle(document.body).font;
    return context.measureText(text).width;
  }
  return 0
};
