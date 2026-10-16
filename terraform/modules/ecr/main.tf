resource "aws_ecr_repository" "identity_backend" {
  name                 = var.backend_config.ecr_repository_name
  image_tag_mutability = "MUTABLE"
  encryption_configuration {
    encryption_type = "AES256"
  }
}

resource "aws_ecr_repository" "identity_frontend" {
  name                 = var.frontend_config.ecr_repository_name
  image_tag_mutability = "MUTABLE"
  encryption_configuration {
    encryption_type = "AES256"
  }
}