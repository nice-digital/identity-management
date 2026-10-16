module "ecr" {
  source          = "../../modules/ecr"
  backend_config  = var.backend_config
  frontend_config = var.frontend_config
}

module "iam" {
  source = "../../modules/iam"
}

module "networking" {
  source            = "../../modules/networking"
  backend_config    = var.backend_config
  networking_config = var.networking_config
}

module "ecs" {
  source            = "../../modules/ecs"
  environment       = var.environment
  backend_config    = var.backend_config
  frontend_config   = var.frontend_config
  networking_config = var.networking_config
  iam_role_arn      = module.iam.iam_role_arn
  target_group_arn  = module.networking.target_group_arn
  aws_region        = var.aws_region
}