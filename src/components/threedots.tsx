const ThreeDots = () => (
  <>
    <svg
      width="20"
      height="22"
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="16" height="2" />
      <rect x="2" y="16" width="16" height="2" />
      <rect x="2" y="10" width="16" height="2" />
    </svg>
    <style jsx>{`
      rect {
        fill: #202020;
      }
      @media (prefers-color-scheme: dark) {
        rect {
          fill: #ffffff;
        }
      }
    `}</style>
  </>
)

export default ThreeDots
