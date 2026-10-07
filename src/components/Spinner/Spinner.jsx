const Spinner = ({ size = 18, className = '' }) => (
  <span
    role='status'
    aria-label='Loading'
    style={{ width: size, height: size }}
    className={`inline-block rounded-full border-2 border-current border-t-transparent animate-spin ${className}`}
  />
)

export default Spinner
