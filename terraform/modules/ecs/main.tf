data "aws_ecr_image" "identity_backend" {
  repository_name = var.backend_config.ecr_repository_name
  image_tag       = var.backend_config.ecr_image_tag
}
 
data "aws_ecr_image" "identity_frontend" {
  repository_name = var.frontend_config.ecr_repository_name
  image_tag       = var.frontend_config.ecr_image_tag
}

locals {
  container_definitions = {
    dev        = "${path.module}/container-definitions-dev.tftpl.json"
    production = "${path.module}/container-definitions-production.tftpl.json"
  }
}

resource "aws_ecs_task_definition" "identity_td" {
  family                   = "identity"
  requires_compatibilities = ["FARGATE"]
  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }
  network_mode = "awsvpc"
  cpu          = "1024"
  memory       = "2048"
  container_definitions = templatefile(local.container_definitions[var.environment],
    {
      aws_region                                                                 = var.aws_region
      backend_image_uri                                                          = data.aws_ecr_image.identity_backend.image_uri
      backend_container_port                                                     = var.backend_config.container_port
      backend_env_webappconfiguration_apiidentifier                              = var.backend_config.webappconfiguration_apiidentifier
      backend_env_webappconfiguration_authorisationserviceuri                    = var.backend_config.webappconfiguration_authorisationserviceuri
      backend_env_webappconfiguration_redirecturi                                = var.backend_config.webappconfiguration_redirecturi
      backend_env_webappconfiguration_postlogoutredirecturi                      = var.backend_config.webappconfiguration_postlogoutredirecturi
      backend_env_webappconfiguration_clientid                                   = var.backend_config.webappconfiguration_clientid
      backend_env_webappconfiguration_clientsecret                               = var.backend_config.webappconfiguration_clientsecret
      backend_env_webappconfiguration_domain                                     = var.backend_config.webappconfiguration_domain
      backend_env_webappconfiguration_googletrackingid                           = var.backend_config.webappconfiguration_googletrackingid
      backend_env_webappconfiguration_redisserviceconfiguration_connectionstring = var.backend_config.webappconfiguration_redisserviceconfiguration_connectionstring
      backend_env_webappconfiguration_redisserviceconfiguration_enabled          = var.backend_config.webappconfiguration_redisserviceconfiguration_enabled
      backend_env_environment_name                                               = var.backend_config.environment_name 
      backend_env_environment_healthcheckpublicapiendpoint                       = var.backend_config.environment_healthcheckpublicapiendpoint
      backend_env_environment_healthcheckauthenticatedendpoints                  = var.backend_config.environment_healthcheckauthenticatedendpoints
      backend_env_environment_healthcheckauthenticatedapikey                     = var.backend_config.environment_healthcheckauthenticatedapikey
      backend_env_environment_corsorigin                                         = var.backend_config.environment_corsorigin
      backend_env_healthchecksui_webhooks_0_name                                             = var.backend_config.healthchecksui_webhooks_0_name
      backend_env_healthchecksui_webhooks_0_uri                                              = var.backend_config.healthchecksui_webhooks_0_uri
      backend_env_healthchecksui_webhooks_0_payload                                          = var.backend_config.healthchecksui_webhooks_0_payload
      backend_env_healthchecksui_webhooks_0_restoredpayload                                  = var.backend_config.healthchecksui_webhooks_0_restoredpayload
      backend_env_healthchecksui_evaluationtimeinseconds                                     = var.backend_config.healthchecksui_evaluationtimeinseconds
      backend_env_healthchecksui_minimumsecondsbetweenfailurenotifications                   = var.backend_config.healthchecksui_minimumsecondsbetweenfailurenotifications
      backend_env_frontendproxy_routes_frontend-route_clusterid                             = var.backend_config.frontendproxy_routes_frontend-route_clusterid
      backend_env_frontendproxy_routes_frontend-route_match_path                            = var.backend_config.frontendproxy_routes_frontend-route_match_path
      backend_env_frontendproxy_clusters_frontend-cluster_destinations_frontend-server_address = var.backend_config.frontendproxy_clusters_frontend-cluster_destinations_frontend-server_address
      frontend_image_uri                                                         = data.aws_ecr_image.identity_frontend.image_uri
      frontend_container_port                                                    = var.frontend_config.container_port
  })
  execution_role_arn = var.iam_role_arn
  task_role_arn      = var.iam_role_arn
}

resource "aws_ecs_cluster" "identity_cluster" {
  name = "identity-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

resource "aws_ecs_service" "identity" {
  name                 = "identity-service"
  cluster              = aws_ecs_cluster.identity_cluster.arn
  force_new_deployment = true
  triggers = {
    redeployment = plantimestamp()
  }
  capacity_provider_strategy {
    capacity_provider = "FARGATE"
    base              = 1
    weight            = 100
  }
  platform_version    = "LATEST"
  task_definition     = aws_ecs_task_definition.identity_td.arn
  scheduling_strategy = "REPLICA"
  desired_count       = 2
  deployment_controller {
    type = "ECS"
  }
  deployment_minimum_healthy_percent = 100
  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }
  network_configuration {
    assign_public_ip = true
    subnets          = var.networking_config.load_balancer_subnets
    security_groups  = var.networking_config.load_balancer_security_groups
  }
  load_balancer {
    container_name   = "identity-backend"
    container_port   = var.backend_config.container_port
    target_group_arn = var.target_group_arn
  }
  health_check_grace_period_seconds = 180
  enable_execute_command            = true
}