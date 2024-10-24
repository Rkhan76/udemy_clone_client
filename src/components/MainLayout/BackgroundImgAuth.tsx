import Background from '../../assets/backgroundForAuth.jpg'

export const BackgroundImgAuth = () => {
  return (
    <div className="absolute inset-0">
      <img
        className="object-cover w-full h-full" // Ensures the image covers the entire area
        src={Background}
        alt="Auth page background"
      />
    </div>
  )
}
