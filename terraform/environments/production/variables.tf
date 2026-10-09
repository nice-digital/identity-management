variable "aws_region" {
  type    = string
  default = "eu-west-1"
}

variable "environment" {
  type = string
  validation {
    condition     = contains(["dev", "production"], var.environment)
    error_message = "Invalid environment value."
  }
}

variable "backend_config" {
  description = "Backend configuration"
  type = object({
    ecr_repository_name = string
    ecr_image_tag       = string
    container_port      = number

    webappconfiguration_apiidentifier = string
    webappconfiguration_authorisationserviceuri = string
    webappconfiguration_redirecturi = string
    webappconfiguration_postlogoutredirecturi = string
    webappconfiguration_clientid = string
    webappconfiguration_clientsecret = string
    webappconfiguration_domain = string
    webappconfiguration_googletrackingid = string
    webappconfiguration_redisserviceconfiguration_connectionstring = string
    webappconfiguration_redisserviceconfiguration_enabled = string

    environment_name = string
    environment_healthcheckpublicapiendpoint = string
    environment_healthcheckauthenticatedendpoints = string
    environment_healthcheckauthenticatedapikey = string
    environment_corsorigin = string
    
    healthchecksui_webhooks_0_name = string
    healthchecksui_webhooks_0_uri = string
    healthchecksui_webhooks_0_payload = string
    healthchecksui_webhooks_0_restoredpayload = string
    healthchecksui_evaluationtimeinseconds = number
    healthchecksui_minimumsecondsbetweenfailurenotifications = number

    frontendproxy_routes_frontend-route_clusterid = string
    frontendproxy_routes_frontend-route_match_path = string
    frontendproxy_clusters_frontend-cluster_destinations_frontend-server_address = string
  })
}

variable "frontend_config" {
  description = "Frontend configuration"
  type = object({
    ecr_repository_name                 = string
    ecr_image_tag                       = string
    container_port                      = number,
    env_api_url                         = string,
    env_port                            = string,
    env_public_url                      = string,
    env_react_app_hotjarid              = string,
    env_react_app_accounts_environment  = string,
    env_react_app_global_nav_script     = string,
    env_react_app_global_nav_script_ie8 = string
    env_react_app_cookie_banner_script  = string
  })
}

variable "networking_config" {
  description = "Networking configuration"
  type = object({
    load_balancer_subnets         = list(string)
    load_balancer_security_groups = list(string)
    target_group_vpc_id           = string
    certificate_arn               = string
    hosted_zone_id                = string
    hostname                      = string
  })
}