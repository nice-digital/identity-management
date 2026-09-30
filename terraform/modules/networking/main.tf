# networking
resource "aws_lb" "identity_lb" {
  name               = "identity-lb"
  load_balancer_type = "application"
  subnets            = var.networking_config.load_balancer_subnets
  security_groups    = var.networking_config.load_balancer_security_groups
}

resource "aws_lb_target_group" "identity_tg" {
  name             = "identity-tg"
  target_type      = "ip"
  protocol         = "HTTP"
  port             = var.backend_config.container_port
  ip_address_type  = "ipv4"
  vpc_id           = var.networking_config.target_group_vpc_id
  protocol_version = "HTTP1"
  stickiness {
    enabled = true
    type    = "lb_cookie"
  }
  health_check {
    enabled  = true
    interval = 180
    timeout  = 120
    matcher  = "200-302"
  }
}

resource "aws_lb_listener" "identity_http_listener" {
  load_balancer_arn = aws_lb.identity_lb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    target_group_arn = aws_lb_target_group.identity_tg.arn
    type             = "forward"
  }
}

resource "aws_lb_listener" "identity_https_listener" {
  load_balancer_arn = aws_lb.identity_lb.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = var.networking_config.certificate_arn

  default_action {
    target_group_arn = aws_lb_target_group.identity_tg.arn
    type             = "forward"
  }
}

resource "aws_route53_record" "identity_hostname" {
  zone_id = var.networking_config.hosted_zone_id
  name    = var.networking_config.hostname
  type    = "A"

  alias {
    name                   = aws_lb.identity_lb.dns_name
    zone_id                = aws_lb.identity_lb.zone_id
    evaluate_target_health = true
  }
}