output "iam_role_arn" {
  description = "Private IP address of the EC2 instance"
  value       = aws_iam_role.identity_role.arn
}
