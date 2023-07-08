use axum::{http::StatusCode, extract::{State, Json, Path}};
use serde::{Serialize, Deserialize};
use surrealdb::{sql::Thing, Surreal, engine::remote::ws::Client};

#[derive(Serialize, Deserialize, Debug)]
pub struct Car{
    id: Option<Thing>,
    name: String,
    year: u64,
    make: String
}

#[derive(Deserialize, Serialize)]
pub struct CreateCar {
    name: String,
    year: u64,
    make: String
}

#[derive(Debug, Deserialize, Serialize)]
struct Record {
    #[allow(dead_code)]
    id: Thing,
}

pub async fn root() -> &'static str {
    "Hello, World"
}

pub async fn create_car(State(db): State<Surreal<Client>>, Json(payload): Json<CreateCar>) -> (StatusCode, Json<Car>) {
    let car = CreateCar {
        name: payload.name,
        year: payload.year,
        make: payload.make
    };

    let created:Car = db.create("cars").content(Car {
        id: None,
        name: car.name,
        year: car.year,
        make: car.make
    }).await.unwrap();

    (StatusCode::CREATED, Json(created))
}

pub async fn get_cars(State(db): State<Surreal<Client>>) -> (StatusCode, Json<Vec<Car>>) {
    let cars:Vec<Car> = db.select("cars").await.unwrap();
    (StatusCode::OK, Json(cars))
}

pub async fn get_cars_by_year(State(db): State<Surreal<Client>>, Path(year): Path<u64>) -> (StatusCode, Json<Vec<Car>>) {
    let mut cars:surrealdb::Response = db.query("SELECT * FROM cars WHERE year = type::table($year)").bind(("year", year)).await.unwrap();
    (StatusCode::OK, Json(cars.take(1).unwrap()))
}

