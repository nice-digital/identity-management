
environment = "#{environment}"

backend_config = {
  ecr_repository_name = "#{backend_config_ecr_repository_name}"
  ecr_image_tag       = "#{backend_config_ecr_image_tag}"
  container_port      = #{backend_config_container_port}
  host_port           = #{backend_config_host_port}

  appsettings_environment_accountsenvironment = "#{backend_config_appsettings_environment_accountsenvironment}"
  appsettings_environment_name                = "#{backend_config_appsettings_environment_name}"
  appsettings_environment_ssrport             = "#{backend_config_appsettings_environment_ssrport}"
  appsettings_environment_ssrhost             = "#{backend_config_appsettings_environment_ssrhost}"
  appsettings_environment_corsorigin          = "#{backend_config_appsettings_environment_corsorigin}"

  connectionstrings_defaultconnection = "#{backend_config_connectionstrings_defaultconnection}"

  consultationlist_downloadroles_adminroles = "#{backend_config_consultationlist_downloadroles_adminroles}"
  consultationlist_downloadroles_teamroles  = "#{backend_config_consultationlist_downloadroles_teamroles}"

  encryption_iv  = "#{backend_config_encryption_iv}"
  encryption_key = "#{backend_config_encryption_key}"

  feeds_cachedurationseconds                = "#{backend_config_feeds_cachedurationseconds}"
  feeds_indevapikey                         = "#{backend_config_feeds_indevapikey}"
  feeds_indevbasepath                       = "#{backend_config_feeds_indevbasepath}"
  feeds_indevdraftpreviewchapterfeedpath    = "#{backend_config_feeds_indevdraftpreviewchapterfeedpath}"
  feeds_indevdraftpreviewdetailfeedpath     = "#{backend_config_feeds_indevdraftpreviewdetailfeedpath}"
  feeds_indevidamconfig_apiidentifier       = "#{backend_config_feeds_indevidamconfig_apiidentifier}"
  feeds_indevidamconfig_clientid            = "#{backend_config_feeds_indevidamconfig_clientid}"
  feeds_indevidamconfig_clientsecret        = "#{backend_config_feeds_indevidamconfig_clientsecret}"
  feeds_indevidamconfig_domain              = "#{backend_config_feeds_indevidamconfig_domain}"
  feeds_indevlistfeedpath                   = "#{backend_config_feeds_indevlistfeedpath}"
  feeds_indevpublishedchapterfeedpath       = "#{backend_config_feeds_indevpublishedchapterfeedpath}"
  feeds_indevpublisheddetailfeedpath        = "#{backend_config_feeds_indevpublisheddetailfeedpath}"
  feeds_indevpublishedpreviewdetailfeedpath = "#{backend_config_feeds_indevpublishedpreviewdetailfeedpath}"

  gilliam_getclaimsurl                   = "#{backend_config_gilliam_getclaimsurl}"
  gilliam_gilliambasepath                = "#{backend_config_gilliam_gilliambasepath}"
  gilliam_gilliamclientcertificatebase64 = "#{backend_config_gilliam_gilliamclientcertificatebase64}"
  globalnav_cookiebannerscript = "#{backend_config_globalnav_cookiebannerscript}"
  globalnav_script             = "#{backend_config_globalnav_script}"
  globalnav_scriptie8          = "#{backend_config_globalnav_scriptie8}"

  indevdraftpreviewdetailfeedpath = "#{backend_config_indevdraftpreviewdetailfeedpath}"

  logging_serilogminlevel = "#{backend_config_logging_serilogminlevel}"

  status_apikey = "#{backend_config_status_apikey}"

  webappconfiguration_apiidentifier                              = "#{backend_config_webappconfiguration_apiidentifier}"
  webappconfiguration_authorisationserviceuri                    = "#{backend_config_webappconfiguration_authorisationserviceuri}"
  webappconfiguration_redirecturi                                = "#{backend_config_webappconfiguration_redirecturi}"
  webappconfiguration_postlogoutredirecturi                      = "#{backend_config_webappconfiguration_postlogoutredirecturi}"
  webappconfiguration_clientid                                   = "#{backend_config_webappconfiguration_clientid}"
  webappconfiguration_clientsecret                               = "#{backend_config_webappconfiguration_clientsecret}"
  webappconfiguration_domain                                     = "#{backend_config_webappconfiguration_domain}"
  webappconfiguration_googletrackingid                           = "#{backend_config_webappconfiguration_googletrackingid}"
  webappconfiguration_redisserviceconfiguration_connectionstring = "#{backend_config_webappconfiguration_redisserviceconfiguration_connectionstring}"
  webappconfiguration_redisserviceconfiguration_enabled          = "#{backend_config_webappconfiguration_redisserviceconfiguration_enabled}"
}

frontend_config = {
  ecr_repository_name                 = "#{frontend_config_ecr_repository_name}"
  ecr_image_tag                       = "#{frontend_config_ecr_image_tag}"
  container_port                      = #{frontend_config_container_port}
}

networking_config = {
  load_balancer_subnets         = #{networking_config_load_balancer_subnets}
  load_balancer_security_groups = #{networking_config_load_balancer_security_groups}
  target_group_vpc_id           = "#{networking_config_target_group_vpc_id}"
  certificate_arn               = "#{networking_config_certificate_arn}"
  hosted_zone_id                = "#{networking_config_hosted_zone_id}"
  hostname                      = "#{networking_config_hostname}"
}