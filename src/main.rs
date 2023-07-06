use std::net::SocketAddr;
use serde::{Serialize, Deserialize};
use axum::{Router, routing::{get, post}, Json, http::StatusCode, extract::State};
use surrealdb::{Surreal, engine::remote::ws::{Ws, Client}, opt::auth::Root, sql::Thing};

mod app;

#[derive(Serialize, Deserialize, Debug)]
struct Car{
    id: Thing,
    name: String,
    year: u64,
    make: String
}

#[derive(Deserialize)]
struct CreateCar {
    id: Thing,
    name: String,
    year: u64,
    make: String
}

pub type DB = Surreal<Client>;

#[tokio::main]
async fn main() {
    let connection = Surreal::new::<Ws>("127.0.0.1:8000").await.unwrap();

    connection.signin(Root {
        username: "root",
        password: "root"
    }).await.unwrap();

    connection.use_ns("root").use_db("root").await.unwrap();

    tracing_subscriber::fmt::init();

    let app = Router::new()
    .route("/", get(root))
    .route("/cars", get(get_cars).post(create_car).with_state(connection));

    let address = SocketAddr::from(([127,0,0,1], 8080));

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
        id: payload.id,
        name: payload.name,
        year: payload.year,
        make: payload.make
    };

    (StatusCode::CREATED, Json(car))
}

async fn get_cars(State(db): State<DB>) -> (StatusCode, Json<Vec<Car>>) {
    let cars:Vec<Car> = db.select("cars").await.unwrap();
    (StatusCode::OK, Json(cars))
}
