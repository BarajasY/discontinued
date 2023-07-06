use std::net::SocketAddr;
use serde::{Serialize, Deserialize};
use axum::{Router, routing::{get, post}, Json, http::StatusCode};

#[derive(Serialize)]
struct Car {
    id: u64,
    model: String,
    year: u64,
    make: String
}

#[derive(Deserialize)]
struct CreateCar {
    model: String,
    year: u64,
    make: String
}


#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let app = Router::new()
    .route("/", get(root))
    .route("/cars", post(create_car));

    let address = SocketAddr::from(([127,0,0,1], 8000));

    tracing::debug!("Listening on {}", address);


    println!("Server running succesfully!");
    axum::Server::bind(&address)
        .serve(app.into_make_service())
        .await
        .unwrap();

}

async fn root() -> &'static str {
    "Hello, World"
}

async fn create_car(Json(payload): Json<CreateCar>) -> (StatusCode, Json<Car>) {
    let car = Car {
        id:1,
        model: payload.model,
        year: payload.year,
        make: payload.make
    };

    (StatusCode::CREATED, Json(car))
}
