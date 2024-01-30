export const CompetitionTypeDetail = ({competitionType}) => {
    return (
        <p className="col"> {competitionType.length} m styl {competitionType.style} {competitionType.gender ? 'mężczyzn' : 'kobiet'}</p>
    )
}