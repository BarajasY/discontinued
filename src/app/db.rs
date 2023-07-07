use surrealdb::{Surreal, engine::remote::ws::{Client, Ws}, opt::auth::Root};

pub async fn surreal_connection() -> Surreal<Client> {

    let connection: Surreal<Client> = Surreal::new::<Ws>("127.0.0.1:8000").await.unwrap();

    connection.signin(Root {
        username: "root",
        password: "root"
    }).await.unwrap();

    connection.use_ns("test").use_db("test").await.unwrap();

    connection

}
