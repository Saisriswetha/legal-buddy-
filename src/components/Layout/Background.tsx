import assetImg from '../../../asset.jpg'

export const Background = () => {
  return (
    <img
      src={assetImg}
      alt="Background"
      className="fixed inset-0 -z-10 w-full h-full object-cover"
    />
  )
}
