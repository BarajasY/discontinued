use axum::{
    extract::{Json, Path, State},
    http::StatusCode,
};
use serde::{Deserialize, Serialize};
use surrealdb::{engine::remote::ws::Client, sql::Thing, Surreal, Response};

#[derive(Serialize, Deserialize, Debug)]
pub struct Car {
    id: Option<Thing>,
    name: String,
    year: u64,
    make: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TestCar {
    id: Option<Thing>,
    name: String,
    year: String,
    make: String,
    reference: String
}

#[derive(Deserialize, Serialize)]
pub struct CreateCar {
    name: String,
    year: u64,
    make: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct Record {
    #[allow(dead_code)]
    id: Thing,
}

pub async fn root() -> &'static str {
    "Hello, World"
}

pub async fn create_car(
    State(db): State<Surreal<Client>>,
    Json(payload): Json<CreateCar>,
) -> (StatusCode, Json<Car>) {
    let car = CreateCar {
        name: payload.name,
        year: payload.year,
        make: payload.make,
    };

    let created: Car = db
        .create("cars")
        .content(Car {
            id: None,
            name: car.name,
            year: car.year,
            make: car.make,
        })
        .await
        .unwrap();

    (StatusCode::CREATED, Json(created))
}

pub async fn get_cars(State(db): State<Surreal<Client>>) -> (StatusCode, Json<Vec<Car>>) {
    let cars: Vec<Car> = db.select("cars").await.unwrap();
    (StatusCode::OK, Json(cars))
}


pub async fn get_cars_by_make(
    State(db): State<Surreal<Client>>,
    Path(make): Path<String>,
) -> (StatusCode, Json<Vec<Car>>) {
    let mut s = make.to_string();
    let capitalized_make = s.remove(0).to_uppercase().to_string() + &s;

    let mut cars = db
    .query("SELECT * FROM cars WHERE make = type::table($make)")
    .bind(("make", capitalized_make))
    .await
    .unwrap();
dbg!(&cars);
(StatusCode::OK, Json(cars.take(0).unwrap()))
}

pub async fn get_cars_by_year(
    State(db): State<Surreal<Client>>,
    Path(year): Path<String>,
) -> (StatusCode, Json<Vec<Car>>) {

    let sqlquery = format!("Select * FROM cars WHERE year = {}", year);

    let mut cars: Response = db
        .query(sqlquery)
        .await
        .unwrap();

    (StatusCode::OK, Json(cars.take(0).unwrap()))
}
