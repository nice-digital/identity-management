
environment = "#{environment}"

backend_config = {
    ecr_repository_name = "#{backend_config_ecr_repository_name}"
    ecr_image_tag       = "#{backend_config_ecr_image_tag}"
    container_port      = #{backend_config_container_port}

    webappconfiguration_apiidentifier = "#{backend_config_webappconfiguration_apiidentifier}"
    webappconfiguration_authorisationserviceuri = "#{backend_config_webappconfiguration_authorisationserviceuri}"
    webappconfiguration_redirecturi = "#{backend_config_webappconfiguration_redirecturi}"
    webappconfiguration_postlogoutredirecturi = "#{backend_config_webappconfiguration_postlogoutredirecturi}"
    webappconfiguration_clientid = "#{backend_config_webappconfiguration_clientid}"
    webappconfiguration_clientsecret = "#{backend_config_webappconfiguration_clientsecret}"
    webappconfiguration_domain = "#{backend_config_webappconfiguration_domain}"
    webappconfiguration_googletrackingid = "#{backend_config_webappconfiguration_googletrackingid}"
    webappconfiguration_redisserviceconfiguration_connectionstring = "#{backend_config_webappconfiguration_redisserviceconfiguration_connectionstring}"
    webappconfiguration_redisserviceconfiguration_enabled = "#{backend_config_webappconfiguration_redisserviceconfiguration_enabled}"

    environment_name = "#{backend_config_environment_name}"
    environment_healthcheckpublicapiendpoint = "#{backend_config_environment_healthcheckpublicapiendpoint}"
    environment_healthcheckauthenticatedendpoints = "#{backend_config_environment_healthcheckauthenticatedendpoints}"
    environment_healthcheckauthenticatedapikey = "#{backend_config_environment_healthcheckauthenticatedapikey}"
    environment_corsorigin = "#{backend_config_environment_corsorigin}"
    
    healthchecksui_webhooks_0_name = "#{backend_config_healthchecksui_webhooks_0_name}"
    healthchecksui_webhooks_0_uri = "#{backend_config_healthchecksui_webhooks_0_uri}"
    healthchecksui_webhooks_0_payload = "#{backend_config_healthchecksui_webhooks_0_payload}"
    healthchecksui_webhooks_0_restoredpayload = "#{backend_config_healthchecksui_webhooks_0_restoredpayload}"
    healthchecksui_evaluationtimeinseconds = #{backend_config_healthchecksui_evaluationtimeinseconds}
    healthchecksui_minimumsecondsbetweenfailurenotifications = #{backend_config_healthchecksui_minimumsecondsbetweenfailurenotifications}

    frontendproxy_routes_frontend-route_clusterid = "#{backend_config_frontendproxy_routes_frontend-route_clusterid}"
    frontendproxy_routes_frontend-route_match_path = "#{backend_config_frontendproxy_routes_frontend-route_match_path}"
    frontendproxy_clusters_frontend-cluster_destinations_frontend-server_address = "#{backend_config_frontendproxy_clusters_frontend-cluster_destinations_frontend-server_address}"
}

frontend_config = {
    ecr_repository_name                 = "#{frontend_config_ecr_repository_name}"
    ecr_image_tag                       = "#{frontend_config_ecr_image_tag}"
    container_port                      = #{frontend_config_container_port}
}

networking_config = {
  load_balancer_subnets         = #{networking_config_load_balancer_subnets}
  load_balancer_security_groups = #{networking_config_load_balancer_security_groups}
  ecs_task_subnets              = #{networking_config_ecs_task_subnets}
  ecs_task_security_groups      = #{networking_config_ecs_task_security_groups}
  target_group_vpc_id           = "#{networking_config_target_group_vpc_id}"
  certificate_arn               = "#{networking_config_certificate_arn}"
  hosted_zone_id                = "#{networking_config_hosted_zone_id}"
  hostname                      = "#{networking_config_hostname}"
  assign_public_ip              = "#{networking_config_assign_public_ip}"
  environment_name              = "#{networking_config_environment_name}"
  application_name              = "#{networking_config_application_name}"
}