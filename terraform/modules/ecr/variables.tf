variable "backend_config" {
  description = "Backend configuration"
  type = object({
    ecr_repository_name = string
  })
}

variable "frontend_config" {
  description = "Frontend configuration"
  type = object({
    ecr_repository_name = string
  })
}