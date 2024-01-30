export const CompetitorElement = ({competitor}) => {
    return (
        <a href={`/zawodnicy/${competitor.id}`} className="list-group-item list-group-item-action">
            <div className="mt-3 col-2 rounded-1 rectangle">
                {competitor.first_name} {competitor.last_name}
            </div>
        </a>
    )
}