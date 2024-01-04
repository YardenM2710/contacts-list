import noResultsIcon from '../icons/no-results.png';
export function NoResults() {
  return (
    <section className="no-results">
      <div className="no-results-container">
        <div className="no-results-text">
          <h1>
            Whoops..<br></br>Your list is empty.
          </h1>
        </div>
        <div className="no-results-img">
          <img src={noResultsIcon} />
        </div>
        <h3>You can add contacts by clicking at the plus button on top right side of the screen.</h3>
      </div>
    </section>
  );
}
