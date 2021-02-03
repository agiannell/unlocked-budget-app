import './Categories.css';

const Categories = props => {
    return (
        <section className='categories'>
            <h1>{ props.name }</h1>
            <div className='cat-money'>
                <p>${ props.amount }</p>
                <p>${ props.amount }</p>
            </div>
        </section>
    )
}

export default Categories