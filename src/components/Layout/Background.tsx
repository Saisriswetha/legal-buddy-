export const Background = () => {
  return (
    <img
      src={`${import.meta.env.BASE_URL}asset.jpg`}
      alt="Background"
      className="fixed inset-0 -z-10 w-full h-full object-cover"
    />
  )
}
