use std::net::SocketAddr;
use surrealdb::{Surreal, engine::remote::ws::Client};

use app::router::get_router;
mod app;

pub type DB = Surreal<Client>;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let address = SocketAddr::from(([127,0,0,1], 8080));

    tracing::debug!("Listening on {}", address);

    let app = get_router().await;


    println!("Server running succesfully!");
    axum::Server::bind(&address)
        .serve(app.into_make_service())
        .await
        .unwrap();

}
