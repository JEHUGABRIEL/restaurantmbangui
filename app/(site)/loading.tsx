export default function SiteLoading() {
  return (
    <div className="page-loader">
      <div className="page-loader__inner">
        <span className="page-loader__mark" aria-hidden>
          M’
        </span>
        <span className="page-loader__name">Restaurant M’</span>
        <span className="page-loader__bar" aria-hidden />
        <span className="sr-only">Chargement de la page…</span>
      </div>
    </div>
  );
}
