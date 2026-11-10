resource "kubernetes_deployment" "stock-app" {
  metadata {
    name      = "15soat-stock-update-service"
    namespace = var.namespace
    labels    = { app = "15soat-stock-update-service" }
  }

  spec {
    replicas = 1

    selector {
      match_labels = { app = "15soat-stock-update-service" }
    }

    template {
      metadata {
        name   = "15soat-stock-update-service"
        labels = { app = "15soat-stock-update-service" }
      }

      spec {
        automount_service_account_token = false

        image_pull_secrets {
          name = "ghcr-secrets"
        }

        container {
          name  = "c-15soat-tech-challenge"
          image = var.image

          liveness_probe {
            http_get {
              path = "/health"
              port = 3000
            }
            initial_delay_seconds = 10
          }

          resources {
            requests = {
              cpu               = "100m"
              memory            = "100Mi"
              ephemeral-storage = "2Gi"
            }
            limits = {
              cpu    = "200m"
              memory = "100Mi"
            }
          }

          port {
            container_port = 3000
          }

          env {
            name = "DB_NAME"
            value = var.postgres_db
          }

          env {
            name = "DB_USER"
            value = var.postgres_user
          }

          env {
            name = "DB_PASSWORD"
            value = var.postgres_password
          }

          env {
            name = "DB_HOST"
            value = var.db_host
          }

          env {
            name = "DB_PORT"
            value = var.db_port
          }
          
          env {
            name  = "JWT_SECRET"
            value_from {
              secret_key_ref {
                name = "app-secrets"
                key  = "JWT_SECRET"
              }
            }
          }
          
          env {
            name  = "CLIENT_ID"
            value_from {
              secret_key_ref {
                name = "app-secrets"
                key  = "CLIENT_ID"
              }
            }
          }
          
          env {
            name  = "CLIENT_SECRET"
            value_from {
              secret_key_ref {
                name = "app-secrets"
                key  = "CLIENT_SECRET"
              }
            }
          }
        }
      }
    }
  }
}
