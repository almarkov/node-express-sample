INSERT INTO users(
    login
    , last_name
    , first_name
) VALUES (
    ${login}
    , ${last_name}
    , ${first_name}
)
RETURNING *
