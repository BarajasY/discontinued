use axum::{Router, routing::{get, post}};
use surrealdb::Surreal;
use surrealdb::engine::remote::ws::Client;
use super::{api::cars::{root, get_cars, create_car, get_cars_by_year}, cors::make_cors};

use super::db;

pub async fn get_router() -> Router {
    let connection: Surreal<Client> = db::surreal_connection().await;

    Router::new()
    .route("/", get(root))
    .route("/cars", post(create_car).get(get_cars))
    .route("/cars/year/:year", get(get_cars_by_year))
    .with_state(connection)
    .layer(make_cors())

}
