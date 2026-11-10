resource "kubernetes_service" "stock-app" {
  metadata {
    name      = "svc-15soat-stock-update-service"
    namespace = var.namespace
  }

  spec {
    selector = { app = "15soat-stock-update-service" }

    port {
      port        = 3001
      target_port = 3001
      node_port   = 30001
    }

    type = "NodePort"
  }
}
