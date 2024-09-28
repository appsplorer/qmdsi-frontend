export const maskName = (name) => {
  if (!name || name.length <= 2) {
    return name;
  }

  const parts = name.split(" ");

  const maskedParts = parts.map((part) => {
    if (part.length <= 2) {
      return part;
    }
    return part[0] + "*".repeat(part.length - 2) + part[part.length - 1];
  });

  return maskedParts.join(" ");
};
