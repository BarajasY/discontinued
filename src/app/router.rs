use axum::{Router, routing::{get, post}};
use surrealdb::Surreal;
use surrealdb::engine::remote::ws::Client;
use super::{api::cars::{root, get_cars, create_car, get_cars_by_year, get_cars_by_make, get_makes}, cors::make_cors};

use super::db;

pub async fn get_router() -> Router {
    let connection: Surreal<Client> = db::surreal_connection().await;

    Router::new()
    .route("/", get(root))
    .route("/cars", post(create_car).get(get_cars))
    .route("/cars/year/:year", get(get_cars_by_year))
    .route("/cars/make", get(get_makes))
    .route("/cars/make/:make", get(get_cars_by_make))
    .layer(make_cors())
    .with_state(connection)

}
