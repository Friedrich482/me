export const handleCardLeave = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
) => {
  const card = e.currentTarget;
  card.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0px)";
};
