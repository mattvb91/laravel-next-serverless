
export default function Identity({ me }) {

    return (
        <>
            {me.name} - <span data-cy="identity-email">{me.email}</span>
        </>
    )
}
