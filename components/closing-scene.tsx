export function ClosingScene() {
  return (
    <figure className="closing-scene" aria-label="Frontier travelers silhouetted against a sun on the horizon">
      <figcaption className="closing-caption shell">
        <span className="closing-title">
          <span className="closing-word">Beyond</span>{' '}
          <span className="closing-word">the</span>{' '}
          <span className="closing-word closing-title-end">last line.</span>
        </span>
        <span className="closing-tagline">
          <span className="closing-word">Still curious.</span>
          <span className="closing-word">Still building.</span>
        </span>
      </figcaption>
      <div className="closing-landscape" aria-hidden="true">
        <div className="closing-sun" />
        <div className="closing-ridge" />
      </div>
    </figure>
  )
}
