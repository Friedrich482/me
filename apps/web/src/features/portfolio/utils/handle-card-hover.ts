export const handleCardHover = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();

  const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
  const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

  // Rotation angles (side you hover goes UP)
  const maxRotation = 20;
  const rotateX = relativeY * maxRotation * 1;
  const rotateY = relativeX * maxRotation * -1;

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`;
};
