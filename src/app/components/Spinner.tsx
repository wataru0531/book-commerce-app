

// スピナー。ローディング

type SpinnerProps = {
  color?: string,
}

const Spinner: React.FC<SpinnerProps> = ({ color = "border-blue-500" }) => {

  return (
    <div className="my-16 flex justify-center">
      <div className={`${color} w-10 h-10 animate-spin rounded-full border-4 border-t-transparent`}></div>
    </div>
  )
}

export default Spinner;