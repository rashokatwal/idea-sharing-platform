import '../Styles/cards.css';

const CardComponent = (idea) => {
    return (
        <div className="card-container">
            <h2 className="card-title">{idea.title}</h2>
            <p className="card-description">..</p>
        </div>
    )
}

export default CardComponent;